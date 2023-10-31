<?php
$anoAtual = date("Y");
$jsonFilePath = dirname(__FILE__) . "/../db/dados_$anoAtual.json";

if (file_exists($jsonFilePath)) {
    $jsonData = file_get_contents($jsonFilePath);
    header('Content-Type: application/json');
    echo $jsonData;
} else {
    http_response_code(404);
    echo json_encode(array('error' => 'Arquivo não encontrado'));
}
?>
