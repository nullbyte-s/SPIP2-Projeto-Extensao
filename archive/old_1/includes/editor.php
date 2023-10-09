<?php
// Funções CRUD
function lerArquivoJson($caminho)
{
    $jsonString = file_get_contents($caminho);
    return json_decode($jsonString, true);
}

function escreverArquivoJson($caminho, $dados)
{
    $jsonString = json_encode($dados, JSON_PRETTY_PRINT);
    file_put_contents($caminho, $jsonString);
}

function adicionarRegistro($dados, $novoRegistro)
{
    $dados[] = $novoRegistro;
    return $dados;
}

function atualizarRegistro($dados, $indice, $registroAtualizado)
{
    $dados[$indice] = $registroAtualizado;
    return $dados;
}

function excluirRegistro($dados, $indice)
{
    array_splice($dados, $indice, 1);
    return $dados;
}

// Processamento do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $arquivoJson = "../db/dados.json";
    $dados = lerArquivoJson($arquivoJson);

    // Adicionar novo registro
    if (isset($_POST["salvar"])) {
        $novoRegistro = array(
            "data" => isset($_POST["data"]) ? $_POST["data"] : null,
            "nome" => isset($_POST["nome"]) ? $_POST["nome"] : null,
            "sexo" => isset($_POST["sexo"]) ? $_POST["sexo"] : null,
            "idade" => isset($_POST["idade"]) ? $_POST["idade"] : null,
            "municipio" => isset($_POST["municipio"]) ? $_POST["municipio"] : null,
            "sintomas" => isset($_POST["sintomas"]) ? $_POST["sintomas"] : null,
            "comorbidades" => isset($_POST["comorbidades"]) ? $_POST["comorbidades"] : null,
            "vacina" => isset($_POST["vacina"]) ? $_POST["vacina"] : null,
            "leito" => isset($_POST["leito"]) ? $_POST["leito"] : null,
            "evolucao" => isset($_POST["evolucao"]) ? $_POST["evolucao"] : null,
            "data_sintomas" => isset($_POST["data_sintomas"]) ? $_POST["data_sintomas"] : null,
            "exames" => isset($_POST["exames"]) ? $_POST["exames"] : null,
            "hipotese_diagnostica" => isset($_POST["hipotese_diagnostica"]) ? $_POST["hipotese_diagnostica"] : null,
            "cotificacoes" => isset($_POST["cotificacoes"]) ? $_POST["cotificacoes"] : null,
            "data_de_atualizacao" => isset($_POST["data_de_atualizacao"]) ? $_POST["data_de_atualizacao"] : null,
            "status" => isset($_POST["status"]) ? $_POST["status"] : null,
        );

        $dados = adicionarRegistro($dados, $novoRegistro);
    }

    // Atualizar registro
    if (isset($_POST["indice_editar"])) {
        $paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
        $registrosPorPagina = 30;
        $indiceNaNavegacao = $_POST["indice_editar"] + 1;
        $indiceReal = ($paginaAtual - 1) * $registrosPorPagina + $indiceNaNavegacao - 1;
        $registroAtualizado = array(
            "data" => $_POST["data"],
            "nome" => $_POST["nome"],
            "sexo" => $_POST["sexo"],
            "idade" => $_POST["idade"],
            "municipio" => $_POST["municipio"],
            "sintomas" => $_POST["sintomas"],
            "comorbidades" => $_POST["comorbidades"],
            "vacina" => $_POST["vacina"],
            "leito" => $_POST["leito"],
            "evolucao" => $_POST["evolucao"],
            "data_sintomas" => $_POST["data_sintomas"],
            "exames" => $_POST["exames"],
            "hipotese_diagnostica" => $_POST["hipotese_diagnostica"],
            "cotificacoes" => $_POST["cotificacoes"],
            "data_de_atualizacao" => $_POST["data_de_atualizacao"],
            "status" => $_POST["status"],
        );
        $dados[$indiceReal] = $registroAtualizado;
    }

    // Excluir registro
    if (isset($_POST["excluir"])) {
        $paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
        $registrosPorPagina = 30;
        $indiceNaNavegacao = $_POST["indice"] + 1;
        $indiceReal = ($paginaAtual - 1) * $registrosPorPagina + $indiceNaNavegacao - 1;
        $dados = excluirRegistro($dados, $indiceReal);
    }

    // Adicionar linha em branco
    if (isset($_POST["adicionar"])) {
        $paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
        $registrosPorPagina = 30;
        $indiceNaNavegacao = $_POST["indice"] + 1;
        $indiceReal = ($paginaAtual - 1) * $registrosPorPagina + $indiceNaNavegacao;
        $novoRegistroEmBranco = array(
            "data" => "",
            "nome" => "",
            "sexo" => "",
            "idade" => "",
            "municipio" => "",
            "sintomas" => "",
            "comorbidades" => "",
            "vacina" => "",
            "leito" => "",
            "evolucao" => "",
            "data_sintomas" => "",
            "exames" => "",
            "hipotese_diagnostica" => "",
            "cotificacoes" => "",
            "data_de_atualizacao" => "",
            "status" => "",
        );
        array_splice($dados, $indiceReal, 0, array($novoRegistroEmBranco));
    }
    escreverArquivoJson($arquivoJson, $dados);
}

// Ler dados para exibição
$dados = lerArquivoJson("../db/dados.json");

$registrosPorPagina = 30;
$totalRegistros = count($dados);
$totalPaginas = ceil($totalRegistros / $registrosPorPagina);
$paginaAtual = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
$paginaAtual = max(1, min($paginaAtual, $totalPaginas)); 
$indiceInicio = ($paginaAtual - 1) * $registrosPorPagina;
$indiceFim = min($indiceInicio + $registrosPorPagina - 1, $totalRegistros - 1);
$registrosPagina = array_slice($dados, $indiceInicio, $registrosPorPagina);
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor</title>
    <style>
    .form-field {
        width: 350px;
    }
    </style>
</head>

<body>
    <h1>Editor</h1>

    <form method="POST" action="">
        <table>
            <tr>
                <td><label for="data">Data:</label></td>
                <td><input type="text" name="data" id="data" class="form-field" required oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
            </tr>
            <tr>
                <td><label for="nome">Nome:</label></td>
                <td><input type="text" name="nome" id="nome" class="form-field" required></td>
            </tr>
            <tr>
                <td><label for="sexo">Sexo:</label></td>
                <td><input type="text" name="sexo" id="sexo" class="form-field" required></td>
            </tr>
            <tr>
                <td><label for="idade">Idade:</label></td>
                <td><input type="text" name="idade" id="idade" class="form-field" required></td>
            </tr>
            <tr>
                <td><label for="municipio">Município:</label></td>
                <td><input type="municipio" name="municipio" id="municipio" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="sintomas">Sintomas:</label></td>
                <td><input type="text" name="sintomas" id="sintomas" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="comorbidades">Comorbidades:</label></td>
                <td><input type="text" name="comorbidades" id="comorbidades" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="vacina">Vacina:</label></td>
                <td><input type="text" name="vacina" id="vacina" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="leito">Leito:</label></td>
                <td><input type="leito" name="leito" id="leito" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="evolucao">Evolução:</label></td>
                <td><input type="text" name="evolucao" id="evolucao" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="data_sintomas">Data dos Sintomas:</label></td>
                <td><input type="data_sintomas" name="data_sintomas" id="data_sintomas" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
            </tr>
            <tr>
                <td><label for="exames">Exames:</label></td>
                <td><input type="exames" name="exames" id="exames" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="hipotese_diagnostica">Hipótese Diagnóstica:</label></td>
                <td><input type="hipotese_diagnostica" name="hipotese_diagnostica" id="hipotese_diagnostica" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="cotificacoes">Cotificações:</label></td>
                <td><input type="cotificacoes" name="cotificacoes" id="cotificacoes" class="form-field"></td>
            </tr>
            <tr>
                <td><label for="data_de_atualizacao">Data de Atualização:</label></td>
                <td><input type="data_de_atualizacao" name="data_de_atualizacao" id="data_de_atualizacao" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
            </tr>
            <tr>
                <td><label for="status">Status:</label></td>
                <td><input type="status" name="status" id="status" class="form-field"></td>
            </tr>
            <input type="hidden" name="indice_editar" id="indice_editar" value="">
            <tr>
                <td colspan="2">
                    <button type="submit" name="salvar">Salvar</button>
                    <button type="reset">Limpar</button>
                </td>
        </tr>
        </table>
    </form>

    <h2>Tabela</h2>
    <table border="1">
        <tr>
            <th>Data</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Município</th>
            <th>Sintomas</th>
            <th>Comorbidades</th>
            <th>Vacina</th>
            <th>Leito</th>
            <th>Evolução</th>
            <th>Data dos Sintomas</th>
            <th>Exames</th>
            <th>Hipótese Diagnóstica</th>
            <th>Cotificações</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
        <?php foreach ($registrosPagina as $indice => $registro) : ?>
            <tr>
                <td><?= $registro["data"] ?></td>
                <td><?= $registro["nome"] ?></td>
                <td><?= $registro["sexo"] ?></td>
                <td><?= $registro["idade"] ?></td>
                <td><?= $registro["municipio"] ?></td>
                <td><?= $registro["sintomas"] ?></td>
                <td><?= $registro["comorbidades"] ?></td>
                <td><?= $registro["vacina"] ?></td>
                <td><?= $registro["leito"] ?></td>
                <td><?= $registro["evolucao"] ?></td>
                <td><?= $registro["data_sintomas"] ?></td>
                <td><?= $registro["exames"] ?></td>
                <td><?= $registro["hipotese_diagnostica"] ?></td>
                <td><?= $registro["cotificacoes"] ?></td>
                <td><?= $registro["data_de_atualizacao"] ?></td>
                <td><?= $registro["status"] ?></td>
                <td>
                    <form method="POST" action="">
                        <input type="hidden" name="indice" value="<?= $indice ?>">
                        <button type="submit" name="editar">Editar</button>
                        <button type="submit" name="excluir">Excluir</button>
                        <button type="submit" name="adicionar">(+)</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
    <div>
    <div>
        <span>&lt; </a></span>
        <?php
        $registrosPorPagina = 30;
        $totalRegistros = count($dados);
        $totalPaginas = ceil($totalRegistros / $registrosPorPagina);

        for ($i = 1; $i <= $totalPaginas; $i++) {
            echo '<span><a href="?pagina=' . $i . '">' . $i . ' </a></span>';
        }
        ?>
        <span> &gt;</span>
    </div>
</div>
</body>

<script>
    function preencherCamposEditar(indice) {
        var dados = <?php echo json_encode($registrosPagina); ?>;
        var registro = dados[indice];
        document.getElementById('data').value = registro.data;
        document.getElementById('nome').value = registro.nome;
        document.getElementById('sexo').value = registro.sexo;
        document.getElementById('idade').value = registro.idade;
        document.getElementById('municipio').value = registro.municipio;
        document.getElementById('sintomas').value = registro.sintomas;
        document.getElementById('comorbidades').value = registro.comorbidades;
        document.getElementById('vacina').value = registro.vacina;
        document.getElementById('leito').value = registro.leito;
        document.getElementById('evolucao').value = registro.evolucao;
        document.getElementById('data_sintomas').value = registro.data_sintomas;
        document.getElementById('exames').value = registro.exames;
        document.getElementById('hipotese_diagnostica').value = registro.hipotese_diagnostica;
        document.getElementById('cotificacoes').value = registro.cotificacoes;
        document.getElementById('data_de_atualizacao').value = registro.data_de_atualizacao;
        document.getElementById('status').value = registro.status;
        document.getElementById('indice_editar').value = indice;
    }
    
    function formatarData(input) {
        var value = input.value.trim();

        if (value === '' || value === '-') {
            return;
        }

        value = value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '/' + value.substring(5, 9);
        }

        input.value = value;
    }
</script>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["editar"])) {
    echo '<script>preencherCamposEditar(' . $_POST["indice"] . ')</script>';
}
?>
</html>