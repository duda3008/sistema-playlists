<?php
//*Cadastro de nova playlist
include "connection.php";


include "session-php-check.php";

$user = $_SESSION["user"];
$id_user = $user["id_user"];

$nome = $_POST["nomePlaylist"] ?? '';
$descricao = $_POST["descPlaylist"] ?? '';
$humor_id = $_POST["humorPlay"] ?? '';
$img = $_POST["imgPlaylist"] ?? 'img/playlistdefult.png';


error_log("Dados recebidos:");
error_log("nomePlaylist: " . $nome);
error_log("descPlaylist: " . $descricao);
error_log("humorPlay: " . $humor_id);
error_log("imgPlaylist: " . $img);

if (empty($nome) || empty($humor_id)) {
    echo json_encode([
        'type' => 'error', 
        'message' => 'Nome e humor são obrigatórios. Recebido: nome=' . $nome . ', humor=' . $humor_id
    ]);
    exit;
}

$humor_id = (int)$humor_id;

//* Validar se o humor existe
try {
    $sql = "SELECT id_humor FROM tb_humor WHERE id_humor = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$humor_id]);
    
    if (!$stmt->fetch()) {
        echo json_encode([
            'type' => 'error', 
            'message' => 'Humor inválido: ID ' . $humor_id . ' não encontrado'
        ]);
        exit;
    }
} catch(PDOException $e) {
    echo json_encode([
        'type' => 'error', 
        'message' => 'Erro ao validar humor: ' . $e->getMessage()
    ]);
    exit;
}

//* Inserir playlist
try {
   
    $sql = "INSERT INTO tb_playlists (id_user, nome, descricao, id_humor, imagem) 
            VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $id_user,
        $nome,
        $descricao,
        $humor_id, 
        $img,
    ]);
    
   
    $playlist_id = $conn->lastInsertId();
    
    echo json_encode([
        "message" => "Playlist criada com sucesso!",
        "type" => "success",
        "id" => $playlist_id 
    ]);
    
} catch(Exception $e) {
    error_log("Erro ao inserir playlist: " . $e->getMessage());
    echo json_encode([
        "message" => "Falha ao criar playlist: " . $e->getMessage(),
        "type" => "error",
    ]);
}
?>