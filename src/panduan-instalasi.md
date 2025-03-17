
# Panduan Instalasi dan Penggunaan Aplikasi RAB-AHSP

## Daftar Isi
1. Persyaratan Sistem
2. Instalasi Melalui Visual Studio Code
3. Pemasangan Melalui GitHub
4. Struktur Proyek
5. Menjalankan Aplikasi
6. Menggunakan Aplikasi
7. Troubleshooting

## 1. Persyaratan Sistem

Sebelum memulai, pastikan komputer Anda telah memenuhi persyaratan berikut:

- Node.js (versi 16.0 atau lebih tinggi)
- npm (versi 8.0 atau lebih tinggi)
- Visual Studio Code
- Git
- XAMPP (untuk database MySQL dan server PHP)
- Browser web modern (Chrome, Firefox, Edge)

## 2. Instalasi Melalui Visual Studio Code

### Langkah 1: Persiapan Lingkungan
1. Unduh dan instal Node.js dari [nodejs.org](https://nodejs.org/)
2. Unduh dan instal Visual Studio Code dari [code.visualstudio.com](https://code.visualstudio.com/)
3. Unduh dan instal XAMPP dari [apachefriends.org](https://www.apachefriends.org/)
4. Instal ekstensi berikut di Visual Studio Code:
   - ESLint
   - Prettier
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense

### Langkah 2: Menyiapkan Proyek
1. Buka Visual Studio Code
2. Buat folder baru untuk proyek Anda
3. Buka terminal di VS Code (Menu: Terminal > New Terminal)
4. Jalankan perintah berikut untuk membuat proyek React + Vite dengan TypeScript:

```bash
npm create vite@latest rab-ahsp -- --template react-ts
cd rab-ahsp
npm install
```

### Langkah 3: Instalasi Dependensi
Instal semua dependensi yang diperlukan dengan menjalankan perintah berikut di terminal:

```bash
npm install react-router-dom @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select tailwindcss postcss autoprefixer tailwind-merge class-variance-authority clsx lucide-react uuid xlsx
```

### Langkah 4: Konfigurasi Tailwind CSS
1. Jalankan perintah berikut untuk inisialisasi Tailwind CSS:

```bash
npx tailwindcss init -p
```

2. Buat file konfigurasi tailwind dengan menyalin kode dari repositori GitHub.

### Langkah 5: Menyalin Kode Sumber
Salin semua file dari repositori ke proyek Anda dengan struktur folder yang sama.

## 3. Pemasangan Melalui GitHub

### Langkah 1: Clone Repositori
1. Pastikan Git telah terinstal di komputer Anda.
2. Buka terminal dan jalankan perintah berikut:

```bash
git clone https://github.com/username/rab-ahsp.git
cd rab-ahsp
npm install
```

### Langkah 2: Konfigurasi Database
1. Buka XAMPP Control Panel dan mulai Apache dan MySQL.
2. Buka browser dan akses phpMyAdmin di http://localhost/phpmyadmin.
3. Buat database baru dengan nama `rab_ahsp`.
4. Import skema database dari file `database/rab_ahsp.sql` yang ada di repositori.

### Langkah 3: Konfigurasi Koneksi Database
Buat file `.env` di root proyek dengan isi sebagai berikut:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=rab_ahsp
```

## 4. Struktur Proyek

Berikut adalah struktur proyek yang perlu dibuat:

```
rab-ahsp/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── ...
│   │   ├── Footer.tsx
│   │   ├── ItemForm.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── CreateRab.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── RabList.tsx
│   │   └── ViewRab.tsx
│   ├── services/
│   │   └── rabService.ts
│   ├── types/
│   │   └── rab.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 5. Menjalankan Aplikasi

### Development Mode
1. Buka terminal di root proyek
2. Jalankan perintah:

```bash
npm run dev
```

3. Buka browser dan akses http://localhost:8080

### Production Build
1. Buat build produksi dengan perintah:

```bash
npm run build
```

2. Hasil build akan tersedia di folder `dist/`
3. Untuk menjalankan build produksi secara lokal:

```bash
npm run preview
```

## 6. Menggunakan Aplikasi

### Membuat RAB Baru
1. Klik menu "Buat RAB" pada navbar.
2. Isi formulir dengan informasi RAB:
   - Nama Proyek
   - Lokasi Proyek
   - Tanggal
3. Tambahkan item pekerjaan dengan mengklik tombol "Tambah Item".
4. Untuk setiap item, isi kategori AHSP:
   - Pekerja: masukkan koefisien dan harga satuan
   - Bahan: masukkan koefisien dan harga satuan
   - Alat: masukkan koefisien dan harga satuan
5. Klik "Simpan" untuk menyimpan RAB.

### Melihat Daftar RAB
1. Klik menu "Daftar RAB" pada navbar.
2. Daftar RAB yang telah dibuat akan ditampilkan.
3. Klik "Lihat" untuk melihat detail RAB.
4. Klik "Unduh Excel" untuk mengunduh RAB dalam format Excel.

## 7. Troubleshooting

### Masalah Koneksi Database
- Pastikan XAMPP berjalan dan MySQL aktif.
- Periksa kredensial database di file `.env`.
- Pastikan database `rab_ahsp` telah dibuat.

### Masalah Node.js / npm
- Jika terjadi error saat menjalankan `npm install`, coba hapus folder `node_modules` dan file `package-lock.json`, kemudian jalankan `npm install` kembali.
- Pastikan versi Node.js dan npm kompatibel dengan proyek.

### Masalah Browser
- Hapus cache browser atau gunakan mode incognito.
- Pastikan JavaScript diaktifkan di browser.

---

## Kontak

Jika Anda memiliki pertanyaan atau mengalami masalah lain, silakan hubungi kami melalui email di support@rab-ahsp.com atau buat issue di repositori GitHub kami.
