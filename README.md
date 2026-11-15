# Katalog Undangan Digital Helonoia

Situs statis (HTML, CSS, dan JavaScript biasa, tanpa proses build) berisi katalog 10 tema undangan pernikahan digital dan halaman perkenalan brand Helonoia.

- Alamat utama: https://invitation.helonoia.net/ (Cloudflare Pages, domain sendiri)
- Cadangan: https://felicidad126.github.io/ (GitHub Pages)

Setiap halaman adalah satu berkas `index.html` di foldernya sendiri, dan situs dilayani langsung dari isi repo. Untuk mengubah halaman, sunting berkas itu langsung.

## Halaman

| Halaman | Folder | Keterangan |
|---|---|---|
| Katalog | [`/`](index.html) | Etalase untuk calon pengantin: 10 tema dalam bingkai HP, kolom "Coba dengan nama Anda", tombol demo dan pesan via WhatsApp, fitur, cara pesan, tanya jawab |
| Brand Helonoia | [`brand/`](brand/) | Perkenalan brand sebelum ada produk: arti nama, maskot, sifat brand, palet warna dan huruf |

### Tema undangan

Penjelasan lengkap setiap tema (konsep, motion, musik, font) ada di [`docs/TEMA.md`](docs/TEMA.md).

| No | Tema | Folder | Ciri khas | Font |
|---|---|---|---|---|
| 1 | Lengkung Sage | [`lengkung-sage/`](lengkung-sage/) | Sage dan ivory, bingkai lengkung, ornamen botani | Great Vibes, Lora, Inter (disimpan di repo) |
| 2 | Parallax & Sway | [`parallax-sway/`](parallax-sway/) | Indigo malam dan emas, sampul parallax, ornamen gantung berayun | Cormorant Garamond, Pinyon Script, Jost |
| 3 | Garis Editorial | [`garis-editorial/`](garis-editorial/) | Midnight Indigo, rangkaian alat tulis dengan dua garis emas | Allura, Cormorant Garamond, Nunito Sans (disimpan di repo) |
| 4 | Truntum Terakota | [`truntum-terakota/`](truntum-terakota/) | Terakota dan tinta putih, aksen garis batik truntum | Fraunces, Manrope |
| 5 | Edisi Monokrom | [`edisi-monokrom/`](edisi-monokrom/) | Lookbook hitam-putih, foto perlahan berwarna | Bodoni Moda, Plus Jakarta Sans |
| 6 | Amplop Linen | [`amplop-linen/`](amplop-linen/) | Amplop bersegel lilin, isi berupa sembilan kartu | Parisienne, EB Garamond, Marcellus |
| 7 | Biru Kabut | [`biru-kabut/`](biru-kabut/) | Pagi berkabut biru pastel, panel kaca buram, hydrangea | Gilda Display, Corinthia, Figtree |
| 8 | Riviera Kobalt | [`riviera-kobalt/`](riviera-kobalt/) | Beach club Riviera di Bali, ubin majolika dan lemon | DM Serif Display, Yellowtail, DM Sans |
| 9 | Kaca Patri | [`kaca-patri/`](kaca-patri/) | Jendela orsi berkaca warna permata | Playfair Display, Spectral |
| 10 | Kelopak Mimpi | [`kelopak-mimpi/`](kelopak-mimpi/) | Kelopak melayang tembus pandang, blush dan sampanye | Italiana, Urbanist, Ephesis |

Font yang tidak ditandai "disimpan di repo" dimuat dari Google Fonts. Semua font berlisensi SIL Open Font License 1.1.

### Parameter alamat

| Parameter | Fungsi | Berlaku di |
|---|---|---|
| `?to=Nama%20Tamu` | Menampilkan nama tamu di sampul dan mengisi form RSVP | Semua tema |
| `?motion=full` | Animasi penuh, mengabaikan setelan kurangi-animasi di perangkat | Semua tema dan halaman brand |
| `?open` | Langsung membuka undangan, melewati sampul | Semua tema kecuali Parallax & Sway, Garis Editorial, dan Biru Kabut |

Contoh: https://invitation.helonoia.net/kaca-patri/?to=Nama%20Tamu

## Struktur folder

```
index.html          katalog
brand/              halaman brand Helonoia
HTML/               penerus alamat lama /HTML/ ke /brand/
<nama-tema>/        satu folder per tema (lihat tabel di atas)
foto/               foto contoh yang dipakai semua tema
  hd/               versi besar untuk tampilan layar penuh dan lightbox
  webp/             versi WebP (dipakai Lengkung Sage dan Garis Editorial)
katalog/            gambar sampul tiap tema dan og.jpg untuk katalog
helonoia/           logo dan maskot Helonoia, beserta generatornya
licenses/           lisensi font yang disimpan di repo
docs/               catatan desain dan review (tidak dipakai situs)
_headers            aturan cache Cloudflare Pages
favicon.ico         ikon bawaan untuk halaman tanpa ikon sendiri
```

## Catatan perawatan

### Katalog
- Nama usaha dan nomor WhatsApp diisi di objek `TOKO` pada skrip di bagian bawah `index.html`. Selama nomornya kosong, tombol WhatsApp membuka WhatsApp dengan pesan terisi dan pengunjung memilih kontak sendiri.
- Gambar sampul tiap tema dan gambar pratinjau tautan (`og.jpg`, 1200x630) ada di [`katalog/`](katalog/). Bila desain sampul berubah, gambarnya perlu dibuat ulang.
- Tautan lama Lengkung Sage di alamat utama (`/?to=`, `/?open`, `/?motion=full`) otomatis diteruskan ke `/lengkung-sage/`.

### Domain
- Gambar pratinjau tautan (`og:image`) di katalog, halaman brand, dan semua tema memakai `https://invitation.helonoia.net/`. Bila domain berganti, ganti alamat itu di setiap `index.html`.

### Foto
- Nama, tanggal, alamat, dan rekening di semua tema adalah data contoh. Foto contoh dibuat dengan AI (Gemini), bukan foto mempelai sebenarnya.
- Setiap foto ada dalam tiga versi: `foto/` (biasa), `foto/hd/` (besar), dan `foto/webp/` (WebP, nama sama; sampul dan foto mempelai punya versi 480 px untuk HP). Bila foto diganti, buat ulang ketiga versinya.
- Foto dan gambar katalog disimpan di cache selama 30 hari (lihat [`_headers`](_headers)), jadi foto yang diganti sebaiknya memakai nama berkas baru.

### Brand Helonoia
- Maskot dan tulisan HELONOIA di halaman brand dibuat dari [`helonoia/helonoia_monster.py`](helonoia/helonoia_monster.py), jadi bentuknya sama persis dengan logo. Bila logo berubah, jalankan `python3 helonoia_monster.py` dari folder `helonoia/`, lalu buat ulang potongan SVG di awal `<body>` halaman brand.
- Semua warna diambil dari logo: Malam `#120B1E`, Ungu Noia `#B26BFF`, Ungu Tua `#7C3FD6`, Lilac `#CDA6FF`, Lime `#C6FF3D`, Putih Halo `#F4EFFF`.
- Interaksi: mata maskot mengikuti kursor (di HP ia melirik ke sana kemari sendiri), tombol "Sapa balik" membuat maskot melambai dan menjawab, kotak warna bisa diklik untuk menyalin kodenya.
- Font Fredoka (huruf logo) dan Plus Jakarta Sans dimuat dari Google Fonts.
- Halaman ini dulu ada di `/HTML/`. Alamat lama itu tetap bisa dibuka dan otomatis diteruskan ke `/brand/`.

### Font yang disimpan di repo
- Lengkung Sage (`lengkung-sage/fonts/`) dan Garis Editorial (`garis-editorial/fonts/`) memakai font dari folder sendiri supaya lebih cepat dimuat di HP. Teks lisensinya ada di [`licenses/`](licenses/). Bila menambah font sendiri di tema lain, sertakan juga lisensinya di folder itu.

## Dokumen

| Berkas | Isi |
|---|---|
| [`docs/TEMA.md`](docs/TEMA.md) | Penjelasan lengkap kesepuluh tema |
| [`docs/REFERENSI-DESAIN.md`](docs/REFERENSI-DESAIN.md) | Riset tren dan referensi yang menjadi dasar tema 4 sampai 10 |
| [`docs/REVIEW-KONSISTENSI-TEMA.md`](docs/REVIEW-KONSISTENSI-TEMA.md) | Review konsistensi 10 tema (November 2026), standar antartema, dan catatan terbuka |
| [`docs/REVISI-AMPLOP-LINEN.md`](docs/REVISI-AMPLOP-LINEN.md) | Arsip review Amplop Linen (Oktober 2026); semua poin sudah diterapkan |
