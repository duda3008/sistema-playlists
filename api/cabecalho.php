<?php
//* Segurança para as configurações, o usuário não pode acessar certas páginas se não estiver logado
session_start();
$userName= "Usuário";
$img= "img/avatar.png";
if(isset($_SESSION["user"])) {
    echo json_encode([
    "message" => "sucess",
    "imagem" => $_SESSION["user"]["imagem"],
    "nome" => $_SESSION["user"]["nome"]
]);
} else {
    echo json_encode([
    "message" => "sucess",
    "imagem" => $img,
    "nome" => $userName
]);
}
