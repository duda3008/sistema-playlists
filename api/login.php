<?php
//*Login de usuário e verificação
session_start();
include 'connection.php';

$email = $_POST["email"];
$senha = $_POST["pass-user"];


if (isset($_SESSION['user'])) {
    echo json_encode([
        "message" => "Usuário já autenticado.",
        "type" => "error",
        "user" => $_SESSION['user']
    ]);
    exit;
}

if (empty($email) || empty($senha)) {
    echo json_encode([
        "message" => "Email e senha são obrigatórios.",
        "type" => "error",
    ]);
    exit;
}

$sql = "SELECT * FROM tb_usuarios  WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$data = $stmt->fetch();

if (!$data) {
    echo json_encode([
        "message" => "Email não encontrado. Por favor, cadastre-se para efetuar o login.",
        "type" => "error",
    ]);
    exit;
}

if (!password_verify($senha, $data["senha"])) {
    echo json_encode([
        "message" => "Senha incorreta.",
        "type" => "error",
    ]);
    exit;
}



$_SESSION["user"] = $data;

echo json_encode([
    "message" => "Usuário logado",
    "type" => "success",
    "user" => $data
]);
exit;
