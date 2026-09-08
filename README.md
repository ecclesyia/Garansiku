# GaransiKu

GaransiKu adalah aplikasi web progresif (PWA) offline-first untuk menyimpan kartu garansi digital, memantau masa berlaku garansi, dan membuat **Evidence Pack PDF** sebagai dokumen pendukung klaim. Data garansi, nota, dan bukti kerusakan disimpan secara lokal di IndexedDB pada browser, tanpa backend aplikasi, autentikasi, atau API eksternal.

## Deployment

Aplikasi dapat diakses melalui **[Demo GaransiKu](https://garage67-a1fc39478cd2.herokuapp.com/)** tanpa instalasi lingkungan pengembangan. Buka aplikasi saat terhubung internet terlebih dahulu agar aset untuk penggunaan offline dapat tersimpan.

## Fitur utama

- Menambahkan kartu garansi beserta informasi produk, toko, tanggal pembelian, durasi garansi, nomor seri, dan foto nota.
- Melihat ringkasan serta memfilter garansi berdasarkan status aktif, hampir berakhir, dan berakhir.
- Mencari garansi berdasarkan nama produk, toko, atau nomor seri.
- Mengisi kronologi kerusakan dan melampirkan hingga tiga foto untuk menghasilkan Evidence Pack PDF.
- Memuat tiga data sampel untuk demonstrasi.
- Mengakses aplikasi secara offline setelah aset tersimpan, serta memasang PWA pada browser yang mendukung.

## Teknologi

| Komponen | Teknologi |
| --- | --- |
| Antarmuka | React 18, TypeScript 5.6, Tailwind CSS 3 |
| Build | Vite 5 |
| Navigasi | React Router 7 |
| Penyimpanan lokal | IndexedDB melalui Dexie 4 |
| PWA dan cache | vite-plugin-pwa dan Workbox |
| Pembuatan PDF | jsPDF dan html2canvas |
| Pemrosesan gambar | browser-image-compression |
| Container deployment | Node.js 22 Alpine untuk build, Nginx untuk menyajikan aset |

Versi dependensi yang digunakan saat instalasi ditentukan oleh `package-lock.json`.

## Panduan instalasi

### Prasyarat

- Node.js **22.x**, mengikuti versi dasar pada `Dockerfile` proyek.
- npm yang disertakan dengan Node.js tersebut.
- Browser yang mendukung IndexedDB dan Service Worker.
- Koneksi internet untuk mengunduh dependensi dan memuat aplikasi pertama kali.

Tidak diperlukan database server, akun layanan, API key, atau file `.env` untuk menjalankan konfigurasi proyek yang tersedia.

### Langkah instalasi

1. Unduh dan ekstrak proyek, atau gunakan folder proyek yang sudah tersedia.
2. Buka terminal di folder `U-mc2-main`. Contoh pada Windows PowerShell:

   ```powershell
   cd D:\PROJECTS\CODEX\U-mc2-main
   ```

3. Periksa Node.js dan npm:

   ```sh
   node --version
   npm --version
   ```

4. Instal dependensi sesuai lockfile:

   ```sh
   npm ci
   ```

## Cara menjalankan aplikasi

### Mode pengembangan

```sh
npm run dev
```

Buka alamat yang ditampilkan terminal, biasanya `http://localhost:5173`. Jika port tersebut sedang digunakan, ikuti alamat port pengganti yang ditampilkan Vite. Hentikan server dengan `Ctrl+C`.

### Build produksi dan pratinjau lokal

```sh
npm run build
npm run preview
```

Perintah build menjalankan pemeriksaan TypeScript dan menghasilkan aset produksi di folder `dist`. Buka alamat pratinjau yang ditampilkan terminal, biasanya `http://localhost:4173`.

Gunakan build produksi untuk pengujian PWA dan offline karena konfigurasi proyek tidak mengaktifkan Service Worker pada mode pengembangan. `npm run preview` digunakan untuk memeriksa hasil build secara lokal; deployment proyek menggunakan Nginx.

### Menjalankan dengan Docker (opsional)

Dengan Docker terpasang dan aktif, jalankan dari folder proyek:

```sh
docker build -t garansiku .
docker run --rm -p 8080:8080 garansiku
```

Buka `http://localhost:8080`. Container menyajikan hasil build melalui Nginx dengan port bawaan `8080`. Konfigurasi Heroku tersedia dalam `heroku.yml`, sedangkan port runtime mengikuti variabel `PORT` yang diberikan Heroku.

## Akun dan data demo

**Akun demo tidak diperlukan.** Aplikasi tidak memiliki proses login atau registrasi, sehingga tidak ada email maupun kata sandi yang perlu dimasukkan.

Untuk mencoba aplikasi:

1. Buka deployment atau aplikasi lokal.
2. Klik **Muat data sampel** pada halaman **Garansi Anda**.
3. Tiga contoh berikut akan ditambahkan beserta nota ilustrasi:

   | Produk | Status saat data dimuat |
   | --- | --- |
   | [Demo] Laptop Kerja Pro 14 | Aktif |
   | [Demo] Mesin Kopi Mini | Hampir berakhir |
   | [Demo] Headphone Studio | Berakhir |

4. Buka salah satu kartu garansi lalu pilih **Siapkan klaim**.
5. Isi tanggal kejadian, deskripsi kerusakan sepanjang 10–1.200 karakter, dan satu hingga tiga foto kerusakan. Gunakan JPG atau PNG untuk percobaan awal.
6. Tinjau dokumen dan unduh Evidence Pack PDF.

Tanggal pada data sampel dihitung saat pemuatan. Tombol tidak menambahkan ulang sampel jika masih terdapat produk dengan awalan `[Demo]` di penyimpanan lokal.

## Spesifikasi lingkungan pengujian

Tabel berikut merupakan **acuan lingkungan untuk menjalankan pengujian**, bukan laporan hasil pengujian yang telah dilakukan. Versi OS/browser aktual dan hasil pengujian perlu dicatat saat pengujian dilaksanakan.

| Komponen | Acuan pengujian |
| --- | --- |
| Sistem operasi desktop | Windows 10/11 64-bit; lingkungan lain dapat diuji selama mendukung Node.js 22 |
| Runtime dan package manager | Node.js 22.x dan npm bawaan; catat versi tepatnya dengan `node --version` dan `npm --version` |
| Browser desktop | Chrome atau Edge dengan IndexedDB dan Service Worker aktif; catat versi browser yang digunakan |
| Tampilan desktop | Viewport 1366 × 768 piksel |
| Tampilan seluler | Emulasi viewport 390 × 844 piksel; uji perangkat Android dengan Chrome untuk instalasi PWA jika tersedia |
| Server pengujian | Build produksi melalui `npm run preview`, container lokal, atau deployment HTTPS |
| Koneksi | Online untuk pemuatan awal, kemudian offline untuk memeriksa cache dan fungsi lokal |
| Penyimpanan | Profil browser biasa dengan penyimpanan situs diizinkan, serta ruang untuk foto dan PDF |
| Data uji | Tiga data sampel, satu garansi buatan sendiri, foto nota, serta satu hingga tiga foto kerusakan |

### Pemeriksaan kode

Setelah instalasi dependensi:

```sh
npm run lint
npm run build
```

Lint memeriksa kode dengan ESLint tanpa mengizinkan warning. Build memeriksa TypeScript dan menghasilkan bundle produksi. Proyek belum menyediakan skrip `npm test`; pengujian fungsional dapat mengikuti skenario manual berikut.

### Skenario pengujian manual

| Skenario | Langkah dan hasil yang diharapkan |
| --- | --- |
| Data demo | Klik **Muat data sampel**; tiga kartu muncul. Klik kembali; data tidak terduplikasi. |
| Tambah garansi | Isi formulir beserta foto nota; data tersimpan dan dapat dibuka dari dashboard. |
| Pencarian dan filter | Cari nama produk, toko, atau nomor seri, lalu pilih filter status; daftar sesuai kriteria. |
| Persistensi | Muat ulang halaman pada alamat dan profil browser yang sama; kartu garansi tetap tersedia. |
| Dokumen klaim | Isi kronologi dan foto; PDF dapat diunduh dan menampilkan data produk, nota, serta bukti kerusakan. |
| Validasi formulir | Coba mengirim formulir dengan kolom wajib kosong atau tanpa foto kerusakan; aplikasi menolak penyimpanan/pembuatan dokumen yang belum lengkap. |
| Responsivitas | Periksa dashboard, detail, dan formulir pada viewport desktop serta seluler; kontrol dapat diakses. |
| Instalasi PWA | Jika browser menawarkan instalasi, pilih **Pasang** atau menu instalasi browser; aplikasi dapat dibuka dari pintasan. |

### Pengujian offline

1. Jalankan build produksi dan buka aplikasi melalui localhost atau deployment HTTPS saat online.
2. Tunggu sampai Service Worker aktif dan aset selesai tersimpan. Pada Chrome/Edge, periksa melalui DevTools → **Application** → **Service Workers** dan **Cache Storage**.
3. Muat data sampel dan buka salah satu detail garansi.
4. Aktifkan mode **Offline** pada DevTools → **Network**, lalu muat ulang halaman.
5. Pastikan dashboard dan detail tetap terbuka, lalu coba menambah garansi menggunakan foto lokal dan membuat PDF klaim.
6. Kembalikan pengaturan jaringan ke **No throttling** setelah selesai.

## Catatan penyimpanan

Data tersimpan pada browser, perangkat, dan origin (protokol, host, serta port) tempat aplikasi dibuka. Data pada deployment tidak otomatis muncul di localhost, browser lain, atau perangkat lain. Menghapus data situs/browser dapat menghapus garansi dan bukti yang tersimpan. PDF hasil unduhan disimpan sebagai file terpisah pada perangkat.
