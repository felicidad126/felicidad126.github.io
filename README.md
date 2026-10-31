# Biru Kabut — Preview Undangan Digital

Tema ini: **pagi berkabut yang lembut dan romantis** dengan palet biru pastel dan abu. Foto muncul dari balik kabut, isi undangan berada di atas panel kaca buram, dan setiap bagian dihiasi ranting hydrangea biru bergaris halus. Komposisinya simetris dan lapang: salam, ayat QS Ar-Rum 21, mempelai dalam bingkai oval, kisah kami, acara, galeri, RSVP, ucapan, amplop digital, dan penutup.

- Motion: lapisan kabut melayang pelan di sampul dan di antara bagian; saat "Buka Undangan" ditekan, kabut menutup lalu tersibak ke samping. Foto bergerak dari buram ke tajam saat muncul, ranting hydrangea tergambar lalu mekar, digit hitung mundur berganti lembut.
- Musik: piano dan pad lembut yang dirender di browser (tanpa file audio).

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/biru-kabut/
- Dengan nama tamu: https://felicidad126.github.io/biru-kabut/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/biru-kabut/?motion=full

Font Gilda Display, Corinthia, dan Figtree dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/biru-kabut` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `biru-kabut/index.html` di `main`.
