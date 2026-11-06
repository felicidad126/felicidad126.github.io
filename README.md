# Kaca Patri — Preview Undangan Digital

Tema ini: **cahaya pagi yang menembus jendela orsi**, jendela kayu berkisi dengan kaca berwarna permata khas Persia. Dinding plester gading, kisi kayu walnut, dan kaca hijau tua, merah berry, safir, kunyit, serta lilac; pantulan cahaya berwarna jatuh di halaman. Urutannya: sampul berjendela orsi, salam, mempelai di jendela kecil, kisah kami (2019 · 2023 · 2026) dalam medali bulat, simpan tanggal, acara, galeri, RSVP, ucapan, amplop digital, dan penutup. Konsepnya berasal dari riset di bagian 10 [`REFERENSI-DESAIN.md`](REFERENSI-DESAIN.md).

- Motion: saat dimuat, kaca menyala satu per satu dari bawah seperti matahari terbit; saat dibuka, daun jendela terangkat seperti jendela geser dan cahaya pagi memenuhi layar; kisi tergambar lalu terisi warna, potret tersingkap dari balik kaca, dan pantulan cahaya bergeser mengikuti scroll.
- Musik: petikan ala santur di atas dengung lembut, dirender di browser saat halaman dimuat.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/kaca-patri/
- Dengan nama tamu: https://felicidad126.github.io/kaca-patri/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/kaca-patri/?motion=full

Font Playfair Display dan Spectral dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/kaca-patri` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `9751c55`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` menunjuk ke https://invitation.helonoia.net/foto/cover.jpg (situs utama). Jika branch ini di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `kaca-patri/index.html` di `main`.
