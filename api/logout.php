<?php
//*Logout de usuário
session_start();
include "connection.php";
if (isset($_SESSION['user'])) {
    unset($_SESSION["user"]);
    echo json_encode([
        "message" => "Logout executado com sucesso",
        "type" => "success",
    ]);
    exit;
}else{
    echo json_encode([
        "message" => "É necessário fazer login pra efetuar o logout",
        "type" => "error",
    ]);
};

