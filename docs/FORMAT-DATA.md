# Format data undangan

Supaya portal admin bisa membuat undangan klien dari tema mana pun, setiap tema membaca datanya dari satu format yang sama. Dokumen ini menjelaskan format itu, cara tema ditandai, dan cara mengujinya.

## Cara kerjanya

- **Demo di katalog** tidak berubah. Tema tetap berisi data contoh (Laras & Bima) langsung di HTML, jadi halaman demo tidak butuh langkah tambahan.
- **Undangan klien** dibuat portal dengan [`alat/isi-undangan.js`](../alat/isi-undangan.js). Portal mengambil `index.html` tema, mengganti setiap teks yang bertanda `data-isi…` dengan data klien, lalu menyimpan hasilnya sebagai halaman statis di `/<slug>/`. Halaman yang sama dipakai untuk pratinjau di editor.
- Data juga disimpan utuh di blok `<script type="application/json" id="data-undangan">`. Skrip tema (hitung mundur, kalender, pesan RSVP) membacanya dari sana, sebagai `EVENT`.

```js
const html = IsiUndangan.isiHtml(htmlTema, dataKlien, {
  acara: "laras-bima",                      // memasang <meta name="acara">, RSVP dan ucapan ke server
  folderTema: "/biru-kabut/",               // alamat relatif tema dijadikan absolut
  asal: "https://invitation.helonoia.com",  // untuk og:image
});
```

Di Node, berikan parser lewat `opsi.parse` (misalnya `linkedom`). Bila ada data yang dirujuk tema tapi tidak ada, fungsi ini melempar galat. Undangan tidak pernah terbit dengan isi setengah jadi.

## Data (versi 1)

Contoh lengkap: [`alat/contoh-data.json`](../alat/contoh-data.json) (data contoh semua tema) dan [`alat/uji-data.json`](../alat/uji-data.json) (data uji). Nama kuncinya dalam bahasa Inggris karena melanjutkan objek `EVENT` yang sudah dipakai skrip tema.

| Kunci | Isi |
|---|---|
| `greeting` | `islami`, `umum`, `kristiani`, atau `hindu` (lihat [Salam](#salam)) |
| `city` | Kota di sampul, mis. "Denpasar, Bali" |
| `rsvpDeadline` | `YYYY-MM-DD`. Server menutup RSVP di akhir hari ini menurut zona acara |
| `photoBase` | Folder foto. Demo: `../foto/`. Klien: `/u/<slug>/foto/` |
| `bride`, `groom` | `name` (panggilan), `fullName`, `child` ("Putri", "Putri kedua"), `father`, `mother` (lengkap dengan "Bapak"/"Ibu", boleh "(Alm.)"), `instagram` (tanpa @, opsional), `photo` |
| `events.akad`, `events.resepsi` | Acara pertama dan kedua. `label` ("Akad Nikah", "Pemberkatan", "Resepsi"), `startsAt`/`endsAt` (ISO dengan offset zona, mis. `2026-12-12T09:00:00+08:00`), `timezone` (`Asia/Jakarta`, `Asia/Makassar`, `Asia/Jayapura`), `venue`, `address`, `mapsUrl` (atau `lat`/`lng`) |
| `cover` | Foto sampul |
| `story` | Maksimal 3 momen: `year`, `title`, `text`, `photo` |
| `gallery` | Foto galeri, urutannya sama dengan di undangan: `file`, `alt`, `caption` (opsional) |
| `gifts.accounts` | Maksimal 2: `bank`, `number`, `holder` |
| `gifts.address` | Opsional: `text`, `holder` |
| `sections` | `story`, `gifts`, `countdown`, `wishes` (true/false) |
| `music` | Belum dipakai; disiapkan untuk lagu pilihan klien |
| `demo` | `true` hanya untuk data contoh di tema |

**Foto** ditulis sebagai `{ "file": "galeri-1", "alt": "…", "focus": "50% 30%" }`. `file` adalah nama tanpa ekstensi. Setiap foto harus ada dalam empat versi di `photoBase`, sama seperti folder [`foto/`](../foto/):

```
<file>.jpg          biasa
hd/<file>.jpg       besar, untuk layar penuh dan lightbox
webp/<file>.webp    WebP
webp/<file>-480.webp  WebP 480 px (sampul dan foto mempelai)
```

`focus` (opsional) menjadi `object-position`. Tanpa `focus`, posisi bawaan tema yang dipakai. Tanpa `alt`, dibuat otomatis ("Foto Laras dan Bima 3").

### Turunan

`IsiUndangan.normalisasi(data)` melengkapi data dengan teks siap tampil. Turunan inilah yang dirujuk tema, dan semuanya ikut tersimpan di blok `data-undangan`:

| Kunci | Contoh |
|---|---|
| `couple`, `coupleAnd` | "Laras & Bima", "Laras dan Bima" |
| `date.long`, `date.short`, `date.dayName`, `date.day`, `date.month`, `date.year`, `date.monthYear` | "Sabtu, 12 Desember 2026", "12 Desember 2026", "Sabtu", "12", "Desember", "2026", "Desember 2026" |
| `date.dots`, `date.dotsSpaced` | "12.12.2026", "12 · 12 · 2026" |
| `zone.short`, `zone.long` | "WITA", "Waktu Indonesia Tengah" |
| `rsvpDeadlineLong` | "5 Desember 2026" |
| `bride.parents`, `bride.childOfFather`, `bride.family` | "Putri dari Bapak Wiryo Hadi & Ibu Sekar Arum", "Putri dari Bapak Wiryo Hadi", "Keluarga Bapak Wiryo Hadi & Ibu Sekar Arum" |
| `bride.instagramHandle`, `bride.instagramUrl` | "@laras.contoh", "https://instagram.com/laras.contoh" |
| `events.akad.dateLong`, `.timeRange`, `.timeRangeZone`, `.zone`, `.mapsUrl` | "Sabtu, 12 Desember 2026", "09.00 – 10.30", "09.00 – 10.30 WITA", "WITA", tautan Google Maps |
| `gifts.accounts.0.numberDisplay`, `.copyWhat` | "1234 5678 90", "Nomor rekening" atau "Nomor dompet digital" |
| `gifts.address.copy` | "Larasati Pramesti, Jl. Contoh Raya No. 1, Denpasar, Bali" |

`date` dan `zone` diambil dari acara yang paling awal.

## Menandai tema

Atribut pengikat hanya dibaca portal dan dibuang dari halaman klien. Di demo, atribut ini tidak berpengaruh apa-apa.

| Atribut | Arti |
|---|---|
| `data-isi="bride.fullName"` | Ganti teks elemen. Bisa juga templat: `data-isi="a.n. {gifts.accounts.0.holder}"`. Bila elemen punya anak elemen (ikon, `<br>`, `<span>`), hanya teks langsung pertamanya yang diganti |
| `data-isi-attr='{"href":"{events.akad.mapsUrl}"}'` | Ganti atribut (JSON, nilainya templat) |
| `data-isi-foto="gallery.0"` | Ganti foto di `src`, `srcset`, `content` (og:image), atau `href`, beserta `alt` (bila tidak kosong) dan titik fokus |
| `data-isi-tampil="sections.story"` | Hapus elemen bila nilainya kosong atau false. Untuk slot daftar: `data-isi-tampil="gallery.5"`. Kebalikan: `"!demo"` |
| `data-isi-salam="judul"` | Teks salam: `judul`, `sub`, `pembuka`, `penutup` |

Aturan:

- **Slot tetap.** Daftar (galeri, kisah, rekening) ditandai per butir dengan indeks, misalnya `gallery.3`. Bila data klien lebih sedikit, butir yang kosong dihapus. Bila tema menampilkan foto galeri dengan urutan berbeda dari data contoh, indeksnya mengikuti foto yang tampil (Biru Kabut menampilkan `galeri-6` di posisi keempat, jadi elemen itu bertanda `gallery.5`).
- **Foto tema selalu dari `foto/`.** Pengisi mengenali foto lewat jalur `foto/`, `foto/hd/`, `foto/webp/`. Foto hiasan (latar RSVP, penutup) diikat ke salah satu foto galeri.
- **Skrip tema membaca `EVENT`**, bukan teks di halaman, dan tidak boleh menulis data contoh secara langsung. Contoh yang sudah diganti di Biru Kabut: zona waktu di tautan kalender, tanggal di pesan RSVP, jalur foto HD di lightbox.
- **Catatan "data contoh"** di catatan kaki dibungkus `<span data-isi-tampil="demo">`, supaya hilang di undangan klien.
- Bagian yang bisa dimatikan dari portal (`sections.countdown`) harus aman bila elemennya tidak ada. Skrip tema perlu memeriksanya lebih dulu.

### Salam

Untuk `islami`, teks salam tema dipakai apa adanya. Untuk salam lain, teksnya diambil dari `SALAM` di `isi-undangan.js`:

| | judul | sub | pembuka | penutup |
|---|---|---|---|---|
| umum | Salam Sejahtera | (dihapus) | Dengan penuh sukacita, kami mengundang … | Terima kasih atas doa dan restu Anda. |
| kristiani | Salam Damai Sejahtera | dalam kasih Tuhan Yesus Kristus | Dengan penuh syukur atas kasih Tuhan, kami mengundang … | Tuhan memberkati. |
| hindu | Om Swastiastu | (dihapus) | Atas asung kerta wara nugraha Ida Sang Hyang Widhi Wasa, kami mengundang … | Om Shanti Shanti Shanti Om. |

## Menguji

```bash
node alat/uji-tema.cjs biru-kabut --foto /tmp/foto-uji
```

Uji ini membuka tema di Chromium (Playwright) dan memeriksa empat hal:

1. **Demo:** demo terbuka tanpa galat, dan blok `data-undangan` sama dengan `normalisasi(contoh-data.json)`.
2. **Identik:** diisi data contoh, teks dan atribut halaman tidak berubah.
3. **Bersih:** diisi data uji (Nadia & Raka, salam Kristiani, WIB, 2 momen kisah, 1 rekening), tidak tersisa satu pun data contoh di luar skrip.
4. **Tampil:** hasilnya terbuka tanpa galat, nama dan tanggal baru terlihat, foto termuat, dan tautan kalender memakai data baru.

Hasil isian ditulis ke `uji-keluaran/` (diabaikan git), jadi bisa dibuka langsung di browser.

## Status tema

| Tema | Format data v1 | Catatan |
|---|---|---|
| Biru Kabut | Siap | Tema percontohan. `sections.wishes` belum bisa dimatikan |
| Lengkung Sage | Belum | Sudah dirender dari data (`DOC` + `EVENT`), tapi galeri, rekening, dan teks lain belum |
| Parallax & Sway, Garis Editorial, Truntum Terakota, Edisi Monokrom, Amplop Linen, Riviera Kobalt, Kaca Patri, Kelopak Mimpi | Belum | Data contoh masih tertulis langsung di HTML (20–30 tempat per tema) |

Belum didukung di tema mana pun: lagu pilihan klien (`music`), dan mematikan buku ucapan (`sections.wishes`).
