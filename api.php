<?php

$servername = "localhost";
$username = "root"; // Cambia esto si tu servidor MySQL tiene un usuario diferente
$password = ""; // Cambia esto si tu servidor MySQL tiene una contraseña
$dbname = "scrum_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Manejar la subida de archivos y guardar el registro
    $equipo = $_POST['equipo'];
    $sprint = $_POST['sprint'];
    $tipo = $_POST['tipo'];
    $comentarios = $_POST['comentarios'];

    $archivoName = $_FILES['archivo']['name'];
    $archivoPath = 'uploads/' . basename($archivoName);

    if (move_uploaded_file($_FILES['archivo']['tmp_name'], $archivoPath)) {
        $stmt = $conn->prepare("INSERT INTO registros (equipo, sprint, tipo, comentarios, archivoName, archivoPath) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sissss", $equipo, $sprint, $tipo, $comentarios, $archivoName, $archivoPath);

        if ($stmt->execute()) {
            echo json_encode(["id" => $stmt->insert_id]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error al subir el archivo."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Recuperar todos los registros
    $result = $conn->query("SELECT * FROM registros");
    $registros = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($registros);
}

$conn->close();

?>
