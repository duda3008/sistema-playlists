<?php
//*Renderização de genêros do banco de dados
include "connection.php";
try {
   
    $sql = "SELECT * FROM tb_genero ORDER BY nome";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();

    echo json_encode([
        "message" => "Gêneros enviados com sucesso!",
        "type" => "success",
        "data" => $data
    ]);

} catch(Exception $e) {
    echo json_encode([
        "message" => "Erro ao carregar gêneros. " . $e->getMessage(),
        "type" => "error",
    ]);
}
?>