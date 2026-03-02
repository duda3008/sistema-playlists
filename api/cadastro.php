<?php
// * Cadastro de usuário no sistema
session_start();
include "connection.php";
//* verificações de dados
if (!isset($_POST["pass-user"]) || !isset($_POST["nome-user"]) || !isset($_POST["email"])) {
    echo json_encode([
        "type" => "error",
        "message" => "Dados incompletos",
    ]);
    exit;
}

$pass = $_POST["pass-user"];
$nome = $_POST["nome-user"];
$email = $_POST["email"];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "type" => "error",
        "message" => "O E-mail informado não é válido",
    ]);
    exit;
}


$sql = "SELECT * FROM tb_usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$data = $stmt->fetch();

if ($data) {
    echo json_encode([
        "message" => "Usuário já cadastrado, faça login",
        "type" => "error",
    ]);
    exit;
}

try {
  
 $img_padrao = "img/avatar.png";
   
    $sql = "INSERT INTO tb_usuarios (senha, nome, email, imagem) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        password_hash($pass, PASSWORD_DEFAULT),
        $nome,
        $email,
        $img_padrao
    ]);

    
    

    $id_user = $conn->lastInsertId();
    
    //* Buscar usuário cadastrado
    $sql = "SELECT * FROM tb_usuarios WHERE id_user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_user]);
    $user = $stmt->fetch();

    
    if (!$user) {
        throw new Exception("Usuário não encontrado após cadastro");
    }

    $_SESSION["user"] = $user;
    
    echo json_encode([
        "message" => "Cadastro efetuado com sucesso!",
        "type" => "success",
    ]);

} catch(Exception $e) {
    //* Log do erro para debugging
    error_log("Erro no cadastro: " . $e->getMessage());
    
    echo json_encode([
        "message" => "Erro ao cadastrar usuário no banco de dados: " . $e->getMessage(),
        "type" => "error",
    ]);
}
?>