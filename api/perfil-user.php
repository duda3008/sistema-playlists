<?php
//* Buscar do bd informações do usuário para renderização do perfil
session_start();
include "connection.php";

try {
    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "message" => "Usuário não autenticado",
            "type" => "error",
           
        ]);
        exit;
    }

    $user = $_SESSION["user"];
    $id = $user["id_user"];

    $sql = "SELECT * FROM usuarios WHERE id_user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);
    $data = $stmt->fetchAll();

    echo json_encode([
        "message" => "Informações enviadas com sucesso",
        "type" => "success",
        "user" => $data
    ]);
} catch (Exception $e) {
    echo json_encode([
        "message" => "Erro ao buscar informações do usuário",
        "type" => "error",
       
    ]);
}
