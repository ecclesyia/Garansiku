# GaransiKu

PWA offline-first untuk menyimpan kartu garansi digital dan menghasilkan Evidence Pack PDF klaim. Seluruh data tersimpan lokal di IndexedDB tanpa backend, autentikasi, atau API eksternal.

## Menjalankan proyek

### Lingkungan Lokal

```bash
npm install
npm run dev
```

Build produksi lokal:

```bash
npm run build
```

### Menggunakan Podman (atau Docker)

1. **Build container image:**
   ```bash
   podman build -t garansiku-app .
   ```

2. **Jalankan container secara lokal:**
   ```bash
   podman run -d -p 8080:8080 --name garansiku-app garansiku-app
   ```
   Aplikasi dapat diakses melalui browser di `http://localhost:8080`.

3. **Perintah manajemen container:**
   ```bash
   # Melihat status container
   podman ps

   # Menghentikan container
   podman stop garansiku-app

   # Menghapus container
   podman rm garansiku-app
   ```

### Deploy ke Heroku (Container Stack)

Proyek ini telah dikonfigurasi 100% kompatibel dengan Heroku Container Runtime (`nginxinc/nginx-unprivileged`, port dinamis `$PORT`, dan `heroku.yml`).

1. **Login ke Heroku CLI:**
   ```bash
   heroku login
   ```

2. **Buat aplikasi Heroku (atau gunakan aplikasi yang sudah ada):**
   ```bash
   heroku create nama-aplikasi-anda
   ```

3. **Set stack aplikasi ke `container`:**
   ```bash
   heroku stack:set container
   ```

4. **Deploy ke Heroku:**
   ```bash
   git push heroku main
   ```
   *(atau `git push heroku deploy:main` jika berada di branch deploy)*

5. **Buka aplikasi di browser:**
   ```bash
   heroku open
   ```

## Struktur utama

- `src/db` — skema dan koneksi Dexie/IndexedDB
- `src/utils` — kompresi gambar, tanggal, data demo, dan PDF
- `src/components` — komponen UI reusable dan template Evidence Pack
- `src/pages` — dashboard, input garansi, detail, dan klaim
- `public` — ikon PWA

Data hanya berada pada browser/perangkat yang digunakan. Menghapus data situs browser akan menghapus arsip GaransiKu.
