# Garis Editorial · Midnight Indigo — Preview Undangan Digital

Tema ini: redesain Garis Editorial skema Midnight Indigo (indigo malam, emas, periwinkle, kertas krem). Undangan disusun sebagai rangkaian alat tulis pernikahan: polaroid sampul, surat pembuka, lembar acara, kartu balasan RSVP, amplop, dan kartu pos. Dua garis emas turun di tepi halaman, bersilang di "&" kedua mempelai, lalu menyatu di tanggal pernikahan.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/garis-editorial/
- Dengan nama tamu: https://felicidad126.github.io/garis-editorial/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/garis-editorial/?motion=full

Foto diambil dari folder `foto/` (versi HD dari `foto/hd/` untuk tampilan layar penuh); font di-embed. Font Allura, Cormorant Garamond, dan Nunito Sans berlisensi SIL Open Font License 1.1, lihat folder `licenses/`. RSVP dan ucapan hanya tersimpan di perangkat pengunjung; ucapan contoh, alamat, dan rekening adalah data contoh.

---

## Tentang branch ini

Branch `tema/garis-editorial` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `garis-editorial/index.html` di `main`.
