# Lengkung Sage — Preview Undangan Digital

Preview tema undangan pernikahan **Lengkung Sage**: sage green + ivory, bingkai lengkung (arch), ornamen botani, aksen champagne. Tema ini ada di subfolder [`lengkung-sage/`](lengkung-sage/).

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/lengkung-sage/
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/lengkung-sage/?motion=full
- Langsung buka undangan: https://felicidad126.github.io/lengkung-sage/?open

Nama, tanggal, alamat, dan rekening di halaman ini adalah data contoh. Foto contoh dibuat dengan AI (Gemini), bukan foto mempelai sebenarnya; ornamen masih placeholder.

Font (Great Vibes, Lora, Inter) di-embed di `lengkung-sage/index.html` dan berlisensi SIL Open Font License 1.1, lihat folder `licenses/`.

---

## Tentang branch ini

Branch `tema/lengkung-sage` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `6ba0d80`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `lengkung-sage/index.html` di `main`.
