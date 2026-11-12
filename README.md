# Katalog Undangan Digital

Halaman utama ([`index.html`](index.html)) adalah katalog untuk calon pengantin: 10 tema dalam bingkai HP, kolom "Coba dengan nama Anda" yang mengubah semua tautan demo menjadi `?to=<nama>`, tombol "Lihat demo" dan "Pesan tema ini" (WhatsApp dengan pesan terisi), daftar fitur, cara pesan, dan tanya jawab.

- Lihat: https://invitation.helonoia.net/ (Cloudflare Pages, domain sendiri; juga tetap ada di https://felicidad126.github.io/)
- Gambar pratinjau tautan (`og:image`) di katalog dan semua tema memakai `https://invitation.helonoia.net/`. Bila domain berganti, ganti alamat itu di setiap `index.html`.
- Nama usaha dan nomor WhatsApp diisi di objek `TOKO` pada skrip di bagian bawah `index.html`. Selama nomornya kosong, tombol WhatsApp membuka WhatsApp dengan pesan terisi dan pengunjung memilih kontak sendiri.
- Gambar sampul tiap tema dan gambar pratinjau tautan (`og.jpg`, 1200x630) ada di folder [`katalog/`](katalog/). Bila desain sampul berubah, gambarnya perlu dibuat ulang.
- Tautan lama Lengkung Sage di alamat utama (`/?to=`, `/?open`, `/?motion=full`) otomatis diteruskan ke `/lengkung-sage/`.

---

# Helonoia

Halaman brand Helonoia, maskot, logo, ikon, dan panduan deploy-nya sudah pindah ke repo sendiri: https://github.com/felicidad126/helonoia

---

# Lengkung Sage — Preview Undangan Digital

Preview tema undangan pernikahan **Lengkung Sage**: sage green + ivory, bingkai lengkung (arch), ornamen botani, aksen champagne. Tema ini ada di subfolder [`lengkung-sage/`](lengkung-sage/).

- Lihat: https://felicidad126.github.io/lengkung-sage/
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/lengkung-sage/?motion=full
- Langsung buka undangan: https://felicidad126.github.io/lengkung-sage/?open

Nama, tanggal, alamat, dan rekening di halaman ini adalah data contoh. Foto contoh dibuat dengan AI (Gemini), bukan foto mempelai sebenarnya; ornamen masih placeholder.

Font (Great Vibes, Lora, Inter) di-embed di `lengkung-sage/index.html` dan berlisensi SIL Open Font License 1.1, lihat folder `licenses/`.

---

# Parallax & Sway — Preview Undangan Digital

Tema kedua, di subfolder [`parallax-sway/`](parallax-sway/): palet **Nila Senja** (indigo malam, krem kertas, emas hangat, aksen mawar), tanpa tone sage.

- **Parallax**: sampul berlapis yang bergeser mengikuti kursor / kemiringan HP, foto di dalam bingkai bergerak lebih lambat dari halaman, band foto layar penuh, dan (di desktop) panggung foto yang berganti mengikuti bagian yang dibaca.
  Efek kemiringan HP hanya berjalan di Android. Di iPhone efek ini butuh izin, dan permintaan izin itu tidak bisa muncul sebelum tombol "Buka Undangan" diketuk, padahal efeknya ada di sampul.
- **Sway**: untaian melati, mutiara, bulan sabit, dan bunga emas tergantung lalu berayun seperti pendulum; bingkai foto mempelai dan polaroid galeri ikut terayun saat halaman digulir.
- Musik: waltz kotak musik 3/4 yang dirender di browser (tanpa file audio).

- Lihat: https://felicidad126.github.io/parallax-sway/
- Dengan nama tamu: https://felicidad126.github.io/parallax-sway/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/parallax-sway/?motion=full

Foto memakai folder `foto/` yang sama dengan Lengkung Sage. Font (Cormorant Garamond, Pinyon Script, Jost) dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Garis Editorial · Midnight Indigo — Preview Undangan Digital

Tema ketiga, di subfolder [`garis-editorial/`](garis-editorial/): redesain Garis Editorial skema Midnight Indigo (indigo malam, emas, periwinkle, kertas krem). Undangan disusun sebagai rangkaian alat tulis pernikahan: polaroid sampul, surat pembuka, lembar acara, kartu balasan RSVP, amplop, dan surat penutup yang berpasangan dengan surat pembuka. Dua garis emas turun di tepi halaman, bersilang di "&" kedua mempelai, lalu menyatu di tanggal pernikahan.

- Lihat: https://felicidad126.github.io/garis-editorial/
- Dengan nama tamu: https://felicidad126.github.io/garis-editorial/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/garis-editorial/?motion=full

Foto diambil dari folder `foto/` yang sama dengan dua tema lain (versi HD dari `foto/hd/` untuk tampilan layar penuh); font di-embed. Font Allura, Cormorant Garamond, dan Nunito Sans berlisensi SIL Open Font License 1.1. RSVP dan ucapan hanya tersimpan di perangkat pengunjung; ucapan contoh, alamat, dan rekening adalah data contoh.

---

# Truntum Terakota — Preview Undangan Digital

Tema keempat, di subfolder [`truntum-terakota/`](truntum-terakota/): terakota tua dengan tinta putih, ditambah motif batik **truntum** sebagai aksen garis saja (bingkai, pembatas, pita pinggiran), bukan latar penuh. Truntum adalah motif batik Jawa yang lazim dipakai di pernikahan; motifnya melambangkan cinta yang terus bersemi.

- Motion: bunga truntum mekar kelopak demi kelopak, garis bingkai tumbuh dari sudut, foto tersingkap seperti tirai, bunga kecil gugur pelan di tepi sampul.
- Di desktop, panel foto dan nama menempel di kiri.
- Musik: kotak musik pentatonik dengan gong rendah, dirender di browser (tanpa file audio).

- Lihat: https://felicidad126.github.io/truntum-terakota/
- Dengan nama tamu: https://felicidad126.github.io/truntum-terakota/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/truntum-terakota/?motion=full

Font Fraunces dan Manrope dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Edisi Monokrom — Preview Undangan Digital

Tema kelima, di subfolder [`edisi-monokrom/`](edisi-monokrom/): **lookbook fashion hitam-putih yang sinematik**, dengan cerita "dari monokrom ke warna". Tipografi Bodoni besar, foto selebar layar bernuansa cetak perak, gambar bunga bergaris tinta, dan sedikit marmer di balik kartu RSVP. Urutannya: sampul, salam, mempelai, kisah kami (2019 · 2023 · 2026), simpan tanggal, acara, lookbook foto, RSVP, ucapan, amplop digital, dan penutup berwarna penuh. Di desktop, dan di HP dalam posisi mendatar, sampul tampil sebagai spread dua halaman.

- Motion: huruf nama naik satu per satu, saat dibuka sampul berganti seperti adegan film (bilah hitam menutup, kartu judul, lalu terbuka), foto tersingkap seperti tirai dan perlahan berwarna saat sampai di tengah layar, angka tanggal menggulung, dan lookbook bergeser ke samping mengikuti scroll di desktop.
- Foto mulai hitam-putih lalu berwarna; foto penutup dan lightbox tampil berwarna penuh.
- Musik: loop piano elektrik lembut yang dirender di browser saat halaman dimuat.

- Lihat: https://felicidad126.github.io/edisi-monokrom/
- Dengan nama tamu: https://felicidad126.github.io/edisi-monokrom/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/edisi-monokrom/?motion=full

Font Bodoni Moda dan Plus Jakarta Sans dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Amplop Linen — Preview Undangan Digital

Tema keenam, di subfolder [`amplop-linen/`](amplop-linen/): **amplop di atas taplak linen** dengan liner bermotif, perangko, cap pos, dan segel lilin. Setelah segel diketuk, isinya dijelajahi sebagai **sembilan kartu die-cut** (bukan halaman panjang): undangan berbungkus vellum, acara, mempelai, foto, balasan RSVP, label ucapan, buku ucapan tamu, tanda kasih, dan penutup. Palet netral quiet luxury.

- Navigasi kartu: geser, tombol panah, tab bernama, atau tombol panah keyboard.
- Tinggi kartu mengikuti ruang di antara kepala dan navigasi. Di layar pendek isinya dipadatkan; isi yang masih lebih panjang dari kartu ditandai gradasi dan panah "Gulir".
- Motion: segel retak, tutup amplop terbuka, kartu menyebar lalu bergerak seperti kertas, charm berayun, kartu aktif miring mengikuti kursor atau kemiringan HP. Di iPhone efek kemiringan sengaja tidak dipakai, supaya tidak ada dialog izin sensor saat undangan dibuka.
- Musik: kotak musik 3/4 yang dirender di browser ke WAV, diputar lewat elemen `<audio>` (tetap terdengar di iPhone yang sedang senyap), mulai saat segel dibuka.

- Lihat: https://felicidad126.github.io/amplop-linen/
- Dengan nama tamu: https://felicidad126.github.io/amplop-linen/?to=Nama%20Tamu
- Langsung ke kartu (lewati amplop): https://felicidad126.github.io/amplop-linen/?open
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/amplop-linen/?motion=full

Font Parisienne, EB Garamond, dan Marcellus dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Biru Kabut — Preview Undangan Digital

Tema ketujuh, di subfolder [`biru-kabut/`](biru-kabut/): **pagi berkabut yang lembut dan romantis** dengan palet biru pastel dan abu. Foto muncul dari balik kabut, isi undangan berada di atas panel kaca buram, dan setiap bagian dihiasi ranting hydrangea biru bergaris halus. Komposisinya simetris dan lapang: salam, mempelai dalam bingkai oval, kisah kami, acara, galeri, RSVP, ucapan, amplop digital, dan penutup.

- Motion: lapisan kabut melayang pelan di sampul dan di antara bagian; saat "Buka Undangan" ditekan, kabut menutup lalu tersibak ke samping. Foto bergerak dari buram ke tajam saat muncul, ranting hydrangea tergambar lalu mekar, digit hitung mundur berganti lembut.
- Musik: piano dan pad lembut yang dirender di browser (tanpa file audio).

- Lihat: https://felicidad126.github.io/biru-kabut/
- Dengan nama tamu: https://felicidad126.github.io/biru-kabut/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/biru-kabut/?motion=full

Font Gilda Display, Corinthia, dan Figtree dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Riviera Kobalt — Preview Undangan Digital

Tema kedelapan, di subfolder [`riviera-kobalt/`](riviera-kobalt/): **pernikahan ala beach club Riviera Italia di Bali**, cerah dan terasa dilukis tangan. Palet kobalt, putih gading, kuning lemon, dan hijau daun; ubin majolika dan ranting lemon digambar seperti sapuan kuas. Kanopi beach club bergaris bertepi scallop di sampul, potret mempelai di dalam piring keramik, kisah kami (2019 · 2023 · 2026) sebagai garis pantai, acara sebagai kartu menu beach club ("il Menu"), galeri berupa kartu pos berbingkai ubin, RSVP sebagai kartu "Reservasi", dan penutup saat golden hour. Konsepnya berasal dari riset tren 2027 di bagian 9 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: kanopi terbentang lalu berkibar, ranting lemon tumbuh dan bergoyang, saat dibuka tirai cabana bergaris turun lalu tergulung naik, ubin "terlukis" saat muncul, piring berputar ke tempatnya, garis pantai tergambar mengikuti scroll, kartu menu terbalik masuk, dan digit hitung mundur berganti seperti papan ubin.
- Musik: waltz mandolin dan gitar yang dirender di browser saat halaman dimuat.

- Lihat: https://felicidad126.github.io/riviera-kobalt/
- Dengan nama tamu: https://felicidad126.github.io/riviera-kobalt/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/riviera-kobalt/?motion=full

Font DM Serif Display, Yellowtail, dan DM Sans dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Kaca Patri — Preview Undangan Digital

Tema kesembilan, di subfolder [`kaca-patri/`](kaca-patri/): **cahaya pagi yang menembus jendela orsi**, jendela kayu berkisi dengan kaca berwarna permata khas Persia. Dinding plester gading, kisi kayu walnut, dan kaca hijau tua, merah berry, safir, kunyit, serta lilac; pantulan cahaya berwarna jatuh di halaman. Urutannya: sampul berjendela orsi, salam, mempelai di jendela kecil, kisah kami (2019 · 2023 · 2026) dalam medali bulat, simpan tanggal, acara, galeri, RSVP, ucapan, amplop digital, dan penutup. Konsepnya berasal dari riset di bagian 10 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: saat dimuat, kaca menyala satu per satu dari bawah seperti matahari terbit; saat dibuka, daun jendela terangkat seperti jendela geser dan cahaya pagi memenuhi layar; kisi tergambar lalu terisi warna, potret tersingkap dari balik kaca, dan pantulan cahaya bergeser mengikuti scroll.
- Musik: petikan ala santur di atas dengung lembut, dirender di browser saat halaman dimuat.

- Lihat: https://felicidad126.github.io/kaca-patri/
- Dengan nama tamu: https://felicidad126.github.io/kaca-patri/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/kaca-patri/?motion=full

Font Playfair Display dan Spectral dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

# Kelopak Mimpi — Preview Undangan Digital

Tema kesepuluh, di subfolder [`kelopak-mimpi/`](kelopak-mimpi/): **taman kelopak abstrak yang melayang di bawah cahaya kubah**, dari tren pernikahan Indonesia 2026 "Petal Dreamscape" dan warna Charming Champagne (Bridestory). Kelopak besar yang tembus pandang dengan kilau sampanye, palet blush, mauve, lilac, dan peach, foto dalam bingkai berbentuk kelopak, dan komposisi asimetris. Urutannya: sampul, salam, mempelai, kisah kami (2019 · 2023 · 2026), simpan tanggal, acara, galeri, RSVP, ucapan, amplop digital, dan penutup. Konsepnya berasal dari riset di bagian 11 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: kelopak mekar satu per satu saat dimuat dan cahaya kubah berdenyut pelan; saat dibuka, kuncup tujuh kelopak tumbuh di tengah lalu mekar ke luar; kelopak melayang dan bergeser mengikuti scroll, kursor, atau kemiringan HP; foto muncul dari jendela berbentuk kelopak.
- Musik: harpa dan celesta di atas pad hangat, dirender di browser saat halaman dimuat.

- Lihat: https://felicidad126.github.io/kelopak-mimpi/
- Dengan nama tamu: https://felicidad126.github.io/kelopak-mimpi/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/kelopak-mimpi/?motion=full

Font Italiana, Urbanist, dan Ephesis dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

Ketujuh tema terakhir dibuat dari nol berdasarkan [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md). Semuanya memakai foto dari folder `foto/` yang sama; nama, tanggal, alamat, dan rekening adalah data contoh. RSVP dan ucapan hanya tersimpan di perangkat pengunjung.
