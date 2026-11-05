# Kelopak Mimpi — Preview Undangan Digital

Tema ini: **taman kelopak abstrak yang melayang di bawah cahaya kubah**, dari tren pernikahan Indonesia 2026 "Petal Dreamscape" dan warna Charming Champagne (Bridestory). Kelopak besar yang tembus pandang dengan kilau sampanye, palet blush, mauve, lilac, dan peach, foto dalam bingkai berbentuk kelopak, dan komposisi asimetris. Urutannya: sampul, salam, mempelai, kisah kami (2019 · 2023 · 2026), simpan tanggal, acara, galeri, RSVP, ucapan, amplop digital, dan penutup. Konsepnya berasal dari riset di bagian 11 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: kelopak mekar satu per satu saat dimuat dan cahaya kubah berdenyut pelan; saat dibuka, kuncup tujuh kelopak tumbuh di tengah lalu mekar ke luar; kelopak melayang dan bergeser mengikuti scroll, kursor, atau kemiringan HP; foto muncul dari jendela berbentuk kelopak.
- Musik: harpa dan celesta di atas pad hangat, dirender di browser saat halaman dimuat.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/kelopak-mimpi/
- Dengan nama tamu: https://felicidad126.github.io/kelopak-mimpi/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/kelopak-mimpi/?motion=full

Font Italiana, Urbanist, dan Ephesis dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/kelopak-mimpi` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `4d89132`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `kelopak-mimpi/index.html` di `main`.
