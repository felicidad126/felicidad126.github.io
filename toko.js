// ===== PENGATURAN TOKO =====
// Dipakai katalog (index.html) dan bilah demo (demo/index.html), jadi cukup diisi di sini.
// nama: nama usaha yang tampil di kepala halaman. whatsapp: nomor format internasional, mis. "6281234567890".
// Awalan "0" (mis. "081234567890") otomatis diubah menjadi "62"; spasi, "+", dan "-" diabaikan.
// Judul halaman dan pratinjau tautan (<title>, og:title) di index.html dan demo/index.html ditulis terpisah
// karena pratinjau tautan tidak menjalankan JavaScript; ganti juga di sana bila nama berubah.
// Selama whatsapp masih kosong, tombol membuka WhatsApp dengan pesan terisi dan pengunjung memilih kontak sendiri.
window.TOKO = {
  nama: "Mengundang by Helonoia",
  whatsapp: "62812900433",
};

// Tautan WhatsApp dengan pesan yang sudah terisi. tema: nama tema, atau "umum" untuk pertanyaan umum.
window.TOKO.waLink = function (tema) {
  const nomor = String(window.TOKO.whatsapp || "").replace(/\D/g, "").replace(/^0/, "62");
  const teks = tema === "umum"
    ? "Halo, saya tertarik dengan undangan pernikahan digital. Boleh minta info harga dan cara pesannya?"
    : `Halo, saya tertarik dengan undangan digital tema ${tema}. Boleh minta info harga dan cara pesannya?`;
  return `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`;
};
