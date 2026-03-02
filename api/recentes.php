<?php
//* Renderizar playlists acessadas recentemente
include "connection.php";
session_start();

if(!isset($_SESSION["user"])){
     echo json_encode([
        "message" => "Usuário não autenticado.",
        "type" => "error",
        "playlists" => []
    ]);
    exit;
}

$user= $_SESSION["user"];
$id= $user["id_user"];

try{
    $sql= "SELECT * FROM Playlists 
    WHERE id_user = ?
    ORDER BY data_acess DESC
    LIMIT 5";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);
    $data= $stmt->fetchAll();

 echo json_encode([
        "message" => "Playlists recentes obtidas com sucesso!",
        "type" => "success",
        "playlists" => $data
    ]);
} catch (Exception $e) {
    echo json_encode([
        "message" => "Erro ao buscar playlists recentes.",
        "type" => "error",
        
    ]);
}