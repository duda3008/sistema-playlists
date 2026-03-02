<?php
//*favoriatr, desfavoritar, verificar favoritação de playlists
include "connection.php";
session_start();

try {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode([
            "message" => "Usuário não logado",
            "type" => "error"
        ]);
        exit;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $id_playlist = $input['id_playlist'] ?? null;
    $favorita = $input['favorita'] ?? false;
    $id_usuario = $_SESSION['user_id'];

    if (!$id_playlist) {
        echo json_encode([
            "message" => "ID da playlist não fornecido",
            "type" => "error"
        ]);
        exit;
    }

    if ($favorita) {
        //* Verificar se já está favoritada
        $check_sql = "SELECT * FROM playlist_favoritas WHERE id_usuario = ? AND id_playlist = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->execute([$id_usuario, $id_playlist]);
        
        if ($check_stmt->rowCount() == 0) {
            //* Adicionar aos favoritos
            $insert_sql = "INSERT INTO playlist_favoritas (id_usuario, id_playlist) VALUES (?, ?)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->execute([$id_usuario, $id_playlist]);
        }
        
        echo json_encode([
            "message" => "Playlist adicionada aos favoritos!",
            "type" => "success"
        ]);
    } else {
        //* Remover dos favoritos
        $delete_sql = "DELETE FROM playlist_favoritas WHERE id_usuario = ? AND id_playlist = ?";
        $delete_stmt = $conn->prepare($delete_sql);
        $delete_stmt->execute([$id_usuario, $id_playlist]);
        
        echo json_encode([
            "message" => "Playlist removida dos favoritos!",
            "type" => "success"
        ]);
    }

} catch(Exception $e) {
    echo json_encode([
        "message" => "Erro ao favoritar playlist: " . $e->getMessage(),
        "type" => "error"
    ]);
}
?>