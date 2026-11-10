<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../config/koneksi.php';

$stmt = $pdo->query('SELECT * FROM tugas ORDER BY tenggat ASC');
echo json_encode($stmt->fetchAll());