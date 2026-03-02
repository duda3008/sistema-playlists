<?php

//* recebe id da playlist

//* pega do banco info da playlist com o id

//* faz update na tabela


//* devolve info da playlist em json

session_start();
include "connection.php";
if (!isset($_SESSION["user"])) {
    echo json_encode([
        "message" => "Usuário não autenticado.",
        "type" => "error",
    ]);
    exit;
}

if (!isset($_POST["id_playlist"])) {
    echo json_encode([
        "message" => "ID da playlist não fornecido.",
        "type" => "error",
    ]);
    exit;
}

$id_playlist = $_POST["id_playlist"];

try{
    $sql= "UPDATE Playlists SET data_acess= NOW() WHERE id_playlist= ?";
    $stmt= $conn->prepare($sql);
    $stmt->execute([$id_playlist]);

    echo json_encode([
        "message" => "Data de acesso atualizada com sucesso!",
        "type" => "success",
    ]);
}catch (Exception $e) {
    echo json_encode([
        "message" => "Erro ao atualizar data de acesso.",
        "type" => "error",
    ]);
}