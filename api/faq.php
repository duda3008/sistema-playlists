<?php
//*Renderização de faqs frequentes
include "connection.php";



try{
    $sql= "SELECT * FROM faqs
        ORDER BY pergunta";
        $stmt= $conn->prepare($sql);
        $stmt->execute();
        $data= $stmt->fetchAll();

        echo json_encode([
'type' => 'success',
'mesage' => 'Perguntas devolvidas com sucesso',
'data' => $data,
        ]);
} catch (PDOException $e) {
    echo json_encode([
        'type' => 'error',
        'message' => 'Erro ao carregar perguntas',
        
    ]);
}