<?php
//* Pegar detalhes das playlists do BD
include "connection.php";
include "session-php-check.php";

$id_playlist= $_GET['idPlaylist'];

if (!isset($_GET['idPlaylist']) || empty($_GET['idPlaylist'])) {
    echo json_encode([
        'type' => 'error',
        'message' => 'ID da playlist não fornecido.'
    ]);
    exit;
}

try {
    $sql = "SELECT   
            p.nome,
            p.descricao,
            p.imagem,
            p.favorita,
            p.data_acesso,
            h.id_humor,
            h.tipo as humor,
            h.descricao as descricao_humor,
            COUNT(DISTINCT pm.id_musica) as total_musicas,
            u.nome as usuario_nome
        FROM tb_playlists p
        LEFT JOIN tb_humor h ON p.id_humor = h.id_humor
        LEFT JOIN tb_playlist_musicas pm ON p.id_playlist = pm.id_playlist
        LEFT JOIN tb_usuarios u ON p.id_user = u.id_user
        WHERE p.id_playlist = ?
        GROUP BY p.id_playlist
        ORDER BY p.data_acesso DESC, p.nome ASC";
        
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_playlist]);
    $data = $stmt->fetch();

    if (!$data) {
        echo json_encode([
            'type' => 'error',
        'message' => 'Playlists não encontrada.',
        
        ]);
        exit;
    }

            echo json_encode([
            'type' => 'success',
            'message' => 'Detalhes da playlist carregada com sucesso.',
             'data' => $data
        ]);
    

    
} catch (PDOException $e) {
    error_log("Erro ao buscar playlists: " . $e->getMessage());
    echo json_encode([
        'type' => 'error',
        'message' => 'Erro ao carregar detalhes da  playlists',
    ]);
}