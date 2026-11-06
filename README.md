# Riviera Kobalt — Preview Undangan Digital

Tema ini: **pernikahan ala beach club Riviera Italia di Bali**, cerah dan terasa dilukis tangan. Palet kobalt, putih gading, kuning lemon, dan hijau daun; ubin majolika dan ranting lemon digambar seperti sapuan kuas. Kanopi beach club bergaris bertepi scallop di sampul, potret mempelai di dalam piring keramik, kisah kami (2019 · 2023 · 2026) sebagai garis pantai, acara sebagai kartu menu beach club ("il Menu"), galeri berupa kartu pos berbingkai ubin, RSVP sebagai kartu "Reservasi", dan penutup saat golden hour. Konsepnya berasal dari riset tren 2027 di bagian 9 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: kanopi terbentang lalu berkibar, ranting lemon tumbuh dan bergoyang, saat dibuka tirai cabana bergaris turun lalu tergulung naik, ubin "terlukis" saat muncul, piring berputar ke tempatnya, garis pantai tergambar mengikuti scroll, kartu menu terbalik masuk, dan digit hitung mundur berganti seperti papan ubin.
- Musik: waltz mandolin dan gitar yang dirender di browser saat halaman dimuat.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/riviera-kobalt/
- Dengan nama tamu: https://felicidad126.github.io/riviera-kobalt/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/riviera-kobalt/?motion=full

Font DM Serif Display, Yellowtail, dan DM Sans dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/riviera-kobalt` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `9751c55`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` menunjuk ke https://invitation.helonoia.net/foto/cover.jpg (situs utama). Jika branch ini di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `riviera-kobalt/index.html` di `main`.
