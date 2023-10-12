<?php

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            // Obtém o corpo da solicitação como uma string JSON
            $json_data = file_get_contents("php://input");

            // Converte a string JSON para um objeto PHP
            $data = json_decode($json_data);

            // Verifica se a decodificação JSON foi bem-sucedida
            if ($data !== null) {

                // Lógica para tratar os dados recebidos
                postInDB($data);

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
                response($amount);

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

    //resposta da API para o cliente no método GET
    //TODO amount significa o numero de valores do DBD devem ser enviados para o cliente que solicitou
    function response($amount = 10){
        
        //TODO o amount não vai para a lista, tu coloca na lista os JSON do bando de dados, ou já pode dar "echo $lista_de_jsons"
        $response['amount'] = $amount;
        
        $json_response = json_encode($response);
        echo $json_response;
    }

    //coloca os dados no DB provisório, em json
    function postInDB($data){

        //TODO colocar código para colocar o JSON "data" junto do bando de dados (JSON)

        //teste de atribuiação de variável atraves do objeto JSON em PHP
        //$amount = $data->amount;

        //lista para colocar as variaveis juntas e transformar em JSON mais fácil depois
        //$response['amount'] = $amount;

        //TODO ? transforma os dados em JSON, pode-se transformar diretamente e colocar no banco de dados, não sei se funciona
        $json_response = json_encode($data);

        //TODO retirar o "echo" quando fizer o código de passar pro bando de dados (JSON) pois é um POST e não precisa enviar dados
        echo $json_response;
    }
?>