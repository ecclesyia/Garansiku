````
# SYSTEM INSTRUCTION & TASK SPECIFICATION
**Role:** Senior Full-Stack Frontend Architect & Lead Engineer (Specialized in Offline-First PWA & Client-Side PDF Systems)
**Context:** Proyek HOLOGY - Lomba/Hackathon dengan alokasi waktu pengembanan ketat (< 3 hari).
**Project Name:** GaransiKu Lite (PWA Offline-First Warranty Manager & Evidence Pack Generator)

---

## 1. CONTEXT & EXECUTIVE SUMMARY
GaransiKu Lite adalah PWA offline-first yang mengubah foto nota menjadi Kartu Garansi Digital serta mampu menghasilkan **Evidence Pack (PDF)** untuk kemudahan pengajuan klaim garansi secara manual.

**Tujuan Utama:**
Menghasilkan prototype *fully functional*, siap *demo/pitching* HOLOGY, berkinerja tinggi, berukuran kecil, dan **100% berjalan secara lokal (Zero External API Dependency)** untuk meminimalkan risiko kerentanan koneksi server saat penilaian.

---

## 2. STRICT MVP BOUNDARIES & TIME CONSTRAINTS (< 3 HARI)

### IN-SCOPE (Fitur Wajib MVP):
1. **PWA Setup:** Service Worker dasar (offline support) via `vite-plugin-pwa` + Installable Manifest.
2. **Local Storage:** IndexedDB menggunakan Dexie.js (Zero backend, zero auth).
3. **Pendaftaran Garansi:**
   - Upload 1 foto nota (dikompresi ke Base64/WebP client-side).
   - Form input: Nama Produk, Toko, Tanggal Pembelian, Durasi Garansi (Bulan), Nomor Seri.
   - Perhitungan otomatis `Tanggal Berakhir Garansi` via `date-fns`.
4. **Dashboard & Status Tracker:**
   - Tabs/Filter Status: **Aktif**, **Hampir Berakhir** (<= 30 hari), **Berakhir**.
   - List & Detail View Kartu Garansi.
5. **Klaim Garansi & Evidence Pack Generator:**
   - Form klaim: Deskripsi kerusakan, tanggal kejadian.
   - Upload maks 3 foto kerusakan.
   - Dynamic Live Preview & Export PDF via `jsPDF` / `html2canvas` (Berisi: Identitas produk, foto nota, foto kerusakan, checklist kelengkapan klaim, timestamp dokumen).
6. **Demo Mode:** Tombol "Muat Data Sample" (*Seeder*) untuk kemudahan demonstrasi juri dalam 1 klik.

### OUT-OF-SCOPE (DILARANG DIBUAT DAHULU):
- ❌ Tidak ada Backend/API/Firebase/Supabase (100% Client-side).
- ❌ Tidak ada Autentikasi/Login.
- ❌ Tidak ada Integrasi Email/WhatsApp/SMS otomatis.
- ❌ Tidak ada validasi keaslian nota via server.
- ❌ OCR Tesseract.js DIABAIKAN untuk fase MVP (Jangan sentuh sampai MVP 100% selesai).

---

## 3. TECH STACK & ARCHITECTURE MANDATE

- **Framework:** React 18+ (Vite) + TypeScript (Strict Mode).
- **Styling & UI:** Tailwind CSS v3 + Lucide React (Icons) + Shadcn UI / Radix UI primitives (opsional, prioritaskan komponen Tailwind murni untuk kecepatan).
- **State & Database:** Dexie.js (Wrapper IndexedDB) + React Hooks.
- **Date Handling:** `date-fns`.
- **PDF Generation:** `jsPDF` dengan `html2canvas` (atau `pdf-lib`).
- **PWA Plugin:** `vite-plugin-pwa`.
- **Image Compression:** `browser-image-compression` (MANDATORI: Cegah Quota Exceeded IndexedDB saat menyimpan image base64).

---

## 4. DATABASE SCHEMA (Dexie.js)

Buat struktur database IndexedDB yang rapi di `src/db/schema.ts`:

```typescript
export interface WarrantyItem {
  id?: number;
  productName: string;
  storeName: string;
  purchaseDate: string; // ISO String (YYYY-MM-DD)
  durationMonths: number;
  expiryDate: string; // Calculated ISO String
  serialNumber?: string;
  receiptImageBase64: string; // Compressed image
  createdAt: string;
}

export interface ClaimEvidence {
  id?: number;
  warrantyId: number;
  damageDate: string;
  damageDescription: string;
  damagePhotosBase64: string[]; // Max 3 items
  generatedAt: string;
}

````
Tolong laksanakan pengembangan aplikasi secara terstruktur dengan urutan modul sebagai berikut:
- [ ] Inisialisasi Vite + React + TypeScript + Tailwind CSS + Lucide Icons.
- [ ] Konfigurasi vite-plugin-pwa (offline caching, manifest icons, web manifest).
- [ ] Setup Dexie DB (src/db/index.ts) & Utilitas Image Compression (src/utils/imageCompressor.ts).
- [ ] Buat utilitas helper tanggal (src/utils/dateHelper.ts) menggunakan date-fns untuk menghitung sisa hari & status garansi (ACTIVE, EXPIRING_SOON, EXPIRED).
- [ ] Build Mobile-First Responsive Shell (Navbar/Header PWA, Bottom Navigation / Sidebar).
- [ ] Build Input Form (Upload Nota + Auto Compression + Live Date Calc).
- [ ] Build Dashboard List View (Card Layout dengan badge warna status garansi yang jelas: Hijau = Aktif, Kuning = Hampir Berakhir, Merah = Expired).
- [ ] Build Detail Page (Preview Nota, Detail Garansi, Tombol "Siapkan Klaim").
- [ ] Build Form Klaim Kerusakan (Maks 3 Foto, Deskripsi, Date Picker).
- [ ] Buat Visual Printable HTML Template untuk Evidence Pack.
- [ ] Implementasi fungsi generatePDF() yang mengonversi template bukti menjadi PDF A4 yang bersih, rapi, dan terstruktur (Foto Nota & Foto Kerusakan harus dirender dengan aspek rasio yang baik tanpa terpotong).
- [ ] Buat utilitas seedDemoData() untuk mengisi DB dengan 3 produk sampel (1 Aktif, 1 Hampir Berakhir, 1 Expired beserta gambar contoh placeholder).
- [ ] Tampilkan Indikator Offline Status & Tombol Install PWA Banner.
- [ ] Error Boundary & Empty States untuk UI.
PDF Evidence Pack yang dihasilkan HARUS berstruktur rapi seperti dokumen laporan formal:
1. Header: Logo/Teks "GaransiKu Lite - Document Evidence Pack Klaim Garansi" + Date Created.
2. Block 1: Identitas Produk & Toko (Tabel 2 kolom: Nama Produk, Toko, Tanggal Beli, Masa Garansi, No Seri, Status).
3. Block 2: Detail Kerusakan (Tanggal Kejadian, Deskripsi Kerusakan).
4. Block 3: Proof Images
   - Bukti 1: Foto Nota Pembelian (Fit width / Box Border).
   - Bukti 2: Foto Kerusakan (Grid 1-3 foto).
5. Block 4: Checklist Kelengkapan Klaim (Kotak Centang: [x] Nota Asli/Foto, [x] Fisik Produk, [x] Kartu Garansi/Evidence Pack, [ ] Kelengkapan Box/Aksesoris).
6. Footer: Document generated automatically via GaransiKu Lite PWA (Local-Only Verification).
1. JANGAN Menambah Dependency Berat di luar yang telah ditentukan.
2. Prioritaskan Kode yang Clean, Modular, dan Production-Ready.
3. Jangan biarkan any type di TypeScript. Tulis tipe data secara eksplisit.
4. Pastikan penanganan asynchronous IndexedDB dan kompresi gambar ditangani dengan try-catch dan loading state UI yang responsif.
5. Jalankan pengerjaan mulai dari Phase 1: Boilerplate, Setup, & Data Layer dan berikan struktur folder awal yang direkomendasikan.
Mari kita mulai. Buatkan struktur file proyek terlebih dahulu, kemudian berikan kode untuk Phase 1 dan Phase 2 secara komplit!
```

```
