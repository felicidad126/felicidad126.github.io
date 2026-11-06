# Edisi Monokrom — Preview Undangan Digital

Tema ini: **lookbook fashion hitam-putih yang sinematik**, dengan cerita "dari monokrom ke warna". Tipografi Bodoni besar, foto selebar layar bernuansa cetak perak, gambar bunga bergaris tinta, dan sedikit marmer di balik kartu RSVP. Urutannya: sampul, salam, mempelai, kisah kami (2019 · 2023 · 2026), simpan tanggal, acara, lookbook foto, RSVP, ucapan, amplop digital, dan penutup berwarna penuh. Di desktop, dan di HP dalam posisi mendatar, sampul tampil sebagai spread dua halaman.

- Motion: huruf nama naik satu per satu, saat dibuka sampul berganti seperti adegan film (bilah hitam menutup, kartu judul, lalu terbuka), foto tersingkap seperti tirai dan perlahan berwarna saat sampai di tengah layar, angka tanggal menggulung, dan lookbook bergeser ke samping mengikuti scroll di desktop.
- Foto mulai hitam-putih lalu berwarna; foto penutup dan lightbox tampil berwarna penuh.
- Musik: loop piano elektrik lembut yang dirender di browser saat halaman dimuat.

- Lihat (pratinjau dari branch `main`): https://felicidad126.github.io/edisi-monokrom/
- Dengan nama tamu: https://felicidad126.github.io/edisi-monokrom/?to=Nama%20Tamu
- Animasi penuh (abaikan setting reduced-motion): https://felicidad126.github.io/edisi-monokrom/?motion=full

Font Bodoni Moda dan Plus Jakarta Sans dimuat dari Google Fonts, berlisensi SIL Open Font License 1.1.

---

## Tentang branch ini

Branch `tema/edisi-monokrom` hanya berisi satu tema ini. Isinya dipisahkan dari `main` (commit `9751c55`): tema dipindah ke `index.html` di root, jadi branch ini bisa di-deploy sendiri, misalnya ke Netlify, Vercel, atau Cloudflare Pages. GitHub Pages repo ini tetap menayangkan `main`.

- Jalankan lokal: `python3 -m http.server`, lalu buka http://localhost:8000/ (parameter `?to=`, `?open`, dan `?motion=full` tetap berlaku).
- Tautan "Tema lain" sudah dihapus karena tema lain tidak ada di branch ini.
- `og:image` menunjuk ke https://invitation.helonoia.net/foto/cover.jpg (situs utama). Jika branch ini di-deploy di domain lain, ganti dengan URL absolut di domain itu.
- Jangan merge branch ini ke `main`, karena merge akan menghapus tema lain dari `main`. Perbaikan yang perlu ikut ke `main` dipindahkan manual ke `edisi-monokrom/index.html` di `main`.
