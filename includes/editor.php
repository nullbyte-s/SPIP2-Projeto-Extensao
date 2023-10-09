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

function editarAtualizado($dados, $indice, $registroAtualizado) {
    if ($indice >= 0 && $indice < count($dados)) {
        $dados[$indice] = $registroAtualizado;
    }
    return $dados;
}

function excluirRegistro($dados, $indice)
{
    if (isset($dados[$indice])) {
        array_splice($dados, $indice, 1);
        $dados = array_values($dados);
        foreach ($dados as $index => &$row) {
            $row['id'] = $index;
        }
    }
    return $dados;
}

// Processamento do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $arquivoJson = "../db/dados.json";
    $dados = lerArquivoJson($arquivoJson);

    // Adicionar novo registro
    if (isset($_POST["salvar"])) {
        $ultimoId = end($dados)["id"];
        $novoId = $ultimoId + 1;
        $novoRegistro = array(
            "id" => $novoId,
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

    // Editar registro
    if (isset($_POST["indice_editar"])) {
        $indice = isset($_POST["indice_editar"]) ? intval($_POST["indice_editar"]) : -1;
        $registroAtualizado = array(
            "id" => isset($_POST["indice_editar"]) ? $_POST["indice_editar"] : null,
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

        $dados = editarAtualizado($dados, $indice, $registroAtualizado);
    }

    // Excluir registro
    if (isset($_POST["excluir"])) {
        $indiceExcluir = isset($_POST["excluir"]) ? intval($_POST["excluir"]) : -1;
        if (isset($dados[$indiceExcluir])) {
            unset($dados[$indiceExcluir]);
            $dados = array_values($dados);
            foreach ($dados as $index => &$row) {
                $row['id'] = $index;
            }
        }
    }

    // Adicionar linha em branco
    if (isset($_POST["adicionar"])) {
        $indice = $_POST["adicionar"] + 1;
        $indiceAdicionar = isset($_POST["adicionar"]) ? intval($_POST["adicionar"]) : -1;
        $dados = array_values($dados);
        $novoRegistroEmBranco = array(
            "id" => $indice,
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
    foreach ($dados as $index => &$row) {
        $row['id'] = $index;
    }
    exit();
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
        .table-invisible table {
            border-spacing: 5px;
            border-collapse: separate;
        }
        .table-invisible th, .table-invisible td {
            padding: 10px;
            border: 1px;
        }
    </style>
</head>

<body>
    <div id="layoutSidenav">
        <div id="layoutSidenav_content">
            <main>
                <!-- <div class="container-fluid px-4 exclude-ajax"> -->
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Dashboard Hospital</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Editor</li>
                    </ol>
                    <div class="card mt-2">
                        <div class="card-header">
                            <i class="fas fa-regular fa-pen-to-square me-1"></i>
                            Editor de Dados
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <form method="POST" action="" id="dadosForm">
                                    <table class="table-invisible">
                                        <tr>
                                            <td><label for="data">Data:</label></td>
                                            <td><input type="text" name="data" id="data" class="form-field" required oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>

                                            <td><label for="nome">Nome:</label></td>
                                            <td><input type="text" name="nome" id="nome" class="form-field" required></td>
                                        </tr>
                                        <tr>
                                            <td><label for="sexo">Sexo:</label></td>
                                            <td><input type="text" name="sexo" id="sexo" class="form-field" required></td>

                                            <td><label for="idade">Idade:</label></td>
                                            <td><input type="text" name="idade" id="idade" class="form-field" required></td>
                                        </tr>
                                        <tr>
                                            <td><label for="municipio">Município:</label></td>
                                            <td><input type="municipio" name="municipio" id="municipio" class="form-field"></td>

                                            <td><label for="sintomas">Sintomas:</label></td>
                                            <td><input type="text" name="sintomas" id="sintomas" class="form-field"></td>
                                        </tr>	
                                        <tr>
                                            <td><label for="comorbidades">Comorbidades:</label></td>
                                            <td><input type="text" name="comorbidades" id="comorbidades" class="form-field"></td>

                                            <td><label for="vacina">Vacina:</label></td>
                                            <td><input type="text" name="vacina" id="vacina" class="form-field"></td>
                                        </tr>	
                                        <tr>
                                            <td><label for="leito">Leito:</label></td>
                                            <td><input type="leito" name="leito" id="leito" class="form-field"></td>

                                            <td><label for="evolucao">Evolução:</label></td>
                                            <td><input type="text" name="evolucao" id="evolucao" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="data_sintomas">Data dos Sintomas:</label></td>
                                            <td><input type="data_sintomas" name="data_sintomas" id="data_sintomas" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>

                                            <td><label for="exames">Exames:</label></td>
                                            <td><input type="exames" name="exames" id="exames" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="hipotese_diagnostica">Hipótese Diagnóstica:</label></td>
                                            <td><input type="hipotese_diagnostica" name="hipotese_diagnostica" id="hipotese_diagnostica" class="form-field"></td>

                                            <td><label for="cotificacoes">Cotificações:</label></td>
                                            <td><input type="cotificacoes" name="cotificacoes" id="cotificacoes" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="data_de_atualizacao">Data de Atualização:</label></td>
                                            <td><input type="data_de_atualizacao" name="data_de_atualizacao" id="data_de_atualizacao" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>

                                            <td><label for="status">Status:</label></td>
                                            <td><input type="status" name="status" id="status" class="form-field"></td>
                                        </tr>
                                        <tr class="text-center">
                                            <td colspan="4">
                                                <button type="button" id="editar" style="display: none;">Editar</button>
                                                <button type="button" id="salvar">Salvar</button>
                                                <button type="button" id="cancelar" style="display: none;">Cancelar</button>
                                                <button type="reset">Limpar</button>
                                            </td>
                                        </tr>
                                    </table>
                                    <input type="hidden" id="indice_editar" name="indice_editar" value="">
                                    <input type="hidden" id="indice_excluir" name="indice_excluir" value="">
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-5">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Tabela de Dados
                        </div>
                        <div class="card-body">
                            <table id="dataTable" class="table table-striped table-bordered"></table>
                        </div>
                    </div>
                </div>
            <div class="py-2"></div>
            </main>
            <footer class="footer alert alert-secondary mt-auto py-4">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Dashboard Hospital <?php echo date("Y"); ?></div>
                        <div>
                            <a href="#">Política de Privacidade</a>
                            &middot;
                            <a href="#">Termos &amp; Condições</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="js/tables-editor.js"></script>
    <script>

        $(document).on('click', '.editar-btn', function () {
            var table = $('#dataTable').DataTable();
            var $row = $(this).closest('tr');
            var idValue = table.cell({ row: $row.index(), column: 0 }).data();
            var realIndex = table.row($row).index();
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            preencherCamposEditar(realIndex);
            $('#editar').val(realIndex);
        });

        $(document).on('click', '.excluir-btn', function () {
            var table = $('#dataTable').DataTable();
            var $row = $(this).closest('tr');
            var realIndex = table.row($row).index();
            excluir(realIndex);
        });

        $(document).on('click', '.adc-btn', function () {
            var table = $('#dataTable').DataTable();
            var $row = $(this).closest('tr');
            var realIndex = table.row($row).index();
            adicionar(realIndex);
        });

        $(document).on('click', '#salvar', function () {
            salvar();
        });

        $(document).on('click', '#editar', function () {
            var editarValue = $(this).val();
            var idValue = parseInt(editarValue);
            if (!isNaN(idValue)) {
                editar(idValue);
            } else {
                console.error("Valor inválido para o ID");
            }
        });

        $(document).on('click', '#cancelar', function () {
            cancelar();
        });

        function salvar() {
            $('#salvar').val('Salvar');
            $('#dadosForm').append('<input type="hidden" name="salvar" value="Salvar">');
            $.ajax({
                url: 'includes/editor.php',
                type: 'POST',
                data: $('#dadosForm').serialize(),
                success: function (response) {
                    // alert('Salvo com sucesso!');
                    // displayNotification('Salvo com sucesso!');
                    $('#content').html(response);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao enviar dados:', status, error);
                    displayNotification('Erro ao enviar dados');
                }
            }).done(function () {
                displayNotification('Salvo com sucesso!');
            });
        }

        function editar(indice) {
            $('#dadosForm').append('<input type="hidden" name="indice_editar" value="' + indice + '">');
            $.ajax({
                url: 'includes/editor.php',
                type: 'POST',
                data: $('#dadosForm').serialize(),
                success: function (response) {
                    // displayNotification('Editado com sucesso!');
                    $('#content').html(response);
                    $('#editar').val('Editar');
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao executar ação de edição:', status, error);
                }
            }).done(function () {
                displayNotification('Editado com sucesso!');
            });
        }

        function excluir(indice) {
            $.ajax({
                url: 'includes/editor.php',
                type: 'POST',
                data: { excluir: indice },
                success: function (response) {
                    // $('input[name="indice"]').val('');
                    sessionStorage.setItem('temp_data', 'op_line');
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao executar ação de exclusão:', status, error);
                }
            }).done(function () {
                displayNotification('Excluído com sucesso!');
            });
        }

        function adicionar(indice) {
            $.ajax({
                url: 'includes/editor.php',
                type: 'POST',
                data: { adicionar: indice },
                success: function (response) {
                    sessionStorage.setItem('temp_data', 'op_line');
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao executar ação de exclusão:', status, error);
                }
            }).done(function () {
                displayNotification('Excluído com sucesso!');
            });
        }

        function cancelar() {
            $('#salvar').show();
            $('#editar, #cancelar').hide();
            $('#editar').val('Editar');
            $('#dadosForm')[0].reset();
        }

        function preencherCamposEditar(idValue) {
            var table = $('#dataTable').DataTable();
            var dados = table.rows({ order: 'current' }).data().toArray();
            var registro = dados.find(function (id) {
                return id.id == idValue;
            });
            $('#data').val(registro.data);
            $('#nome').val(registro.nome);
            $('#sexo').val(registro.sexo);
            $('#idade').val(registro.idade);
            $('#municipio').val(registro.municipio);
            $('#sintomas').val(registro.sintomas);
            $('#comorbidades').val(registro.comorbidades);
            $('#vacina').val(registro.vacina);
            $('#leito').val(registro.leito);
            $('#evolucao').val(registro.evolucao);
            $('#data_sintomas').val(registro.data_sintomas);
            $('#exames').val(registro.exames);
            $('#hipotese_diagnostica').val(registro.hipotese_diagnostica);
            $('#cotificacoes').val(registro.cotificacoes);
            $('#data_de_atualizacao').val(registro.data_de_atualizacao);
            $('#status').val(registro.status);

            $('#salvar').hide();
            $('#editar, #cancelar').show();
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

        function displayNotification(message) {
            mdtoast(message, {
                duration: 2500,
                type: mdtoast.INFO,
                interaction: false
            });
        }
    </script>
</body>
</html>