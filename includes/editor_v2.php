<?php
echo  "<script>alert('Em desenvolvimento...');</script>";
// echo '<script type="text/javascript">location.reload(true);</script>';
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário JSON</title>
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
                // id: document.getElementById('id').value,
                data: document.getElementById('data').value,
                data: document.getElementById('nome').value,
                data: document.getElementById('sexo').value,
                data: document.getElementById('idade').value,
                data: document.getElementById('municipio').value,
                data: document.getElementById('sintomas').value,
                data: document.getElementById('comorbidades').value,
                data: document.getElementById('vacina').value,
                data: document.getElementById('leito').value,
                data: document.getElementById('evolucao').value,
                data: document.getElementById('data_sintomas').value,
                data: document.getElementById('exames').value,
                data: document.getElementById('hipotese_diagnostica').value,
                data: document.getElementById('cotificacoes').value,
                data: document.getElementById('data_de_atualizacao').value,
                data: document.getElementById('status').value
            };

            // Faz a requisição POST para adicionar dados
            fetch('backend/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Lida com a resposta, se necessário
                console.log(data);
                console.log(JSON.stringify(data));
                // listarDados();
            });
        }

        function listarDados() {
            // Obtém a quantidade do formulário
            var quantidade = document.getElementById('quantidade').value;

            // Faz a requisição GET para listar dados
            fetch('backend/api.php?amount=' + quantidade)
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
