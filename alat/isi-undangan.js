/*
 * Pengisi undangan: mengisi sebuah tema dengan data klien.
 *
 * Dipakai portal admin saat menerbitkan undangan klien dan saat menampilkan pratinjau. Halaman demo di
 * katalog tidak memakai berkas ini: tema sudah berisi data contoh yang sama dengan blok data-undangan-nya.
 *
 * Berjalan di browser (DOMParser) dan di Node (linkedom, jsdom, atau parser lain yang memberi `document`).
 * Format data dan semua atribut pengikat dijelaskan di docs/FORMAT-DATA.md.
 *
 *   IsiUndangan.normalisasi(data)            data lengkap dengan turunan (tanggal panjang, jam, zona, dst.)
 *   IsiUndangan.isiDokumen(document, data, opsi)
 *   IsiUndangan.isiHtml(html, data, opsi)    → string HTML (butuh DOMParser, atau opsi.parse di Node)
 *
 * opsi:
 *   acara       slug acara; memasang <meta name="acara"> sehingga RSVP dan ucapan dikirim ke server
 *   folderTema  mis. "/biru-kabut/"; alamat relatif di tema diubah menjadi absolut dari folder ini,
 *               karena undangan klien dilayani dari folder lain (/<slug>/)
 *   asal        mis. "https://invitation.helonoia.com"; dipakai untuk og:image
 */
(function (root) {
  "use strict";

  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const ZONA = {
    "Asia/Jakarta": { short: "WIB", long: "Waktu Indonesia Barat", offset: "+07:00" },
    "Asia/Makassar": { short: "WITA", long: "Waktu Indonesia Tengah", offset: "+08:00" },
    "Asia/Jayapura": { short: "WIT", long: "Waktu Indonesia Timur", offset: "+09:00" },
  };
  // Salam untuk agama selain Islam. Untuk "islami", teks tema dibiarkan apa adanya.
  // Nilai kosong berarti elemennya dihapus.
  const SALAM = {
    islami: null,
    umum: {
      judul: "Salam Sejahtera",
      sub: "",
      pembuka: "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari pernikahan kami.",
      penutup: "Terima kasih atas doa dan restu Anda.",
    },
    kristiani: {
      judul: "Salam Damai Sejahtera",
      sub: "dalam kasih Tuhan Yesus Kristus",
      pembuka: "Dengan penuh syukur atas kasih Tuhan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari pernikahan kami.",
      penutup: "Tuhan memberkati.",
    },
    hindu: {
      judul: "Om Swastiastu",
      sub: "",
      pembuka: "Atas asung kerta wara nugraha Ida Sang Hyang Widhi Wasa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari pernikahan kami.",
      penutup: "Om Shanti Shanti Shanti Om.",
    },
  };
  const LABEL_ACARA = { akad: "Akad Nikah", pemberkatan: "Pemberkatan", resepsi: "Resepsi" };
  const POLA_SLUG = /^[a-z0-9]([a-z0-9-]{0,48}[a-z0-9])?$/;
  const POLA_DOMPET = /dompet|dana\b|ovo\b|gopay|shopeepay|linkaja|e-?wallet/i;
  // Foto tema selalu diambil dari folder foto/ dengan tiga versi: <nama>.jpg, hd/<nama>.jpg, webp/<nama>[-480].webp.
  const POLA_FOTO = /^(.*?)foto\/(hd\/|webp\/)?([A-Za-z0-9_-]+?)(-480)?\.(jpe?g|webp|png)$/;

  const salin = (o) => JSON.parse(JSON.stringify(o == null ? {} : o));
  const teks = (s) => (s == null ? "" : String(s)).trim();
  const dua = (a, b) => (a && b ? `${a} & ${b}` : a || b || "");

  // Tanggal dan jam dibaca apa adanya dari string ISO (sudah dalam zona acara), tanpa konversi zona.
  function bacaWaktu(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || "");
    if (!m) return null;
    const y = +m[1], bl = +m[2], tg = +m[3];
    const hari = HARI[new Date(Date.UTC(y, bl - 1, tg)).getUTCDay()];
    return { y, bl, tg, hari, jam: m[4] ? `${m[4]}.${m[5]}` : "" };
  }
  function tanggal(iso) {
    const w = bacaWaktu(iso);
    if (!w) return null;
    const bulan = BULAN[w.bl - 1], dd = String(w.tg).padStart(2, "0"), mm = String(w.bl).padStart(2, "0");
    return {
      iso: `${w.y}-${mm}-${dd}`,
      long: `${w.hari}, ${w.tg} ${bulan} ${w.y}`,
      short: `${w.tg} ${bulan} ${w.y}`,
      dayName: w.hari,
      day: String(w.tg),
      month: bulan,
      year: String(w.y),
      monthYear: `${bulan} ${w.y}`,
      dots: `${dd}.${mm}.${w.y}`,
      dotsSpaced: `${dd} · ${mm} · ${w.y}`,
    };
  }
  // "1234567890" → "1234 5678 90"
  const kelompok = (n) => teks(n).replace(/\s+/g, "").replace(/(.{4})(?=.)/g, "$1 ");

  function foto(f, altBawaan) {
    if (!f) return null;
    const o = typeof f === "string" ? { file: f } : salin(f);
    if (!o.file) return null;
    o.alt = teks(o.alt) || altBawaan;
    return o;
  }

  function normalisasi(input) {
    const d = salin(input);
    d.version = 1;
    d.demo = d.demo === true;
    d.eventType = d.eventType || "wedding";
    d.greeting = Object.prototype.hasOwnProperty.call(SALAM, d.greeting) ? d.greeting : "umum";
    d.city = teks(d.city);
    d.photoBase = teks(d.photoBase) || "../foto/";
    d.music = d.music || null;
    d.sections = Object.assign({ story: true, gifts: true, countdown: true, wishes: true }, d.sections);

    for (const k of ["bride", "groom"]) {
      const p = (d[k] = d[k] || {});
      p.name = teks(p.name);
      p.fullName = teks(p.fullName) || p.name;
      p.child = teks(p.child) || (k === "bride" ? "Putri" : "Putra");
      p.father = teks(p.father);
      p.mother = teks(p.mother);
      const ortu = dua(p.father, p.mother);
      p.parents = ortu ? `${p.child} dari ${ortu}` : teks(p.parents);
      p.childOfFather = p.father ? `${p.child} dari ${p.father}` : p.parents;
      p.family = ortu ? `Keluarga ${ortu}` : "";
      p.instagram = teks(p.instagram).replace(/^@/, "");
      p.instagramHandle = p.instagram ? `@${p.instagram}` : "";
      p.instagramUrl = p.instagram ? `https://instagram.com/${encodeURIComponent(p.instagram)}` : "";
      p.photo = foto(p.photo, p.fullName);
    }
    d.couple = dua(d.bride.name, d.groom.name);
    d.coupleAnd = d.bride.name && d.groom.name ? `${d.bride.name} dan ${d.groom.name}` : d.couple;

    d.events = d.events || {};
    const urut = Object.keys(d.events).sort((a, b) => teks(d.events[a].startsAt).localeCompare(teks(d.events[b].startsAt)));
    let zonaUtama = null;
    for (const k of urut) {
      const e = d.events[k];
      e.label = teks(e.label) || LABEL_ACARA[k] || k;
      e.timezone = ZONA[e.timezone] ? e.timezone : "Asia/Jakarta";
      const z = ZONA[e.timezone];
      zonaUtama = zonaUtama || e.timezone;
      const mulai = bacaWaktu(e.startsAt), selesai = bacaWaktu(e.endsAt);
      const tgl = tanggal(e.startsAt);
      e.dateLong = tgl ? tgl.long : "";
      e.zone = z.short;
      e.timeStart = mulai ? mulai.jam : "";
      e.timeRange = mulai ? `${mulai.jam} – ${selesai && selesai.jam ? selesai.jam : "selesai"}` : "";
      e.timeRangeZone = e.timeRange ? `${e.timeRange} ${z.short}` : "";
      e.venue = teks(e.venue);
      e.address = teks(e.address);
      if (!teks(e.mapsUrl)) {
        e.mapsUrl = typeof e.lat === "number" && typeof e.lng === "number"
          ? `https://www.google.com/maps/search/?api=1&query=${e.lat},${e.lng}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([e.venue, e.address].filter(Boolean).join(", "))}`;
      }
    }
    // Susun ulang supaya urutan kunci mengikuti waktu (acara pertama = yang paling awal).
    d.events = Object.fromEntries(urut.map((k) => [k, d.events[k]]));
    const pertama = urut.length ? d.events[urut[0]] : null;
    d.date = (pertama && tanggal(pertama.startsAt)) || tanggal("");
    const zu = ZONA[zonaUtama || "Asia/Jakarta"];
    d.zone = { short: zu.short, long: zu.long, iana: zonaUtama || "Asia/Jakarta" };
    const batas = tanggal(d.rsvpDeadline);
    d.rsvpDeadlineLong = batas ? batas.short : "";

    d.cover = foto(d.cover, d.coupleAnd ? `Foto ${d.coupleAnd}` : "Foto sampul");
    d.gallery = (Array.isArray(d.gallery) ? d.gallery : []).map((g, i) => {
      const o = foto(g, `Foto ${d.coupleAnd || "galeri"} ${i + 1}`);
      if (o) o.caption = teks(o.caption);
      return o;
    }).filter(Boolean);
    d.story = (Array.isArray(d.story) ? d.story : []).map((s) => ({
      year: teks(s.year),
      title: teks(s.title),
      text: teks(s.text),
      photo: foto(s.photo, teks(s.title) || "Kisah kami"),
    }));

    const g = (d.gifts = d.gifts || {});
    g.accounts = (Array.isArray(g.accounts) ? g.accounts : []).filter((a) => a && teks(a.number)).map((a) => {
      const bank = teks(a.bank), number = teks(a.number).replace(/\s+/g, "");
      return {
        bank,
        number,
        numberDisplay: kelompok(number),
        holder: teks(a.holder),
        copyWhat: POLA_DOMPET.test(bank) ? "Nomor dompet digital" : "Nomor rekening",
      };
    });
    if (g.address && teks(g.address.text)) {
      g.address = { text: teks(g.address.text), holder: teks(g.address.holder) };
      g.address.copy = g.address.holder ? `${g.address.holder}, ${g.address.text}` : g.address.text;
    } else {
      g.address = null;
    }
    return d;
  }

  // ---------- Mengisi dokumen ----------

  function ambil(obj, jalur) {
    let o = obj;
    for (const k of jalur.split(".")) {
      if (o == null) return undefined;
      o = o[k];
    }
    return o;
  }

  function isiDokumen(doc, data, opsi) {
    opsi = opsi || {};
    const v = normalisasi(data);
    const nilai = (jalur) => {
      const x = ambil(v, jalur.trim());
      if (x === undefined || (x !== null && typeof x === "object")) {
        throw new Error(`Data "${jalur.trim()}" tidak ada atau bukan teks`);
      }
      return x == null ? "" : String(x);
    };
    // "bride.fullName" atau templat "a.n. {gifts.accounts.0.holder}"
    const templat = (s) => (s.includes("{") ? s.replace(/\{([^{}]+)\}/g, (_, j) => nilai(j)) : nilai(s));
    const semua = (sel) => Array.from(doc.querySelectorAll(sel));
    const masihAda = (el) => doc.documentElement.contains(el);

    // Elemen dengan anak elemen (ikon, <br>, <span>): hanya teks langsung pertama yang diganti.
    function gantiTeks(el, isi) {
      if (!el.children.length) { el.textContent = isi; return; }
      for (const n of Array.from(el.childNodes)) {
        if (n.nodeType === 3 && n.nodeValue.trim()) {
          const m = /^(\s*)[\s\S]*?(\s*)$/.exec(n.nodeValue);
          n.nodeValue = m[1] + isi + m[2];
          return;
        }
      }
      el.insertBefore(doc.createTextNode(isi), el.firstChild);
    }

    // 1. Bagian dan butir yang tidak dipakai dihapus lebih dulu.
    for (const el of semua("[data-isi-tampil]")) {
      if (!masihAda(el)) continue;
      const j = el.getAttribute("data-isi-tampil").trim();
      const balik = j.startsWith("!");
      let x = ambil(v, balik ? j.slice(1) : j);
      if (Array.isArray(x)) x = x.length;
      if (balik ? x : !x) el.remove();
      else el.removeAttribute("data-isi-tampil");
    }

    // 2. Salam: untuk "islami" teks tema dipertahankan.
    const salam = SALAM[v.greeting];
    for (const el of semua("[data-isi-salam]")) {
      const k = el.getAttribute("data-isi-salam");
      el.removeAttribute("data-isi-salam");
      if (!salam) continue;
      if (!(k in salam)) throw new Error(`Salam "${k}" tidak dikenal`);
      if (salam[k]) gantiTeks(el, salam[k]);
      else el.remove();
    }

    // 3. Teks dan atribut.
    for (const el of semua("[data-isi]")) {
      gantiTeks(el, templat(el.getAttribute("data-isi")));
      el.removeAttribute("data-isi");
    }
    for (const el of semua("[data-isi-attr]")) {
      const peta = JSON.parse(el.getAttribute("data-isi-attr"));
      for (const a in peta) el.setAttribute(a, templat(peta[a]));
      el.removeAttribute("data-isi-attr");
    }

    // 4. Foto: src/srcset/content/href yang menunjuk ke foto/ diganti, beserta alt dan titik fokus.
    const dasarFoto = opsi.folderTema ? rebase(v.photoBase, opsi.folderTema) : v.photoBase;
    for (const el of semua("[data-isi-foto]")) {
      const f = ambil(v, el.getAttribute("data-isi-foto").trim());
      if (!f || !f.file) throw new Error(`Foto "${el.getAttribute("data-isi-foto")}" tidak ada`);
      el.removeAttribute("data-isi-foto");
      for (const a of ["src", "srcset", "content", "href"]) {
        const lama = el.getAttribute(a);
        if (!lama) continue;
        const baru = lama.split(",").map((bagian) => {
          const m = /^(\s*)(\S+)(.*)$/.exec(bagian);
          return m ? m[1] + gantiFoto(m[2], f.file, dasarFoto, opsi) + m[3] : bagian;
        }).join(",");
        el.setAttribute(a, baru);
      }
      if (el.tagName === "IMG" && el.getAttribute("alt")) el.setAttribute("alt", f.alt);
      // object-position hanya berlaku untuk <img>; <meta property="og:image"> dan sejenisnya tidak diberi style.
      if (f.focus && el.tagName === "IMG") {
        const gaya = (el.getAttribute("style") || "").replace(/object-position\s*:[^;]*;?/g, "").trim();
        el.setAttribute("style", `${gaya}${gaya && !gaya.endsWith(";") ? ";" : ""}object-position:${f.focus}`);
      }
    }

    // 5. Blok data untuk skrip tema.
    const blok = doc.getElementById("data-undangan");
    if (!blok) throw new Error('Tema tidak punya <script type="application/json" id="data-undangan">');
    blok.textContent = JSON.stringify(v).replace(/</g, "\\u003c");

    // 6. Tag acara: undangan klien mengirim RSVP dan ucapan ke server.
    if (opsi.acara) {
      if (!POLA_SLUG.test(opsi.acara)) throw new Error(`Slug acara tidak sah: ${opsi.acara}`);
      for (const m of semua('meta[name="acara"]')) m.remove();
      const meta = doc.createElement("meta");
      meta.setAttribute("name", "acara");
      meta.setAttribute("content", opsi.acara);
      const skrip = doc.querySelector('script[src="/acara.js"]');
      if (skrip) skrip.parentNode.insertBefore(meta, skrip);
      else doc.head.appendChild(meta);
    }

    // 7. Alamat relatif tema → absolut, karena halaman klien ada di folder lain.
    if (opsi.folderTema) rebaseDokumen(doc, opsi.folderTema);

    // 8. Komentar HTML dan CSS berisi catatan perawatan tema (termasuk "data contoh"); tidak perlu ikut ke undangan klien.
    (function buangKomentar(n) {
      for (const c of Array.from(n.childNodes)) {
        if (c.nodeType === 8) c.remove();
        else if (c.childNodes && c.childNodes.length) buangKomentar(c);
      }
    })(doc);
    for (const el of semua("style")) el.textContent = el.textContent.replace(/\/\*[\s\S]*?\*\//g, "");

    const sisa = doc.querySelector("[data-isi],[data-isi-attr],[data-isi-foto],[data-isi-tampil],[data-isi-salam]");
    if (sisa) throw new Error("Masih ada atribut pengikat yang belum diproses");
    return doc;
  }

  function gantiFoto(url, file, dasar, opsi) {
    const m = POLA_FOTO.exec(url);
    if (!m) return url;
    const [, , versi = "", , kecil = "", ext] = m;
    let alamat = `${dasar}${versi}${file}${kecil}.${ext}`;
    if (/^https?:\/\//.test(url)) {
      const asal = opsi.asal || url.replace(/^(https?:\/\/[^/]+).*$/, "$1");
      alamat = asal + (alamat.startsWith("/") ? alamat : rebase(alamat, opsi.folderTema || "/"));
    }
    return alamat;
  }

  // ---------- Alamat relatif → absolut ----------

  const BUKAN_RELATIF = /^(?:[a-z][a-z0-9+.-]*:|\/|#|\?|\{)/i;
  function rebase(url, folder) {
    if (!url || BUKAN_RELATIF.test(url)) return url;
    const u = new URL(url, "https://x" + folder);
    return u.pathname + u.search + u.hash;
  }
  // Alamat berkutip dibaca utuh sampai kutip penutupnya. Data URI SVG berisi kutip lain dan url(%23f) (rujukan ke filter
  // atau mask di dalam SVG itu sendiri); bila tidak dibaca utuh, url(%23f) di dalamnya ikut dijadikan /tema/%23f dan
  // filternya rusak (kabut Biru Kabut tergambar hitam).
  function rebaseCss(css, folder) {
    return css.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^'"()\s]+))\s*\)/g, (s, dq, sq, polos) =>
      dq != null ? `url("${rebase(dq, folder)}")` : sq != null ? `url('${rebase(sq, folder)}')` : `url(${rebase(polos, folder)})`);
  }
  function rebaseDokumen(doc, folder) {
    for (const a of ["src", "href", "poster"]) {
      for (const el of Array.from(doc.querySelectorAll(`[${a}]`))) el.setAttribute(a, rebase(el.getAttribute(a), folder));
    }
    for (const el of Array.from(doc.querySelectorAll("[srcset]"))) {
      el.setAttribute("srcset", el.getAttribute("srcset").split(",").map((b) => {
        const m = /^(\s*)(\S+)(.*)$/.exec(b);
        return m ? m[1] + rebase(m[2], folder) + m[3] : b;
      }).join(","));
    }
    for (const el of Array.from(doc.querySelectorAll("style"))) el.textContent = rebaseCss(el.textContent, folder);
    for (const el of Array.from(doc.querySelectorAll("[style]"))) el.setAttribute("style", rebaseCss(el.getAttribute("style"), folder));
  }

  function isiHtml(html, data, opsi) {
    opsi = opsi || {};
    const parse = opsi.parse || ((h) => new DOMParser().parseFromString(h, "text/html"));
    const doc = parse(html);
    isiDokumen(doc, data, opsi);
    return "<!doctype html>\n" + doc.documentElement.outerHTML;
  }

  const api = { normalisasi, isiDokumen, isiHtml, rebase, ZONA, SALAM };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.IsiUndangan = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
