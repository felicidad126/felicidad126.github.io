# Edisi Monokrom — Preview Undangan Digital

Tema ini: undangan sebagai **edisi spesial majalah fashion**, hitam-putih dengan aksen marmer. Sampul majalah dengan cover lines dan nama tamu, daftar isi bernomor halaman, profil mempelai, feature kisah cinta, agenda dengan angka besar, portofolio foto, kupon balasan RSVP, surat pembaca, iklan baris untuk amplop digital, dan sampul belakang. Di desktop, dan di HP dalam posisi mendatar, sampul tampil sebagai spread dua halaman.

- Motion: huruf masthead masuk bergantian, sampul berbalik seperti halaman majalah saat dibuka, foto disapu clip-path, ticker berjalan, angka agenda menghitung naik.
- Foto ditampilkan hitam-putih; lightbox menampilkan versi HD berwarna.
- Musik: loop piano elektrik lembut yang dirender di browser.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/edisi-monokrom/
- Dengan nama tamu: https://felicidad126.github.io/edisi-monokrom/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/edisi-monokrom/?motion=full

Font Bodoni Moda dan Archivo dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/edisi-monokrom` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `edisi-monokrom/index.html` di `main`.
