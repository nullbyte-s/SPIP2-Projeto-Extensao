<?php

    $json_file_path = "../db/dados.json";
    $json_content = file_get_contents($json_file_path, false, stream_context_create(['http' => ['header' => 'Accept-Charset: UTF-8']]));

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            handlePostRequest();
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

	function handlePostRequest() {
		// Caminho para o arquivo JSON
		$anoAtual = date("Y");
		$json_file_path = "../db/dados_$anoAtual.json";

		// Se o arquivo não existir, cria um arquivo JSON vazio
		if (!file_exists($json_file_path)) {
			file_put_contents($json_file_path, '[]');
		}

		// Obtém o corpo da solicitação como uma string JSON
		$json_data = file_get_contents("php://input");

		// Converte a string JSON para um objeto PHP
		$data = json_decode($json_data);

		// Verifica se a decodificação JSON foi bem-sucedida
		if ($data !== null) {
			// Rota específica para a função postInDB
			if (isset($_GET['action']) && $_GET['action'] === 'postInDB') {
				postInDB($data);
			}

			// Se tudo estiver OK, retorna um código de status 200 (OK)
			http_response_code(200);
		} else {
			// Se os dados estiverem ausentes ou incorretos, retorna um código de status 400 (Bad Request)
			http_response_code(400);
		}
	}

    // Função para salvar o .json
    function postInDB($data) {
    
        // Converte $data para array associativo, se necessário
        $data = is_array($data) ? $data : (array)$data;
    
        // Carrega o conteúdo atual do arquivo, se existir
        $json_content = file_exists($json_file_path) ? file_get_contents($json_file_path) : '[]';
    
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
        $json_response = json_encode(['id' => $novoID, 'data' => $data], JSON_UNESCAPED_UNICODE);
    
        // Escreve o JSON resultante de volta no arquivo
        file_put_contents($json_file_path, json_encode($database, JSON_UNESCAPED_UNICODE));
    
        // Retorna a resposta como JSON
        echo $json_response;
    }    

?>