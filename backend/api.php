<?php

    $json_file_path = "../db/dados.json";
    $json_content = file_get_contents($json_file_path, false, stream_context_create(['http' => ['header' => 'Accept-Charset: UTF-8']]));

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            // Obtém o corpo da solicitação como uma string JSON
            $json_data = file_get_contents("php://input");

            // Converte a string JSON para um objeto PHP
            $data = json_decode($json_data);

            // Verifica se a decodificação JSON foi bem-sucedida
            if ($data !== null) {

                // Lógica para tratar os dados recebidos
                postInDB($data, $json_content);

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
                response($amount, $json_content);

                // Se tudo estiver OK, retorna um código de status 200 (OK)
                http_response_code(200);
            } else {
                // Se os dados estiverem ausentes ou incorretos, retorna um código de status 400 (Bad Request)
                http_response_code(400);
            }
            break;

        default:
            // Se o método da requisição não for POST nem GET, retorna um código de status 405 (Method Not Allowed)
            http_response_code(405);

            break;
    }

    // Resposta da API para o cliente no método GET
    function response($amount, $json_content){ // Antes: $amount = 10, atribuída nos parênteses; afeta alguma lógica do código?

        // Converte o conteúdo JSON para um objeto PHP
        $data = json_decode($json_content, true);

        // Verifica se a decodificação JSON foi bem-sucedida
        if ($data !== null) {
            // Extrai os primeiros $amount blocos de dados
            $result = array_slice($data, 0, $amount);

            // Retorna os dados como JSON
            $json_response = json_encode($result, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE preserva os caracteres especiais
            echo $json_response;
        } else {
            http_response_code(500);
        }
    }

    // Coloca os dados no DB provisório, em JSON
    function postInDB($data, $json_content) { // INCOMPLETO, precisa ser corrigido
    
        // Converte o conteúdo JSON para um array PHP
        $database = json_decode($json_content, true);
    
        // Obtém o último ID existente e incrementa +1
        $ultimoID = end($database)['id'];
        $novoID = $ultimoID + 1;
    
        // Atribui o novo ID aos dados
        $data['id'] = $novoID;
    
        // Adiciona os novos dados ao array
        $database[] = $data;
    
        // Codifica o array de volta para JSON
        $json_response = json_encode($database, JSON_UNESCAPED_UNICODE);
    
        // Escreve o JSON resultante de volta no arquivo
        file_put_contents($json_file_path, $json_response);
    
        // Remove o "echo" quando o código para passar para o banco de dados estiver pronto
        // echo $json_response;
        // return $json_response;
        // die();
    }

    //     //TODO colocar código para colocar o JSON "data" junto do bando de dados (JSON)

    //     //teste de atribuição de variável através do objeto JSON em PHP
    //     //$amount = $data->amount;

    //     //lista para colocar as variaveis juntas e transformar em JSON mais fácil depois
    //     //$response['amount'] = $amount;

    //     //TODO ? transforma os dados em JSON, pode-se transformar diretamente e colocar no banco de dados, não sei se funciona
    //     $json_response = json_encode($data);

    //     //TODO retirar o "echo" quando fizer o código de passar pro bando de dados (JSON) pois é um POST e não precisa enviar dados
    //     echo $json_response;
?>