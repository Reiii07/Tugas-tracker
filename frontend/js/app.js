const API = '../backend/api/tugas.php';
const daftar = document.getElementById('daftar-tugas');

async function muatTugas() {
  const res = await fetch(API);
  console.log('status:', res.status);

  const teks = await res.text();
  console.log('isi balasan:', teks);

  tampilkan(JSON.parse(teks));
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
    teks.textContent = ` ${t.judul} - ${t.mata_kuliah} (${t.tenggat}) `;
    if (centang.checked) {
      teks.style.textDecoration = 'line-through';
    }

    const tombolHapus = document.createElement('button');
    tombolHapus.textContent = 'Hapus';
    tombolHapus.addEventListener('click', () => hapusTugas(t.id));

    li.append(centang, teks, tombolHapus);
    daftar.appendChild(li);

    const tombolEdit = document.createElement('button');
    tombolEdit.textContent = 'Edit';
    tombolEdit.addEventListener('click', () => mulaiEdit(t));

    li.append(centang, teks, tombolEdit, tombolHapus);
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
    muatTugas();
  } else {
    console.log('Gagal menghapus tugas:', await res.text());
  }
}

let idEdit = null;

function mulaiEdit(t) {
  idEdit = t.id;
  document.getElementById('judul').value = t.judul;
  document.getElementById('mata-kuliah').value = t.mata_kuliah;
  document.getElementById('tenggat').value = t.tenggat;
  form.querySelector('button[type="submit"]').textContent = 'Simpan perubahan';
}

const form = document.getElementById('form-tugas');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    judul: document.getElementById('judul').value,
    mata_kuliah: document.getElementById('mata-kuliah').value,
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
    form.reset();
    idEdit = null;
    form.querySelector('button[type="submit"]').textContent = 'Tambah Tugas';
    muatTugas();
  } else {
    console.log('Gagal menyimpan tugas:', await res.text());
  }
});

muatTugas();