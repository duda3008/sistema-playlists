<?php
//* Pegar a lista de humores do bd para renderização
include "connection.php";
require_once 'emojiMap.php';
try {
   
    $sql = "SELECT * FROM tb_humor ORDER BY tipo";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();
  
    echo json_encode([
        "message" => "Humores enviados com sucesso!",
        "type" => "success",
        "data" => $data
    ]);

} catch(Exception $e) {
    echo json_encode([
        "message" => "Erro ao carregar humores. " . $e->getMessage(),
        "type" => "error",
    ]);
}
