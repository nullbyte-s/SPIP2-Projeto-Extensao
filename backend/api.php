<?php

    // Caminho para o arquivo JSON
    $anoAtual = date("Y");
    $json_file_path = "../db/dados_$anoAtual.json";
    
    // Obtém o conteúdo atual do arquivo, se existir
    $json_content = file_exists($json_file_path) ? file_get_contents($json_file_path, false, stream_context_create(['http' => ['header' => 'Accept-Charset: UTF-8']])) : '[]';

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            // Obtém o corpo da solicitação como uma string JSON
            $json_data = file_get_contents("php://input");

            // Converte a string JSON para um objeto PHP
            $data = json_decode($json_data);

            // Verifica se a decodificação JSON foi bem-sucedida
            if ($data !== null) {

                // Executa a ação com base no valor de 'action' no GET
                switch ($_GET['action']) {
                    case 'insertData':
                        insertData($data);
                        break;
                    case 'postInDB':
                        postInDB($data);
                        break;
                    default:
                        header('Content-Type: application/json');
                        echo json_encode(['error' => 'Ação não reconhecida']);
                        http_response_code(400);
                        break;
                }

                // // Verifica se a rota é específica para a função insertData
                // if (isset($_GET['action']) && $_GET['action'] === 'insertData') {
                //     insertData($data, $json_content);
                // }

                // // Verifica se a rota é específica para a função postInDB
                // if (isset($_GET['action']) && $_GET['action'] === 'postInDB') {
                //     postInDB($data);
                // }

                // Lógica para tratar os dados recebidos
                // postInDB($data);

                // Se tudo estiver OK, retorna um código de status 200 (OK)
                http_response_code(200);
            } else {
                // Se os dados estiverem ausentes ou incorretos, retorna um código de status 400 (Bad Request)
                http_response_code(400);
            }
            break;

        case 'GET':
            // Lógica para tratamento de requisição GET
            if (isset($_GET['amount']) && $_GET['amount'] != "") {
                $amount = $_GET['amount'];
        
                // Converte o conteúdo JSON para um array PHP
                $data = json_decode($json_content, true);
        
                // Obtém os IDs do array de dados
                $ids = array_column($data, 'id');
        
                // Obtém startID e endID do formulário
                $startID = isset($_GET['startID']) ? intval($_GET['startID']) : min($ids);
                $endID = isset($_GET['endID']) ? intval($_GET['endID']) : max($ids);
        
                // Se startID for maior que endID, troca os valores
                if ($startID > $endID) {
                    $temp = $startID;
                    $startID = $endID;
                    $endID = $temp;
                }
        
                response($amount, $json_content, $startID, $endID);
        
                // Se tudo estiver OK, retorna um código de status 200 (OK)
                http_response_code(200);
            } else {
                // Se os dados estiverem ausentes ou incorretos, retorna um código de status 400 (Bad Request)
                http_response_code(400);
            }
            break;           
    }

    // Resposta da API para o cliente no método GET
    function response($amount, $json_content, $startID, $endID) {
        // Converte o conteúdo JSON para um array PHP
        $data = json_decode($json_content, true);

        // Verifica se a decodificação JSON foi bem-sucedida
        if ($data !== null) {
            // Filtra os dados com base na faixa de IDs
            $filteredData = array_filter($data, function ($item) use ($startID, $endID) {
                $id = $item['id'];
                return $id >= $startID && $id <= $endID;
            });

            // Extrai os primeiros $amount blocos de dados da faixa filtrada
            $result = array_slice($filteredData, 0, $amount);

            // Retorna os dados como JSON
            $json_response = json_encode($result, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE preserva os caracteres especiais
            echo $json_response;
        } else {
            http_response_code(500);
        }
    }

    // Coloca os dados no DB provisório, em JSON
    function postInDB($data) {
        // Caminho para o arquivo JSON
        $anoAtual = date("Y");
        $json_file_path = "../db/dados_$anoAtual.json";

        // Converte $data para array associativo, se necessário
        $data = is_array($data) ? $data : (array)$data;

        // Obtém o conteúdo atual do arquivo, se existir
        $json_content = file_exists($json_file_path) ? file_get_contents($json_file_path) : '[]';

        // Adiciona os novos dados ao array
        $database[] = $data;

        // Converte o conteúdo JSON para um array PHP
        $database = json_decode($json_content, true);

        // Codifica o array de volta para JSON com formatação legível
        $json_response = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        // Escreve o JSON resultante no arquivo, sobrescrevendo o conteúdo existente
        file_put_contents($json_file_path, $json_response, LOCK_EX);
        
        // Retorna os dados adicionados, se necessário
        echo $json_response;
    }

    function insertData($data)
    {
        // Obtém o ID usando a função generateId
        $id = generateId();
    
        // Converte $data para array associativo, se necessário
        $data = is_array($data) ? $data : (array)$data;
    
        // Verifica se todos os campos estão vazios
        $camposVazios = array_reduce($data, function ($empty, $value) {
            return $empty && empty($value);
        }, true);
    
        // Se todos os campos estiverem vazios, não adiciona ao array
        if ($camposVazios) {
            return;
        }
    
        // Adiciona o ID aos dados
        $data['id'] = $id;
    
        // Caminho para o arquivo JSON
        $anoAtual = date("Y");
        $json_file_path = "../db/dados_$anoAtual.json";
    
        // Obtém o conteúdo atual do arquivo, se existir
        $json_content = file_exists($json_file_path) ? file_get_contents($json_file_path) : '[]';
    
        // Converte o conteúdo JSON para um array PHP
        $database = json_decode($json_content, true);
    
        // Adiciona os novos dados ao array
        $database[] = $data;
    
        // Codifica o array de volta para JSON com formatação legível
        $json_response = json_encode($database, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
        // Escreve o JSON resultante no arquivo, sem sobrescrever o conteúdo existente
        file_put_contents($json_file_path, $json_response);
    
        // Retorna os dados adicionados, se necessário
        echo $json_response;
    }    

    function generateId()
    {
        // Caminho para o arquivo JSON
        $anoAtual = date("Y");
        $json_file_path = "../db/dados_$anoAtual.json";

        // Obtém o conteúdo do arquivo JSON como uma string
        $jsonString = file_get_contents($json_file_path);

        // Converte a string JSON em um array associativo
        $data = json_decode($jsonString, true);

        // Se o JSON estiver vazio, retorna 1 como o primeiro ID
        if (empty($data)) {
            return 1;
        }

        // Obtém o último ID adicionando 1 ao ID do último elemento no array
        $ultimoId = end($data)['id'];
        return $ultimoId + 1;
    }

?>