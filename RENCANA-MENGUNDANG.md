# Rencana Usaha: Mengundang by Helonoia

Rangkuman pembahasan 12 November 2026 tentang nama, harga, paket, dan operasional usaha undangan digital. Dokumen ini memisahkan hal yang **sudah diputuskan** dari **usulan yang belum diputuskan** dan **pertanyaan yang masih terbuka**.

Belum ada bagian dari rencana ini yang diterapkan ke kode. Status kode ada di [bagian terakhir](#status-kode-di-repo-ini).

---

## 1. Yang sudah diputuskan

| Hal | Keputusan |
|---|---|
| Nama usaha | **Mengundang by Helonoia**, selalu ditulis lengkap (halaman, pesan WhatsApp, nama akun media sosial) |
| Induk usaha | Helonoia. Satu domain induk, tiap usaha memakai subdomain; tidak membuat domain sendiri per usaha |
| Alamat | `mengundang.helonoia.com` (menggantikan `invitation.helonoia.net`) |
| Paket | Dua paket: **Isi Sendiri** dan **Terima Beres**, keduanya tersedia saat peluncuran |
| Portal | Dipakai admin dan pengantin. Pengantin boleh mengisi datanya sendiri, atau menyerahkan semuanya ke admin |
| Penyimpanan RSVP dan ucapan | Di server sendiri (saat ini di demo hanya tersimpan di perangkat pengunjung) |
| Penyajian undangan klien | Dari server sendiri |
| Database | PostgreSQL, dipasang dan dirawat sendiri |
| Skala | Load balancer, server ditambah sesuai kebutuhan berdasarkan statistik |
| Kondisi awal | Belum ada sistem atau portal; semuanya dibangun dari nol, tidak ada data lama yang dipindahkan |

Server yang tersedia sekarang: 2 core, 8 GB RAM, 80 GB SSD, bandwidth ±2.500 GB per bulan, Rp90.000 per bulan.

---

## 2. Nama dan alamat

Alasan memilih nama ini:

- "Mengundang" langsung menjelaskan usahanya dan mudah diucapkan.
- "Helonoia" yang membuat nama ini khas dan bisa dicari, karena "mengundang" sendiri adalah kata kerja umum. Itu sebabnya nama tidak boleh disingkat menjadi "Mengundang" saja.

Yang masih perlu dikerjakan:

- Meneruskan `invitation.helonoia.net` ke alamat baru supaya tautan yang sudah beredar tidak putus.
- Mengganti alamat di `index.html` katalog dan 10 tema (`canonical`, `og:url`, `og:image`), `sitemap.xml`, dan `robots.txt`.
- Memeriksa ketersediaan nama akun di Instagram dan TikTok, serta pangkalan data merek DJKI (PDKI). Belum dicek.
- Menentukan isi `helonoia.com` tanpa subdomain (halaman induk, atau diteruskan ke katalog).

---

## 3. Harga dan paket

### Peta harga di pasar

Angka dari artikel pihak ketiga, bukan dari situs tiap penyedia; anggap sebagai perkiraan.

| Jenis | Kisaran | Cara kerja |
|---|---|---|
| Platform isi sendiri | Rp49.000–Rp200.000 | Pembeli memilih template dan mengisi datanya sendiri |
| Jasa dikerjakan | Rp100.000–Rp200.000 (dasar), Rp250.000–Rp500.000 (menengah) | Penjual yang memasukkan data dan merevisi |

Sumber: [romisaputra.com](https://www.romisaputra.com/2026/05/cara-memilih-jasa-undangan-digital-pernikahan-terpercaya-di-2026.html), [cermati.com](https://www.cermati.com/artikel/jadi-lebih-hemat-ini-10-situs-membuat-undangan-pernikahan-gratis).

### Usulan (angka belum diputuskan)

Struktur dua paketnya sudah diputuskan. Angka di bawah ini masih usulan.

| | Isi Sendiri | Terima Beres |
|---|---|---|
| Siapa yang mengisi data dan foto | Pengantin, lewat portal | Admin |
| Harga | Rp129.000 | Rp249.000 |
| Semua fitur, nama tamu tanpa batas | ✓ | ✓ |
| Rekap RSVP, ucapan, kelola tamu di portal | ✓ | ✓ |
| Revisi | Ubah sendiri kapan saja | 4× sebelum disebar |
| Pengerjaan | Langsung terbit setelah diisi | 3 hari kerja setelah data lengkap |
| Masa aktif tautan | 6 bulan setelah acara | 6 bulan setelah acara |
| Pembayaran | Lunas sebelum diterbitkan | DP 50%, lunas setelah pratinjau disetujui |
| Bantuan | Lewat WhatsApp bila macet | Didampingi sampai siap disebar |

Dasar usulan:

- **Pembeda paket adalah siapa yang mengisi data**, karena itu yang menentukan jam kerja admin. Fitur tidak dibedakan, sebab demo menampilkan semua fitur.
- **Nama tamu tanpa batas di kedua paket.** Membuat tautan per nama hampir tidak menambah kerja, dan "tanpa batas tamu" adalah kalimat jualan yang kuat.
- **Rp129.000, bukan Rp99.000**, supaya ada ruang untuk harga perkenalan tanpa menurunkan harga resmi.
- **Selisih Rp120.000** kira-kira membayar dua jam kerja admin. Bila satu pesanan Terima Beres memakan lebih dari itu, harganya perlu dinaikkan.
- "Mulai dari" di pembuka katalog memakai harga Isi Sendiri.

Gagasan lain yang belum diputuskan:

- **Harga perkenalan** untuk klien pertama (misalnya 10 pesanan), dengan syarat memberi testimoni dan izin undangannya dijadikan contoh. Ini sekaligus mengisi kekurangan testimoni di katalog.
- **Paket ketiga** dengan penyesuaian desain (sekitar Rp399.000), ditambahkan setelah ada permintaan nyata.

---

## 4. Portal

Dua mode pemakaian, keduanya tersedia saat peluncuran:

| Mode | Yang dilakukan pengantin | Yang dilakukan admin |
|---|---|---|
| Isi Sendiri | Mengisi data acara, mengunggah foto, melihat pratinjau, menerbitkan | Membantu bila macet |
| Terima Beres | Mengirim data ke admin | Mengisi semuanya, mengirim pratinjau, merevisi |

Di kedua mode, pengantin bisa melihat RSVP dan ucapan, mengelola daftar tamu, dan menyalin tautan per tamu.

Akibat keputusan "keduanya tersedia saat peluncuran": peluncuran menunggu portal lengkap, termasuk formulir data, unggah foto, pratinjau, dan terbitkan. Sampai saat itu katalog belum menampilkan harga dan alur pesan dua jalur.

Hal yang perlu dirancang:

- **Tautan tamu.** Sekarang nama tamu ada di alamat (`?to=Nama`), jadi siapa pun bisa mengubahnya. Usulan: tiap tamu mendapat kode sendiri, sehingga RSVP tercatat atas nama tamu yang benar dan pengantin tahu siapa yang sudah membuka. Belum diputuskan.
- **Ucapan yang tampil publik** butuh penangkal spam dan cara bagi pengantin untuk menyembunyikan ucapan yang tidak pantas.

---

## 5. Arsitektur dan operasional

### Peran repo ini

Tema di repo ini menjadi **template** yang diisi data oleh server. Isi repo bergeser menjadi katalog, demo, dan sumber template. Idealnya demo memakai template yang sama dengan data contoh, supaya yang dilihat pembeli sama dengan yang diterima.

Prasyaratnya: tema harus mengambil data acara dari luar, bukan tertulis langsung di HTML seperti sekarang.

Usulan alamat: katalog di `mengundang.helonoia.com`, undangan klien di `mengundang.helonoia.com/<nama-pasangan>/`. Ini paling sederhana bila katalog ikut disajikan dari server yang sama. Belum diputuskan.

### Kapasitas satu server (perkiraan)

Dasar dari repo: satu halaman tema 70–400 KB, satu set foto demo (9 foto plus versi HD) 3,4 MB. Angka lain adalah asumsi.

| Sumber daya | Pemakaian per undangan | Daya tampung |
|---|---|---|
| Penyimpanan 80 GB | ±10 MB bila foto dikecilkan saat diunggah | ±6.000 undangan (dengan ±60 GB terpakai) |
| | ±100 MB bila foto asli disimpan apa adanya | ±600 undangan |
| Bandwidth 2.500 GB/bulan | ±3 GB (500 tamu, membuka 2 kali, ±3 MB sekali buka) | ±800 undangan yang sedang disebar per bulan |
| 2 core, 8 GB RAM | Halaman dan kiriman RSVP sangat ringan | Bukan pembatas |

Keputusan terpenting untuk kapasitas: **foto dikecilkan saat diunggah dan aslinya tidak disimpan.**

### Biaya server per pesanan

| Pesanan per bulan | Biaya server per pesanan (satu server Rp90.000) |
|---|---|
| 5 | Rp18.000 |
| 20 | Rp4.500 |
| 50 | Rp1.800 |

Harga jual ditentukan oleh waktu admin dan harga pasar, bukan oleh infrastruktur. Biaya tetap setelah ada load balancer, server kedua, database terpisah, dan penyimpanan foto belum dihitung karena tarif penyedia belum diketahui.

### Load balancer: syarat rancangan

Di tahap awal, load balancer berguna untuk keandalan, bukan kapasitas. Syaratnya, server aplikasi tidak menyimpan apa pun:

| Yang disimpan | Tempatnya |
|---|---|
| Data acara, tamu, RSVP, ucapan, pesanan | PostgreSQL, di server terpisah dari aplikasi |
| Foto unggahan | Penyimpanan objek (S3-compatible) atau penyimpanan bersama |
| Sesi login portal | Di database atau cookie bertanda tangan |
| Template tema | Sama di tiap server, dipasang lewat deploy yang sama |

Titik rawan yang tersisa: database (titik tunggal sampai ada replika) dan load balancer itu sendiri bila dipasang di satu server.

Patokan menambah server: CPU bertahan di atas 60–70%, waktu respons memburuk, bandwidth atau disk melewati 70% jatah. Lonjakan bisa diperkirakan dari tanggal acara di database, jadi penambahan manual sebelum minggu ramai sudah cukup; penambahan otomatis belum perlu.

Usulan lain: Cloudflare di depan server supaya foto dan halaman tersimpan di jaringannya, sehingga bandwidth dan beban server turun. Belum diputuskan.

### PostgreSQL

Gambaran isi:

| Tabel | Isi |
|---|---|
| Akun | Admin dan pengantin, beserta hak aksesnya |
| Undangan | Alamat, tema, paket, status, tanggal acara, masa aktif, data acara (JSONB) |
| Tamu | Nama, kode tautan, sudah dibuka atau belum |
| RSVP | Hadir atau tidak, jumlah orang, terkait ke tamu |
| Ucapan | Isi, waktu, status tampil atau disembunyikan |
| Pesanan | Paket, harga, status pembayaran |
| Foto | Alamat berkasnya saja; berkas foto di penyimpanan objek |

Kolom JSONB dipakai untuk data acara karena isian tiap tema tidak seragam.

Yang harus ada sejak hari pertama:

- Cadangan otomatis harian ke luar server, dan sesekali dicoba dipulihkan.
- Database hanya menerima koneksi dari server aplikasi, tertutup dari internet.
- Pemantauan disk dan pembaruan keamanan berkala.

Menyusul setelah ada klien: replika, dan pengatur koneksi (misalnya PgBouncer) begitu server aplikasi lebih dari satu.

### Risiko operasional

- **Server mati** saat undangan sedang disebar: pasang pemantau yang memberi tahu saat server tidak merespons.
- **Data hilang:** cadangan harian ke luar server untuk database dan foto.

---

## 6. Urutan pembangunan (usulan)

1. **Daftar data acara per tema:** isian apa saja yang dibutuhkan tiap tema. Dasar formulir portal dan struktur database.
2. **Tema menjadi template** yang mengambil data dari luar (di repo ini).
3. **Server dan database:** undangan, tamu, RSVP, ucapan, penyajian undangan klien.
4. **Portal admin**, lalu **portal pengantin** (RSVP, kelola tamu), lalu **formulir Isi Sendiri** dengan unggah foto dan pratinjau.
5. **Alur pesanan dan pembayaran.**
6. **Katalog diperbarui:** nama, alamat baru, harga, dua jalur cara pesan.
7. **Operasional:** cadangan, pemantauan, load balancer.

Infrastruktur boleh mulai dari satu server aplikasi dan satu database, selama aplikasinya sudah dirancang tanpa penyimpanan lokal. Menambah server kedua dan load balancer kemudian tinggal pemasangan.

---

## 7. Pertanyaan yang masih terbuka

**Harga**

1. Angka harga kedua paket, jumlah revisi, masa aktif, dan aturan pembayaran (usulan di bagian 3).
2. Berapa jam kerja admin untuk satu pesanan Terima Beres.
3. Biaya lain yang ikut dihitung: domain, biaya pembayaran (QRIS atau payment gateway), tenaga bantuan.
4. Target pesanan per bulan di enam bulan pertama.

**Pembangunan**

5. Siapa yang membangun server dan portal.
6. Bahasa dan kerangka kerja yang dipakai.
7. Target tanggal peluncuran.

**Infrastruktur**

8. Penyedia server, dan apakah load balancer dipasang sendiri atau memakai layanan penyedia.
9. Apakah server yang sekarang juga dipakai usaha Helonoia lain.
10. Tempat penyimpanan foto.

**Katalog**

11. Nomor WhatsApp bisnis, akun Instagram dan TikTok, kota, dan jam layanan.

---

## Status kode di repo ini

Perbaikan katalog dari daftar cek 12 November sudah ada di branch ini (lihat `README.md` dan objek `TOKO` di `index.html`). Yang belum disesuaikan dengan rencana di atas:

- Nama usaha dan alamat `mengundang.helonoia.com` belum diterapkan.
- Bagian Harga di katalog masih berbentuk satu harga "Mulai dari"; belum dua paket.
- "Cara pesan" masih satu jalur.
- Nomor WhatsApp masih kosong, jadi tombol WhatsApp belum mengarah ke penjual.
- RSVP dan ucapan di tema masih tersimpan di perangkat pengunjung.
