# Review Konsistensi 10 Tema

Hasil review 10 November 2026. Setiap tema direview satu per satu untuk dua hal:

- **Konsisten di dalam tema:** tipografi, kapitalisasi teks, bahasa, format tanggal, warna, komponen berulang, dan perilaku.
- **Konsisten antartema:** data contoh, metadata, parameter URL, dan fitur yang dijanjikan katalog di bagian "Di setiap desain".

Perbaikan yang jelas dan berisiko rendah langsung diterapkan di branch `claude/amazing-allen-7377vi`. Yang berupa keputusan desain dicatat di bawah tiap tema dan belum diubah.

## Cara uji

- Chromium (Playwright) di 360×640, 390×844, dan 1440×900, dengan dan tanpa setelan kurangi-animasi.
- Per tema: buka sampul, `?to=`, `?open`, `?motion=full`, hitung mundur, tautan kalender dan peta, RSVP, ucapan, tombol salin, lightbox, tombol musik, dan error konsol.
- Setelah semua perbaikan, setiap tema dimuat ulang di ketiga ukuran (sampul tertutup dan `?open&to=`) untuk memastikan tidak ada error konsol dan tidak ada scroll horizontal.

**Belum diuji di semua tema:** Safari dan iPhone asli, Firefox, bunyi musik (hanya status tombolnya), geser dengan jari di lightbox, sensor kemiringan HP, pembaca layar, dan sebagian besar tata letak HP mendatar.

---

## Ringkasan

| No | Tema | Diperbaiki | Catatan terbuka |
|---|---|---|---|
| 1 | Lengkung Sage | 11 | 8 |
| 2 | Parallax & Sway | 12 | 8 |
| 3 | Garis Editorial | 12 | 6 |
| 4 | Truntum Terakota | 11 | 7 |
| 5 | Edisi Monokrom | 6 | 7 |
| 6 | Amplop Linen | 6 | 9 |
| 7 | Biru Kabut | 4 | 5 |
| 8 | Riviera Kobalt | 9 | 7 |
| 9 | Kaca Patri | 10 | 7 |
| 10 | Kelopak Mimpi | 6 | 7 |

---

## Standar antartema

Mayoritas tema sudah memakai standar ini sebelum review. Tabel berikut mencatat tema yang menyimpang dan statusnya sekarang.

| Hal | Standar | Menyimpang sebelum review | Sekarang |
|---|---|---|---|
| `<title>` | `Laras & Bima · <Nama Tema>` | Parallax & Sway, Truntum Terakota (terbalik) | Sama di 10 tema |
| Meta description, `og:title` | Kalimat yang sama di semua tema | Parallax & Sway | Sama di 10 tema |
| `viewport-fit=cover` | Ada | Lengkung Sage | Sama di 10 tema |
| Instagram mempelai | Kedua mempelai, bila ditampilkan | Parallax & Sway (hanya Bima) | Diperbaiki |
| Dompet digital di amplop digital | Bank, dompet digital, alamat kirim hadiah | Lengkung Sage, Parallax & Sway, Truntum Terakota (tidak ada, padahal katalog menjanjikannya di setiap desain) | Ditambahkan di ketiganya |
| Tombol salin alamat | Ada | Lengkung Sage | Ditambahkan |
| Keterangan "Preview: data tersimpan di perangkat ini saja." | Di bawah form RSVP dan form ucapan | Lengkung Sage, Parallax & Sway, Garis Editorial, Truntum Terakota (teks berbeda) | Diperbaiki |
| "Jumlah tamu" saat tamu tidak hadir | Disembunyikan | Tidak ada logikanya: Lengkung Sage, Parallax & Sway, Truntum Terakota. Hanya diredupkan: Biru Kabut, Riviera Kobalt, Kaca Patri, Kelopak Mimpi | Disembunyikan di 10 tema |
| Lokasi di "Simpan ke kalender" | Tempat akad, karena entri dimulai pukul 09.00 | 9 tema memakai alamat resepsi; Garis Editorial hanya "Denpasar, Bali" | Nama dan alamat tempat akad di 10 tema |
| Jam acara | Mulai dan selesai ("09.00 – 10.30 WITA") | Garis Editorial (hanya jam mulai) | Diperbaiki |
| Batas RSVP | 5 Desember 2026 | Garis Editorial ("seminggu sebelum acara") | Diperbaiki |
| Pesan galat RSVP | Hilang begitu isian diperbaiki | Biru Kabut, Riviera Kobalt, Kaca Patri, Kelopak Mimpi, Edisi Monokrom (tertinggal sampai dikirim ulang) | Diperbaiki |
| `[hidden]{display:none!important}` | Ada bila atribut `hidden` dipakai | Lengkung Sage, Parallax & Sway, Truntum Terakota | Ditambahkan |
| Lightbox tertutup dengan Escape | Ya | Amplop Linen (mati setelah foto diketuk) | Diperbaiki; tema lain lulus uji |

### Perbedaan antartema yang dibiarkan

Ini perbedaan isi atau konsep, bukan kesalahan. Dicatat supaya bisa diputuskan sekali untuk semua tema.

1. **Salam.** Tujuh tema memakai "Assalamu'alaikum … Wassalamu'alaikum". Parallax & Sway dan Truntum Terakota dibuka dengan "Bismillahirrahmanirrahim"; Truntum Terakota ditutup dengan "Wassalamu'alaikum" tanpa salam pembuka, dan Parallax & Sway tanpa salam penutup. Amplop Linen sengaja netral ("Tuhan Yang Maha Esa"), tetapi ucapan contohnya bernuansa Islam.
2. **Apostrof.** Biru Kabut dan Truntum Terakota memakai ’; tema lain memakai '. Konsisten di dalam tiap tema.
3. **Bagian "Kisah Kami".** Tidak ada di Lengkung Sage, Garis Editorial, Truntum Terakota, dan Amplop Linen.
4. **Pilihan RSVP.** Dua pilihan (hadir, tidak hadir) di enam tema; tiga pilihan (ditambah "masih ragu") di Lengkung Sage, Parallax & Sway, Garis Editorial, Truntum Terakota, dan Amplop Linen. Jumlah tamu maksimal 4 atau 5. Kolom WhatsApp hanya ada di Parallax & Sway, Truntum Terakota, dan Edisi Monokrom.
5. **Batas RSVP** tidak disebut di Lengkung Sage dan Amplop Linen.
6. **Instagram** tidak ditampilkan di Lengkung Sage dan Garis Editorial. Di Parallax & Sway tautannya belum mengarah ke mana pun.
7. **Form ucapan.** Garis Editorial tidak punya form ucapan sendiri; doa ditulis di kartu balasan.
8. **Waktu ucapan.** Sebagian besar tema menulis waktu relatif ("2 jam yang lalu"); Amplop Linen menulis tanggal untuk ucapan tamu dan status hadir untuk ucapan contoh.
9. **Nama tamu panjang.** `?to=` dipotong di 60 karakter tanpa tanda, kadang di tengah kata (terlihat di Biru Kabut, Kaca Patri, Kelopak Mimpi). Usul: potong di batas kata dan beri "…".
10. **Kalender.** Semua tema membuat satu entri 09.00–21.30 WITA yang mencakup akad dan resepsi. Alternatifnya dua tombol, satu per acara.
11. **`<h1>` setelah sampul dibuka.** Di Parallax & Sway, Riviera Kobalt, dan Amplop Linen, `<h1>` hanya ada di sampul, sehingga halaman tanpa `<h1>` setelah sampul hilang.
12. **Catatan kaki.** Tujuh tema menulis nama tema, data contoh, dan font. Lengkung Sage hanya menulis soal foto AI; Garis Editorial, Parallax & Sway, Truntum Terakota, dan Amplop Linen tidak menyebut font.

---

## 1. Lengkung Sage

Font: Great Vibes, Lora, Inter (di-embed). Tombol dan judul Title Case; label form sentence case. Seluruh isi dirender JavaScript dari data di dalam file.

**Diperbaiki**

1. Meta viewport ditambah `viewport-fit=cover`; CSS-nya sudah memakai `env(safe-area-inset-*)`.
2. "Tidak hadir" sekarang menyembunyikan "Jumlah tamu" dan melewati validasinya.
3. Keterangan Preview ditambahkan di bawah form ucapan.
4. Label form ucapan disamakan dengan form RSVP, termasuk tanda wajib `*`.
5. Alamat kirim kado ditambah "a.n. Larasati Pramesti".
6. Kartu Dompet Digital ditambahkan di bawah kartu bank.
7. Tombol "Salin Alamat" ditambahkan di kartu kirim kado.
8. Lokasi kalender memakai tempat akad.
9. Nama di sampul dan judul bagian diberi peran heading; sebelumnya halaman tanpa heading sama sekali.
10. Outline fokus keyboard tombol sampul, tombol musik, dan tombol lightbox disamakan dengan tombol lain. Belum dilihat di layar.
11. Data Instagram Laras dilengkapi (tidak ditampilkan) dan komentar kode yang usang dibetulkan.

**Catatan terbuka**

1. Daftar ucapan berada di kotak scroll di dalam halaman. Di 360 dan 390 ucapan terpotong di tengah kartu, dan setelah mengirim, form ikut tergulir sehingga kolom Nama tersembunyi. Usul: biarkan daftar memanjang, atau tombol "Tampilkan lebih banyak" seperti tema lain.
2. Di desktop ada banyak ukuran huruf yang berdekatan (Inter 11 sampai 16 px dalam sembilan tingkat), karena ukuran per elemen dikalikan skala kanvas.
3. Warna yang nyaris kembar di luar variabel tema: `#6c685e` dan `#6f6b60`, `#5d6c53` dan `#5f6f55`, `#c9b288` dan `#c2a878`. Radius kartu 18 dan 20.
4. Tombol tidak punya gaya hover.
5. Eyebrow "RSVP" satu-satunya yang berbahasa Inggris, dan "— KAMI BERDUA —" satu-satunya yang memakai tanda pisah.
6. Nama lengkap mempelai tidak ditampilkan di bagian Mempelai (hanya nama panggilan dan orang tua).
7. Catatan kaki tidak menyebut nama tema dan font.
8. Semua foto ber-`alt` kosong; nama untuk pembaca layar ada di pembungkusnya.

---

## 2. Parallax & Sway

Font: Pinyon Script, Cormorant Garamond, Jost. Eyebrow berbahasa Inggris di atas judul berbahasa Indonesia; tombol Title Case.

**Diperbaiki**

1. `<title>` dibalik menjadi "Laras & Bima · Parallax & Sway".
2. Meta description ditambah ", Bali"; `og:title` disamakan dengan tema lain.
3. Instagram Laras ditambahkan dengan gaya yang sama dengan milik Bima.
4. Eyebrow "Mempelai" dan "Terima Kasih" diganti "Bride & Groom" dan "Thank You", supaya pola eyebrow berbahasa Inggris berlaku di semua bagian.
5. Keterangan Preview ditambahkan di bawah form ucapan.
6. "Tidak hadir" sekarang menyembunyikan "Jumlah tamu".
7. Nama kosong di RSVP sekarang memunculkan pesan di bawah kolom, sama dengan form ucapan; sebelumnya toast. Fokus pindah ke kolom yang kosong di kedua form.
8. Kartu Dompet Digital ditambahkan di bawah kartu bank.
9. Lokasi kalender memakai tempat akad.
10. "SABTU, 12 DESEMBER 2026" dan "BANK CONTOH" ditulis biasa di HTML dan dikapitalkan lewat CSS, seperti teks kapital lain di tema ini. Tampilan tidak berubah.
11. Aturan `[hidden]` ditambahkan.
12. Toast dan blok terima kasih diberi `aria-live`; pesan galat diberi `role="alert"`.

**Catatan terbuka**

1. Judul "Doa & Ucapan": huruf awal bergaya script menempel pada "&" di 360, terbaca "Doa &Ucapan".
2. Skala huruf terlalu rapat: Jost 11 sampai 16 px dan Cormorant 16 sampai 26 px, masing-masing enam sampai delapan tingkat. Jarak huruf teks kapital punya enam nilai.
3. Tombol tidak punya gaya `:focus-visible` sendiri; foto dan pilihan RSVP punya.
4. Warna di luar token: `#fffaf2`, `#fffdf8`, `#b0413e`, `#8f89a6`, dan dua warna inline.
5. Setelah halaman dimuat ulang, "Ubah Jawaban" membuka form kosong, bukan jawaban tersimpan. Dari membaca kode.
6. Kartu bank menulis "a.n. Larasati Pramesti", kartu kado menulis "(a.n. Larasati Pramesti)" dalam kurung.
7. Kartu acara menulis tanggal bertumpuk dan jam berawalan "Pukul"; sampul memakai "12 · 12 · 2026". Tampak disengaja.
8. Penutup tanpa salam penutup.

---

## 3. Garis Editorial

Font: Allura, Cormorant Garamond, Nunito Sans (di-embed). Sentence case di semua tombol, judul, dan label.

**Diperbaiki**

1. Penghitung galeri "01 / 06" turun sekitar 11 px dari tengah tombol panah; sekarang sejajar.
2. Jam acara menampilkan jam selesai: "09.00 – 10.30 WITA" dan "19.00 – 21.30 WITA".
3. Batas RSVP menjadi "5 Desember 2026".
4. Keterangan Preview ditambahkan di bawah kartu balasan.
5. Kalender: keterangan memuat kedua rentang jam dan alamat lengkap; lokasi memakai tempat akad.
6. Kalimat setelah balasan terkirim mengikuti jawaban. Sebelumnya tamu yang berhalangan tetap membaca "Sampai jumpa di hari bahagia."
7. Ukuran huruf tombol memakai token `--fs-body` (17 px); sebelumnya 16 px, satu-satunya ukuran di luar skala.
8. Cincin fokus keyboard seragam di tombol salin, segel amplop, tombol musik, tombol lightbox, dan "Ubah jawaban"; di atas kertas terang warnanya tinta supaya terlihat.
9. "Salin alamat" diberi hover yang sama dengan "Salin".
10. Pesan galat nama diberi `role="alert"`.
11. `<h1>` tersembunyi ditambahkan untuk pembaca layar.
12. Komentar kode yang usang dibetulkan.

**Catatan terbuka**

1. `alt` foto galeri hanya keterangan puitis ("Awal cerita"), dan terbaca dua kali karena tombolnya berlabel sama.
2. Beberapa ukuran angka dan judul di luar token: 26, 28, 30, 40, dan 24/27 px.
3. Warna berulang tanpa token: `#88691e`, `#26325a`, `#070a12`; `#1a2440` sama dengan `--navy`.
4. Kalimat "bersama [2] orang" ambigu: total atau tambahan.
5. Pesan "balasan sudah kami terima" tidak diumumkan pembaca layar.
6. Fokus tidak pindah ke isi setelah sampul dibuka, karena `<main>` tanpa `tabindex`.

---

## 4. Truntum Terakota

Font: Fraunces, Manrope. Eyebrow, label, dan tombol kapital lewat CSS; judul Title Case.

**Diperbaiki**

1. `<title>` dibalik menjadi "Laras & Bima · Truntum Terakota".
2. Eyebrow berbahasa Inggris diganti: "Save the Date" menjadi "Simpan Tanggalnya", "RSVP" menjadi "Kabari Kami". Semua eyebrow sekarang berbahasa Indonesia.
3. Keterangan form ucapan disamakan menjadi "Preview: data tersimpan di perangkat ini saja."
4. "Tidak hadir" sekarang menyembunyikan "Jumlah tamu".
5. Nama kosong di RSVP sekarang memunculkan pesan di bawah kolom, sama dengan form ucapan; sebelumnya toast.
6. Kartu Dompet Digital ditambahkan di bawah kartu bank.
7. Lokasi kalender memakai tempat akad.
8. Judul kartu "Terima kasih" menjadi "Terima Kasih", seperti judul kartu lain.
9. Tiga ukuran huruf yang nyaris kembar disatukan dengan tetangganya (14 ke 14,5; 15 ke 15,5; 12,5 ke 12 px).
10. Aturan `[hidden]` ditambahkan.
11. Toast diberi `aria-live`.

**Catatan terbuka**

1. Format tanggal bervariasi: sampul "Sabtu · 12 Desember 2026", panel desktop "12 · 12 · 2026 · Denpasar", kartu acara "Des 2026" (disingkat), jam berawalan "Pukul".
2. Skala Manrope masih rapat: 11, 12, 13, 13,5, 14,5, 15,5, 16 px. Jarak huruf teks kapital punya enam nilai.
3. Warna di luar token: `#8f412a`, `#93442b`, `#9b2c1c`, `#6e3a28cc`.
4. Di desktop, footer punya ruang kosong 92 px yang disiapkan untuk tombol musik, padahal tombolnya pindah ke panel kiri.
5. Radius kartu bank 14 px, sedangkan tombol 2 px dan pilihan RSVP 0. Tampak disengaja.
6. Eyebrow "Kabari Kami" adalah pilihan saat review; ganti bila ada istilah yang lebih disukai.
7. Dibuka dengan "Bismillahirrahmanirrahim" dan ditutup "Wassalamu’alaikum" tanpa salam pembuka.

---

## 5. Edisi Monokrom

Font: Bodoni Moda, Plus Jakarta Sans. Sentence case di semua judul, tombol, dan label; tombol, eyebrow, dan label dikapitalkan lewat CSS.

**Diperbaiki**

1. Di desktop, lookbook rusak saat dinavigasi dengan Tab: fokus ke foto di luar layar melempar judul lookbook dan garis progres keluar layar, dan keadaan itu menetap. Sekarang halaman menggulir sampai foto yang difokus berada di tengah. Diuji di 1440×900.
2. Posisi gulir meleset setelah lightbox ditutup: di 390 halaman pindah sekitar 400 sampai 500 px sampai strip foto keluar layar, di 1440 sekitar 300 sampai 640 px. Sekarang posisi sebelum dan sesudah sama, lewat tombol tutup, Escape, klik luar, dan tombol Back.
3. "Berhalangan" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan. Di desktop kolom WhatsApp mengisi baris penuh.
4. "Buka Undangan" menjadi "Buka undangan", seperti tombol lain di tema ini.
5. Pesan galat RSVP hilang begitu isian diperbaiki.
6. Lokasi kalender memakai tempat akad.

**Catatan terbuka**

1. Jarak huruf label kapital punya sekitar sepuluh nilai (.14em sampai .42em); eyebrow bagian sendiri seragam.
2. Serif miring kecil rapat: 17, 18, 18,6, 19, 20, 22, 24 px. Isi sans: 13 sampai 17 px.
3. Warna di luar token: `#b5ada3`, `#faf8f4`, `#8a8178`, `#8c2f22`, dan garis input `rgba(21,19,17,.35)` yang berbeda dari `--line`.
4. Tanggal angka dua gaya: "12 · 12 · 2026" di kartu judul pembuka dan "12.12.2026" di kaki halaman.
5. Petunjuk lookbook "Ketuk foto…" juga tampil di desktop.
6. Cincin fokus tombol musik nyaris tak terlihat saat tombol berada di atas bagian hitam. Dari membaca kode.
7. Catatan kaki lebih panjang dari tema lain ("dibuat dengan AI (Gemini), bukan foto mempelai sebenarnya").

Perbaikan nomor 1 dan 2 hanya diuji di Chromium; perlu dicek di Safari.

---

## 6. Amplop Linen

Font: Parisienne, EB Garamond, Marcellus. Judul kartu sentence case dengan kata kedua miring; eyebrow, tombol, dan tab kapital lewat CSS. Dua belas poin review 30 Oktober ada di [`REVISI-AMPLOP-LINEN.md`](REVISI-AMPLOP-LINEN.md) dan tidak diulang di sini.

**Diperbaiki**

1. Setelah foto diketuk, Escape dan panah kiri/kanan tidak berfungsi di lightbox, karena fokus pindah keluar dari lightbox. Sekarang berfungsi.
2. Keterangan Preview setelah RSVP terkirim tampil 17 px tegak dan menempel ke tombol; sekarang sama dengan yang di bawah form.
3. "akan hadir bersama 1 orang" terbaca sebagai dua orang; menjadi "akan hadir, 1 orang".
4. Cincin fokus tab terpotong atas dan bawah; sekarang utuh.
5. Judul "Rangkaian Acara" menjadi "Rangkaian acara", seperti enam judul kartu lain.
6. Lokasi kalender memakai tempat akad.

**Catatan terbuka**

1. Jarak huruf eyebrow punya sekitar sepuluh nilai (.14em sampai .34em). Usul: tiga tingkat.
2. Ukuran huruf isi rapat (11 sampai 18 px, delapan tingkat). Judul kartu ter-render 28,0, 28,3, dan 29,0 px antarkartu.
3. Hampir tidak ada gaya hover; hanya foto dan segel yang punya.
4. Nama kartu di penghitung dan tab ("Tanda Kasih", "Doa Tamu") berbeda dari judul kartunya ("Tanda kasih", "Kiriman doa") dan dari eyebrow "Buku ucapan".
5. Ucapan contoh berlabel "Hadir" atau "Berhalangan"; ucapan tamu sendiri berlabel tanggal.
6. Di kartu Mempelai lebar 390, "Bima Arya Nugraha" turun dua baris sedangkan "Larasati Pramesti" satu baris, sehingga baris orang tua tidak sejajar.
7. Panah lightbox di HP menumpuk di atas foto dengan kontras rendah.
8. Di 1440, area kartu bisa tergeser 110 px ke kiri lewat skrip. Tidak terjadi dengan mouse, keyboard, atau sentuhan, tetapi belum diuji dengan keyboard HP sungguhan.
9. Ejaan "ridho" tidak baku (KBBI: rida atau rido). Dipakai juga di tema lain.

---

## 7. Biru Kabut

Font: Gilda Display, Corinthia, Figtree. Judul, eyebrow, dan tombol Title Case; label form sentence case. Perbaikan dari review sebelumnya (commit `9657be6`) utuh.

**Diperbaiki**

1. "Tidak hadir" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan.
2. Tanggal sampul "Sabtu · 12 Desember 2026" menjadi "Sabtu, 12 Desember 2026", seperti bagian lain.
3. Pesan galat RSVP hilang begitu isian diperbaiki.
4. Lokasi kalender memakai tempat akad.

**Catatan terbuka**

1. Ukuran Gilda yang nyaris sama: 32 dan 34 px di HP; 34, 38, dan 40 px di desktop.
2. Tanda baca toast tidak seragam: "Nomor rekening disalin" tanpa titik, "Ucapan terkirim. Terima kasih!" dengan tanda baca.
3. Daftar ucapan ber-`aria-live` tetapi dirender ulang seluruhnya tiap kirim, sehingga pembaca layar bisa membacakan semua ucapan.
4. Di sampul 1440, tanggal menempel di bawah eyebrow dan nama besar terpisah di bawahnya. Tampak disengaja.
5. Nama tamu 63 karakter terpotong di tengah kata di sampul 360.

---

## 8. Riviera Kobalt

Font: DM Serif Display, Yellowtail, DM Sans. Eyebrow dan tombol Title Case di sumber, kapital lewat CSS.

**Diperbaiki**

1. Lightbox tidak tertutup saat latar gelap diketuk; sekarang tertutup, dan geseran tidak dihitung sebagai ketukan.
2. Cincin fokus tombol lightbox nyaris tak terlihat (kobalt di atas biru tua); sekarang putih.
3. "Tampilkan lebih banyak" menjadi "Tampilkan Lebih Banyak", seperti tombol lain.
4. Eyebrow penutup "Kami yang berbahagia" menjadi "Kami yang Berbahagia".
5. Tanggal kartu menu "Sabtu · 12 Desember 2026" menjadi "Sabtu, 12 Desember 2026".
6. Jarak huruf tiga eyebrow (.22em dan .26em) disamakan ke .24em.
7. "Berhalangan" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan.
8. Pesan galat RSVP hilang begitu isian diperbaiki.
9. Lokasi kalender memakai tempat akad.

**Catatan terbuka**

1. Penutup tidak punya baris "Laras & Bima · 12.12.2026" seperti tema yang sejenis.
2. Ukuran berdekatan: 19 dan 20 px; label hitung mundur 11 px sedangkan eyebrow lain 12 px.
3. Warna di luar token: `#e7ecf8`, `#cfd6e8`, `#fbfaf6`, `#a3291a`. Variabel `--grout` dipakai tetapi tidak pernah didefinisikan.
4. CSS yang tidak terpakai: `.hd.left`; `<div class="row">` tanpa gaya.
5. Panah lightbox di 390 menimpa tepi foto dan agak samar.
6. Jarak huruf label form, tautan, dan tombol masih berbeda-beda (.10em sampai .22em).
7. Halaman tanpa `<h1>` setelah sampul dibuka.

---

## 9. Kaca Patri

Font: Playfair Display, Spectral. Eyebrow, tombol, dan label kapital lewat CSS; teks sumber Title Case. Perbaikan dari review sebelumnya (commit `969283f`) utuh.

**Diperbaiki**

1. Teks tombol seragam: "Ubah jawaban" dan "Tampilkan lebih banyak" menjadi Title Case seperti tombol lain. Begitu juga eyebrow "Kami yang Berbahagia", label "Jumlah Tamu", dan judul "Terima Kasih".
2. Eyebrow penutup tampil cokelat, bukan merah beri seperti eyebrow lain; sekarang sama.
3. Tanda "&" menggantung di ujung baris pada nama orang tua ("Bapak Arif Hidayat & / Ibu Siti Aminah"); sekarang baris selalu pecah sebelum "& Ibu". Diuji di 320, 360, 390, dan 1440.
4. "Berhalangan" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan.
5. Keterangan Preview hilang setelah RSVP terkirim; sekarang ada juga di blok terima kasih.
6. Pesan galat RSVP hilang begitu isian diperbaiki.
7. Lokasi kalender memakai tempat akad.
8. Warna pesan galat memakai token `--berry` (nilai sama).
9. Judul salam tanpa spasi di antara dua barisnya ("Assalamu'alaikumWarahmatullahi" bagi pembaca layar); spasi ditambahkan.
10. Aturan redup yang tidak lagi terpakai dihapus.

**Catatan terbuka**

1. Musik lambat mulai tanpa umpan balik. Musik dirender di browser; di mesin uji butuh sekitar 9 detik dari ketukan sampai berbunyi, dan tombolnya tidak berubah selama itu. Di HP nyata belum diukur. Usul: keadaan "memuat" pada tombol musik. Tema lain yang merender musik dengan cara sama mungkin terkena juga.
2. Penutup di 390 tidak simetris: keluarga pertama satu baris, keluarga kedua dua baris.
3. Format tanggal angka berbeda: kaki halaman "12.12.2026", bagian tanggal "12 · 12 · 2026".
4. Tombol "Lewati sampul" (muncul saat fokus keyboard) bergaya beda dari tombol lain.
5. Warna yang sama dengan token tetapi ditulis langsung: `#f5efe4`, `#3a2414`, dan warna ubin hitung mundur.
6. Sepuluh ukuran Playfair. Ini hasil sengaja review sebelumnya.
7. Nama tamu 70 karakter terpotong di tengah kata.

---

## 10. Kelopak Mimpi

Font: Italiana, Urbanist, Ephesis. Eyebrow, tombol, dan label kapital lewat CSS; teks sumber Title Case.

**Diperbaiki**

1. Teks tombol dan eyebrow seragam: "Ubah Jawaban", "Tampilkan Lebih Banyak", "Kami yang Berbahagia".
2. Pada setelan kurangi-animasi, "Buka Undangan" tetap meminta izin sensor gerak di iPhone. Sekarang izin hanya diminta bila animasi aktif. Diuji dengan tiruan, bukan iPhone asli.
3. Label "Kehadiran" menjorok 2 px dibanding label lain; sekarang sejajar.
4. "Berhalangan" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan.
5. Pesan galat RSVP hilang begitu isian diperbaiki.
6. Lokasi kalender memakai tempat akad.

**Catatan terbuka**

1. Eyebrow dan judul amplop terbalik dibanding tema sejenis: di sini eyebrow "Amplop Digital" dan judul "Tanda Kasih".
2. Jarak huruf label kapital punya lima nilai (.18em sampai .32em).
3. Ukuran teks kecil rapat: 11, 12, 13, 14, 15 px, lalu 17 px untuk isi.
4. Warna di luar token: garis input `#dcc9cf` dan garis pilihan `#cdb8bf` (bersebelahan, beda tipis), `#f3e5ea`, `#9b2c45`, `#fffdf9`.
5. Selector yang tidak pernah aktif: `html.calm:not(.force) .music.on::before`.
6. Penghitung ucapan sesaat memuat angka lama dan baru sekaligus selama animasi, sehingga pembaca layar bisa membaca keliru.
7. Nama tamu 71 karakter terpotong di tengah kata di sampul 360.
