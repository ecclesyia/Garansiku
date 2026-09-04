# GaransiKu

PWA offline-first untuk menyimpan kartu garansi digital dan menghasilkan Evidence Pack PDF klaim. Seluruh data tersimpan lokal di IndexedDB tanpa backend, autentikasi, atau API eksternal.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

## Struktur utama

- `src/db` — skema dan koneksi Dexie/IndexedDB
- `src/utils` — kompresi gambar, tanggal, data demo, dan PDF
- `src/components` — komponen UI reusable dan template Evidence Pack
- `src/pages` — dashboard, input garansi, detail, dan klaim
- `public` — ikon PWA

Data hanya berada pada browser/perangkat yang digunakan. Menghapus data situs browser akan menghapus arsip GaransiKu.
