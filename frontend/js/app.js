const API = '../backend/api/tugas.php';
const daftar = document.getElementById('daftar-tugas');
let semuaTugas = [];
let filterAktif = 'semua';

async function muatTugas() {
  const res = await fetch(API);
  semuaTugas = await res.json();
  terapkanFilter();
}

function terapkanFilter() {
  const hasil = filterAktif === 'semua'
    ? semuaTugas
    : semuaTugas.filter((t) => t.kategori === filterAktif);
  tampilkan(hasil);
}

function tampilkan(tugas) {
  daftar.innerHTML = '';

  tugas.forEach((t) => {
    const li = document.createElement('li');

    const centang = document.createElement('input');
    centang.type = 'checkbox';
    centang.checked = Number(t.selesai) === 1;
    centang.addEventListener('change', () => ubahSelesai(t.id, centang.checked));

    const teks = document.createElement('span');
    const label = t.kategori === 'pribadi' ? 'Pribadi' : t.mata_kuliah;
    teks.textContent = ` ${t.judul} - ${label} (${t.tenggat}) `;
    if (centang.checked) {
      teks.style.textDecoration = 'line-through';
    }

    const tombolEdit = document.createElement('button');
    tombolEdit.textContent = 'Edit';
    tombolEdit.addEventListener('click', () => mulaiEdit(t));

    const tombolHapus = document.createElement('button');
    tombolHapus.textContent = 'Hapus';
    tombolHapus.addEventListener('click', () => hapusTugas(t.id));

    li.append(centang, teks, tombolEdit, tombolHapus);
    daftar.appendChild(li);
  });
}

async function ubahSelesai(id, selesai) {
  const res = await fetch(`${API}?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selesai: selesai ? 1 : 0 }),
  });

  if (res.ok) {
    muatTugas();
  } else {
    console.log('Gagal mengubah status:', await res.text());
  }
}

async function hapusTugas(id) {
  const res = await fetch(`${API}?id=${id}`, { method: 'DELETE' });
  if (res.ok) {
    if (Number(id) === Number(idEdit)) keluarModeEdit();
    muatTugas();
  }
}

let idEdit = null;

function mulaiEdit(t) {
  idEdit = t.id;
  document.getElementById('judul').value = t.judul;
  pilihKategori.value = t.kategori;
  aturMataKuliah();
  inputMataKuliah.value = t.mata_kuliah ?? '';
  document.getElementById('tenggat').value = t.tenggat;
  form.querySelector('button[type="submit"]').textContent = 'Simpan perubahan';
}

function keluarModeEdit() {
  form.reset();
  aturMataKuliah();
  idEdit = null;
  form.querySelector('button[type="submit"]').textContent = 'Tambah Tugas';
}

const form = document.getElementById('form-tugas');
const pilihKategori = document.getElementById('kategori');
const inputMataKuliah = document.getElementById('mata-kuliah');

function aturMataKuliah() {
  const kuliah = pilihKategori.value === 'kuliah';
  inputMataKuliah.hidden = !kuliah;
  inputMataKuliah.required = kuliah;
  if (!kuliah) inputMataKuliah.value = '';
}

pilihKategori.addEventListener('change', aturMataKuliah);
aturMataKuliah();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    judul: document.getElementById('judul').value,
    kategori: pilihKategori.value,
    mata_kuliah: inputMataKuliah.value,
    tenggat: document.getElementById('tenggat').value,
  };

  const url = idEdit ? `${API}?id=${idEdit}` : API;
  const method = idEdit ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

 if (res.ok) {
    keluarModeEdit();
    muatTugas();
  }
});

function tandaiFilterAktif() {
  document.querySelectorAll('#filter button').forEach((tombol) => {
    tombol.classList.toggle('aktif', tombol.dataset.filter === filterAktif);
  });
}

document.querySelectorAll('#filter button').forEach((tombol) => {
  tombol.addEventListener('click', () => {
    filterAktif = tombol.dataset.filter;
    terapkanFilter();
    tandaiFilterAktif();
  });
});

tandaiFilterAktif();
muatTugas();