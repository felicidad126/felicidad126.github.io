# Katalog Undangan Digital Helonoia

Situs statis (HTML, CSS, dan JavaScript biasa, tanpa proses build) berisi katalog 10 tema undangan pernikahan digital dan halaman perkenalan brand Helonoia.

- Alamat utama: https://invitation.helonoia.com/ (VM Helonoia, nginx lewat aaPanel). Isi branch `main` disalin ke server setiap 5 menit; lihat [Hosting](#hosting)
- Alamat lama: https://invitation.helonoia.net/, dialihkan permanen (301) ke alamat utama dengan jalur dan parameter yang sama. Domain `helonoia.net` tidak dipakai lagi dan berlaku sampai 12 Mei 2027
- Cadangan: https://felicidad126-github-io.pages.dev/ (Cloudflare Pages) dan https://felicidad126.github.io/ (GitHub Pages)

Setiap halaman adalah satu berkas `index.html` di foldernya sendiri, dan situs dilayani langsung dari isi repo. Untuk mengubah halaman, sunting berkas itu langsung.

## Halaman

| Halaman | Folder | Keterangan |
|---|---|---|
| Katalog | [`/`](index.html) | Etalase untuk calon pengantin: 10 tema dalam bingkai HP, kolom "Coba dengan nama Anda", tombol demo dan pesan via WhatsApp, fitur, cara pesan, tanya jawab |
| Brand Helonoia | [`brand/`](brand/) | Perkenalan brand sebelum ada produk: arti nama, maskot, sifat brand, palet warna dan huruf |
| Demo | [`demo/`](demo/index.html) | Pembungkus demo yang dibuka dari katalog: bilah "Katalog" dan "Pesan tema ini" di atas undangan (lihat [Bilah demo](#bilah-demo)) |

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
| `?tema=<folder>` | Memilih tema yang ditampilkan di bilah demo. Parameter lain (`to`, `motion`, `open`) diteruskan ke tema | Hanya `demo/` |

Contoh: https://invitation.helonoia.com/kaca-patri/?to=Nama%20Tamu

## Struktur folder

```
index.html          katalog
404.html            halaman "tidak ditemukan" dengan Noi, untuk semua alamat yang tidak ada
robots.txt          izin untuk mesin pencari, menunjuk ke sitemap.xml
sitemap.xml         daftar halaman untuk Google (hanya katalog)
toko.js             nama usaha dan nomor WhatsApp (dipakai katalog dan bilah demo)
acara.js            penghubung RSVP dan ucapan ke server untuk undangan klien (lihat Undangan klien)
demo/               bilah demo yang membungkus tema saat dibuka dari katalog
brand/              halaman brand Helonoia
HTML/               penerus alamat lama /HTML/ ke /brand/
<nama-tema>/        satu folder per tema (lihat tabel di atas)
foto/               foto contoh yang dipakai semua tema
  hd/               versi besar untuk tampilan layar penuh dan lightbox
  webp/             versi WebP (dipakai Lengkung Sage dan Garis Editorial)
katalog/            gambar sampul tiap tema, og.jpg, dan sampul Kelopak Mimpi tanpa nama untuk pembuka katalog
helonoia/           logo dan maskot Helonoia beserta generatornya, dan noi.webp (Noi untuk halaman 404)
licenses/           lisensi font yang disimpan di repo
docs/               catatan desain dan review (tidak dipakai situs)
_headers            aturan cache Cloudflare Pages (cadangan); di VM aturan yang sama dipasang di nginx
favicon.ico         ikon bawaan untuk halaman tanpa ikon sendiri
```

## Catatan perawatan

### Katalog
- Nama usaha dan nomor WhatsApp diisi di [`toko.js`](toko.js), dipakai katalog dan bilah demo. Selama nomornya kosong, tombol WhatsApp membuka WhatsApp dengan pesan terisi dan pengunjung memilih kontak sendiri. Bila nama usaha berubah, ganti juga `<title>` dan `og:title` di `index.html` dan `demo/index.html`, karena pratinjau tautan tidak menjalankan JavaScript.
- Nama yang diketik di "Coba dengan nama Anda" disimpan selama sesi browser, jadi tetap terisi saat pengunjung kembali dari demo.
- HP tengah di pembuka ikut menampilkan nama itu. Gambarnya [`katalog/kelopak-mimpi-tanpa-nama.jpg`](katalog/kelopak-mimpi-tanpa-nama.jpg) (sampul Kelopak Mimpi tanpa nama tamu), dan namanya ditulis di atasnya sebagai teks SVG berhuruf Italiana, dengan ukuran, warna, dan posisi yang sama dengan tema. Nama panjang dibuat dua baris seperti di tema (lebih suka dipecah sebelum "&"). Bila sampul Kelopak Mimpi berubah, buat ulang gambar ini juga dan cocokkan lagi posisi namanya (`HERO_MID` di skrip `index.html`).
- Gambar sampul tiap tema dan gambar pratinjau tautan (`og.jpg`, 1200x630) ada di [`katalog/`](katalog/). Bila desain sampul berubah, gambarnya perlu dibuat ulang.
- Tautan lama Lengkung Sage di alamat utama (`/?to=`, `/?open`, `/?motion=full`) otomatis diteruskan ke `/lengkung-sage/`.

### Bilah demo
Katalog membuka setiap demo lewat [`demo/`](demo/index.html), misalnya `demo/?tema=lengkung-sage&to=Nama%20Tamu`. Di atas undangan ada bilah tipis: tombol "Katalog" (kembali ke kartu tema itu di katalog), label "Demo" dengan nama tema, dan tombol "Pesan tema ini" (WhatsApp dengan nama tema di pesannya). Undangannya sendiri tampil di bingkai di bawah bilah.

- Berkas tema tidak berubah. Undangan asli untuk tamu (`<tema>/?to=<nama>`) tidak pernah memuat bilah ini.
- Bila calon pengantin meneruskan tautan demo ke pasangannya, bilahnya ikut tampil, jadi pasangannya juga bisa membuka katalog atau memesan.
- Parameter selain `tema` (`to`, `motion`, `open`) diteruskan apa adanya ke tema. Alamat tanpa `tema` atau dengan tema yang tidak dikenal diarahkan kembali ke katalog.
- Tema baru: tambahkan folder dan namanya di objek `TEMA` di `demo/index.html`, dan kartunya di katalog dengan `id` sama dengan nama folder.

### Gerak dan setelan kurangi-animasi
Perangkat bisa meminta situs mengurangi gerak (`prefers-reduced-motion`). Di iPhone, browser bisa memintanya walau pemilik HP tidak merasa menyalakan Reduce Motion, misalnya lewat setelan per aplikasi. Tema menanggapinya dengan dua cara:

- **Mode halus** (Lengkung Sage, Parallax & Sway, Garis Editorial, Truntum Terakota, Edisi Monokrom, Amplop Linen, Biru Kabut, Kaca Patri): animasi kecil tetap jalan (memudar, kilau, ornamen melayang dan berayun kecil, garis tergambar, hitung mundur). Gerak besar dimatikan atau diganti memudar: parallax, efek kemiringan HP dan kursor, zoom besar, dan geser jauh, termasuk saat sampul dibuka.
- **Selalu penuh** (Kelopak Mimpi, Riviera Kobalt): setelan perangkat diabaikan, seperti undangan pesaing. Untuk kembali mengikuti setelan perangkat, lihat komentar di skrip `<head>` tema itu.

`?motion=full` memaksa animasi penuh di semua tema. Katalog menawarkan tombol "Tampilkan dengan animasi penuh" untuk demo di perangkat dengan setelan ini.

### Undangan klien: RSVP dan ucapan tersimpan di server
Demo tema di katalog menyimpan RSVP dan ucapan di HP tamu saja (keterangan "Preview" di bawah form). Undangan klien sungguhan mengirimnya ke server, ke API [`felicidad126/mengundang-api`](https://github.com/felicidad126/mengundang-api) di `/api/` pada domain yang sama.

- Undangan klien menandai dirinya dengan satu tag di `<head>`: `<meta name="acara" content="<slug>">`. Slug dibuat admin di server dengan `acara:buat` (lihat `docs/operasi.md` di repo API), yang sekaligus mencetak tag ini.
- Tanpa tag itu, tema bekerja persis seperti sebelumnya dan tidak memanggil server sama sekali. Jangan pernah menambahkan tag acara ke folder tema demo.
- Semua tema memuat [`acara.js`](acara.js) di `<head>`. Skrip itu menyediakan `window.Acara` (kirim RSVP, muat dan kirim ucapan), mengganti keterangan "Preview" dengan keterangan ke mana data dikirim (atribut `data-catatan`), dan menambahkan kolom jebakan anti-bot yang tidak terlihat ke setiap form.
- Satu HP satu jawaban RSVP per acara: kirim ulang dari HP yang sama memperbarui jawaban sebelumnya. Data yang diingat di HP diberi awalan slug, jadi tamu yang diundang ke dua pernikahan tidak melihat jawaban undangan lain.
- RSVP (termasuk nomor WhatsApp) hanya dibaca mempelai dan admin. Ucapan tampil untuk semua tamu undangan itu. Di Garis Editorial, doa di kartu balasan juga dikirim sebagai ucapan karena tema ini menampilkannya di bagian "Doa & ucapan".
- Server menghapus RSVP dan ucapan 90 hari setelah tanggal acara.
- Mengubah alur RSVP atau ucapan di sebuah tema: pertahankan kedua jalur (dengan dan tanpa `ACARA.aktif`), dan uji keduanya.

### Hosting
- Situs dilayani nginx di VM Helonoia (aaPanel, situs `invitation.helonoia.com`, folder `/www/wwwroot/invitation.helonoia.com`). Tugas Cron aaPanel "Deploy invitation.helonoia.com dari GitHub" menjalankan `/www/deploy/deploy-invitation.sh` setiap 5 menit: menarik `main` ke `/www/deploy/invitation-src` (di luar folder situs, jadi `.git` tidak pernah terbuka ke publik) lalu menyalinnya dengan rsync.
- DNS `invitation` di zona Cloudflare `helonoia.com` berupa A record ke IP VM (DNS only). Sertifikat Let's Encrypt dipasang dan diperpanjang aaPanel.
- Aturan cache dari `_headers` dipasang juga di nginx (URL rewrite situs di aaPanel). Bila `_headers` berubah, salin perubahannya ke sana.
- HTML perlu dikirim dengan `Cache-Control: no-cache`. Tanpa header itu nginx hanya mengirim `Last-Modified` dan `ETag`, dan browser boleh memakai salinan lama tanpa bertanya ke server (cache heuristik, kira-kira sepersepuluh umur berkas: halaman yang terakhir diubah 4 hari lalu bisa diambil dari cache sampai sekitar 9 jam). Akibatnya perubahan yang sudah tayang bisa belum terlihat di HP tamu maupun pemilik. Dengan `no-cache`, browser tetap menyimpan salinan tetapi selalu memeriksa ulang ke server dulu; bila halaman belum berubah, server menjawab 304 tanpa isi, jadi tetap hemat. Cloudflare Pages sudah begini secara bawaan (`max-age=0, must-revalidate`), jadi aturan ini hanya perlu di nginx. Tambahkan di URL rewrite situs di aaPanel, di samping aturan `_headers`:

  ```nginx
  # HTML (alamat berakhiran .html atau /) selalu diperiksa ulang ke server.
  # Foto, gambar katalog, dan font tetap memakai aturan dari _headers.
  location ~* (\.html|/)$ {
      add_header Cache-Control "no-cache" always;
      add_header Strict-Transport-Security "max-age=31536000" always;
  }
  ```

  Baris `Strict-Transport-Security` wajib ikut. nginx tidak mewariskan `add_header` dari blok `server` ke `location` yang punya `add_header` sendiri, jadi tanpa baris itu halaman HTML kehilangan HSTS yang sekarang dikirim aaPanel. Hal ini sudah terjadi pada `acara.js` dan semua berkas yang memakai aturan `_headers` (foto, gambar katalog, font): semuanya punya `Cache-Control` tetapi tanpa HSTS. Untuk aset itu tidak berbahaya, selama HTML tetap membawa HSTS. Periksa setelah disimpan:

  ```bash
  curl -sI https://invitation.helonoia.com/edisi-monokrom/ | grep -iE "cache-control|strict-transport"
  ```

  Hasil yang benar memuat `cache-control: no-cache` dan `strict-transport-security: max-age=31536000`.
- `toko.js` sekarang dikirim dengan `max-age=43200` (12 jam, dari aturan `expires 12h` bawaan aaPanel untuk `.js` dan `.css`), sedangkan `acara.js` sudah `no-cache`. Bila nama usaha atau nomor WhatsApp di `toko.js` diganti, pengunjung bisa masih melihat yang lama sampai 12 jam. Bila perlu, beri `toko.js` aturan yang sama dengan `acara.js`.
- Kembali ke Cloudflare Pages bila VM bermasalah: ubah record `invitation` menjadi CNAME `felicidad126-github-io.pages.dev` dengan proxy aktif, lalu di proyek Pages `felicidad126-github-io` buka **Custom domains** dan klik **Reactivate** (atau **Check DNS records**) pada `invitation.helonoia.com`. Sejak DNS dipindah ke VM, domain itu berstatus Inactive di Pages. Project Pages-nya tetap tersambung ke repo ini. Catatan: di Pages tidak ada `/api/`, jadi undangan klien hanya bisa menampilkan undangan, tanpa RSVP dan ucapan.

### Halaman 404, robots.txt, dan sitemap.xml
- [`404.html`](404.html) tampil untuk setiap alamat yang tidak ada, dengan status 404. Sebelum berkas ini ada, Cloudflare Pages menjawab alamat yang tidak ada dengan katalog dan status 200, termasuk `/robots.txt` dan `/sitemap.xml`.
- Halaman ini bisa tampil di folder mana pun, jadi semua tautan dan asetnya memakai alamat absolut (`/...`). Pertahankan itu saat menyunting.
- Tautan tamu yang alamatnya salah tetapi membawa `?to=`, `?open`, atau `?motion` diteruskan ke `/lengkung-sage/` sebelum halamannya tampil, sama seperti beranda. Bedanya, alamat tujuannya absolut, jadi alamat seperti `/apa/?to=Nama` tidak lagi berputar tanpa henti.
- Noi diambil dari [`helonoia/noi.webp`](helonoia/noi.webp), versi 560 px dari maskot di halaman helonoia.com. Diketuk, Noi melompat kecil dan mengganti kalimatnya. Semua gerak mati bila perangkat memakai setelan kurangi-animasi.
- Nama usaha dan nomor WhatsApp diambil dari [`toko.js`](toko.js), jadi ikut berubah bila `toko.js` diubah.
- [`sitemap.xml`](sitemap.xml) hanya berisi katalog, karena halaman tema memakai `noindex, nofollow` dan `demo/` memakai `noindex`. [`robots.txt`](robots.txt) tidak memblokir apa pun, supaya Google tetap bisa membaca tag `noindex` itu.

### Domain
- Gambar pratinjau tautan (`og:image`) di katalog, halaman brand, dan semua tema memakai `https://invitation.helonoia.com/`. Bila domain berganti, ganti alamat itu di setiap `index.html`, dan juga di `robots.txt` dan `sitemap.xml`. `404.html` tidak perlu diubah.
- Katalog pindah dari `invitation.helonoia.net` ke `invitation.helonoia.com` pada November 2026. Pengalihan dari alamat lama diatur lewat Redirect Rule di zona Cloudflare `helonoia.net`, bukan di repo ini. Domain `helonoia.net` tidak dipakai lagi dan berlaku sampai 12 Mei 2027. Sampai tanggal itu, jangan matikan aturan pengalihannya. Keputusan perpanjangan domain menyusul, dan dicatat di `RENCANA-PINDAH-DOMAIN.md` di repo `felicidad126/helonoia`.

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
