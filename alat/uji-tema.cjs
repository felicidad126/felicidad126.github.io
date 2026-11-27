#!/usr/bin/env node
/*
 * Uji pengikat data sebuah tema.
 *
 *   node alat/uji-tema.cjs biru-kabut [tema lain...] [--foto <folder>]
 *
 * Untuk setiap tema:
 *   1. Demo: halaman tema terbuka tanpa galat, dan blok data-undangan sama dengan normalisasi(contoh-data.json).
 *   2. Identik: diisi dengan data contoh, teks dan atribut halaman tidak berubah (alt dan aria-label hanya dicatat).
 *   3. Bersih: diisi dengan uji-data.json, tidak tersisa data contoh (Laras, Denpasar, ...) di luar skrip.
 *   4. Tampil: hasil isian terbuka tanpa galat, sampul bisa dibuka, nama dan tanggal baru tampil, foto termuat.
 * Hasil isian ditulis ke uji-keluaran/ (diabaikan git). Dengan --foto, tangkapan layar HP disimpan ke folder itu.
 * Butuh Playwright (sudah terpasang di lingkungan pengembangan).
 */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const REPO = path.resolve(__dirname, "..");
const LIB = path.join(__dirname, "isi-undangan.js");
const I = require(LIB);
const CONTOH = JSON.parse(fs.readFileSync(path.join(__dirname, "contoh-data.json"), "utf8"));
const UJI = JSON.parse(fs.readFileSync(path.join(__dirname, "uji-data.json"), "utf8"));
const LARANGAN = [
  "Laras", "Bima", "Pramesti", "Wiryo", "Sekar Arum", "Arif Hidayat", "Siti Aminah", "laras.contoh", "bima.contoh",
  "Denpasar", "Contoh Raya", "Contoh Kedua", "Serbaguna", "Rumah Keluarga", "Desember 2026", "2026-12", "12.12.2026",
  "WITA", "Makassar", "1234", "0812", "-8.65", "115.21", "data contoh", "Assalamu", "Wassalamu", "Allah SWT",
  "Bertemu", "Selamanya", "Awal cerita", "Tawa kita",
];
const HARUS_TAMPIL = ["Nadia", "Raka", "Minggu, 14 Februari 2027", "Pemberkatan", "Gereja Uji Coba", "10.00 – 11.30 WIB", "Salam Damai Sejahtera"];

const args = process.argv.slice(2);
const iFoto = args.indexOf("--foto");
const FOLDER_FOTO = iFoto >= 0 ? path.resolve(args[iFoto + 1]) : null;
// Tanpa --foto, iFoto = -1; jangan sampai argumen pertama (indeks 0) ikut dibuang sebagai folder foto.
const TEMA = args.filter((a, i) => !a.startsWith("--") && (iFoto < 0 || i !== iFoto + 1));
if (!TEMA.length) {
  console.error("Pakai: node alat/uji-tema.cjs <folder-tema> [...] [--foto <folder>]");
  process.exit(2);
}

const TIPE = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".css": "text/css" };
function server() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = path.join(REPO, p);
    if (!f.startsWith(REPO)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": "application/json" }).end('{"galat":"tidak_ada"}'); return; }
    res.writeHead(200, { "Content-Type": TIPE[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    fs.createReadStream(f).pipe(res);
  });
}

// Galat yang bukan dari tema: font Google tidak terjangkau dari lingkungan uji, dsb.
const abaikan = (t) => /fonts\.(googleapis|gstatic)\.com|ERR_NAME_NOT_RESOLVED|ERR_TUNNEL|ERR_PROXY|net::ERR_/.test(t);

async function bukaHalaman(browser, url) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const galat = [];
  page.on("pageerror", (e) => galat.push(`pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" && !abaikan(m.text())) galat.push(`console: ${m.text()}`); });
  page.on("requestfailed", (r) => { if (!abaikan(r.url() + " " + (r.failure() || {}).errorText)) galat.push(`gagal muat: ${r.url()}`); });
  await page.goto(url, { waitUntil: "load" });
  return { page, galat };
}

function buangSkrip(html) {
  return html.replace(/<script(?![^>]*id="data-undangan")[^>]*>[\s\S]*?<\/script>/g, "");
}
function cariLarangan(teks) {
  const hasil = [];
  for (const kata of LARANGAN) {
    let i = teks.indexOf(kata);
    while (i >= 0) {
      hasil.push(`"${kata}" … ${teks.slice(Math.max(0, i - 60), i + kata.length + 40).replace(/\s+/g, " ")}`);
      i = teks.indexOf(kata, i + 1);
    }
  }
  return hasil;
}

async function ujiTema(browser, base, tema) {
  const gagal = [], catatan = [];
  const asli = fs.readFileSync(path.join(REPO, tema, "index.html"), "utf8");

  // 1. Demo
  {
    const { page, galat } = await bukaHalaman(browser, `${base}/${tema}/`);
    const blok = await page.evaluate(() => { const b = document.getElementById("data-undangan"); return b && b.textContent; });
    if (!blok) gagal.push("demo: tidak ada blok data-undangan");
    else if (JSON.stringify(JSON.parse(blok)) !== JSON.stringify(I.normalisasi(CONTOH))) gagal.push("demo: blok data-undangan berbeda dari normalisasi(contoh-data.json)");
    await page.waitForTimeout(500);
    gagal.push(...galat.map((g) => `demo: ${g}`));
    await page.close();
  }

  // 2. Identik dengan data contoh (dibandingkan di browser, memakai DOMParser)
  {
    const page = await browser.newPage();
    await page.goto(`${base}/alat/`);
    await page.addScriptTag({ path: LIB });
    const beda = await page.evaluate(({ html, data }) => {
      const p = new DOMParser();
      const a = p.parseFromString(html, "text/html"), b = p.parseFromString(html, "text/html");
      IsiUndangan.isiDokumen(b, data);
      const teks = (doc) => {
        const c = doc.documentElement.cloneNode(true);
        c.querySelectorAll("script,style,template,noscript").forEach((n) => n.remove());
        return c.textContent.replace(/\s+/g, " ").trim();
      };
      const out = { teks: null, atribut: [], catatan: [] };
      const ta = teks(a), tb = teks(b);
      if (ta !== tb) {
        let i = 0;
        while (i < ta.length && ta[i] === tb[i]) i++;
        out.teks = `asli: …${ta.slice(Math.max(0, i - 50), i + 60)}…\n      isi:  …${tb.slice(Math.max(0, i - 50), i + 60)}…`;
      }
      const ea = Array.from(a.querySelectorAll("*")), eb = Array.from(b.querySelectorAll("*"));
      if (ea.length !== eb.length) out.atribut.push(`jumlah elemen berbeda: ${ea.length} vs ${eb.length}`);
      for (let i = 0; i < Math.min(ea.length, eb.length); i++) {
        const x = ea[i], y = eb[i];
        const nama = new Set([...x.getAttributeNames(), ...y.getAttributeNames()].filter((n) => !n.startsWith("data-isi")));
        for (const n of nama) {
          const va = x.getAttribute(n), vb = y.getAttribute(n);
          if (va === vb) continue;
          const pesan = `<${x.tagName.toLowerCase()}${x.id ? "#" + x.id : ""}> ${n}: "${va}" → "${vb}"`;
          (n === "alt" || n === "aria-label" ? out.catatan : out.atribut).push(pesan);
        }
      }
      return out;
    }, { html: asli, data: CONTOH });
    if (beda.teks) gagal.push(`identik: teks berubah\n      ${beda.teks}`);
    gagal.push(...beda.atribut.map((x) => `identik: ${x}`));
    catatan.push(...beda.catatan.map((x) => `identik: ${x}`));

    // 3. Bersih dengan data lain
    const isi = (opsi) => page.evaluate(({ html, data, opsi }) => IsiUndangan.isiHtml(html, data, opsi), { html: asli, data: UJI, opsi });
    const klien = await isi({ folderTema: `/${tema}/`, acara: "uji-coba", asal: "https://invitation.helonoia.com" });
    const pratinjau = await isi({ folderTema: `/${tema}/`, asal: "https://invitation.helonoia.com" });
    await page.close();
    for (const [folder, html] of [[tema, klien], [`${tema}-pratinjau`, pratinjau]]) {
      fs.mkdirSync(path.join(REPO, "uji-keluaran", folder), { recursive: true });
      fs.writeFileSync(path.join(REPO, "uji-keluaran", folder, "index.html"), html);
    }
    if (!klien.includes('<meta name="acara" content="uji-coba">')) gagal.push("bersih: tag acara tidak terpasang");
    // Data URI di CSS (kabut, butiran, dsb.) tidak boleh ikut berubah saat alamat relatif dijadikan absolut: url(%23f) di
    // dalam SVG adalah rujukan ke filter atau mask di SVG itu sendiri, bukan alamat berkas.
    for (const m of asli.matchAll(/url\(\s*(["'])(data:[\s\S]*?)\1\s*\)/g)) {
      if (!klien.includes(m[2])) gagal.push(`bersih: data URI berubah (${m[2].slice(0, 48)}…)`);
    }
    gagal.push(...cariLarangan(buangSkrip(klien)).map((x) => `bersih: ${x}`));
    const skrip = (klien.match(/<script(?![^>]*id="data-undangan")[^>]*>[\s\S]*?<\/script>/g) || []).join("\n");
    catatan.push(...cariLarangan(skrip).map((x) => `di skrip (periksa manual): ${x}`));
  }

  // 4. Tampil
  {
    const { page, galat } = await bukaHalaman(browser, `${base}/uji-keluaran/${tema}-pratinjau/`);
    await page.waitForTimeout(600);
    if (FOLDER_FOTO) await page.screenshot({ path: path.join(FOLDER_FOTO, `${tema}-1-sampul.png`) });
    const tombol = page.locator("#openBtn, #open, #openInv, button:has-text('Buka Undangan')").first();
    if (await tombol.count()) await tombol.click().catch(() => {});
    await page.waitForTimeout(2500);
    // Gulir pelan supaya foto lazy dan animasi muncul.
    const tinggi = await page.evaluate(() => document.documentElement.scrollHeight);
    let n = 2;
    for (let y = 0; y < tinggi; y += 700) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(250);
      if (FOLDER_FOTO && y % 2100 === 0) await page.screenshot({ path: path.join(FOLDER_FOTO, `${tema}-${n++}.png`) });
    }
    await page.waitForTimeout(800);
    const teks = await page.evaluate(() => document.body.innerText.replace(/\s+/g, " "));
    for (const t of HARUS_TAMPIL) if (!teks.includes(t)) gagal.push(`tampil: "${t}" tidak terlihat`);
    for (const t of ["Laras", "Denpasar", "Desember 2026"]) if (teks.includes(t)) gagal.push(`tampil: masih terlihat "${t}"`);
    const rusak = await page.evaluate(() => Array.from(document.images).filter((im) => im.complete && im.currentSrc && !im.naturalWidth).map((im) => im.currentSrc));
    gagal.push(...rusak.map((s) => `tampil: foto gagal dimuat ${s}`));
    const kalender = await page.evaluate(() => { const a = document.querySelector('a[href*="calendar.google.com"]'); return a ? decodeURIComponent(a.href) : ""; });
    if (kalender && !/Nadia/.test(kalender)) gagal.push(`tampil: tautan kalender belum memakai data baru: ${kalender.slice(0, 160)}`);
    gagal.push(...galat.map((g) => `tampil: ${g}`));
    await page.close();
  }
  return { gagal, catatan };
}

(async () => {
  if (FOLDER_FOTO) fs.mkdirSync(FOLDER_FOTO, { recursive: true });
  const srv = server().listen(0);
  const base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await chromium.launch();
  let total = 0;
  try {
    for (const tema of TEMA) {
      const { gagal, catatan } = await ujiTema(browser, base, tema);
      total += gagal.length;
      console.log(`\n== ${tema}: ${gagal.length ? `${gagal.length} masalah` : "lulus"}`);
      for (const g of gagal) console.log(`  ✗ ${g}`);
      for (const c of catatan) console.log(`  · ${c}`);
    }
  } finally {
    await browser.close();
    srv.close();
  }
  process.exit(total ? 1 : 0);
})();
