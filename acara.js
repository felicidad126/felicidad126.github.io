/*
 * Penghubung RSVP dan buku ucapan ke server (API mengundang-api di /api/).
 *
 * Undangan klien menandai dirinya dengan satu tag di <head>:
 *   <meta name="acara" content="laras-bima">
 * Tanpa tag itu (semua demo di katalog), Acara.aktif = false: tema tetap menyimpan RSVP dan
 * ucapan di perangkat seperti biasa, dan tidak ada satu pun permintaan ke server.
 *
 * Dipakai tema:
 *   Acara.aktif                          true bila undangan bertag acara
 *   Acara.kunci("bk-rsvp")               kunci localStorage, diberi awalan slug bila aktif, supaya
 *                                        dua undangan klien di domain ini tidak saling berbagi data
 *   Acara.kirimRsvp({nama, kehadiran, jumlah, telepon, pesan}, form)
 *                                        kehadiran: "hadir" | "tidak" | "ragu"
 *   Acara.kehadiran("Tidak hadir")       label pilihan tema → "hadir" | "tidak" | "ragu"
 *   Acara.muatUcapan()                   halaman pertama → Acara.ucapan, Acara.jumlahUcapan
 *   Acara.muatLagi()                     halaman berikutnya (bila Acara.adaLagi)
 *   Acara.kirimUcapan({nama, pesan}, form) → ucapan baru, sudah ditambahkan di depan Acara.ucapan
 * Setiap ucapan berbentuk { id, name, msg, at } (at = milidetik), sama dengan data contoh tema.
 * Fungsi kirim/muat melempar Error dengan pesan yang siap ditampilkan ke tamu.
 */
(() => {
  "use strict";

  const POLA_SLUG = /^[a-z0-9]([a-z0-9-]{0,48}[a-z0-9])?$/;
  const tag = document.querySelector('meta[name="acara"]');
  const slug = tag && POLA_SLUG.test(tag.content) ? tag.content : null;
  const dasar = slug ? `/api/acara/${slug}` : null;
  const HALAMAN = 50;

  const CATATAN = {
    rsvp: "Jawaban Anda dikirim ke kedua mempelai dan tidak ditampilkan ke tamu lain.",
    ucapan: "Nama dan ucapan Anda tampil untuk semua tamu undangan ini.",
    "rsvp-doa": "Jawaban Anda dikirim ke kedua mempelai. Doa yang Anda tulis tampil di bagian Doa & ucapan.",
    lain: "Dikirim ke kedua mempelai.",
  };
  const TEKS_PREVIEW = "Preview: data tersimpan di perangkat ini saja.";

  // Satu id acak per perangkat: mengirim ulang RSVP dari HP yang sama memperbarui jawaban.
  function perangkatId() {
    const KUNCI = "mengundang-perangkat";
    try {
      const ada = localStorage.getItem(KUNCI);
      if (ada && /^[0-9a-f-]{36}$/i.test(ada)) return ada;
    } catch {}
    let id;
    if (crypto.randomUUID) id = crypto.randomUUID();
    else {
      const b = crypto.getRandomValues(new Uint8Array(16));
      b[6] = (b[6] & 0x0f) | 0x40;
      b[8] = (b[8] & 0x3f) | 0x80;
      const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
      id = `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
    }
    try { localStorage.setItem(KUNCI, id); } catch {}
    return id;
  }

  async function minta(metode, jalur, isi) {
    const henti = new AbortController();
    const waktu = setTimeout(() => henti.abort(), 15000);
    let res;
    try {
      res = await fetch(dasar + jalur, {
        method: metode,
        headers: isi ? { "Content-Type": "application/json" } : {},
        body: isi ? JSON.stringify(isi) : undefined,
        credentials: "omit",
        cache: "no-store",
        signal: henti.signal,
      });
    } catch {
      throw new Error("Gagal terhubung. Periksa koneksi internet, lalu coba lagi.");
    } finally {
      clearTimeout(waktu);
    }
    let data = null;
    try { data = await res.json(); } catch {}
    if (res.ok) return data;
    if (res.status === 429) throw new Error("Terlalu banyak percobaan. Tunggu sebentar, lalu coba lagi.");
    const galat = new Error((data && data.pesan) || "Gagal mengirim. Coba lagi sebentar lagi.");
    galat.kode = data && data.galat;
    galat.kolom = data && data.kolom;
    throw galat;
  }

  const keUcapan = (u) => ({ id: u.id, name: u.nama, msg: u.pesan, at: Date.parse(u.dibuat) || Date.now() });
  // Isi kolom jebakan (tidak terlihat oleh tamu); bot yang mengisinya diabaikan server.
  const jebakan = (form) => (form && form.elements.situs ? form.elements.situs.value : "") || undefined;

  const Acara = {
    aktif: !!slug,
    slug,
    ucapan: [],
    jumlahUcapan: 0,
    adaLagi: false,
    _berikutnya: null,

    kunci(k) {
      return slug ? `acara:${slug}:${k}` : k;
    },

    kehadiran(label) {
      const t = String(label || "").toLowerCase();
      if (/tidak|berhalangan|maaf/.test(t)) return "tidak";
      if (/ragu|belum|mungkin/.test(t)) return "ragu";
      return "hadir";
    },

    async kirimRsvp({ nama, kehadiran, jumlah, telepon, pesan }, form) {
      const isi = { perangkat_id: perangkatId(), nama, kehadiran, situs: jebakan(form) };
      if (kehadiran !== "tidak" && Number.isInteger(+jumlah) && +jumlah > 0) isi.jumlah = +jumlah;
      if (telepon) isi.telepon = telepon;
      if (pesan) isi.pesan = pesan;
      return minta("PUT", "/rsvp", isi);
    },

    async muatUcapan() {
      const data = await minta("GET", `/ucapan?batas=${HALAMAN}`);
      this.ucapan = data.ucapan.map(keUcapan);
      this.jumlahUcapan = data.jumlah;
      this._berikutnya = data.berikutnya;
      this.adaLagi = data.berikutnya !== null;
      return this.ucapan;
    },

    async muatLagi() {
      if (this._berikutnya === null) return this.ucapan;
      const data = await minta("GET", `/ucapan?batas=${HALAMAN}&sebelum=${this._berikutnya}`);
      const ada = new Set(this.ucapan.map((u) => u.id));
      this.ucapan.push(...data.ucapan.map(keUcapan).filter((u) => !ada.has(u.id)));
      this.jumlahUcapan = data.jumlah;
      this._berikutnya = data.berikutnya;
      this.adaLagi = data.berikutnya !== null;
      return this.ucapan;
    },

    async kirimUcapan({ nama, pesan }, form) {
      const data = await minta("POST", "/ucapan", { nama, pesan, situs: jebakan(form) });
      const u = keUcapan(data.ucapan);
      this.ucapan.unshift(u);
      this.jumlahUcapan += 1;
      return u;
    },
  };
  window.Acara = Acara;

  if (!Acara.aktif) return;

  // Ganti keterangan "Preview" dan pasang kolom jebakan di setiap form, setelah HTML siap.
  const siapkan = () => {
    for (const el of document.querySelectorAll("[data-catatan]")) {
      el.textContent = CATATAN[el.dataset.catatan] || CATATAN.lain;
    }
    for (const el of document.querySelectorAll("p, small, span, div")) {
      if (el.children.length === 0 && el.textContent.trim() === TEKS_PREVIEW) el.textContent = CATATAN.lain;
    }
    for (const form of document.querySelectorAll("form")) {
      if (form.elements.situs) continue;
      const input = document.createElement("input");
      input.type = "text";
      input.name = "situs";
      input.tabIndex = -1;
      input.autocomplete = "off";
      input.setAttribute("aria-hidden", "true");
      input.style.cssText = "position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0";
      form.append(input);
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", siapkan, { once: true });
  else siapkan();
})();
