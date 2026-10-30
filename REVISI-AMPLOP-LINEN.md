# Revisi Tema Amplop Linen

Daftar revisi untuk [`amplop-linen/index.html`](amplop-linen/index.html), hasil review 30 Oktober 2026. Nomor baris merujuk ke file pada commit `1996f61`.

Pengujian dilakukan di Chromium (emulasi sentuh untuk HP) pada ukuran 393×659, 375×553, 320×568, 360×640, 740×360, 1280×680, dan 1440×900. Belum diuji di Safari iPhone asli; musik juga tidak ikut diuji.

Keterangan kolom **Uji**:
- **Terbukti**: masalahnya muncul di browser, dan usulan perbaikannya sudah dicoba lalu berhasil.
- **Belum diuji**: usulan disusun dari membaca kode dan perlu dicek saat dikerjakan.

---

## Ringkasan

| No | Masalah | Prioritas | Uji |
|---|---|---|---|
| 1 | Geser kartu batal di HP kalau jari mulai di atas isi kartu | P1 | Terbukti |
| 2 | Ketukan pertama setelah menggeser hilang | P1 | Terbukti |
| 3 | Form RSVP tetap tampil setelah dikirim; "Jumlah tamu" tetap muncul saat berhalangan | P1 | Terbukti |
| 4 | Di layar pendek kartu menutupi L&B, tanggal, dan penghitung "01 / 08" | P1 | Terbukti |
| 5 | Bingkai hiasan ikut ter-scroll dan memotong teks | P2 | Terbukti |
| 6 | Nomor rekening dan dompet digital patah baris | P2 | Terbukti |
| 7 | Kartu Tanda Kasih lebih pendek; teks kartu di belakangnya mengintip | P2 | Terbukti |
| 8 | Instagram hanya ada untuk mempelai pria | P2 | Patch lama masih bisa diterapkan |
| 9 | Format tanggal di RSVP dan ucapan tidak seragam | P3 | Belum diuji |
| 10 | Fokus keyboard hilang saat pindah kartu dengan panah | P3 | Belum diuji |
| 11 | Tiga tombol "Salin" punya nama yang sama untuk pembaca layar | P3 | Belum diuji |
| 12 | Amplop kecil dan terpotong di HP landscape | P3, opsional | Belum diuji |

P1 = bug yang mengganggu tamu, wajib diperbaiki. P2 = tampilan. P3 = kecil atau aksesibilitas.

---

## P1: Bug

### 1. Geser kartu batal di HP

**Gejala.** Di HP, kartu tidak berpindah saat digeser kalau jari mulai di atas isi kartu, dan kartu kembali ke tempat semula. Geser hanya berhasil di lapisan vellum kartu pertama, sebelum pita dibuka.

**Penyebab.** `.paper` (baris 162) memakai `overflow:auto`, jadi browser memperlakukannya sebagai area scroll dan mengaktifkan lagi gerakan horizontal di dalamnya. `touch-action:pan-y` di `.deck` (baris 151) tidak berlaku di dalam area scroll. Begitu jari bergerak, browser mengirim `pointercancel` dan swipe dibatalkan.

**Perbaikan.** Tambahkan `touch-action:pan-y` pada elemen yang di-scroll:

```css
.paper{ /* ...isi lama... */ touch-action:pan-y}
```

Kalau revisi no. 5 dikerjakan, pasang aturan ini di `.scroll`, bukan di `.paper`.

**Selesai bila** geser dari mana saja di isi kartu (judul, teks, area kosong) memindah kartu di kedelapan kartu.

### 2. Ketukan pertama setelah menggeser hilang

**Gejala.** Setelah menggeser kartu, ketukan berikutnya di kartu itu tidak berefek: foto tidak membesar, tombol Salin dan link diam. Baru ketukan kedua yang berfungsi.

**Penyebab.** Setiap kali geseran selesai, baris 903 memasang penahan klik sekali pakai:

```js
c.addEventListener("click", (ev) => ev.stopPropagation(), { capture: true, once: true });
```

Dengan mouse, klik memang terjadi setelah geser, jadi penahan itu langsung terpakai. Di layar sentuh, geser tidak menghasilkan klik, sehingga penahannya menunggu dan memakan ketukan sungguhan berikutnya.

**Perbaikan.** Hapus baris 903. Ganti dengan satu penahan tetap di `.deck` yang hanya aktif selama `dragging` bernilai `true`. `dragging` baru kembali `false` lewat `setTimeout` di baris 904, yaitu setelah klik dari gerakan yang sama lewat.

```js
// Klik yang lahir dari gerakan geser ditahan supaya foto/tautan tidak ikut terbuka.
deck.addEventListener("click", (e) => {
  if (dragging) { e.stopPropagation(); e.preventDefault(); }
}, true);
```

Hasil uji usulan ini:
- Mouse: geser lalu dilepas di atas foto tidak membuka foto, dan klik biasa berikutnya langsung membuka foto.
- Sentuh: geser pendek atau geser penuh, lalu ketuk foto, langsung membuka foto.

**Opsional (belum diuji).** Baris 879 tidak memulai geser kalau jari mulai di atas `a` atau `button`. Akibatnya kartu Foto, yang hampir penuh berisi tombol foto, sulit digeser. Setelah penahan di atas terpasang, `a, button` bisa dihapus dari pengecualian itu.

**Selesai bila** di HP dan desktop tidak ada ketukan yang hilang setelah menggeser, dan melepas geseran di atas foto atau link tidak membukanya.

### 3. Atribut `hidden` kalah oleh `display`

**Gejala.**
- Setelah RSVP dikirim, form tetap tampil lengkap dengan tombol "Kirim balasan", dan blok "Terima kasih" muncul di bawahnya.
- Saat memilih "Mohon maaf, berhalangan", kolom "Jumlah tamu" tidak hilang.

**Penyebab.** Kode menyembunyikan elemen dengan atribut `hidden` (baris 1110 dan 1119). Tetapi `.form{display:flex}` (baris 279) dan `.field{display:flex}` (baris 280) mengalahkan aturan bawaan browser `[hidden]{display:none}`.

**Perbaikan.** Tambahkan satu aturan umum di dekat baris 46:

```css
[hidden]{display:none!important}
```

Setelah itu `.env-stage[hidden]` (baris 138) dan `.lb[hidden]` (baris 360) tidak diperlukan lagi dan boleh dihapus.

**Selesai bila**:
- Memilih "Hadir" atau "Belum dapat memastikan" memunculkan "Jumlah tamu", sedangkan "berhalangan" menyembunyikannya.
- Setelah dikirim, hanya blok "Terima kasih" yang tampil.
- "Ubah jawaban" mengembalikan form berisi jawaban sebelumnya.

### 4. Kartu terlalu tinggi di layar pendek

**Gejala.** Di 375×553 (iPhone SE/8 di Safari) dan 320×568, kartu menutupi monogram L&B dan tanggal di atas, serta menimpa penghitung "01 / 08" di bawah.

**Penyebab.** Tinggi kartu minimal 430px (baris 29), padahal ruang di antara kepala dan navigasi di layar itu hanya sekitar 380px.

**Perbaikan.** Ubah baris 29 dan tambahkan rasio yang sedikit lebih lebar khusus untuk layar pendek, supaya kartu tidak terlalu sempit:

```css
--ch:clamp(360px,calc(var(--vh) - 184px),700px);
```

```css
@media (max-height:620px){:root{--cw:min(calc(100vw - 32px),calc(var(--ch) * .76),440px)}}
```

Hasil uji. Celah atas = jarak tumpukan kartu ke L&B/tanggal; celah bawah = jarak kartu aktif ke "01 / 08". Angka negatif berarti tertutup.

| Layar | Celah atas (lama → baru) | Celah bawah (lama → baru) | Lebar kartu (lama → baru) |
|---|---|---|---|
| 393×659 | 0 → 8 | 16 → 24 | 334 → 323 |
| 375×553 | −20 → 8 | −3 → 27 | 292 → 280 |
| 320×568 | −16 → 5 | 1 → 24 | 288 → 288 |
| 360×640 | 0 → 7 | 16 → 24 | 321 → 310 |
| 1280×680 | −2 → 6 | 16 → 24 | 348 → 337 |
| 1440×900 | 14 → 14 | 32 → 32 | 440 → 440 |

Konsekuensinya, di HP yang tidak pendek kartu menjadi sekitar 16px lebih pendek dan 11px lebih sempit, sehingga isinya sedikit lebih sering perlu digulir.

**Selesai bila** di semua ukuran di atas L&B, tanggal, tombol musik, dan "0X / 08" tidak pernah tertutup kartu.

---

## P2: Tampilan

### 5. Bingkai hiasan ikut ter-scroll

**Gejala.** Di HP, isi kartu Undangan dan Acara lebih panjang dari kartunya. Saat digulir, garis bingkai ikut naik, dan garis bawahnya memotong teks di tengah kartu. Hal yang sama terjadi pada:
- garis perforasi kartu Balasan,
- lingkaran di sekeliling lubang label Ucapan; lubangnya tetap di tempat, tetapi lingkarannya bergeser.

**Penyebab.** Bingkai dibuat dengan `::before` di dalam `.paper`, dan `.paper` sendiri yang di-scroll, sehingga hiasan ikut bergerak bersama isi:
- `.c-invite .paper::before` (baris 177),
- `.c-details .paper::before` (baris 218),
- `.c-reply .paper::before` (baris 268),
- `.c-tag .paper::before` (baris 304).

**Perbaikan.** Pisahkan kertas dari area scroll.

1. `.paper` tidak lagi di-scroll. Ia tetap memegang latar, bentuk (mask/clip-path), dan bingkai.
2. Isi kartu dibungkus `.scroll` di dalam `.paper`. Ubah HTML di kedelapan kartu:

   ```html
   <div class="paper"><div class="scroll"><div class="in"> ... </div></div></div>
   ```

3. CSS:

   ```css
   /* .paper: ganti overflow:auto menjadi overflow:hidden; pindahkan overscroll-behavior, scrollbar-*, dan touch-action ke .scroll */
   .scroll{flex:1;min-height:0;display:flex;flex-direction:column;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;
     scrollbar-width:thin;scrollbar-color:#cfc4b3 transparent;
     /* Masuk 14px ke padding kertas supaya isi saat diam tidak bergeser, dan tepi atas/bawahnya memudar lembut */
     margin-block:-14px;padding-block:14px;
     -webkit-mask:linear-gradient(#0000,#000 14px calc(100% - 14px),#0000);mask:linear-gradient(#0000,#000 14px calc(100% - 14px),#0000)}
   ```

Dengan susunan ini, isi kartu terpotong rapi di dalam bingkai, dan bingkai, perforasi, serta lubang label tetap di tempat. Di kartu Ucapan, isi juga tidak lagi lewat di bawah pita dan charm.

Prototipe sudah dicoba di 393×659 tanpa `margin-block`/`padding-block`: bingkai tetap di tempat dan swipe dari isi kartu tetap jalan. Tambahan `margin-block`/`padding-block` belum diuji. Gunanya agar elemen pertama dan terakhir tidak ikut memudar; tanpa itu, tombol "Simpan ke kalender" tampak pudar saat kartu digulir sampai bawah.

Fungsi `enter()` memilih `.in > *` dan tidak terpengaruh. Satuan `cqw` di judul tetap mengacu ke `.paper`, karena `container-type` tetap di sana.

**Selesai bila** setiap kartu yang digulir sampai bawah tetap menampilkan bingkai, perforasi, dan lubang label di posisi semula.

### 6. Nomor rekening patah baris

**Gejala.** "0812 3456 / 7890" patah di semua ukuran HP yang dicoba. "1234 5678 / 90" patah di layar 375px ke bawah.

**Penyebab.** Nomor 22px dengan jarak huruf .08em (baris 325) berbagi baris dengan tombol Salin.

**Perbaikan.** Pindahkan tombol Salin ke baris label, sehingga nomor mendapat lebar penuh. Ganti aturan `.acct small`, `.acct b`, `.acct span`, dan `.acct .copy` (baris 324–327):

```css
.acct small{grid-row:1;align-self:center; /* font, warna, dll. seperti semula */}
.acct .copy{grid-column:2;grid-row:1}
.acct b,.acct span{grid-column:1/-1}
.acct b{white-space:nowrap;font-size:clamp(18px,6.6cqw,22px)}
.acct.addr3 b{white-space:normal}
```

Hasil uji: kedua nomor tampil satu baris di 320, 360, 375, dan 393px, juga di desktop.

**Selesai bila** nomor rekening dan dompet digital selalu satu baris, sedangkan alamat kirim kado tetap boleh terbungkus.

### 7. Kartu Tanda Kasih lebih pendek

**Gejala.** Kartu ini hanya 84% tinggi kartu lain.
- Di HP, alamat kirim kado baru terlihat setelah isi kartu digulir.
- Bagian bawah kartu Penutup di belakangnya mengintip di bawah kartu ini, lengkap dengan potongan teksnya (link "Tema lain").

**Perbaikan.** Hapus baris 320 (`.c-gift{height:...;margin-top:...}`), sehingga kartu memakai tinggi standar `.card`. Sudut terlipat dan clip-path tidak terpengaruh.

Hasil uji (bersama revisi no. 4 dan 6): tidak ada lagi teks kartu lain yang mengintip, dan dua rekening pertama terlihat tanpa menggulir di 393×659.

### 8. Instagram mempelai wanita

**Gejala.** Hanya Bima yang punya handle Instagram di kartu Mempelai, sehingga kedua kolom tidak seimbang. Truntum Terakota sudah menampilkan handle kedua mempelai.

**Perbaikan.** Perubahan untuk tema ini sudah pernah dibuat di commit `e09650d`, lalu dikembalikan di `e9200f1` supaya PR Truntum Terakota fokus. Patch-nya masih bisa diterapkan bersih:

```sh
git show e09650d -- amplop-linen/index.html | git apply
```

Isinya: link `laras.contoh` di bawah kolom Laras (baris 545), plus CSS supaya kedua handle sejajar di bawah, walau teks nama orang tua mempelai pria lebih panjang.

---

## P3: Kecil

### 9. Format tanggal tidak seragam

`stampDate` (baris 1107) mengandalkan format `id-ID` dari browser lalu mengganti `/` dengan `·`. Di Chrome hasilnya "30-10-2026", karena pemisahnya `-`, sehingga penggantian tidak terjadi. Tanggal lain di tema ini ditulis "12 · 12 · 2026". Usulan: susun tanggal secara manual.

```js
const stampDate = (t) => {
  const d = new Date(t), p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())} · ${p(d.getMonth() + 1)} · ${d.getFullYear()}`;
};
```

### 10. Fokus keyboard hilang saat pindah kartu

Panah kiri/kanan saat fokus berada di tombol di dalam kartu (misalnya Salin) memang memindah kartu. Tetapi kartu lama menjadi `inert` (baris 827), sehingga fokus jatuh ke `<body>`, dan pengguna keyboard harus menekan Tab dari awal halaman.

Usulan di `go()`: catat apakah fokus ada di kartu lama sebelum kartu itu dijadikan `inert`. Kalau ya, pindahkan fokus ke tab kartu baru.

```js
const lost = cards[from].contains(document.activeElement); // sebelum loop yang mengatur inert
// ...
if (focusTab || (lost && i !== from)) tab.focus();
```

### 11. Nama tombol "Salin"

Ketiga tombol Salin (baris 637–639) terbaca sama persis oleh pembaca layar. Tambahkan nama yang membedakan:
- `aria-label="Salin nomor rekening Bank Contoh"`,
- `aria-label="Salin nomor dompet digital"`,
- `aria-label="Salin alamat kirim kado"`.

### 12. HP landscape (opsional)

Di 740×360 halaman dibuat setinggi minimal 560px dan bisa digulir (baris 45 dan 50). Tetapi ukuran amplop dihitung dari tinggi layar (baris 61), sehingga amplop hanya sekitar 130px dan sebagian berada di bawah layar.

Pilihannya:
- hitung ukuran amplop dari tinggi halaman: ganti `var(--vh)` di `--ew` menjadi `max(var(--vh),560px)`; atau
- tampilkan ajakan memutar HP ke posisi tegak.

Prioritas rendah, karena tamu umumnya membuka undangan dengan HP tegak.

---

## Urutan pengerjaan

1. No. 3, 2, lalu 1. Perubahannya kecil, dampaknya paling besar.
2. No. 5. Setelah `.scroll` ada, pindahkan `touch-action:pan-y` dari `.paper` ke `.scroll`.
3. No. 4, 6, dan 7 sekaligus, karena ketiganya mengubah ukuran kartu dan saling memengaruhi.
4. No. 8, lalu P3 sesuai waktu.

Konsep amplop → vellum → kartu, palet, motion, dan musik tidak diubah.

## Daftar uji setelah revisi

Ukuran layar: 393×659, 375×553, 320×568, 360×640, 1280×680, 1440×900.

- [ ] Geser dari isi kartu memindah kartu, di kedelapan kartu.
- [ ] Geser pendek mengembalikan kartu ke tempatnya.
- [ ] Ketukan pertama sesudah menggeser langsung berfungsi (foto, Salin, link).
- [ ] Desktop: menyeret dengan mouse lalu melepas di atas foto tidak membuka foto.
- [ ] Desktop: klik kartu tetangga yang mengintip memindah kartu.
- [ ] RSVP: "Jumlah tamu" muncul/hilang sesuai pilihan.
- [ ] RSVP: setelah dikirim hanya "Terima kasih" yang tampil, dan perangko tertempel.
- [ ] RSVP: "Ubah jawaban" mengembalikan isian.
- [ ] Setiap kartu digulir sampai bawah: bingkai, perforasi, dan lubang label tetap di tempat.
- [ ] L&B, tanggal, tombol musik, dan "0X / 08" tidak pernah tertutup kartu.
- [ ] Nomor rekening dan dompet digital satu baris; Salin memunculkan toast.
- [ ] Instagram kedua mempelai tampil sejajar.
- [ ] Keyboard: panah kiri/kanan, Home/End di tab, fokus tidak hilang.
- [ ] Lightbox: Tab berputar di dalamnya, Esc menutup.
- [ ] `?open`, `?to=Nama%20Panjang`, `?motion=full`, dan mode reduced motion tetap jalan.
- [ ] Tidak ada error di console.
- [ ] Manual di iPhone asli (Safari): geser kartu, izin kemiringan saat segel diketuk, musik mulai saat segel dibuka.
