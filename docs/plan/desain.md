# SYSTEM INSTRUCTION: FRONTEND UI/UX & STYLING GUIDELINE
**Role:** Lead UI/UX Designer & Senior Design System Engineer
**Project:** GaransiKu Lite (PWA Manager Garansi & Evidence Pack)
**Goal:** Membuat tampilan antarmuka (UI) yang ultra-clean, profesional, intuitif untuk semua umur (anak muda hingga orang tua), dan bebas dari estetika "AI Slop".

---

## 1. PALET WARNA (COLOR PALETTE & PSYCHOLOGY)
Berdasarkan konteks aplikasi (arsip dokumen, bukti hukum, keandalan, dan kejelasan status garansi), gunakan warna bertema **"Trustworthy Administrative & Utility"**:

### Primary & Neutral Colors:
- **Primary / Slate Blue (`#1E293B` / `slate-800`):** Memberikan kesan profesional, stabil, aman, dan serius layaknya dokumen resmi.
- **Secondary / Muted Blue (`#3B82F6` / `blue-500`):** Digunakan untuk aksi utama (CTA) seperti "Tambah Garansi" atau "Unduh PDF".
- **Background / Light Canvas (`#F8FAFC` / `slate-50`):** Latar belakang off-white yang nyaman di mata, tidak menyilaukan, dan mirip lembaran kertas putih/dokumen.
- **Card Background (`#FFFFFF`):** Warna kontras murni untuk kontainer informasi agar pemisahan antar komponen sangat tegas.
- **Text Primary (`#0F172A` / `slate-900`):** Warna teks utama dengan kontras sangat tinggi untuk kepastian keterbacaan (WCAG AAA).
- **Text Secondary (`#64748B` / `slate-500`):** Untuk label, deskripsi sekunder, dan helper text.

### Functional Status Colors (Indikator Garansi):
*Gunakan warna status dengan kontras yang jelas dan pendamping teks, jangan hanya mengandalkan warna.*
- **Status Aktif:** Green Olive / Emerald Dark (`#15803D` / `green-700`) — Terkesan aman, valid.
- **Status Hampir Berakhir (<= 30 hari):** Amber / Warm Gold (`#B45309` / `amber-700`) — Peringatan tanpa menimbulkan kepanikan berlebih.
- **Status Berakhir / Expired:** Crimson Red (`#B91C1C` / `red-700`) — Tegas dan menandakan garansi sudah hangus.

---

## 2. ATURAN KETAT: ANTI-AI SLOP & DESIGN RESTRICTIONS

### ⛔ DILARANG HARD (PROHIBITED):
1. **DILARANG MENGGUNAKAN EMOJI SAMA SEKALI** (contoh: ⚠️, 📄, ✅, 🚨, 📌). Emoji membuat aplikasi terlihat murahan, amatir, dan seperti hasil generasi bot. **Gunakan Lucide Icons (SVG)** berukuran 16px, 18px, atau 20px dengan `stroke-width={1.75}` atau `{2}`.
2. **DILARANG GRADIENT OVERUSE:** Hindari background gradien warna-warni ala Web3/Crypto (misal: ungu-pink-biru menyala). Gunakan warna solid (*flat*) atau *border stroke* subtle (`border-slate-200`).
3. **DILARANG FLOATING NEUMORPHISM / HEAVY GLASSMORPHISM:** Hindari efek bayangan blur yang sangat tebal atau efek kaca transparan yang menyulitkan mata orang tua/keterbatasan penglihatan.
4. **DILARANG BORDER-RADIUS EXTREME:** Gunakan radius standar yang rapi (`rounded-md` atau `rounded-lg`). Jangan gunakan pill-shape (`rounded-full`) untuk kartu dokumen/kontainer data utama.

---

## 3. LAYOUT STRUCTURE & PELETAKAN ELEMEN (CLEAN & AMAN)

### A. Prinsip Visual Hierarchy:
- **Spatial Grid:** Gunakan sistem *padding* dan *gap* yang konsisten berbasis kelipatan 4/8 (`p-4`, `p-6`, `gap-4`).
- **Card Design:** Setiap kartu garansi harus memiliki *border* tipis (`border border-slate-200`), bayangan sangat halus (`shadow-sm`), dan struktur internal yang jelas.
- **Micro-Interactions:** Hover state cukup berupa perubahan warna tipis (`hover:bg-slate-100`) atau elevasi *shadow* minimalis (`hover:shadow`).

### B. Layout Halaman Utama (Dashboard View):
1. **Header (Top Bar):**
   - Kiri: Logo/Nama "GaransiKu" (Font Bold, Clean, Slate-900) + Badge PWA (Indikator Status Offline/Online).
   - Kanan: Tombol Aksi Utama "➕ Tambah Garansi" (Button `bg-blue-600` solid).
2. **Statistik Ringkas (Quick Metrics):**
   - 3 Grid Sederhana: Total Garansi | Hampir Berakhir | Expired.
   - Menggunakan angka besar ber-font monospaced/bold dengan label kecil di bawahnya.
3. **Filter & Search Bar:**
   - Input pencarian sederhana dengan ikon *Search* di kiri.
   - Tab Filter Sederhana: `Semua`, `Aktif`, `Hampir Berakhir`, `Expired`.
4. **Daftar Kartu Garansi (Main List):**
   - Tampilan List atau Grid (2 kolom di desktop, 1 kolom di mobile).
   - Setiap kartu berisi:
     - Badge Status di pojok kanan atas (Contoh: Teks "Aktif • Sisa 120 Hari" dengan background pastel tipis + teks tua).
     - Nama Produk (Headings H3, Bold).
     - Nama Toko & Tanggal Expired (Small Text).
     - Thumbnail foto nota kecil di samping (dengan border).
     - Action link: "Lihat Detail" atau "Siapkan Klaim".

### C. Layout Form (Input Nota & Klaim PDF):
- **Single-Column Form:** Gunakan form 1 kolom vertikal untuk mobile-friendliness.
- **Upload Zone (Dropzone):** Area dotted border (`border-dashed border-slate-300 bg-slate-50`) yang jelas dengan instruksi eksplisit: *"Klik atau seret foto nota ke sini (Maks. 1 Foto)"*.
- **Label & Helper Text:**
  - Label di atas input field, huruf tegak, jelas (`text-sm font-medium text-slate-700`).
  - Helper text di bawah field dengan ukuran `text-xs text-slate-500`.

---

## 4. DESIGN ACCESSIBILITY (UNTUK BERBAGAI KALANGAN)

1. **Typographic Clarity:** Gunakan Font System Sans-Serif yang bersih (Inter, Roboto, atau System UI).
2. **Min Font Size:** Teks isi minimal `14px` (`text-sm`), teks label minimal `12px` (`text-xs`), judul kartu minimal `16px` (`text-base font-semibold`).
3. **Touch Targets:** Setiap tombol dan link interaktif pada versi mobile HARUS memiliki ukuran minimal **44x44 pixel** agar mudah ditekan oleh jempol orang tua.
4. **Clear Action Buttons:**
   - Primary Action: Solid Blue (`bg-blue-600 text-white hover:bg-blue-700`)
   - Secondary Action: Outline (`border border-slate-300 text-slate-700 hover:bg-slate-50`)
   - Danger/Delete: Destructive Red Outline atau Soft Red (`bg-red-50 text-red-600 border border-red-200`)

---

## 5. TASK FOR AI CODE ASSISTANT

Tolong gunakan panduan UI/UX dan Design System di atas saat membuat seluruh komponen Tailwind CSS untuk **GaransiKu Lite**.

**Instruksi Tambahan:**
- Selalu gunakan Lucide-React untuk ikonografi.
- Terapkan style Tailwind murni yang konsisten dengan palet warna `slate`, `blue`, `green`, `amber`, dan `red`.
- Pastikan tampilan sangat responsif dan terasa ramah, bersih, serta intuitif saat dibuka di HP maupun Laptop.
