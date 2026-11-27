# Referensi Pesaing: Kelancaran, Kode, dan UI/UX

Bedah teknis undangan digital pesaing untuk pengembangan **Mengundang by Helonoia**. Disusun 27 November 2026.

Pertanyaan yang dijawab: kenapa undangan pesaing terasa sangat mulus, tanpa frame drop, padahal ada yang memakai video? Apa yang bisa ditiru dari cara mereka menulis kode dan menyusun UI/UX?

> **Cara membaca angka di dokumen ini.** Semua angka berasal dari pengukuran lab di Chromium headless yang meniru HP kelas menengah (lihat [bagian 7](#7-metode-dan-keterbatasan)), bukan dari HP sungguhan. Angkanya berguna untuk membandingkan antarhalaman, tidak untuk menyebut FPS di HP tertentu. Setiap halaman diukur sekali. Ulangi dengan [`alat/ukur-performa.cjs`](../alat/ukur-performa.cjs) sebelum mengambil keputusan dari selisih yang tipis.

---

## Ringkasan

1. **Pesaing tidak lebih canggih, mereka lebih hemat.** Gerak yang mahal "dipanggang" ke dalam video atau gambar. Yang dihitung browser hanya fade dan geser sekali jalan saat sebuah bagian terlihat.
2. **Video justru murah bagi browser.** Video didekode chip dekoder di HP, bukan oleh CPU, lalu ditampilkan sebagai satu lapisan gambar. Biayanya tidak bergantung pada isi: puluhan burung terbang di dalam video sama beratnya dengan langit kosong. Contoh terhemat: video latar Invitato hanya 270×480 piksel, 350 kbps, 1,4 MB untuk 33 detik, diletakkan di belakang teks dengan lapisan gelap di atasnya.
3. **Saat digulir, tema Helonoia sudah setara atau lebih ringan dari pesaing di lab.** Bedanya ada di dua tempat:
   - **Beban GPU**: blur, `mix-blend-mode`, dan ratusan layer animasi. Paling terasa di Amplop Linen (saat dibuka), Parallax & Sway, Kelopak Mimpi, Kaca Patri, dan Biru Kabut. Di HP sungguhan, GPU kelas menengah di layar DPR 2,5–3 adalah batas yang paling cepat tercapai.
   - **Detik-detik awal**: kesepuluh tema menyintesis musik latar di browser saat halaman dibuka (OfflineAudioContext), tepat ketika sampul tampil dan tamu menekan "Buka Undangan". Semua pesaing cukup memutar berkas MP3.
4. **Pesaing menyembunyikan bagian yang berat.** Viding dan Satumomen menampilkan layar loading selama halaman dimuat. Satumomen hanya merender satu halaman (slide) dalam satu waktu. Viding menjeda animasi berulang yang tidak terlihat dan baru memuat peta saat diminta.
5. **Bukan karena ukuran halaman atau framework.** Halaman pesaing 1,2–22 MB, tema Helonoia 0,5–1 MB. Pesaing memakai React, Vue, atau jQuery, tema Helonoia memakai JavaScript biasa. Keduanya tidak menentukan kelancaran.
6. **Ada satu masalah nyata yang mudah diperbaiki.** Di Biru Kabut, Riviera Kobalt, Kaca Patri, dan Kelopak Mimpi, bila tamu menekan Buka sebelum musik selesai dirender, tema memutar berulang WAV sunyi yang panjangnya nol. Main thread Kaca Patri terpakai 93% selama transisi buka, dan 24% bila WAV sunyinya diganti 0,1 detik.
7. **Langkah paling berdampak:** ganti musik sintesis dengan berkas audio di semua tema (masalah di poin 6 ikut hilang), panggang blend Kaca Patri dan blur Biru Kabut serta Kelopak Mimpi ke gambar, dan jeda animasi berulang Parallax & Sway di luar layar. Daftar lengkapnya di [bagian 4](#4-kondisi-tema-helonoia-dan-yang-perlu-diubah), resep kodenya di [bagian 5](#5-panduan-kode-untuk-mengundang).

---

## 1. Undangan yang dibedah

| Pesaing | Demo yang diukur | Teknologi | Pola gerak | Video | Musik |
|---|---|---|---|---|---|
| **Viding** | [Tema 167](https://viding.co/theme/preview/167) | jQuery, Bootstrap, GSAP 3 + ScrollTrigger, Splide, lazysizes | Kelas CSS dipasang saat bagian terlihat; animasi berulang dijeda saat di luar layar | Tidak ada (YouTube untuk siaran langsung) | MP3 4,3 MB, diambil bertahap (HTTP Range) |
| **Invitato** | [aliflakshita](https://invitato.net/template-aliflakshita/?code=DUMMY-P0001), [sekaraby](https://invitato.net/template-sekaraby/?code=DUMMY-P0001) | Gatsby (React), Chakra UI (Emotion), react-reveal | Muncul saat terlihat; huruf nama masuk satu per satu | Latar penuh di belakang teks | MP3 2,5–7 MB |
| **Satumomen** | [java-maroon-3d](https://satumomen.com/preview/java-maroon-3d), [cream-flowers](https://satumomen.com/preview/cream-flowers) | Mesin sendiri, Bootstrap, Animate.css | Animasi sekali jalan per slide; mode slide hanya merender satu halaman | Tidak ada | MP3 3,5 MB atau WAV 17,6 MB |
| **Wedew** | [seaesthetic](https://demo.wedew.id/?theme_preview=seaesthetic) | jQuery, AOS, Swiper | AOS fade-up/fade-down sekali jalan, tanpa animasi berulang | Tidak ada | (tidak diputar di demo) |
| **Datengdong** | [theme one](https://demo.datengdong.com/?guest=ayana&theme=one) | Vue, Tailwind, AOS | AOS, ditambah kelopak melayang dan panel kaca buram | Tidak ada (YouTube) | (tidak terukur di demo) |

Penanda statis setelah sampul dibuka (hitungan elemen di halaman, 27 November 2026):

| Undangan | Pustaka | Video | Layer | Animasi berjalan (berulang) | Blur / backdrop / blend | Berat halaman |
|---|---|---|---|---|---|---|
| Viding 167 | GSAP, ScrollTrigger, jQuery, Splide | – | 59 | 20 (20) | 0 / 0 / 1 | 4,7 MB |
| Invitato aliflakshita | React (Gatsby), Chakra UI | 270×480 | 28 | 27 (16) | 50 / 0 / 1 | 9,5 MB |
| Invitato sekaraby | React (Gatsby), Chakra UI | 1080×1920 | 121 | 144 (89) | 0 / 0 / 3 | 21,9 MB |
| Satumomen java-maroon-3d | mesin sendiri, Animate.css | – | 45 | 28 (4) | 0 / 3 / 1 | 6,0 MB |
| Wedew seaesthetic | jQuery, AOS, Swiper | – | 61 | 0 (0) | 0 / 0 / 6 | 7,7 MB |
| Datengdong one | Vue, Tailwind, AOS | – | 51 | 72 (62) | 2 / 12 / 0 | 1,2 MB |
| **Lengkung Sage** | – | – | 7 | 1 (1) | 0 / 3 / 0 | 0,8 MB |
| **Parallax & Sway** | – | – | 213 | 98 (88) | 0 / 0 / 0 | 0,9 MB |
| **Garis Editorial** | – | – | 26 | 10 (2) | 0 / 0 / 0 | 0,5 MB |
| **Truntum Terakota** | – | – | 57 | 4 (4) | 0 / 0 / 0 | 0,7 MB |
| **Edisi Monokrom** | – | – | 9 | 91 (0) | 0 / 0 / 0 | 0,5 MB |
| **Amplop Linen** | – | – | 23 | 4 (4) | 1 / 0 / 2 | 1,0 MB |
| **Biru Kabut** | – | – | 20 | 11 (4) | 18 / 1 / 0 | 0,9 MB |
| **Riviera Kobalt** | – | – | 19 | 10 (8) | 0 / 0 / 0 | 0,8 MB |
| **Kaca Patri** | – | – | 62 | 67 (3) | 0 / 0 / 51 | 0,8 MB |
| **Kelopak Mimpi** | – | – | 197 | 180 (57) | 16 / 0 / 0 | 0,8 MB |

*Layer*: jumlah lapisan compositor. *Animasi berjalan*: animasi CSS atau Web Animations yang aktif saat dihitung, dalam kurung yang berulang tanpa henti. *Blur / backdrop / blend*: jumlah elemen dengan `filter: blur()`, `backdrop-filter`, dan `mix-blend-mode`.

---

## 2. Kenapa undangan pesaing terasa mulus

### 2.1 Gerak yang mahal dipanggang ke video

Di dua demo Invitato, gerak yang berat ada di dalam video: rekaman prewedding yang diberi warna film di *aliflakshita*, ilustrasi lanskap dengan burung terbang dan awan bergerak di *sekaraby*. Browser hanya menampilkan satu bingkai video per frame, apa pun isi videonya.

| | aliflakshita | sekaraby |
|---|---|---|
| Ukuran | 270×480 | 1080×1920 |
| Codec | H.264 High, 30 fps | H.264 High, 25 fps |
| Bitrate, durasi, berat | 350 kbps, 33 detik, 1,4 MB | 6,4 Mbps, 15 detik, 12,1 MB |
| Atribut | `autoplay muted loop playsinline preload="auto" poster disablepictureinpicture` | `autoplay muted loop playsinline preload="metadata" poster` |
| Letak | Latar penuh di belakang semua bagian, ditambah dua lapisan gelap | Bingkai ilustrasi di bagian atas |

Pelajaran dari keduanya:

- **Resolusi rendah tidak terlihat murahan** bila videonya diberi warna film, grain, atau lapisan gelap, dan teks tajam ada di atasnya. Video 270×480 itu direntang ke layar 412×839 dan tetap terlihat sinematik.
- **Video 1080p tetap lancar**, karena dekodenya di chip, tetapi 12 MB untuk 15 detik terlalu berat bagi tamu yang membuka dari WhatsApp dengan kuota. Target yang masuk akal: 540×960, 0,6–1,2 Mbps, loop 6–12 detik, di bawah 1,5 MB.
- **Susunan latarnya sederhana**: satu pembungkus `position: sticky; top: 0; height: 100dvh; margin-bottom: -100dvh; pointer-events: none` berisi `<video>` dengan `object-fit: cover`, lalu konten dengan `position: relative; z-index: 1` mengalir di atasnya.
- **Selalu ada `poster`**, jadi sebelum video siap, atau bila video tidak boleh diputar otomatis (misalnya mode hemat daya iPhone), tamu tetap melihat gambar yang utuh.

### 2.2 Animasi sekali jalan, dipicu saat terlihat

Semua pesaing memakai pola yang sama: elemen disembunyikan, lalu kelas CSS dipasang ketika elemen masuk layar, dan yang dianimasikan terutama `opacity` dan `transform`.

- **Wedew**: `data-aos="fade-up"`, `fade-down`, `zoom-in` dari pustaka AOS. Setelah terbuka tidak ada satu pun animasi yang terus berjalan.
- **Satumomen**: kelas Animate.css (`animate__fadeInUp animate__slower`, durasi 3 detik). Gerakan yang lambat dan panjang terlihat halus walau sederhana.
- **Viding**: GSAP ScrollTrigger dipakai **hanya sebagai pemicu** (`ScrollTrigger.create({ trigger, start: "top bottom", onToggle })`). ScrollTrigger tidak menggerakkan apa pun per frame gulir, hanya memasang kelas `has-animate`, dan animasinya dijalankan CSS.
- **Invitato**: react-reveal dan transisi CSS biasa. Huruf pertama nama diberi `filter: blur(4px)` yang memudar sekali, pada elemen kecil.

Yang tidak dipakai pesaing: parallax yang dihitung JavaScript setiap frame gulir, dan animasi yang mengubah `filter`, `box-shadow`, atau ukuran elemen besar secara terus-menerus.

### 2.3 Yang tidak terlihat tidak dikerjakan

- **Satumomen, mode slide**: semua bagian ada di satu daftar slide, tetapi hanya slide aktif yang tampil. Sisanya `display: none`, jadi browser sama sekali tidak menggambar atau menganimasikannya. Pindah bagian lewat navigasi bawah (Opening, Countdown, Couple, Quotes, …), dan animasi Animate.css diputar ulang di slide yang baru tampil.
- **Viding**: animasi berulang hanya berjalan selama elemennya terlihat. Saat keluar layar, kelas `animate-paused` dipasang. Elemen dengan `data-animationloop` mendapat kelas `animation-loop` hanya selama berada di layar.
- **Viding**: peta Google di dalam modal memakai `data-src`. `src` baru diisi saat modal dibuka, jadi iframe peta yang berat tidak ikut dimuat di awal.

### 2.4 Hampir tanpa efek GPU yang mahal

Dari tabel penanda statis di atas, pesaing yang paling lancar di lab (Satumomen dan Wedew) tidak punya blur, backdrop hanya di tiga elemen, dan nyaris tanpa animasi berulang. Datengdong, satu-satunya pesaing dengan 12 panel kaca buram (`backdrop-filter`) dan 62 kelopak melayang, justru yang paling berat saat digulir.

Efek yang mahal bagi GPU, terutama di layar dengan kepadatan 2,5–3 piksel per titik:

- `filter: blur()` yang berubah atau berada di atas sesuatu yang bergerak: GPU menghitung ulang blur setiap frame, dan biayanya naik seiring luas elemen dan radius blur.
- `backdrop-filter`: setiap frame, GPU membaca ulang dan memburamkan apa pun yang ada di belakang panel.
- `mix-blend-mode`: elemen tidak bisa digambar terpisah, dan lapisan di bawahnya harus dicampur ulang.
- Banyak layer: setiap elemen yang dianimasikan dengan `transform` atau diberi `will-change` menjadi layer sendiri. Satu layer selebar layar pada DPR 2,625 butuh kira-kira 1080×2400×4 byte ≈ 10 MB memori GPU.

### 2.5 Detik-detik awal: layar loading dan musik berupa berkas

- **Layar loading**: Viding dan Satumomen menampilkan `loader-wrapper` sampai halaman siap. Selama itu tamu tidak melihat sampul bergerak, jadi long task saat memuat (pesaing juga punya, lihat [bagian 3](#3-hasil-ukur-pesaing-dan-10-tema-helonoia)) tidak terlihat sebagai patah-patah.
- **Musik berupa berkas** (MP3 atau WAV) yang diambil bertahap dengan HTTP Range, jadi tidak membebani CPU.
- **Satumomen mendeteksi UC Browser, Mi Browser, dan Oppo Browser**, lalu menampilkan pesan "Jangan Bikin Aku Sedih" yang menyarankan browser lain. Browser bawaan HP seperti ini sering tertinggal versinya.

### 2.6 Yang ternyata bukan penyebab

- **Ukuran halaman**: halaman pesaing jauh lebih berat (Invitato sekaraby 21,9 MB) tetapi tetap lancar saat digulir.
- **Framework**: Invitato memakai React, Datengdong Vue, Viding dan Wedew jQuery. Kelancaran ditentukan oleh apa yang digambar ulang setiap frame, bukan oleh pustaka JavaScript-nya.

---

## 3. Hasil ukur: pesaing dan 10 tema Helonoia

Diukur dengan `node alat/ukur-performa.cjs`, CPU main thread diperlambat 4×, emulasi Pixel 7. Tiga fase:

- **Muat**: 8 detik pertama sejak alamat dibuka.
- **Buka**: 6 detik setelah tombol "Buka Undangan" diklik.
- **Gulir**: usapan sentuh 1000 px/detik sejauh 7000 px.

*Tersendat*: jeda antar-frame lebih dari 25 ms (dua frame 60 Hz atau lebih hilang). *GPU > 16 ms*: frame yang digambar thread GPU lebih lama dari 16 ms. *Audio*: persen satu inti CPU yang dipakai thread audio saat memuat (sintesis musik).

| Undangan | Muat: tersendat | Muat: GPU > 16 ms | Muat: long task | Muat: thread audio | Buka: tersendat | Buka: GPU > 16 ms | Gulir: main thread | Gulir: tersendat | Gulir: GPU > 16 ms |
|---|---|---|---|---|---|---|---|---|---|
| Viding 167 | 24 | 0 | 776 ms | 0% | 45 | 1 | 56,1% | 3 | 2 |
| Invitato aliflakshita (video) | 20 | 0 | 1237 ms | 0% | 15 | 1 | 53,7% | 1 | 0 |
| Invitato sekaraby (video) ¹ | 16 | 7 | 1199 ms | 0% | 0 | 1 | 36,1% | 0 | 2 |
| Satumomen java-maroon-3d | 10 | 0 | 633 ms | 0% | 2 | 0 | 23,6% | 1 | 0 |
| Wedew seaesthetic ² | 12 | 0 | 1022 ms | 0% | 0 | 0 | 13,3% | 0 | 0 |
| Datengdong one | 16 | 2 | 737 ms | 0% | 0 | 1 | 67% | 2 | 3 |
| **Lengkung Sage** | 3 | 0 | 423 ms | 54% | 0 | 0 | 17,3% | 0 | 0 |
| **Parallax & Sway** | 31 | 54 | 879 ms | 34% | 2 | 5 | 41,6% | 1 | 2 |
| **Garis Editorial** | 4 | 0 | 542 ms | 39% | 0 | 0 | 22,6% | 0 | 0 |
| **Truntum Terakota** | 28 | 0 | 1023 ms | 61% | 6 | 0 | 23% | 1 | 0 |
| **Edisi Monokrom** | 5 | 0 | 429 ms | 15% | 1 | 1 | 12,8% | 1 | 0 |
| **Amplop Linen ³** | 6 | 1 | 739 ms | 8% | 44 | 48 | 21% | 1 | 3 |
| **Biru Kabut** | 10 | 9 | 552 ms | 15% | 11 | 21 | 26,7% | 0 | 0 |
| **Riviera Kobalt** | 22 | 0 | 704 ms | 36% | 2 | 0 | 29,8% | 1 | 0 |
| **Kaca Patri** | 13 | 19 | 965 ms | 68% | 11 | 19 | 24,6% | 1 | 0 |
| **Kelopak Mimpi** | 20 | 9 | 909 ms | 14% | 26 | 9 | 45% | 4 | 2 |

¹ Alat hanya bisa menggulir 1395 px di halaman ini.  
² Wedew tidak punya tombol buka; fase Buka berisi halaman yang diam.  
³ Amplop Linen berupa kartu yang digeser, bukan digulir; fase Gulir berisi halaman yang diam setelah dibuka.

Cara membacanya:

- **Saat digulir, tidak ada masalah.** Semua tema Helonoia tersendat 0–4 kali, setara pesaing (0–3). Beban main thread 13–45%, pesaing 13–67%.
- **Selisih terbesar ada saat sampul dibuka.** Amplop Linen tersendat 44 kali dengan 48 frame GPU lambat, padahal main thread hanya terpakai 26%. Artinya hambatannya di GPU, bukan di JavaScript. Kelopak Mimpi (26 tersendat), Biru Kabut (21 frame GPU lambat), dan Kaca Patri (19) juga berat. Di pesaing, frame GPU lambat saat dibuka paling banyak 1.
- **Pesaing juga tidak selalu mulus.** Viding tersendat 45 kali saat dibuka, karena main thread-nya penuh (82%). Kesan "pesaing selalu mulus" tidak berlaku untuk semua tema mereka.
- **Saat memuat, sampul Parallax & Sway paling berat**: 54 frame GPU lambat dan 31 tersendat. Kaca Patri 19 frame GPU lambat. Pesaing paling banyak 7 (Invitato sekaraby, yang videonya 1080p digambar lewat perangkat lunak di lab).
- **Thread audio** memakai 8–68% satu inti CPU di semua tema Helonoia selama 8 detik pertama, untuk menyintesis musik. Di semua pesaing 0%.
- **Long task saat memuat ada di semua halaman** (pesaing 633–1237 ms, Helonoia 423–1023 ms). Viding dan Satumomen menutupinya dengan layar loading, jadi tamu tidak melihat sampul yang tersendat.

### Bukti musik sintesis: tiga tema diukur ulang tanpa musik

`--tanpa-musik` mematikan `OfflineAudioContext`, sehingga tema tidak menyintesis musik. Selebihnya sama.

| Tema | Tersendat (> 25 ms) | Frame terlama | Long task total (terlama) | Thread audio |
|---|---|---|---|---|
| Lengkung Sage | 3 → 1 | 283 → 183 ms | 423 → 180 ms (295 → 180) | 54% → 0% |
| Truntum Terakota | 28 → 10 | 700 → 550 ms | 1023 → 719 ms (563 → 414) | 61% → 0% |
| Kaca Patri | 13 → 5 | 583 → 483 ms | 965 → 712 ms (453 → 363) | 68% → 0% |

Angka fase Muat, dengan musik → tanpa musik. Main thread juga ikut bekerja untuk musik: membangun ratusan node audio, lalu mengubah hasil render menjadi WAV sampel demi sampel. Di Lengkung Sage, itulah long task 295 ms yang hilang.

### Bila tamu menekan Buka sebelum musik selesai dirender

Musik dirender di latar beberapa detik setelah halaman tampil. Bila tamu menekan "Buka Undangan" lebih cepat, tema memutar berkas WAV sunyi sambil menunggu, supaya iPhone tetap mengizinkan musik diputar nanti. Di **Biru Kabut, Riviera Kobalt, Kaca Patri, dan Kelopak Mimpi**, WAV sunyi itu **tidak berisi satu sampel pun** (44 byte, data 0 byte), padahal elemen audionya `loop`. Browser terus mencoba memutar ulang berkas kosong itu sampai musik asli siap. Enam tema lain memakai WAV sunyi 0,1 detik.

Main thread per 2 detik setelah Buka ditekan, 1,5 detik setelah halaman tampil (CPU 4×):

| | 0–2 dtk | 2–4 dtk | 4–6 dtk | 6–8 dtk |
|---|---|---|---|---|
| Kaca Patri, WAV sunyi 0 sampel (sekarang) | 93% | 88% | 47% | 12% |
| Kaca Patri, WAV sunyi diganti 0,1 detik | 24% | 73% | 38% | 13% |
| Truntum Terakota, WAV sunyi 0,1 detik (sekarang) | 49% | 17% | 1% | 2% |

Sisa beban di detik 2–6 adalah render musiknya sendiri. Pengukuran ini memakai skrip sekali pakai, bukan `alat/ukur-performa.cjs`, karena alat itu menekan Buka setelah 8 detik. Karena alasan yang sama, angka `--tanpa-musik` untuk keempat tema ini hanya sahih di fase Muat.

### Mencari penyebab: "bagaimana kalau tanpa X"

`--css` menambahkan satu aturan CSS ke halaman sebelum diukur. Bila angka GPU turun saat sebuah efek dimatikan, efek itulah penyebabnya.

| Tema | Eksperimen | Sebelum | Sesudah |
|---|---|---|---|
| Kaca Patri | `mix-blend-mode: normal` | Buka: 11 tersendat, 19 frame GPU lambat. Muat: 19 frame GPU lambat | Buka: 6 dan 0. Muat: 4 |
| Biru Kabut | `filter: none` | Buka: 11 tersendat, 21 frame GPU lambat | 5 dan 3 |
| Kelopak Mimpi | `filter: none` | Buka: 26 tersendat, 9 frame GPU lambat. Muat: 9 | Buka: 13 dan 5. Muat: 5 |
| Parallax & Sway | semua animasi CSS dijeda | Gulir: main thread 42%, thread GPU 35% satu inti. Muat: 54 frame GPU lambat | Gulir: 17% dan 1%. Muat: 35 |
| Amplop Linen | `filter: none`; `clip-path` dan `box-shadow: none`; semua animasi CSS dijeda | Buka: 44 tersendat, 48 frame GPU lambat. Setelah terbuka, thread GPU 47% satu inti | Buka tetap 40–47 tersendat dan 48–52 frame GPU lambat di ketiga eksperimen. Setelah terbuka, thread GPU turun ke 1% hanya bila animasi dijeda |

Eksperimen ini kasar: mematikan semua blend atau semua blur sekaligus juga mengubah tampilan. Gunanya menunjuk efek mana yang perlu diganti, bukan untuk dipakai apa adanya.

---

## 4. Kondisi tema Helonoia dan yang perlu diubah

Diurutkan dari dampak terbesar per usaha. Belum ada yang diterapkan.

1. **Semua tema: ganti musik sintesis dengan berkas audio.** Render musik tiap tema sekali menjadi `.m4a` (sekitar 300–400 KB), lalu `Music` cukup mengisi `audio.src` dengan berkas itu. Thread audio 8–68% saat memuat hilang, long task berkurang, dan masalah WAV sunyi di poin 2 ikut hilang. Lihat [5.2](#52-musik).
2. **Biru Kabut, Riviera Kobalt, Kaca Patri, Kelopak Mimpi: WAV sunyi 0 sampel.** Bila poin 1 belum dikerjakan, ganti `SILENT` dengan WAV sunyi 0,1 detik seperti enam tema lain. Perubahan satu baris per tema, dan main thread di 2 detik pertama transisi buka turun dari 93% ke 24% (Kaca Patri).
3. **Kaca Patri: panggang `mix-blend-mode` ke gambar.** Ada 51 elemen yang di-blend: tekstur kaca `.w-tex` dan `.tex` (soft-light), `.sheen` dan `.glow` (screen), cahaya `.light`. Tanpa blend, frame GPU lambat saat dibuka turun dari 19 ke 0. Tekstur kaca bisa diekspor sudah tercampur dengan warnanya, kilau dan cahaya cukup gradien dengan `opacity`.
4. **Biru Kabut: jangan menganimasikan blur.** `@keyframes clear` dan `.focus` menggerakkan `filter: blur(10–14px)` saat bagian muncul. Ganti dengan fade dan geser. Tanpa filter, frame GPU lambat saat dibuka turun dari 21 ke 3. Kabut yang bergerak cocok dijadikan video latar ([5.1](#51-video-latar)).
5. **Kelopak Mimpi: kurangi blur dan jumlah layer.** Bayangan kelopak `.ps` memakai `filter: blur(13px)`, foto (`phIn`) dan kata (`.split .w`) muncul dari blur. Ditambah 197 layer dan 180 animasi berjalan (57 berulang). Bayangan dibuat sebagai gambar yang sudah buram, kata dan foto muncul dengan fade dan geser, kelopak melayang dijadikan video latar atau jumlahnya dikurangi.
6. **Parallax & Sway: jeda animasi berulang di luar layar.** 213 layer dan 98 animasi berjalan (88 berulang). Dengan animasi dijeda, beban saat digulir turun dari 42% ke 17% main thread dan dari 35% ke 1% thread GPU. Sampulnya tetap berat saat dimuat (35 frame GPU lambat walau animasi dijeda), kemungkinan karena jumlah layer. Ornamen kecil yang banyak (bintang, kilau) bisa digabung menjadi satu gambar atau video.
7. **Amplop Linen: hambatan GPU saat membuka amplop belum ditemukan.** Blur, `clip-path`, `box-shadow`, dan animasi CSS sudah dikecualikan lewat eksperimen. Tersangka berikutnya: transisi 3D amplop (`perspective`, `transform-style: preserve-3d`, `rotateX`) dan lapisan bertekstur besar. Telusuri di HP sungguhan lewat Chrome DevTools jarak jauh (Rendering: Layer borders dan Paint flashing, panel Layers). Setelah terbuka, thread GPU tetap 47% satu inti karena animasi berulang (charm berayun, kilau); jeda setelah beberapa putaran atau saat kartunya tidak tampil.
8. **Semua tema: tunda animasi masuk sampul** sampai font dan foto sampul siap. Lihat [5.4](#54-detik-detik-awal).

---

## 5. Panduan kode untuk Mengundang

### 5.1 Video latar

Pakai video untuk gerak suasana yang besar: kabut, kelopak berguguran, cahaya, ombak, rekaman prewedding. Video diletakkan **di belakang** konten, bukan di atasnya. Video transparan (alpha) di atas konten butuh dua format berbeda (HEVC untuk Safari, VP9 untuk Chrome) dan lebih berat, jadi hindari.

**Menyiapkan berkas** (H.264 didekode di chip oleh hampir semua HP):

```bash
ffmpeg -i sumber.mov -an -vf "scale=540:-2:flags=lanczos,fps=24" -c:v libx264 -profile:v high -preset slow -crf 26 -g 48 -pix_fmt yuv420p -movflags +faststart latar.mp4
```

```bash
ffmpeg -i latar.mp4 -frames:v 1 -q:v 3 latar-poster.jpg
```

- `-an` membuang trek audio. Video tanpa audio boleh diputar otomatis.
- `-movflags +faststart` menaruh indeks di depan berkas, jadi video bisa mulai sebelum terunduh penuh.
- Loop 6–12 detik dengan awal dan akhir yang menyambung (sambungkan di editor video dengan crossfade). Target berat di bawah 1,5 MB. Bila lebih, naikkan `-crf` ke 28 atau kurangi durasi.
- Poster diambil dari frame pertama, supaya tidak ada lompatan gambar saat video mulai diputar.

**Markup dan CSS** (pola dari Invitato, ditulis ulang):

```html
<div class="latar" aria-hidden="true">
  <video class="latar-video" src="latar.mp4" poster="latar-poster.jpg"
         autoplay muted loop playsinline preload="metadata"
         disablepictureinpicture disableremoteplayback tabindex="-1"></video>
  <div class="latar-redup"></div>
</div>
<main class="isi">…</main>
```

```css
.latar{position:sticky;top:0;height:100lvh;margin-bottom:-100lvh;z-index:0;overflow:hidden;pointer-events:none;background:#1b1712}
.latar-video{width:100%;height:100%;object-fit:cover}
.latar-redup{position:absolute;inset:0;background:linear-gradient(#0000 40%,#000a)}
.isi{position:relative;z-index:1}
```

- `100lvh`, bukan `100dvh`: tinggi `dvh` berubah setiap bilah alamat HP muncul atau hilang saat digulir, sehingga latar dihitung ulang ukurannya. `lvh` tetap.
- Warna `background` pembungkus disamakan dengan warna rata-rata video, supaya tidak ada kilatan putih sebelum poster tampil.

**JavaScript**: jeda saat tab disembunyikan, dan hormati hemat data.

```js
const v = document.querySelector(".latar-video");
if (navigator.connection?.saveData) {
  v.removeAttribute("autoplay");
  v.preload = "none"; // Poster saja.
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) v.pause();
  else if (v.autoplay) v.play().catch(() => {});
});
```

- Untuk video yang bukan latar penuh (misalnya di satu bagian), tambahkan `IntersectionObserver` yang memanggil `pause()` saat video keluar layar.
- Di tema berkebijakan mode halus, video bergerak besar diganti posternya saat `prefers-reduced-motion: reduce`, kecuali `?motion=full`. Ikuti aturan di README bagian "Gerak dan setelan kurangi-animasi".
- Server: nginx sudah melayani HTTP Range untuk berkas statis. Tambahkan aturan cache video (misalnya 30 hari) di `_headers` dan URL rewrite aaPanel, sama seperti foto, dan pakai nama berkas baru setiap video diganti.

### 5.2 Musik

- Simpan musik sebagai berkas audio. Untuk demo, render musik sintesis yang sekarang **sekali saja** menjadi berkas, lalu hapus kode `OfflineAudioContext` dari tema.
- Format: AAC (`.m4a`) 96 kbps atau MP3 128 kbps. Loop Lengkung Sage yang 28 detik, pada 96 kbps, hanya sekitar 340 KB.

  ```bash
  ffmpeg -i musik.wav -c:a aac -b:a 96k -movflags +faststart musik.m4a
  ```

- Elemen `<audio loop preload="none">` dengan `src` diisi di dalam handler klik "Buka Undangan", lalu `play()` di handler yang sama, supaya iPhone mengizinkan pemutaran. Pola ini sudah ada di `Music.play()` semua tema; yang berubah hanya sumber suaranya.

### 5.3 Anggaran gerak per layar

| Aturan | Alasan |
|---|---|
| Animasikan hanya `transform` dan `opacity` | Dua properti ini dijalankan compositor tanpa main thread dan tanpa menggambar ulang |
| Jangan menganimasikan `filter: blur()`, `box-shadow`, `clip-path`, ukuran, atau posisi `top/left` pada elemen besar | Semuanya menggambar ulang setiap frame |
| Blur yang diam: panggang ke gambar (ekspor PNG/WebP yang sudah buram) | Gambar diam digambar sekali, `filter` dihitung GPU terus |
| Tanpa `backdrop-filter` di atas sesuatu yang bergerak, terutama di layar sentuh | GPU memburamkan ulang latar setiap frame |
| `mix-blend-mode`: panggang ke gambar; paling banyak 1–2 per layar | Setiap blend memaksa pencampuran ulang |
| Batasi animasi berulang sampai sekitar 4 per halaman | Satumomen 4, Wedew 0; tema Helonoia yang berat 57–88 |
| Animasi berulang dijeda di luar layar (`animation-play-state: paused` lewat `IntersectionObserver`) | Pola Viding; animasi yang tidak terlihat tetap memakan GPU |
| Total layer di bawah sekitar 60 | Pesaing 22–121; layer selebar layar ≈ 10 MB memori GPU |
| Gerak suasana yang besar dibuat sebagai video | Lihat 5.1 |
| Tanpa JavaScript per frame gulir; pakai `IntersectionObserver` untuk memicu, CSS untuk menggerakkan | Pola semua pesaing |

### 5.4 Detik-detik awal

- Tunda animasi masuk sampul sampai font dan gambar sampul siap (`document.fonts.ready` dan `img.decode()`), dengan batas waktu sekitar 1,5 detik. Animasi yang dimulai sebelum aset siap terlihat patah-patah walau kodenya ringan.
- Pekerjaan yang tidak dibutuhkan sampul (galeri, peta, YouTube, data ucapan) dimulai setelah transisi buka selesai, misalnya di `transitionend` atau `requestIdleCallback`.
- Iframe peta dan YouTube: isi `src` hanya saat tamu menekan tombolnya, atau pakai `loading="lazy"`.
- Layar loading seperti Viding dan Satumomen boleh dipakai, tetapi bila poin di atas sudah dikerjakan biasanya tidak perlu. Layar loading menambah waktu tunggu yang terasa.

### 5.5 Cek sebelum tema dirilis

Jalankan `node alat/ukur-performa.cjs <tema>` dan bandingkan dengan pesaing yang paling lancar:

| Fase | Ukuran | Target | Acuan dari pengukuran ini |
|---|---|---|---|
| Muat | Thread audio | 0% | Semua pesaing |
| Muat | GPU > 16 ms | ≤ 2 | Satumomen 0, Wedew 0, Lengkung Sage 0 |
| Buka | Tersendat | ≤ 5 | Satumomen 2, Wedew 0, Lengkung Sage 0, Garis Editorial 0 |
| Buka | GPU > 16 ms | ≤ 2 | Satumomen 0, Wedew 0, Lengkung Sage 0 |
| Gulir | Tersendat | ≤ 3 | Semua pesaing 0–3 |
| Gulir | Main thread | ≤ 30% | Satumomen 24%, Wedew 13%, Lengkung Sage 17% |
| Gulir | Thread GPU (di kolom thread) | ≤ 10% satu inti | Satumomen 3%, Wedew 1%, Lengkung Sage 3% |

Ukur sebelum dan sesudah perubahan dengan perintah yang sama, dan ulangi bila selisihnya hanya beberapa frame.

---

## 6. UI/UX pesaing sebagai acuan

### Pola antarmuka

| Pola | Dipakai di | Di tema Helonoia | Catatan |
|---|---|---|---|
| Sampul dengan nama tamu dan tombol Buka | Semua | Sudah, semua tema | Datengdong menambah kota atau grup tamu ("Dear Ayana · Jakarta") |
| Tombol musik melayang | Semua | Sudah | Invitato dan Datengdong menaruhnya di pojok kiri bawah, bersama tombol lain |
| Navigasi bawah per bagian (ikon + label, bagian aktif disorot) | Datengdong (Beranda, Profil, Acara, Galeri, Cerita, Hadiah, Ucapan), Satumomen mode slide | Sebagian: tab kartu Amplop Linen, navigasi Garis Editorial | Membantu tamu yang hanya mencari alamat atau rekening |
| Mode slide (satu layar per bagian) | Satumomen | Amplop Linen (kartu) | Sangat ringan, cocok untuk tamu yang jarang menggulir |
| Tombol melayang WhatsApp, QR, suara, dan tombol putar | Satumomen | Suara saja | Tombol putar hanya muncul di mode slide; fungsinya belum dicek |
| QR tamu untuk check-in di lokasi | Invitato (bagian kartu QR), Datengdong ("Tunjukkan QR saat tiba"), Wedew (aplikasi buku tamu) | Belum | Butuh dukungan server (`mengundang-api`) |
| Siaran langsung (YouTube) | Viding, Invitato, Wedew, Datengdong | Belum | Cukup tombol yang membuka YouTube, tanpa iframe di awal |
| Ganti bahasa ID/EN | Invitato | Belum | Berguna untuk tamu luar negeri |
| Ingatkan / simpan ke kalender | Invitato ("Remind Me") | Sudah (Google Calendar) | |
| Amplop digital, hadiah, cashless | Viding (gift registry), Invitato, Wedew (Cashless Donation) | Sudah (rekening dengan tombol salin) | |
| Daftar vendor | Wedew | Belum | Opsional |
| Peringatan browser bawaan HP | Satumomen | Belum | Pertimbangkan bila ada keluhan dari pengguna UC, Mi, atau Oppo Browser |
| Layar loading | Viding, Satumomen | Belum | Lihat 5.4 |

### Fitur demo di katalog

| Fitur | Dipakai di | Di katalog Helonoia |
|---|---|---|
| Simulasi dengan foto sendiri: ganti video latar, foto mempelai, foto RSVP, kartu QR ("Imagination Room") | Invitato | Belum; katalog sudah punya "Coba dengan nama Anda" |
| Variasi warna tema ("Color Variation") | Viding | Belum |

### Urutan bagian

Invitato (paling lengkap): sampul, sambutan, mempelai pria, mempelai wanita, hitung mundur, acara, RSVP, kartu QR, kisah cinta, galeri, siaran langsung, hadiah, form ucapan, daftar ucapan, penutup.

Wedew: pembuka, mempelai, kisah, galeri, hitung mundur, acara, peta, video, e-invitation, komentar, cashless, vendor.

Datengdong: beranda, catatan, mempelai, kutipan, acara (akad, resepsi, unduh mantu), hitung mundur, galeri, video, kisah, hadiah, buku tamu (QR dan konfirmasi), ucapan, penutup.

Invitato dan Datengdong meletakkan **acara dan hitung mundur sebelum galeri dan kisah**, sehingga informasi yang paling dicari tamu muncul lebih dulu. Wedew sebaliknya: kisah dan galeri dulu, baru acara.

---

## 7. Metode dan keterbatasan

- **Alat**: [`alat/ukur-performa.cjs`](../alat/ukur-performa.cjs). Chromium headless 158 dari Playwright, emulasi Pixel 7 (412×915, DPR 2,625, layar sentuh), main thread diperlambat 4×.
- **GPU-nya perangkat lunak** (SwiftShader). Beban blur, blend, dan layer ikut terlihat sebagai waktu CPU di thread GPU, jadi bisa dibandingkan antarhalaman. Tetapi video juga didekode dan digambar lewat perangkat lunak, jadi halaman dengan video (Invitato) tampak lebih berat di lab daripada di HP, yang mendekode video di chip.
- **Thread audio tidak ikut diperlambat**. Waktu sintesis musik di HP sungguhan akan lebih lama daripada angka di tabel.
- **Tema Helonoia dilayani dari server lokal**, pesaing dari internet. Selisih jaringan memengaruhi fase muat, tidak memengaruhi fase gulir.
- **Satu kali ukur per halaman.** Selisih beberapa frame bisa berubah di pengukuran berikutnya.
- **Hitungan statis** (layer, animasi, blur, blend) diambil sekali setelah sampul dibuka, dengan skrip terpisah yang tidak disimpan di repo. Angka itu menggambarkan keadaan 27 November 2026.
- **Eksperimen penyebab** memakai `--css` dan `--tanpa-musik` dari alat yang sama. Uji "Buka ditekan sebelum musik selesai" memakai skrip sekali pakai yang menekan Buka 1,5 detik setelah halaman tampil dan mengganti WAV sunyi lewat intersepsi permintaan HTML.
- **Demo yang dipilih** adalah tema yang tampil di halaman depan atau katalog tiap pesaing pada tanggal itu. Tema lain dari pesaing yang sama bisa berbeda.

Mengulang pengukuran:

```bash
node alat/ukur-performa.cjs kaca-patri kelopak-mimpi
```

```bash
node alat/ukur-performa.cjs kaca-patri --tanpa-musik
```

```bash
node alat/ukur-performa.cjs amplop-linen --css "*{filter:none!important}"
```

Sumber (halaman demo, dibuka 27 November 2026):

- [Viding – Tema 167](https://viding.co/theme/preview/167)
- [Invitato – aliflakshita](https://invitato.net/template-aliflakshita/?code=DUMMY-P0001), [sekaraby](https://invitato.net/template-sekaraby/?code=DUMMY-P0001)
- [Satumomen – java-maroon-3d](https://satumomen.com/preview/java-maroon-3d), [cream-flowers](https://satumomen.com/preview/cream-flowers)
- [Wedew – seaesthetic](https://demo.wedew.id/?theme_preview=seaesthetic)
- [Datengdong – theme one](https://demo.datengdong.com/?guest=ayana&theme=one)
