# Review Konsistensi 10 Tema

Hasil review 10 November 2026, diperbarui 12 November 2026 setelah catatan terbuka dikerjakan (putaran kedua). Setiap tema direview satu per satu untuk dua hal:

- **Konsisten di dalam tema:** tipografi, kapitalisasi teks, bahasa, format tanggal, warna, komponen berulang, dan perilaku.
- **Konsisten antartema:** data contoh, metadata, parameter URL, dan fitur yang dijanjikan katalog di bagian "Di setiap desain".

Perbaikan yang jelas dan berisiko rendah langsung diterapkan di branch `claude/amazing-allen-7377vi`. Pada putaran kedua, catatan terbuka yang punya perbaikan jelas dikerjakan. Yang tersisa di "Catatan terbuka" adalah keputusan isi, hal yang tampak disengaja, dan temuan baru.

## Cara uji

- Chromium (Playwright) di 360×640, 390×844, dan 1440×900, dengan dan tanpa setelan kurangi-animasi.
- Per tema: buka sampul, `?to=`, `?open`, `?motion=full`, hitung mundur, tautan kalender dan peta, RSVP, ucapan, tombol salin, lightbox, tombol musik, dan error konsol.
- Setelah semua perbaikan, setiap tema dimuat ulang di ketiga ukuran (sampul tertutup dan `?open&to=`) untuk memastikan tidak ada error konsol dan tidak ada scroll horizontal.

Putaran kedua diuji dengan cara yang sama, per tema, dengan pembanding versi sebelum perubahan. Setelah semuanya selesai, kesepuluh tema dimuat ulang di ketiga ukuran (sampul tertutup, `?open&to=` nama pendek, dan nama 89 karakter): tidak ada error konsol dan tidak ada scroll horizontal.

**Belum diuji di semua tema:** Safari dan iPhone asli, Firefox, bunyi musik (hanya status tombolnya), geser dengan jari di lightbox, sensor kemiringan HP, pembaca layar, dan sebagian besar tata letak HP mendatar.

---

## Ringkasan

| No | Tema | Diperbaiki | Catatan terbuka |
|---|---|---|---|
| 1 | Lengkung Sage | 21 | 1 |
| 2 | Parallax & Sway | 20 | 2 |
| 3 | Garis Editorial | 20 | 0 |
| 4 | Truntum Terakota | 17 | 3 |
| 5 | Edisi Monokrom | 14 | 1 |
| 6 | Amplop Linen | 16 | 2 |
| 7 | Biru Kabut | 9 | 2 |
| 8 | Riviera Kobalt | 18 | 0 |
| 9 | Kaca Patri | 16 | 2 |
| 10 | Kelopak Mimpi | 16 | 0 |

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
| "Jumlah tamu" saat tamu tidak hadir | Disembunyikan | Tidak ada logikanya: Lengkung Sage, Parallax & Sway, Truntum Terakota. Hanya diredupkan: Edisi Monokrom, Biru Kabut, Riviera Kobalt, Kaca Patri, Kelopak Mimpi | Disembunyikan di 10 tema |
| Lokasi di "Simpan ke kalender" | Tempat akad, karena entri dimulai pukul 09.00 | 9 tema memakai alamat resepsi; Garis Editorial hanya "Denpasar, Bali" | Nama dan alamat tempat akad di 10 tema |
| Jam acara | Mulai dan selesai ("09.00 – 10.30 WITA") | Garis Editorial (hanya jam mulai) | Diperbaiki |
| Batas RSVP | 5 Desember 2026 | Garis Editorial ("seminggu sebelum acara") | Diperbaiki |
| Pesan galat RSVP | Hilang begitu isian diperbaiki | Biru Kabut, Riviera Kobalt, Kaca Patri, Kelopak Mimpi, Edisi Monokrom (tertinggal sampai dikirim ulang) | Diperbaiki |
| `[hidden]{display:none!important}` | Ada bila atribut `hidden` dipakai | Lengkung Sage, Parallax & Sway, Truntum Terakota | Ditambahkan |
| Lightbox tertutup dengan Escape | Ya | Amplop Linen (mati setelah foto diketuk) | Diperbaiki; tema lain lulus uji |
| Nama tamu `?to=` yang panjang | Dipotong di batas kata, maksimal 60 karakter termasuk "…" | 10 tema (dipotong mentah di 60 karakter, kadang di tengah kata) | Sama di 10 tema |
| Isian nama di form dari `?to=` | Nama utuh tanpa "…" (sebatas panjang maksimal isian) | 8 tema (memakai nama yang sudah dipotong) | Sama di 10 tema |
| Tombol musik saat musik belum siap | Keadaan "memuat" | 10 tema (tanpa umpan balik; jeda 2 sampai 10 detik di mesin uji) | Sama di 10 tema |

### Perbedaan antartema yang dibiarkan

Ini perbedaan isi atau konsep, bukan kesalahan. Dicatat supaya bisa diputuskan sekali untuk semua tema.

1. **Salam.** Enam tema memakai "Assalamu'alaikum … Wassalamu'alaikum". Parallax & Sway dan Truntum Terakota dibuka dengan "Bismillahirrahmanirrahim"; Truntum Terakota ditutup dengan "Wassalamu'alaikum" tanpa salam pembuka, dan Parallax & Sway tanpa salam penutup. Lengkung Sage dan Amplop Linen netral ("Tuhan Yang Maha Esa") tanpa salam; di Amplop Linen ini disengaja, tetapi ucapan contohnya bernuansa Islam.
2. **Apostrof.** Biru Kabut dan Truntum Terakota memakai ’; tema lain memakai '. Konsisten di dalam tiap tema.
3. **Bagian "Kisah Kami".** Tidak ada di Lengkung Sage, Garis Editorial, Truntum Terakota, dan Amplop Linen.
4. **Pilihan RSVP.** Dua pilihan (hadir, tidak hadir) di lima tema; tiga pilihan (ditambah "masih ragu") di Lengkung Sage, Parallax & Sway, Garis Editorial, Truntum Terakota, dan Amplop Linen. Jumlah tamu maksimal 4 atau 5. Kolom WhatsApp hanya ada di Lengkung Sage, Parallax & Sway, Truntum Terakota, dan Edisi Monokrom.
5. **Batas RSVP** tidak disebut di Lengkung Sage dan Amplop Linen.
6. **Instagram** tidak ditampilkan di Lengkung Sage dan Garis Editorial. Di Parallax & Sway tautannya belum mengarah ke mana pun.
7. **Form ucapan.** Garis Editorial tidak punya form ucapan sendiri; doa ditulis di kartu balasan.
8. **Waktu ucapan.** Sebagian besar tema menulis waktu relatif ("2 jam yang lalu"); Amplop Linen menulis tanggal.
9. **Kalender.** Semua tema membuat satu entri 09.00–21.30 WITA yang mencakup akad dan resepsi. Alternatifnya dua tombol, satu per acara.
10. **`<h1>` setelah sampul dibuka.** Di Parallax & Sway dan Amplop Linen, `<h1>` hanya ada di sampul, sehingga halaman tanpa `<h1>` setelah sampul hilang.
11. **Catatan kaki.** Enam tema menulis nama tema, data contoh, dan font. Garis Editorial, Parallax & Sway, Truntum Terakota, dan Amplop Linen tidak menyebut font.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Daftar ucapan tidak lagi berada di kotak scroll: daftar memanjang, tampil lima-lima dengan tombol "Tampilkan lebih banyak", dan form tidak ikut tergulir setelah mengirim.
2. Ukuran Inter di desktop turun dari sepuluh tingkat menjadi lima (11,8 sampai 16 px). Ukuran di HP tidak berubah.
3. Warna kembar disatukan (`#6f6b60` ke `#6c685e`, `#5f6f55` ke `#5d6c53`), warna solid dijadikan token, dan radius kartu disamakan ke 18.
4. Tombol diberi gaya hover. Hanya diukur, belum dilihat di layar.
5. Eyebrow "RSVP" menjadi "KABARI KAMI" dan "— KAMI BERDUA —" menjadi "KAMI BERDUA". "Kabari Kami" adalah pilihan saat review; ganti bila ada istilah yang lebih disukai.
6. Nama lengkap mempelai tampil di bawah nama panggilan.
7. Catatan kaki menyebut nama tema, data contoh, dan font, seperti tema lain.
8. Foto diberi `alt` ("Foto Laras & Bima", "Foto: Awal cerita", dan seterusnya), termasuk di lightbox.
9. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
10. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji musik baru siap sekitar 4 detik setelah halaman dimuat.

**Catatan terbuka**

1. `#c9b288` dan `#c2a878` tidak disatukan: `#c9b288` dipakai untuk teks kecil di atas hijau tua, dan menggantinya menurunkan kontras dari 4,53 ke 4,07.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Judul "Doa & Ucapan": kata bergaya script diberi jarak, tidak lagi menempel pada "&" di 360.
2. Skala huruf dirapikan: Jost dari enam tingkat menjadi tiga (12, 14, 16 px), Cormorant 16 sampai 26 px dari delapan menjadi enam, jarak huruf teks kapital dari enam nilai menjadi empat. Teks linimasa tetap 16 px, karena di 17 px paragrafnya bertambah satu baris di 360.
3. Tombol, tombol musik, tombol lightbox, dan tautan Instagram diberi cincin fokus keyboard. Belum dilihat di layar.
4. Warna di luar token dijadikan token (`--surface`, `--error`, `--on-ink`); `#fffdf8` disatukan ke `--surface`; dua warna inline dipindah ke CSS.
5. "Ubah Jawaban" setelah halaman dimuat ulang sekarang membuka form berisi jawaban tersimpan. Bug-nya terbukti di browser: sebelumnya form terbuka kosong.
6. Kartu kado menulis "a.n. Larasati Pramesti" tanpa kurung, sama dengan kartu bank.
7. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
8. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji jedanya 3 sampai 10 detik.

**Catatan terbuka**

1. Kartu acara menulis tanggal bertumpuk dan jam berawalan "Pukul"; sampul memakai "12 · 12 · 2026". Tampak disengaja.
2. Penutup tanpa salam penutup. Keputusan isi.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. `alt` keenam foto galeri menjelaskan isi foto; keterangan puitis tetap tampil sebagai teks, dan masing-masing terbaca sekali.
2. Ukuran huruf di luar skala dijadikan token; 26, 27, dan 28 px disatukan ke 27 px.
3. Warna berulang dijadikan token (`--gold-deep`, `--navy-3`, `--film`, `--veil`); `#1a2440` memakai `--navy`.
4. Kalimat balasan menjadi "akan hadir, total [2] orang", sehingga jelas jumlah seluruhnya.
5. Pesan "balasan sudah kami terima" diumumkan pembaca layar lewat wilayah live, dan fokus pindah ke "Ubah jawaban".
6. Fokus pindah ke isi setelah sampul dibuka, termasuk pada setelan kurangi-animasi.
7. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh. Nama tanpa spasi tidak lagi meluber keluar sampul.
8. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji musik baru siap sekitar 2,5 detik setelah halaman dimuat.

**Catatan terbuka**

Tidak ada.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Format tanggal: sampul menjadi "Sabtu, 12 Desember 2026" dan kartu acara menulis "Desember 2026". Di layar di bawah 460 px bulan dan tahun ditulis dua baris, karena tidak muat satu baris.
2. Skala Manrope dari tujuh tingkat menjadi lima (11, 12, 13, 14,5, 16 px); jarak huruf teks kapital dari enam nilai menjadi lima.
3. Warna di luar token dijadikan token (`--tera-glow`, `--err`, `--brown-2-soft`); `#93442b` disatukan ke `--tera-glow`.
4. Ruang kosong footer di desktop dibuang (tinggi footer 160 menjadi 94 px). Di HP tetap, karena tombol musik menumpang di sana.
5. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
6. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji musik baru siap sekitar 6 detik setelah halaman dimuat.

**Catatan terbuka**

1. Radius kartu bank 14 px, sedangkan tombol 2 px dan pilihan RSVP 0. Tampak disengaja.
2. Eyebrow "Kabari Kami" adalah pilihan saat review; ganti bila ada istilah yang lebih disukai.
3. Dibuka dengan "Bismillahirrahmanirrahim" dan ditutup "Wassalamu’alaikum" tanpa salam pembuka. Keputusan isi.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Jarak huruf label kapital dari delapan nilai menjadi lima.
2. Skala huruf: serif miring kecil menjadi 18, 20, 22, 24 px; isi sans menjadi 13, 15, 16 px.
3. Warna di luar token dijadikan token (`--grey-night`, `--card`, `--hint`, `--err`, `--line-2`).
4. Tanggal angka satu gaya: kaki halaman menjadi "12 · 12 · 2026".
5. Petunjuk lookbook berbunyi "Klik foto…" di perangkat bermouse dan "Ketuk foto…" di layar sentuh.
6. Cincin fokus tombol musik dibuat dua nada, sehingga terlihat di atas bagian hitam maupun kertas. Terbukti di layar: cincin lama nyaris tak terlihat.
7. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
8. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji musik baru siap sekitar 2 detik setelah halaman dimuat.

**Catatan terbuka**

1. Catatan kaki lebih panjang dari tema lain ("dibuat dengan AI (Gemini), bukan foto mempelai sebenarnya"). Keputusan isi.

Perbaikan lookbook dan posisi gulir dari putaran pertama diuji ulang dan tetap utuh, tetapi hanya di Chromium; perlu dicek di Safari.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Jarak huruf eyebrow dari sepuluh nilai menjadi tiga tingkat (.16em, .2em, .3em).
2. Ukuran huruf isi dari delapan tingkat menjadi empat (11, 13, 15, 17 px); judul kartu sekarang sama besar di semua kartu. Akibatnya di 360×640 tiga kartu perlu digulir 4 sampai 10 px lebih jauh.
3. Tombol, tautan, tab, dan pilihan diberi gaya hover. Sebagian besar hanya dari membaca kode.
4. Nama kartu di tab dan penghitung disamakan dengan judulnya: "Kiriman doa" dan "Tanda kasih".
5. Ucapan contoh berlabel tanggal, sama dengan ucapan tamu.
6. Kedua kolom mempelai memakai baris yang sama, sehingga nama orang tua sejajar di 390.
7. Di layar tegak, panah lightbox pindah ke bawah keterangan foto dan tidak lagi menimpa foto.
8. Area kartu tidak bisa lagi tergeser di 1440. Penyebabnya kontainer `overflow:hidden` yang masih bisa digulir lewat skrip atau fokus; sekarang `overflow:clip`.
9. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
10. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji musik baru siap sekitar 2 detik setelah halaman dimuat.

**Catatan terbuka**

1. Ejaan "ridho" tidak baku (KBBI: rida atau rido). Dipakai juga di tema lain. Keputusan isi.
2. Tab lain masih berlabel pendek yang berbeda dari judul kartunya ("Acara" untuk "Rangkaian acara", "Mempelai" untuk "Kami berdua", dan seterusnya). Judul penuh akan membuat deretan tab jauh lebih panjang.

---

## 7. Biru Kabut

Font: Gilda Display, Corinthia, Figtree. Judul, eyebrow, dan tombol Title Case; label form sentence case. Perbaikan dari review sebelumnya (commit `9657be6`) utuh.

**Diperbaiki**

1. "Tidak hadir" sekarang menyembunyikan "Jumlah tamu"; sebelumnya hanya diredupkan.
2. Tanggal sampul "Sabtu · 12 Desember 2026" menjadi "Sabtu, 12 Desember 2026", seperti bagian lain.
3. Pesan galat RSVP hilang begitu isian diperbaiki.
4. Lokasi kalender memakai tempat akad.

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Ukuran Gilda disatukan: 32 ke 34 px di HP, 38 ke 40 px di desktop. Angka hitung mundur desktop tetap 34 px.
2. Toast salin diberi titik ("Nomor rekening disalin."), seragam dengan toast lain.
3. Daftar ucapan tidak lagi ber-`aria-live`; hanya ucapan baru yang diumumkan, lewat wilayah live terpisah.
4. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
5. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji jedanya 3 sampai 4 detik. Ketukan kedua saat memuat sekarang membatalkan.

**Catatan terbuka**

1. Di sampul 1440, tanggal menempel di bawah eyebrow dan nama besar terpisah di bawahnya. Tampak disengaja.
2. Temuan baru: di 390×844, tombol musik yang mengambang bisa menutupi pilihan "Tidak hadir" pada posisi gulir tertentu. Perilaku lama; hilang begitu halaman digulir sedikit.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Kaki halaman dibuka dengan baris "Laras & Bima · 12.12.2026", seperti tema sejenis.
2. Ukuran berdekatan disatukan: nama tempat 19 ke 20 px, label hitung mundur 11 ke 12 px.
3. Warna di luar token dijadikan token; `--grout` sekarang didefinisikan dengan nilai yang selama ini ter-render.
4. CSS yang tidak terpakai (`.hd.left`) dan pembungkus `<div class="row">` dibuang.
5. Di layar di bawah 700 px, panah lightbox pindah ke baris keterangan dan tidak lagi menimpa foto.
6. Jarak huruf label form, tautan, dan label hitung mundur dirapikan ke tingkat terdekat.
7. `<h1>` tersembunyi ditambahkan, sehingga halaman tetap punya `<h1>` setelah sampul dibuka.
8. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
9. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji jedanya sampai 5 detik. Ketukan kedua saat memuat sekarang membatalkan. Toast salin diberi titik.

**Catatan terbuka**

Tidak ada.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji jedanya 9 sampai 10 detik. Ketukan kedua saat memuat sekarang benar-benar membatalkan; sebelumnya musik tetap berbunyi beberapa detik kemudian.
2. Di bawah 420 px, kedua baris keluarga di penutup sama-sama pecah sebelum "& Ibu", sehingga simetris di 390.
3. Tanggal angka satu gaya: kaki halaman menjadi "12 · 12 · 2026".
4. Tombol "Lewati sampul" memakai gaya tombol kecil tema.
5. Warna yang sama dengan token memakai tokennya; ubin menit memakai token baru `--plum`.
6. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh. Toast salin diberi titik.

**Catatan terbuka**

1. Sepuluh ukuran Playfair. Ini hasil sengaja review sebelumnya.
2. Temuan baru: selama musik masih dirender (sekitar 10 detik pertama), memuat ulang halaman di tab yang sama tertahan lama di Chromium tanpa tampilan. Sudah ada sebelum putaran ini; belum diperiksa di browser nyata, dan tema lain yang merender musik dengan cara sama mungkin terkena.

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

**Diperbaiki pada putaran kedua (12 November 2026)**

1. Eyebrow dan judul amplop ditukar: eyebrow "Tanda Kasih", judul "Amplop Digital", sama dengan tema sejenis.
2. Jarak huruf label kapital dari lima nilai menjadi tiga.
3. Teks kecil dari lima tingkat menjadi dua (12 dan 14 px).
4. Warna di luar token dijadikan token; garis pilihan disatukan dengan garis input.
5. Bagian selector yang mati (`:not(.force)`) dibuang. Aturannya sendiri ternyata aktif (mematikan riak tombol musik pada setelan kurangi-animasi), jadi dipertahankan.
6. Angka lama penghitung yang sedang memudar disembunyikan dari pembaca layar.
7. Nama tamu dari `?to=` yang lebih dari 60 karakter dipotong di batas kata dan diberi "…"; isian nama di form memakai nama utuh.
8. Tombol musik menampilkan keadaan "memuat" (`aria-busy` dan isyarat visual) sampai musik siap. Di mesin uji jedanya sekitar 2 detik.
9. Kartu form ucapan selebar kolom; sebelumnya menyusut mengikuti teks dan lebih sempit dari kartu RSVP.
10. Tanggal angka satu gaya: kaki halaman menjadi "12 · 12 · 2026". Toast salin diberi titik.

**Catatan terbuka**

Tidak ada.
