<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../config/koneksi.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM tugas ORDER BY tenggat ASC');
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $judul      = trim($data['judul'] ?? '');
    $mataKuliah = trim($data['mata_kuliah'] ?? '');
    $tenggat    = $data['tenggat'] ?? '';

    if ($judul === '' || $mataKuliah === '' || $tenggat === '') {
        http_response_code(400);
        echo json_encode(['error' => 'judul, mata_kuliah, dan tenggat wajib diisi']);
        exit;
    }

    $stmt = $pdo->prepare('INSERT INTO tugas (judul, mata_kuliah, tenggat) VALUES (?, ?, ?)');
    $stmt->execute([$judul, $mataKuliah, $tenggat]);

    http_response_code(201);
    echo json_encode(['id' => $pdo->lastInsertId()]);
    exit;
}

if ($method === 'PUT') {
    $id = (int) ($_GET['id'] ?? 0);
    $data = json_decode(file_get_contents('php://input'), true);

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'id tidak valid']);
        exit;
    }

    if (isset($data['judul'])) {
        $judul      = trim($data['judul'] ?? '');
        $mataKuliah = trim($data['mata_kuliah'] ?? '');
        $tenggat    = $data['tenggat'] ?? '';

        if ($judul === '' || $mataKuliah === '' || $tenggat === '') {
            http_response_code(400);
            echo json_encode(['error' => 'judul, mata_kuliah, dan tenggat wajib diisi']);
            exit;
        }

        $stmt = $pdo->prepare('UPDATE tugas SET judul = ?, mata_kuliah = ?, tenggat = ? WHERE id = ?');
        $stmt->execute([$judul, $mataKuliah, $tenggat, $id]);
    } else {
        $selesai = !empty($data['selesai']) ? 1 : 0;
        $stmt = $pdo->prepare('UPDATE tugas SET selesai = ? WHERE id = ?');
        $stmt->execute([$selesai, $id]);
    }

    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'id tidak valid']);
        exit;
    }

    $stmt = $pdo->prepare('DELETE FROM tugas WHERE id = ?');
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
    exit;
}
http_response_code(405);
echo json_encode(['error' => 'Method tidak didukung']);