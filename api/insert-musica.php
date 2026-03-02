<?php
//*Cadastro de nova música
include "connection.php";
include "session-php-check.php";

$user = $_SESSION["user"];
$id_user = $user["id_user"];

//* Verifica se é uma requisição JSON ou POST normal
$input = json_decode(file_get_contents('php://input'), true);
$isJsonRequest = ($input !== null);

//* Inicializar todas as variáveis
$nomeMusica = '';
$album = '';
$duracao = '';
$genero_id = '';
$imagem = 'img/playlistDefault.png';
$artista = '';
$nomeArtista = '';
$criarArtista = false;
$playlist_id = '';

if ($isJsonRequest) {
    //* Requisição JSON - buscar ou criar artista
    $nomeArtista = $input['nome_artista'] ?? '';
    $criarArtista = $input['criar_artista'] ?? false;
} else {
    //* Requisição POST normal - inserir música
    $nomeMusica = $_POST['nomeMusica'] ?? '';
    $album = $_POST['album'] ?? '';
    $duracao = $_POST['duracao'] ?? '';
    $genero_id = $_POST['genero_id'] ?? '';
    $imagem = $_POST['imagemUrl'] ?? 'img/playlistDefault.png';
    $artista = $_POST['artista'] ?? '';
    $nomeArtista = $_POST['artista'] ?? '';
    $playlist_id = $_POST['playlistId'] ?? '';
}

//* Se estiver buscando artista (requisição JSON)
if ($isJsonRequest && isset($input['nome_artista']) && !$criarArtista) {
    $nomeArtista = $input['nome_artista'];
    
    try {
        $sql = "SELECT id_artista, nome FROM tb_artistas 
                WHERE nome LIKE ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(["$nomeArtista%"]);
        $artista = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($artista) {
            echo json_encode([
                'type' => 'success',
                'message' => 'Artista encontrado',
                'data' => $artista
            ]);
        } else {
            echo json_encode([
                'type' => 'error',
                'message' => 'Artista não encontrado',
                'data' => null
            ]);
        }
    } catch (PDOException $e) {
        error_log("Erro ao buscar artista: " . $e->getMessage());
        echo json_encode([
            'type' => 'error',
            'message' => 'Erro ao buscar artista'
        ]);
    }
    exit;
}

//* Se estiver criando artista (requisição JSON)
if ($isJsonRequest && $criarArtista) {
    $nomeArtista = $input['nome_artista'];
    
    if (empty($nomeArtista)) {
        echo json_encode([
            'type' => 'error', 
            'message' => 'Nome do artista é obrigatório'
        ]);
        exit;
    }

    try {
        //* Verificar se artista já existe
        $sql_check = "SELECT id_artista, nome FROM tb_artistas WHERE nome = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->execute([$nomeArtista]);
        $artista_existente = $stmt_check->fetch(PDO::FETCH_ASSOC);
        
        if ($artista_existente) {
            echo json_encode([
                'type' => 'success',
                'message' => 'Artista já existe',
                'data' => $artista_existente
            ]);
        } else {
            //* Inserir novo artista
            $sql = "INSERT INTO tb_artistas (nome) VALUES (?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$nomeArtista]);
            
            $artista_id = $conn->lastInsertId();
            
            echo json_encode([
                'type' => 'success',
                'message' => 'Artista criado com sucesso',
                'data' => [
                    'id_artista' => $artista_id,
                    'nome' => $nomeArtista
                ]
            ]);
        }
    } catch (PDOException $e) {
        error_log("Erro ao criar artista: " . $e->getMessage());
        echo json_encode([
            'type' => 'error',
            'message' => 'Erro ao criar artista: ' . $e->getMessage()
        ]);
    }
    exit;
}

//* Se estiver inserindo música na playlist (requisição POST normal)
if (!$isJsonRequest) {
    if (empty($playlist_id) || empty($nomeMusica) || empty($artista) || empty($genero_id)) {
        echo json_encode([
            'type' => 'error', 
            'message' => 'Dados incompletos. Preencha todos os campos obrigatórios.'
        ]);
        exit;
    }

    $playlist_id = (int)$playlist_id;
    $genero_id = (int)$genero_id;

    try {
        //* 1. Verificar/inserir artista
        $sql_artista = "SELECT id_artista FROM tb_artistas WHERE nome = ?";
        $stmt_artista = $conn->prepare($sql_artista);
        $stmt_artista->execute([$artista]);
        $artista_existente = $stmt_artista->fetch(PDO::FETCH_ASSOC);
        
        if ($artista_existente) {
            $artista_id = $artista_existente['id_artista'];
        } else {
            //* Inserir novo artista
            $sql_inserir_artista = "INSERT INTO tb_artistas (nome) VALUES (?)";
            $stmt_inserir_artista = $conn->prepare($sql_inserir_artista);
            $stmt_inserir_artista->execute([$artista]);
            $artista_id = $conn->lastInsertId();
        }

      
        //* 2. Verificar/inserir álbum (se fornecido)
$album_id = null;
if (!empty($album)) {
    $sql_album = "SELECT id_album FROM tb_albuns WHERE nome = ? AND id_artista = ?";
    $stmt_album = $conn->prepare($sql_album);
    $stmt_album->execute([$album, $artista_id]);
    $album_existente = $stmt_album->fetch(PDO::FETCH_ASSOC);
    
    if ($album_existente) {
        $album_id = $album_existente['id_album'];
    } else {
        $sql_inserir_album = "INSERT INTO tb_albuns (nome, id_artista) VALUES (?, ?)";
        $stmt_inserir_album = $conn->prepare($sql_inserir_album);
        $stmt_inserir_album->execute([$album, $artista_id]);
        $album_id = $conn->lastInsertId();
    }
}

        //* 3. Inserir música
        $sql_musica = "INSERT INTO tb_musica (nome, id_genero, id_artista, id_album, duracao, imagem) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt_musica = $conn->prepare($sql_musica);
        $stmt_musica->execute([
            $nomeMusica,
            $genero_id,
            $artista_id,
            $album_id,
            $duracao,
            $imagem
        ]);
        $musica_id = $conn->lastInsertId();

        //* 4. Associar música à playlist
        $sql_playlist_musica = "INSERT INTO tb_playlist_musicas (id_playlist, id_musica) VALUES (?, ?)";
        $stmt_playlist_musica = $conn->prepare($sql_playlist_musica);
        $stmt_playlist_musica->execute([$playlist_id, $musica_id]);

        echo json_encode([
            'type' => 'success', 
            'message' => 'Música adicionada com sucesso',
            'id' => $musica_id
        ]);
        
    } catch (PDOException $e) {
        error_log("Erro ao inserir música: " . $e->getMessage());
        echo json_encode([
            'type' => 'error', 
            'message' => 'Erro ao adicionar música: ' . $e->getMessage()
        ]);
    }
}