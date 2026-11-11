# Tugas Tracker

Aplikasi web pencatat tugas, dengan pengelompokan tugas kuliah dan tugas pribadi.

## Fitur
- Menambah tugas beserta kategori (kuliah atau pribadi) dan tanggal tenggat
- Mengedit dan menghapus tugas
- Menandai tugas selesai
- Filter tugas berdasarkan kategori
- Tampilan tanggal yang mudah dibaca

## Teknologi
- Frontend: HTML, CSS, JavaScript
- Backend: PHP (PDO), tanpa framework
- Database: MySQL (Laragon)

## Cara menjalankan
1. Instal [Laragon](https://laragon.org), lalu jalankan Apache dan MySQL.
2. Salin proyek ini ke folder `www` Laragon:
   ```bash
   git clone https://github.com/USERNAME/tugas-tracker.git
   ```
3. Buat database dengan menjalankan isi `database/schema.sql` di HeidiSQL.
4. Salin `backend/config/koneksi.example.php` menjadi `koneksi.php`, lalu isi user dan password database.
5. Buka `http://localhost/tugas-tracker/frontend/index.html`.

## Struktur folder
```
tugas-tracker/
├── backend/
│   ├── api/tugas.php
│   └── config/
├── database/schema.sql
├── frontend/
    ├── index.html
    ├── css/style.css
    └── js/app.js
```

## Rencana
- Lampiran PDF di tiap tugas
- Versi TypeScript dan React