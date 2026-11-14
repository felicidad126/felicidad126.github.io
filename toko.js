// ===== PENGATURAN TOKO =====
// Dipakai katalog (index.html) dan bilah demo (demo/index.html), jadi cukup diisi di sini.
// nama: nama usaha yang tampil di kepala halaman. whatsapp: nomor format internasional tanpa "+" dan spasi, mis. "6281234567890".
// Selama whatsapp masih kosong, tombol membuka WhatsApp dengan pesan terisi dan pengunjung memilih kontak sendiri.
window.TOKO = {
  nama: "",
  whatsapp: "",
};

// Tautan WhatsApp dengan pesan yang sudah terisi. tema: nama tema, atau "umum" untuk pertanyaan umum.
window.TOKO.waLink = function (tema) {
  const nomor = String(window.TOKO.whatsapp || "").replace(/\D/g, "");
  const teks = tema === "umum"
    ? "Halo, saya tertarik dengan undangan pernikahan digital. Boleh minta info harga dan cara pesannya?"
    : `Halo, saya tertarik dengan undangan digital tema ${tema}. Boleh minta info harga dan cara pesannya?`;
  return `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`;
};
