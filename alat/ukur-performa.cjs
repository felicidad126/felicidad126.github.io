#!/usr/bin/env node
/*
 * Ukur kelancaran sebuah undangan di HP kelas menengah tiruan, dalam tiga fase.
 *
 *   node alat/ukur-performa.cjs <folder-tema | url> [...] [--cpu 4] [--tanpa-musik] [--css "<aturan>"] [--json]
 *
 *   node alat/ukur-performa.cjs kaca-patri kelopak-mimpi
 *   node alat/ukur-performa.cjs "https://contoh.com/undangan/?to=Tamu"
 *   node alat/ukur-performa.cjs kaca-patri --tanpa-musik     (musik sintesis dimatikan, untuk pembanding)
 *     Hanya fase Muat yang sahih: setelah Buka, tema yang WAV sunyinya kosong (Biru Kabut, Riviera Kobalt,
 *     Kaca Patri, Kelopak Mimpi) memutar berkas kosong itu berulang karena musik asli tidak pernah siap.
 *   node alat/ukur-performa.cjs kaca-patri --css "*{mix-blend-mode:normal!important}"   (uji "bagaimana kalau tanpa X")
 *
 * Fase:
 *   Muat   8 detik pertama sejak alamat dibuka (sampul tampil, aset dimuat, musik dirender).
 *   Buka   6 detik setelah tombol "Buka Undangan" (atau tombol berlabel buka/open) diklik.
 *   Gulir  usapan sentuh 1000 px/detik sampai 7000 px.
 *
 * Angka per fase:
 *   main      persen waktu main thread terpakai (gaya, layout, skrip, paint).
 *   tersendat jumlah jeda antar-frame > 25 ms (dua frame 60 Hz atau lebih hilang); "/" lalu > 50 ms.
 *   tugas     total long task (> 50 ms) di main thread, dan yang terpanjang.
 *   gpu>16    jumlah frame yang menggambar dan menukar layar lebih lama dari 16 ms di thread GPU.
 *   thread    persen satu inti CPU per kelompok thread: main, compositor, raster, gpu (viz + GPU), audio.
 *
 * Lingkungan: Chromium headless dari Playwright, emulasi Pixel 7 (412x915, DPR 2,625), main thread
 * diperlambat --cpu kali (bawaan 4). GPU-nya SwiftShader (GPU perangkat lunak), jadi beban efek
 * seperti blur, blend, dan banyak layer ikut terlihat sebagai waktu CPU di thread gpu. Video juga
 * didekode dan digambar lewat perangkat lunak, jadi tampak lebih berat daripada di HP sungguhan.
 * Pakai angkanya untuk membandingkan antarhalaman atau sebelum/sesudah perubahan, bukan sebagai FPS HP.
 * Satu kali ukur bisa meleset beberapa frame; ulangi bila selisihnya tipis.
 */
"use strict";
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { chromium, devices } = require("playwright");

const REPO = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const iCpu = args.indexOf("--cpu");
const CPU = iCpu >= 0 ? Number(args[iCpu + 1]) : 4;
const iCss = args.indexOf("--css");
const CSS = iCss >= 0 ? args[iCss + 1] : "";
const TANPA_MUSIK = args.includes("--tanpa-musik");
const JSON_SAJA = args.includes("--json");
const TARGET = args.filter((a, i) => !a.startsWith("--") && (iCpu < 0 || i !== iCpu + 1) && (iCss < 0 || i !== iCss + 1));
if (!TARGET.length || !(CPU >= 1) || (iCss >= 0 && !CSS)) {
  console.error("Pakai: node alat/ukur-performa.cjs <folder-tema | url> [...] [--cpu 4] [--tanpa-musik] [--css \"<aturan>\"] [--json]");
  process.exit(2);
}

const TIPE = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".css": "text/css",
  ".mp4": "video/mp4", ".webm": "video/webm", ".mp3": "audio/mpeg", ".m4a": "audio/mp4" };
function server() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = path.join(REPO, p);
    if (!f.startsWith(REPO)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": TIPE[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    fs.createReadStream(f).pipe(res);
  });
}

// Kelompok thread menurut nama thread Chromium.
function kelompok(nama) {
  if (/^CrRendererMain$/.test(nama)) return "main";
  if (/^Compositor$/.test(nama)) return "compositor";
  if (/CompositorTileWorker|Raster/.test(nama)) return "raster";
  if (/VizCompositor|CrGpuMain|GpuMain/.test(nama)) return "gpu";
  if (/Audio/i.test(nama)) return "audio";
  if (/Media|VideoFrame/i.test(nama)) return "media";
  return "lain";
}

async function ukur(browser, label, url) {
  const ctx = await browser.newContext({ ...devices["Pixel 7"] });
  await ctx.addInitScript(() => {
    window.__frame = []; window.__tugas = [];
    const putar = (t) => { window.__frame.push(t); requestAnimationFrame(putar); };
    requestAnimationFrame(putar);
    try {
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__tugas.push([e.startTime, e.duration])))
        .observe({ type: "longtask", buffered: true });
    } catch (e) { /* browser tanpa longtask */ }
  });
  if (TANPA_MUSIK) await ctx.addInitScript(() => { window.OfflineAudioContext = undefined; window.webkitOfflineAudioContext = undefined; });
  // CSS tambahan dipasang paling akhir di <head>, jadi aturan !important menang atas CSS tema.
  if (CSS) await ctx.addInitScript((css) => document.addEventListener("DOMContentLoaded", () => {
    const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  }), CSS);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Performance.enable");
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
  const metrik = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
  const kini = () => page.evaluate(() => performance.now());

  const jejak = path.join(os.tmpdir(), `ukur-performa-${process.pid}-${Date.now()}.json`);
  await browser.startTracing(page, { path: jejak, categories: ["toplevel", "devtools.timeline", "disabled-by-default-devtools.timeline.frame", "cc", "viz", "gpu", "benchmark", "blink.user_timing"] });
  const hasil = { label, url, cpu: CPU, tanpaMusik: TANPA_MUSIK, css: CSS || undefined, fase: {} };
  try {
    try { await page.goto(url, { waitUntil: "commit", timeout: 60000 }); } catch (e) { hasil.galatMuat = e.message.split("\n")[0]; }
    const m0 = await metrik();
    await page.waitForTimeout(8000);
    const tMuat = await kini(); const m1 = await metrik();

    let tombol = null;
    for (const loc of [page.getByRole("button", { name: /buka|open|segel/i }), page.getByText(/^(buka|open|tap to open)/i)]) {
      try {
        const c = loc.first();
        if (await c.isVisible({ timeout: 500 })) {
          tombol = ((await c.innerText().catch(() => "")) || (await c.getAttribute("aria-label")) || "?").trim().slice(0, 40);
          await c.click({ timeout: 3000 });
          break;
        }
      } catch (e) { /* coba pencari berikutnya */ }
    }
    hasil.tombolBuka = tombol;
    const tBuka0 = await kini(); const m2 = await metrik();
    await page.waitForTimeout(6000);
    const tBuka1 = await kini(); const m3 = await metrik();

    const bisaGulir = await page.evaluate(() => {
      let h = document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight;
      for (const el of document.querySelectorAll("*")) {
        if (/(auto|scroll)/.test(getComputedStyle(el).overflowY)) h = Math.max(h, el.scrollHeight - el.clientHeight);
      }
      return h;
    });
    const total = Math.min(bisaGulir, 7000);
    for (let n = 0; n < total; n += 1400) {
      await cdp.send("Input.synthesizeScrollGesture", { x: 200, y: 500, yDistance: -Math.min(1400, total - n), speed: 1000, gestureSourceType: "touch", preventFling: true });
    }
    if (!total) await page.waitForTimeout(5000);
    const tGulir = await kini(); const m4 = await metrik();
    hasil.digulir = total;
    // Penanda waktu: menghubungkan performance.now() halaman dengan jam jejak.
    const dataHalaman = await page.evaluate(() => ({ frame: window.__frame, tugas: window.__tugas, acuan: performance.mark("ukur-performa-acuan").startTime }));
    await browser.stopTracing();

    const mainThread = (a, z) => Math.round(1000 * (z.TaskDuration - a.TaskDuration) / ((z.Timestamp - a.Timestamp) || 1)) / 10;
    const frame = (t0, t1) => {
      const f = dataHalaman.frame.filter((t) => t >= t0 && t < t1);
      const jeda = []; for (let i = 1; i < f.length; i++) jeda.push(f[i] - f[i - 1]);
      const tugas = dataHalaman.tugas.filter(([s]) => s >= t0 && s < t1).map(([, d]) => d);
      return { tersendat25: jeda.filter((x) => x > 25).length, tersendat50: jeda.filter((x) => x > 50).length, frameTerlama: Math.round(Math.max(0, ...jeda)),
        tugasMs: Math.round(tugas.reduce((a, b) => a + b, 0)), tugasTerlama: Math.round(Math.max(0, ...tugas)) };
    };
    hasil.fase.muat = { main: mainThread(m0, m1), ...frame(0, tMuat) };
    hasil.fase.buka = { main: mainThread(m2, m3), ...frame(tBuka0, tBuka1) };
    hasil.fase.gulir = { main: mainThread(m3, m4), ...frame(tBuka1, tGulir) };

    // Jejak: waktu CPU per kelompok thread dan frame GPU yang lambat, per fase.
    const j = JSON.parse(fs.readFileSync(jejak, "utf8"));
    const ev = j.traceEvents || j;
    const namaThread = {};
    for (const e of ev) if (e.ph === "M" && e.name === "thread_name") namaThread[e.pid + ":" + e.tid] = e.args.name;
    const tanda = ev.find((e) => e.name === "ukur-performa-acuan");
    if (!tanda) throw new Error("penanda waktu tidak ada di jejak");
    const nol = tanda.ts - dataHalaman.acuan * 1000;
    const ts = (t) => nol + t * 1000;
    const batas = { muat: [ts(0), ts(tMuat)], buka: [ts(tBuka0), ts(tBuka1)], gulir: [ts(tBuka1), ts(tGulir)] };
    for (const [fase, [a, z]] of Object.entries(batas)) {
      const waktu = {}; let gambar = 0, lambat = 0;
      for (const e of ev) {
        if (e.ph !== "X" || e.ts < a || e.ts >= z) continue;
        if (e.name === "ThreadControllerImpl::RunTask" || e.name === "ThreadPool_RunTask") {
          const k = kelompok(namaThread[e.pid + ":" + e.tid] || "");
          waktu[k] = (waktu[k] || 0) + (e.dur || 0);
        } else if (e.name === "Display::DrawAndSwap") { gambar++; if (e.dur > 16000) lambat++; }
      }
      const detik = (z - a) / 1e6;
      hasil.fase[fase].thread = Object.fromEntries(Object.entries(waktu).map(([k, v]) => [k, Math.round(v / 1e4 / detik)]));
      hasil.fase[fase].frameGpu = gambar;
      hasil.fase[fase].gpuLebih16 = lambat;
    }
  } finally {
    try { fs.unlinkSync(jejak); } catch (e) { /* jejak belum tertulis */ }
    await ctx.close();
  }
  return hasil;
}

function cetak(h) {
  console.log(`\n${h.label}${h.tanpaMusik ? " (tanpa musik)" : ""}${h.css ? ` (css: ${h.css})` : ""}  tombol buka: ${h.tombolBuka || "-"}  digulir: ${h.digulir} px  CPU ${h.cpu}x`);
  console.log("  fase   main  tersendat  frame terlama  tugas (terlama)  gpu>16  thread (% satu inti)");
  for (const [n, f] of Object.entries(h.fase)) {
    const th = Object.entries(f.thread || {}).filter(([, v]) => v >= 1).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", ");
    console.log(`  ${n.padEnd(6)} ${String(f.main + "%").padStart(5)}  ${String(f.tersendat25 + "/" + f.tersendat50).padStart(9)}  ${String(f.frameTerlama + " ms").padStart(13)}  ${String(f.tugasMs + " ms (" + f.tugasTerlama + ")").padStart(15)}  ${String(f.gpuLebih16).padStart(6)}  ${th}`);
  }
}

(async () => {
  const butuhServer = TARGET.some((t) => !/^https?:/.test(t));
  const srv = butuhServer ? server() : null;
  if (srv) await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  const browser = await chromium.launch();
  const semua = [];
  try {
    for (const t of TARGET) {
      const url = /^https?:/.test(t) ? t : `http://127.0.0.1:${srv.address().port}/${t.replace(/^\/|\/$/g, "")}/?to=Nama%20Tamu`;
      if (!/^https?:/.test(t) && !fs.existsSync(path.join(REPO, t, "index.html"))) { console.error(`Tema tidak ada: ${t}`); process.exitCode = 1; continue; }
      const h = await ukur(browser, t, url);
      semua.push(h);
      if (!JSON_SAJA) cetak(h);
    }
  } finally {
    await browser.close();
    if (srv) srv.close();
  }
  if (JSON_SAJA) console.log(JSON.stringify(semua, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
