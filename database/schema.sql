tugasALTER TABLE tugas
  ADD COLUMN kategori ENUM('kuliah','pribadi') NOT NULL DEFAULT 'kuliah' AFTER judul,
  MODIFY mata_kuliah VARCHAR(100) NULL;