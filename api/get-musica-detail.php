<?php
//* Detalhes das playlists vindas do bancode dados
include "connection.php";
include "session-php-check.php";
$id_playlist = $_GET['idPlaylist'];

if (!$id_playlist) {
    echo json_encode([
        'type' => 'error',
        'message' => 'ID da playlist não fornecido.'
    ]);
    exit;
}

try {
    $sql_playlist = "SELECT 
                        p.id_playlist,
                        p.nome as playlist_nome,
                        p.descricao as playlist_descricao,
                        p.imagem as playlist_imagem,
                        h.tipo as humor,
                        u.nome as usuario_nome
                    FROM tb_playlists p
                    LEFT JOIN tb_humor h ON p.id_humor = h.id_humor
                    LEFT JOIN tb_usuarios u ON p.id_user = u.id_user
                    WHERE p.id_playlist = ?";
    
    $stmt_playlist = $conn->prepare($sql_playlist);
    $stmt_playlist->execute([$id_playlist]);
    $playlist_info = $stmt_playlist->fetch();

    if (!$playlist_info) {
        echo json_encode([
            'type' => 'error',
            'message' => 'Playlist não encontrada.'
        ]);
        exit;
    }

    //* Buscar músicas da playlist com todos os detalhes
    $sql_musicas = "SELECT 
                        m.id_musica,
                        m.nome as musica_nome,
                        m.duracao,
                        m.imagem as musica_imagem,
                        a.nome as artista_nome,
                        a.id_artista,
                        alb.nome as album_nome,
                        alb.id_album,
                        alb.imagem as album_imagem,
                        g.nome as genero_nome,
                        g.id_genero
                    FROM tb_playlist_musicas pm
                    INNER JOIN tb_musica m ON pm.id_musica = m.id_musica
                    INNER JOIN tb_artistas a ON m.id_artista = a.id_artista
                    LEFT JOIN tb_albuns alb ON m.id_album = alb.id_album
                    INNER JOIN tb_genero g ON m.id_genero = g.id_genero
                    WHERE pm.id_playlist = ?
                    ORDER BY pm.id_pm ASC";
    
    $stmt_musicas = $conn->prepare($sql_musicas);
    $stmt_musicas->execute([$id_playlist]);
    $musicas = $stmt_musicas->fetchAll();

    //* Formatar os dados da playlist
    $playlist_formatada = [
        'id_playlist' => (int)$playlist_info['id_playlist'],
        'nome' => $playlist_info['playlist_nome'],
        'descricao' => $playlist_info['playlist_descricao'] ?? '',
        'imagem' => $playlist_info['playlist_imagem'] ?: 'img/playlistDefult.png',
        'humor' => $playlist_info['humor'],
        'usuario_nome' => $playlist_info['usuario_nome'],
        'total_musicas' => count($musicas)
    ];

    //* Formatar os dados das músicas
    $musicas_formatadas = array_map(function($musica) {
        return [
            'id_musica' => (int)$musica['id_musica'],
            'nome' => $musica['musica_nome'],
            'duracao' => $musica['duracao'],
            'imagem' => $musica['musica_imagem'] ?: ($musica['album_imagem'] ?: 'img/musicDefult.png'),
            'artista' => [
                'id_artista' => (int)$musica['id_artista'],
                'nome' => $musica['artista_nome']
            ],
            'album' => $musica['album_nome'] ? [
                'id_album' => (int)$musica['id_album'],
                'nome' => $musica['album_nome'],
                'imagem' => $musica['album_imagem']
            ] : null,
            'genero' => [
                'id_genero' => (int)$musica['id_genero'],
                'nome' => $musica['genero_nome']
            ]
        ];
    }, $musicas);

    echo json_encode([
        'type' => 'success',
        'message' => 'Músicas da playlist carregadas com sucesso.',
        'data' => [
            'playlist' => $playlist_formatada,
            'musicas' => $musicas_formatadas
        ]
    ]);

} catch (PDOException $e) {
    error_log("Erro ao buscar músicas da playlist: " . $e->getMessage());
    echo json_encode([
        'type' => 'error',
        'message' => 'Erro ao carregar músicas da playlist.'
    ]);
}
?>