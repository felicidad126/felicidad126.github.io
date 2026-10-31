# Amplop Linen — Preview Undangan Digital

Tema ini: **amplop di atas taplak linen** dengan liner bermotif, perangko, cap pos, dan segel lilin. Setelah segel diketuk, isinya dijelajahi sebagai **sembilan kartu die-cut** (bukan halaman panjang): undangan berbungkus vellum, acara, mempelai, foto, balasan RSVP, label ucapan, buku ucapan tamu, tanda kasih, dan penutup. Palet netral quiet luxury.

- Navigasi kartu: geser, tombol panah, tab bernama, atau tombol panah keyboard.
- Tinggi kartu mengikuti ruang di antara kepala dan navigasi. Di layar pendek isinya dipadatkan; isi yang masih lebih panjang dari kartu ditandai gradasi dan panah "Gulir".
- Motion: segel retak, tutup amplop terbuka, kartu menyebar lalu bergerak seperti kertas, charm berayun, kartu aktif miring mengikuti kursor atau kemiringan HP. Di iPhone efek kemiringan sengaja tidak dipakai, supaya tidak ada dialog izin sensor saat undangan dibuka.
- Musik: kotak musik 3/4 yang dirender di browser ke WAV, diputar lewat elemen `<audio>` (tetap terdengar di iPhone yang sedang senyap), mulai saat segel dibuka.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/amplop-linen/
- Dengan nama tamu: https://felicidad126.github.io/amplop-linen/?to=Nama%20Tamu
- Langsung ke kartu (lewati amplop): https://felicidad126.github.io/amplop-linen/?open
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/amplop-linen/?motion=full

Font Parisienne, EB Garamond, dan Marcellus dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/amplop-linen` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `917970e`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` masih menunjuk ke https://felicidad126.github.io/foto/cover.jpg. Jika di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `amplop-linen/index.html` di `main`.
