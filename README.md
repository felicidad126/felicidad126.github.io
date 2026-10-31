# Parallax & Sway — Preview Undangan Digital

Tema ini: palet **Nila Senja** (indigo malam, krem kertas, emas hangat, aksen mawar), tanpa tone sage.

- **Parallax**: sampul berlapis yang bergeser mengikuti kursor / kemiringan HP, foto di dalam bingkai bergerak lebih lambat dari halaman, band foto layar penuh, dan (di desktop) panggung foto yang berganti mengikuti bagian yang dibaca.
  Efek kemiringan HP hanya berjalan di Android. Di iPhone efek ini butuh izin, dan permintaan izin itu tidak bisa muncul sebelum tombol "Buka Undangan" diketuk, padahal efeknya ada di sampul.
- **Sway**: untaian melati, bintang, bulan, dan bunga emas tergantung lalu berayun seperti pendulum; bingkai foto mempelai dan polaroid galeri ikut terayun saat halaman digulir.
- Musik: waltz kotak musik 3/4 yang dirender di browser (tanpa file audio).

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/parallax-sway/
- Dengan nama tamu: https://felicidad126.github.io/parallax-sway/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/parallax-sway/?motion=full

Foto contoh ada di folder `foto/`. Font (Cormorant Garamond, Pinyon Script, Jost) dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/parallax-sway` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `parallax-sway/index.html` di `main`.
