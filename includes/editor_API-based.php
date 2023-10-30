<?php
echo  "<script>alert('Em desenvolvimento...');</script>";
// echo '<script type="text/javascript">location.reload(true);</script>';
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor JSON</title>
</head>
<body>
    <div style="margin-top: 100px; align-items: center; text-align: center; justify-content: center;">
        <h2>Formulário JSON</h2>

        <form id="jsonForm">
            <!-- <label for="id">ID:</label>
            <input type="number" id="id" name="id" required> -->
            <table class="mx-auto">
                <tr>
                    <td><label for="data">Data:</label></td>
                    <td><input type="text" id="data" name="data"></td>
                    <td><label for="nome">Nome:</label></td>
                    <td><input type="text" id="nome" name="nome" required></td>
                </tr>
                <tr>
                    <td><label for="sexo">Sexo:</label></td>
                    <td><input type="text" id="sexo" name="sexo"></td>
                    <td><label for="idade">Idade:</label></td>
                    <td><input type="number" id="idade" name="idade"></td>
                </tr>
                <tr>
                    <td><label for="municipio">Município:</label></td>
                    <td><input type="text" id="municipio" name="municipio"></td>
                    <td><label for="sintomas">Sintomas:</label></td>
                    <td><input type="text" id="sintomas" name="sintomas"></td>
                </tr>
                <tr>
                    <td><label for="comorbidades">Comorbidades:</label></td>
                    <td><input type="text" id="comorbidades" name="comorbidades"></td>
                    <td><label for="vacina">Vacina:</label></td>
                    <td><input type="text" id="vacina" name="vacina"></td>
                </tr>
                <tr>
                    <td><label for="leito">Leito:</label></td>
                    <td><input type="text" id="leito" name="leito"></td>
                    <td><label for="evolucao">Evolução:</label></td>
                    <td><input type="text" id="evolucao" name="evolucao"></td>
                </tr>
                <tr>
                    <td><label for="data_sintomas">Data dos Sintomas:</label></td>
                    <td><input type="text" id="data_sintomas" name="data_sintomas"></td>
                    <td><label for="exames">Exames:</label></td>
                    <td><input type="text" id="exames" name="exames"></td>
                </tr>
                <tr>
                    <td><label for="hipotese_diagnostica">Hipótese Diagnóstica:</label></td>
                    <td><input type="text" id="hipotese_diagnostica" name="hipotese_diagnostica"></td>
                    <td><label for="cotificacoes">Cotificações:</label></td>
                    <td><input type="text" id="cotificacoes" name="cotificacoes"></td>
                </tr>
                <tr>
                    <td><label for="data_de_atualizacao">Data de Atualização:</label></td>
                    <td><input type="text" id="data_de_atualizacao" name="data_de_atualizacao"></td>
                    <td><label for="status">Status:</label></td>
                    <td><input type="text" id="status" name="status"></td>
                </tr>
                <tr>
                    <td colspan="4" class="text-center"><button type="button" onclick="adicionarDados()">Adicionar</button></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <label for="startID">ID inicial:</label>
                        <input type="number" id="startID" name="startID" placeholder="ID inicial">
                        <label for="endID">ID final:</label>
                        <input type="number" id="endID" name="endID" placeholder="ID final">
                        <label for="quantidade">Listar:</label>
                        <input type="text" id="quantidade" name="quantidade" placeholder="Quantidade" required>
                        <button type="button" onclick="listarDados()">Listar</button>
                    </td>
                </tr>
            </table>
        </form>
        <div id="list"></div>
    </div>

    <script>
        function adicionarDados() {
            // Obtém os dados do formulário
            var formData = {
                // id: document.getElementById('id').value, // Se o ID for gerado automaticamente, não precisa ser especificado aqui
                data: document.getElementById('data').value,
                nome: document.getElementById('nome').value,
                sexo: document.getElementById('sexo').value,
                idade: document.getElementById('idade').value,
                municipio: document.getElementById('municipio').value,
                sintomas: document.getElementById('sintomas').value,
                comorbidades: document.getElementById('comorbidades').value,
                vacina: document.getElementById('vacina').value,
                leito: document.getElementById('leito').value,
                evolucao: document.getElementById('evolucao').value,
                data_sintomas: document.getElementById('data_sintomas').value,
                exames: document.getElementById('exames').value,
                hipotese_diagnostica: document.getElementById('hipotese_diagnostica').value,
                cotificacoes: document.getElementById('cotificacoes').value,
                data_de_atualizacao: document.getElementById('data_de_atualizacao').value,
                status: document.getElementById('status').value
            };

        // Faz a requisição POST para adicionar dados
        fetch('backend/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Verifica se a resposta tem um corpo antes de tentar parsear o JSON
            if (response.ok && response.status !== 204) {
                return response.json();
                // return response.text(); // Altera para text para lidar com respostas não JSON
            } else {
                return Promise.reject('Nenhum conteúdo');
            }
        })
        .then(data => {
            // Lida com a resposta, se necessário
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao processar a resposta:', error);
        });
        }

        function listarDados() {
        // Obtém a quantidade do formulário
        var quantidade = document.getElementById('quantidade').value;

        // Obtém startID e endID do formulário
        var startID = document.getElementById('startID').value;
        var endID = document.getElementById('endID').value;

        // Se os campos não forem preenchidos, use o primeiro e último IDs do JSON
        if (!startID || !endID) {
            // Os valores padrão agora são obtidos da coluna ID do JSON
            startID = 1;  
            endID = 100;  
        }

        // Faz a requisição GET para listar dados na faixa de IDs especificada
        fetch('backend/api.php?amount=' + quantidade + '&startID=' + startID + '&endID=' + endID)
        .then(response => response.json())
        .then(data => {
            // Lida com a resposta, se necessário
            console.log(data);

            // Atualiza a <div id="list"> com a listagem
            var listDiv = document.getElementById('list');
            listDiv.innerHTML = '<h3>Listagem:</h3>';
            
            if (data.length > 0) {
                // Cria uma lista não ordenada para exibir os dados
                var ul = document.createElement('ul');
                
                // Itera sobre os dados e adiciona itens à lista
                data.forEach(item => {
                    var li = document.createElement('li');
                    li.textContent = JSON.stringify(item);
                    ul.appendChild(li);
                });

                // Adiciona a lista à <div id="list">
                listDiv.appendChild(ul);
            } else {
                // Se não houver dados, exibe uma mensagem
                listDiv.innerHTML += '<p>Nenhum dado disponível.</p>';
            }
        });
    }

    </script>
</body>
</html>
