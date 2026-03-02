<?php
//* Pegar detalhes das playlists do usuário
include "connection.php";
include "session-php-check.php";

$usuario_id = $_SESSION['user']['id_user'];
$humor_id = $_GET['humor_id'] ?? null;  //* Usando null coalescing para evitar o warning

try {
    $sql = "SELECT p.id_playlist,
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
        WHERE p.id_user = ?";
    
    //* Adicionar filtro por humor se especificado
    if ($humor_id) {
        $sql .= " AND p.id_humor = ?";
    }
    
    $sql .= " GROUP BY p.id_playlist";
        
    $stmt = $conn->prepare($sql);
    
    if ($humor_id) {
        $stmt->execute([$usuario_id, $humor_id]);
    } else {
        $stmt->execute([$usuario_id]);
    }
    
    $data = $stmt->fetchAll();

    $playlistsFormatadas = array_map(function($playlist) {
        return [
            'id_playlist' => (int)$playlist['id_playlist'],
            'nome' => $playlist['nome'],
            'descricao' => $playlist['descricao'] ?? '',
            'imagem' => $playlist['imagem'] ?: 'img/playlistDefult.png',
            'favorita' => (bool)$playlist['favorita'],
            'data_acesso' => $playlist['data_acesso'],
            'humor' => $playlist['humor'],
            'descricao_humor' => $playlist['descricao_humor'],
            'id_humor' => $playlist['id_humor'] ? (int)$playlist['id_humor'] : null,
            'total_musicas' => (int)$playlist['total_musicas'],
            'usuario_nome' => $playlist['usuario_nome']
        ];
    }, $data);

    $mensagem = count($playlistsFormatadas) > 0 ? 'Playlists carregadas com sucesso' : 'Nenhuma playlist encontrada';
    
    if ($humor_id && count($playlistsFormatadas) === 0) {
        $mensagem = 'Nenhuma playlist encontrada para este humor';
    }

    echo json_encode([
        'type' => 'success',
        'message' => $mensagem,
        'data' => $playlistsFormatadas,
        'total' => count($playlistsFormatadas),
        'filtro_aplicado' => $humor_id ? true : false
    ]);
    
} catch (PDOException $e) {
    error_log("Erro ao buscar playlists: " . $e->getMessage());
    echo json_encode([
        'type' => 'error',
        'message' => 'Erro ao carregar playlists',
    ]);
}
?>