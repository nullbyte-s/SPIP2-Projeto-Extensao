<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $anoAtual = date("Y");
    $nomeArquivo = "../db/dados_$anoAtual.json";

    $uploadedFile = $_FILES["file"]["tmp_name"];

    // Carregar a biblioteca PHPSpreadsheet (se ainda não estiver instalada, instale usando: composer require phpoffice/phpspreadsheet)
    require __DIR__ . '/vendor/autoload.php';

    $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($uploadedFile);
    $worksheet = $spreadsheet->getActiveSheet();

    $jsonArray = [];
    $id = 0;

    foreach ($worksheet->getRowIterator(2) as $row) {
        $rowData = [];
        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(false);

        foreach ($cellIterator as $cell) {
            $rowData[] = $cell->getFormattedValue(); // Obtemos o valor formatado diretamente
        }

        // Verificar se todas as células da linha estão vazias
        if (!empty(array_filter($rowData))) {
            $jsonObject = [
                "id" => $id++,
                "internacao" => formatarData($rowData[0]),
                "semana" => $rowData[1],
                "paciente" => $rowData[2],
                "sexo" => $rowData[3],
                "idade" => $rowData[4],
                "municipio" => $rowData[5],
                "estado" => $rowData[6],
                "sintomas" => $rowData[7],
                "data_sintomas" => formatarData($rowData[8]),
                "comorbidades" => $rowData[9],
                "vacina" => $rowData[10],
                "leito" => $rowData[11],
                "evolucao" => $rowData[12],
                "exames" => $rowData[13],
                "data_exames" => formatarData($rowData[14]),
                "hipotese_diagnostica" => $rowData[15],
                "agravo" => $rowData[16],
                "data_agravo" => formatarData($rowData[17]),
                "finalizacao_do_caso" => $rowData[18],
                "data_finalizacao" => formatarData($rowData[19]),
            ];

            $jsonArray[] = $jsonObject;
        }
    }

    $jsonContent = json_encode($jsonArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    file_put_contents($nomeArquivo, $jsonContent);

    echo "Conversão concluída. Arquivo JSON gerado em $nomeArquivo";
}

function formatarData($data)
{
    if (is_numeric($data)) {
        // Se for um número, converter para uma data formatada
        $timestamp = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToTimestamp($data);
        return date('d/m/Y', $timestamp);
    } else {
        // Se for uma string de data, ajustar para o formato correto
        preg_match_all('/(\d{2})\/(\d{2})\/(\d{4})/', $data, $matches);

        if (!empty($matches[0])) {
            // Se a correspondência foi bem-sucedida, construir a data formatada
            return $matches[1][0] . '/' . str_pad($matches[2][0], 2, '0', STR_PAD_LEFT) . '/' . $matches[3][0];
        } else {
            // Se a correspondência falhou, retornar a string original
            return $data;
        }
    }
}

?>
