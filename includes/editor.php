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
    $anoAtual = date("Y");
    $arquivoJson = dirname(__FILE__) . "/../db/dados_$anoAtual.json";
    $dados = lerArquivoJson($arquivoJson);

    // Adicionar novo registro
    if (isset($_POST["salvar"])) {
        $ultimoId = end($dados)["id"];
        $novoId = $ultimoId + 1;
        $novoRegistro = array(
            "internacao" => isset($_POST["internacao"]) ? $_POST["internacao"] : null,
            "semana" => isset($_POST["semana"]) ? $_POST["semana"] : null,
            "paciente" => isset($_POST["paciente"]) ? $_POST["paciente"] : null,
            "sexo" => isset($_POST["sexo"]) ? $_POST["sexo"] : null,
            "idade" => isset($_POST["idade"]) ? $_POST["idade"] : null,
            "municipio" => isset($_POST["municipio"]) ? $_POST["municipio"] : null,
            "estado" => isset($_POST["estado"]) ? $_POST["estado"] : null,
            "sintomas" => isset($_POST["sintomas"]) ? $_POST["sintomas"] : null,
            "data_sintomas" => isset($_POST["data_sintomas"]) ? $_POST["data_sintomas"] : null,
            "comorbidades" => isset($_POST["comorbidades"]) ? $_POST["comorbidades"] : null,
            "vacina" => isset($_POST["vacina"]) ? $_POST["vacina"] : null,
            "leito" => isset($_POST["leito"]) ? $_POST["leito"] : null,
            "evolucao" => isset($_POST["evolucao"]) ? $_POST["evolucao"] : null,
            "exames" => isset($_POST["exames"]) ? $_POST["exames"] : null,
            "data_exames" => isset($_POST["data_exames"]) ? $_POST["data_exames"] : null,
            "hipotese_diagnostica" => isset($_POST["hipotese_diagnostica"]) ? $_POST["hipotese_diagnostica"] : null,
            "agravo" => isset($_POST["agravo"]) ? $_POST["agravo"] : null,
            "data_agravo" => isset($_POST["data_agravo"]) ? $_POST["data_agravo"] : null,
            "finalizacao_do_caso" => isset($_POST["finalizacao_do_caso"]) ? $_POST["finalizacao_do_caso"] : null,
            "data_finalizacao" => isset($_POST["data_finalizacao"]) ? $_POST["data_finalizacao"] : null,
            "id" => $novoId,
        );

        $dados = adicionarRegistro($dados, $novoRegistro);
    }

    // Editar registro
    if (isset($_POST["indice_editar"])) {
        $indice = isset($_POST["indice_editar"]) ? intval($_POST["indice_editar"]) : -1;
        $registroAtualizado = array(
            "internacao" => isset($_POST["internacao"]) ? $_POST["internacao"] : null,
            "semana" => isset($_POST["semana"]) ? $_POST["semana"] : null,
            "paciente" => isset($_POST["paciente"]) ? $_POST["paciente"] : null,
            "sexo" => isset($_POST["sexo"]) ? $_POST["sexo"] : null,
            "idade" => isset($_POST["idade"]) ? $_POST["idade"] : null,
            "municipio" => isset($_POST["municipio"]) ? $_POST["municipio"] : null,
            "estado" => isset($_POST["estado"]) ? $_POST["estado"] : null,
            "sintomas" => isset($_POST["sintomas"]) ? $_POST["sintomas"] : null,
            "data_sintomas" => isset($_POST["data_sintomas"]) ? $_POST["data_sintomas"] : null,
            "comorbidades" => isset($_POST["comorbidades"]) ? $_POST["comorbidades"] : null,
            "vacina" => isset($_POST["vacina"]) ? $_POST["vacina"] : null,
            "leito" => isset($_POST["leito"]) ? $_POST["leito"] : null,
            "evolucao" => isset($_POST["evolucao"]) ? $_POST["evolucao"] : null,
            "exames" => isset($_POST["exames"]) ? $_POST["exames"] : null,
            "data_exames" => isset($_POST["data_exames"]) ? $_POST["data_exames"] : null,
            "hipotese_diagnostica" => isset($_POST["hipotese_diagnostica"]) ? $_POST["hipotese_diagnostica"] : null,
            "agravo" => isset($_POST["agravo"]) ? $_POST["agravo"] : null,
            "data_agravo" => isset($_POST["data_agravo"]) ? $_POST["data_agravo"] : null,
            "finalizacao_do_caso" => isset($_POST["finalizacao_do_caso"]) ? $_POST["finalizacao_do_caso"] : null,
            "data_finalizacao" => isset($_POST["data_finalizacao"]) ? $_POST["data_finalizacao"] : null,
            "id" => isset($_POST["indice_editar"]) ? $_POST["indice_editar"] : null,
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
            "internacao" => "",
            "semana" => "",
            "paciente" => "",
            "sexo" => "",
            "idade" => "",
            "municipio" => "",
            "estado" => "",
            "sintomas" => "",
            "data_sintomas" => "",
            "comorbidades" => "",
            "vacina" => "",
            "leito" => "",
            "evolucao" => "",
            "exames" => "",
            "data_exames" => "",
            "hipotese_diagnostica" => "",
            "agravo" => "",
            "data_agravo" => "",
            "finalizacao_do_caso" => "",
            "data_finalizacao" => "",
            "id" => $indice,
        );
        array_splice($dados, $indice, 0, array($novoRegistroEmBranco));
    }
    foreach ($dados as $index => &$row) {
        $row['id'] = $index;
    }
    escreverArquivoJson($arquivoJson, $dados);
    exit();
}
// // Ler dados para exibição
// $dados = lerArquivoJson("../db/dados.json");
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
                                            <td><label for="internacao">Internação:</label></td>
                                            <td><input type="text" name="internacao" id="internacao" class="form-field" required oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>

                                            <td><label for="semana">Semana:</label></td>
                                            <td><input type="number" name="semana" id="semana" class="form-field" required></td>
                                        </tr>

                                        <tr>
                                            <td><label for="paciente">Paciente:</label></td>
                                            <td><input type="text" name="paciente" id="paciente" class="form-field" required></td>

                                            <td><label for="sexo">Sexo:</label></td>
                                            <td><input type="text" name="sexo" id="sexo" class="form-field" required></td>
                                        </tr>

                                        <tr>
                                            <td><label for="idade">Idade:</label></td>
                                            <td><input type="number" name="idade" id="idade" class="form-field" required></td>

                                            <td><label for="municipio">Município:</label></td>
                                            <td><input type="municipio" name="municipio" id="municipio" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="estado">Estado:</label></td>
                                            <td><input type="estado" name="estado" id="estado" class="form-field"></td>

                                            <td><label for="sintomas">Sintomas:</label></td>
                                            <td><input type="text" name="sintomas" id="sintomas" class="form-field"></td>
                                        </tr>	
                                        <tr>
                                            <td><label for="data_sintomas">Data dos Sintomas:</label></td>
                                            <td><input type="data_sintomas" name="data_sintomas" id="data_sintomas" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
                                            
                                            <td><label for="comorbidades">Comorbidades:</label></td>
                                            <td><input type="text" name="comorbidades" id="comorbidades" class="form-field"></td>
                                        </tr>	
                                        <tr>
                                            <td><label for="vacina">Vacina:</label></td>
                                            <td><input type="text" name="vacina" id="vacina" class="form-field"></td>
                                            
                                            <td><label for="leito">Leito:</label></td>
                                            <td><input type="leito" name="leito" id="leito" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="evolucao">Evolução:</label></td>
                                            <td><input type="text" name="evolucao" id="evolucao" class="form-field"></td>

                                            <td><label for="exames">Exames:</label></td>
                                            <td><input type="exames" name="exames" id="exames" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="data_exames">Data dos Exames:</label></td>
                                            <td><input type="data_exames" name="data_exames" id="data_exames" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
                                            
                                            <td><label for="hipotese_diagnostica">Hipótese Diagnóstica:</label></td>
                                            <td><input type="hipotese_diagnostica" name="hipotese_diagnostica" id="hipotese_diagnostica" class="form-field"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="agravo">Agravo:</label></td>
                                            <td><input type="agravo" name="agravo" id="agravo" class="form-field"></td>

                                            <td><label for="data_agravo">Data do Agravo:</label></td>
                                            <td><input type="data_agravo" name="data_agravo" id="data_agravo" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
                                        </tr>
                                        <tr>
                                            <td><label for="finalizacao_do_caso">Finalização do Caso:</label></td>
                                            <td><input type="finalizacao_do_caso" name="finalizacao_do_caso" id="hipotese_diagnostica" class="form-field"></td>
                                            
                                            <td><label for="data_finalizacao">Data de Finalização:</label></td>
                                            <td><input type="data_finalizacao" name="data_finalizacao" id="data_finalizacao" class="form-field" oninput="formatarData(this)" pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA"></td>
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
    <script src="js/table-editor.js"></script>
    <script>

        $(document).on('click', '.editar-btn', function () {
            var table = $('#dataTable').DataTable();
            var $row = $(this).closest('tr');
            // var idValue = table.cell({ row: $row.index(), column: 0 }).data();
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
                    // $('#editar').val('Editar');
                    // $('#content').html(response);
                    sessionStorage.setItem('temp_data', 'op_line');
                    setTimeout(function () {
                        location.reload();
                    }, 1100);
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
                    }, 1100);
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
                    }, 1100);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao executar ação de exclusão:', status, error);
                }
            }).done(function () {
                // displayNotification('Nova linha adicionada - id: ', indice);
				displayNotification('Nova linha adicionada');
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
            $('#internacao').val(registro.internacao);
            $('#semana').val(registro.semana);
            $('#paciente').val(registro.paciente);
            $('#sexo').val(registro.sexo);
            $('#idade').val(registro.idade);
            $('#municipio').val(registro.municipio);
            $('#estado').val(registro.estado);
            $('#sintomas').val(registro.sintomas);
            $('#data_sintomas').val(registro.data_sintomas);
            $('#comorbidades').val(registro.comorbidades);
            $('#vacina').val(registro.vacina);
            $('#leito').val(registro.leito);
            $('#evolucao').val(registro.evolucao);
            $('#exames').val(registro.exames);
            $('#data_exames').val(registro.data_exames);
            $('#hipotese_diagnostica').val(registro.hipotese_diagnostica);
            $('#agravo').val(registro.agravo);
            $('#data_agravo').val(registro.data_agravo);
            $('#finalizacao_do_caso').val(registro.finalizacao_do_caso);
            $('#data_finalizacao').val(registro.data_finalizacao);

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
                duration: 1000,
                type: mdtoast.INFO,
                interaction: false
            });
        }
    </script>
</body>
</html>