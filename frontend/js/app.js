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
    li.textContent = `${t.judul} - ${t.mata_kuliah} (${t.tenggat})`;
    daftar.appendChild(li);
  });
}

const form = document.getElementById('form-tugas');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    judul: document.getElementById('judul').value,
    mata_kuliah: document.getElementById('mata-kuliah').value,
    tenggat: document.getElementById('tenggat').value,
  };

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    form.reset();
    muatTugas();
  } else {
    console.log('Gagal menambah tugas:', await res.text());
  }
});

muatTugas();