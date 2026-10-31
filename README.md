# Truntum Terakota — Preview Undangan Digital

Tema ini: terakota tua dengan tinta putih, ditambah motif batik **truntum** sebagai aksen garis saja (bingkai, pembatas, pita pinggiran), bukan latar penuh. Truntum adalah motif batik Jawa yang lazim dipakai di pernikahan; motifnya melambangkan cinta yang terus bersemi.

- Motion: bunga truntum mekar kelopak demi kelopak, garis bingkai tumbuh dari sudut, foto tersingkap seperti tirai, bunga kecil gugur pelan di tepi sampul.
- Di desktop, panel foto dan nama menempel di kiri.
- Musik: kotak musik pentatonik dengan gong rendah, dirender di browser (tanpa file audio).

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/truntum-terakota/
- Dengan nama tamu: https://felicidad126.github.io/truntum-terakota/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/truntum-terakota/?motion=full

Font Fraunces dan Manrope dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/truntum-terakota` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `truntum-terakota/index.html` di `main`.
