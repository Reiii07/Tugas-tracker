CREATE TABLE tugas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(100) NOT NULL,
  mata_kuliah VARCHAR(100) NOT NULL,
  tenggat DATE NOT NULL,
  selesai TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO tugas (judul, mata_kuliah, tportofolio_tugasenggat)
VALUES ('Contoh tugas', 'Contoh mata kuliah', '2026-11-30');

SELECT * FROM tugas;portofolio_tugas