<?php
// * Sessão para verificação de loginde usuário
session_start();
 if(isset($_SESSION["user"])) {
    echo json_encode([
        "logged" => true
    ]);
} else {
    echo json_encode(["logged" => false]);
    exit;
}