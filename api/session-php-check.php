<?php
//* Sessão do usuário
session_start();
 if(!isset($_SESSION["user"])) {
    echo json_encode(["logged" => false]);
    exit;
}