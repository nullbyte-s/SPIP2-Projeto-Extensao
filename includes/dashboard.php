<style>
    #timeLineTabs,
    #pieTabs,
    #barTabs {
        position: relative;
    }

    #prevPieTab,
    #nextPieTab,
    #prevBarTab,
    #nextBarTab {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: color 0.3s ease;
    }

    #prevPieTab:hover,
    #nextPieTab:hover,
    #prevBarTab:hover,
    #nextBarTab:hover {
        color: #FF5733;
    }

    #prevPieTab,
    #prevBarTab {
        left: 0;
    }

    #nextPieTab,
    #nextBarTab {
        right: 0;
    }
</style>

<div id="layoutSidenav">
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Dashboard Hospital</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <label for="filterOptionsDropdown">Filtrar por:</label>
                <select id="filterOptionsDropdown" name="filterOptions"></select>
                <select id="selectedFilterOptionDropdown" name="selectedFilterOption"></select>
                <!-- <label for="semanaDropdown">Filtrar por semana:</label> -->
                <!-- <select id="semanaDropdown" name="semana"></select> -->
                <div class="row pt-3">
                    <div class="col-sm-5 pt-1 pt-md-0">
                        <div class="card shadow-sm">
                            <div class="card-header border-primary text-primary"><i class="bi bi-info-circle"></i>&nbsp;Informações gerais</div>
                            <div class="card-body">
                                <h5 class="card-title"><span id="overallstate"></span></h5>
                                <p class="card-text"></p>
                                <?php
                                    if(isset($_SESSION["setup"])){
                                        ?>
                                        <div class="alert alert-info alert-dismissible fade show" role="alert"><i class="bi bi-info-circle"></i>&nbsp;Configuração finalizada! Hospital Dashboard está pronto.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
                                <?php
                                    unset($_SESSION["setup"]);
                                    }
                                ?>
                                <h4><b>Lorem ipsum</b></h4>
                                <hr>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi nemo rerum dolores vel nam impedit ut! Repellat voluptates consectetur, sunt possimus culpa soluta in corrupti ipsam facere quaerat ex, totam reiciendis aspernatur fugit, laborum nihil.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7 pt-1 pt-md-0">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card text-center border-danger shadow-sm">
                                    <div class="card-body">
                                        <div id="timeLineChartsTabs" class="card-body text-center mx-auto w-100" style="overflow-x: auto; overflow-y: auto; max-height: 400px;">                      
                                            <ul class="nav nav-tabs d-flex justify-content-center align-items-center" id="timeLineTabs">
                                                <li class="nav-item">
                                                    <a class="nav-link active" data-toggle="tab" data-tab-target="casesTimeLineChart" id="tabCasesTimeLineChart" style="cursor: pointer">Casos</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" data-toggle="tab" data-tab-target="symptomsTimeLineChart" id="tabSymptomsTimeLineChart" style="cursor: pointer">Sintomas</a>
                                                </li>
                                            </ul>
                                            <div id="timeLineTabContent" class="tab-content">
                                                <div class="tab-pane fade show active" id="casesTimeLineChart"></div>
                                                <div class="tab-pane fade" id="symptomsTimeLineChart"></div>
                                            </div>
                                        </div>
                                        <h5 class="card-title pt-1"><i class="bi bi-graph-up"></i>&nbsp;<span></span></h5>
                                        <p class="card-text"><b>Linha do Tempo</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-3"></div>
                        <div class="col-md-7 pt-1 pt-md-0">
                            <div class="card text-center border-warning shadow-sm">
                                <div class="card-body">
                                    <div id="pieChartsTabs" class="card-body text-center mx-auto w-100" style="overflow-x: auto; overflow-y: auto; max-height: 400px;">                      
                                        <ul class="nav nav-tabs d-flex justify-content-center align-items-center" id="pieTabs">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" data-tab-target="sexPieChart" id="tabSexPieChart" style="cursor: pointer">Sexo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="agePieChart" id="tabAgePieChart" style="cursor: pointer">Faixa Etária</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="cityPieChart" id="tabCityPieChart" style="cursor: pointer">Município</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="symptomsPieChart" id="tabSymptomsPieChart" style="cursor: pointer">Sintomas</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="comorbiditiesPieChart" id="tabComorbiditiesPieChart" style="cursor: pointer">Comorbidades</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="evolutionPieChart" id="tabEvolutionPieChart" style="cursor: pointer">Evolução</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="vaccinationPieChart" id="tabVaccinationPieChart" style="cursor: pointer">Vacinação</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="diagnosticHypothesisPieChart" id="tabDiagnosticHypothesisPieChart" style="cursor: pointer">Diagnóstico</a>
                                            </li>
                                            <div class="bi bi-arrow-left-circle" id="prevPieTab"></div>
                                            <div class="bi bi-arrow-right-circle" id="nextPieTab"></div>
                                        </ul>
                                        <div id="pieTabContent" class="tab-content">
                                            <div class="tab-pane fade show active" id="sexPieChart"></div>
                                            <div class="tab-pane fade" id="agePieChart"></div>
                                            <div class="tab-pane fade" id="cityPieChart"></div>
                                            <div class="tab-pane fade" id="symptomsPieChart"></div>
                                            <div class="tab-pane fade" id="comorbiditiesPieChart"></div>
                                            <div class="tab-pane fade" id="evolutionPieChart"></div>
                                            <div class="tab-pane fade" id="vaccinationPieChart"></div>
                                            <div class="tab-pane fade" id="diagnosticHypothesisPieChart"></div>
                                        </div>
                                    </div>
                                    <h5 class="card-title pt-1"><i class="bi bi-pie-chart"></i>&nbsp;<span></span></h5>
                                    <p class="card-text"><b>Distribuição Percentual</b></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-5 pt-1 pt-md-0">
                            <div class="card text-center border-info shadow-sm">
                                <div class="card-body">
                                    <div style="position: relative; height: 200px;" class="card-body text-center" width="100%" height="100%" id="markerGeoChart">
                                        <div style="display: none;position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255, 255, 255, 0.8);justify-content: center;align-items: center;z-index: 2;" id="loading">
                                            <img src="assets/img/loading.gif" alt="Carregando...">
                                        </div>
                                        <canvas></canvas>
                                    </div>
                                    <h5 class="card-title pt-1"><i class="fas fa-regular fa-map"></i>&nbsp;<span></span></h5>
                                    <p class="card-text"><b><span id="patient-by-city"></span>Pacientes por Município</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-4">
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-info text-white mb-4 shadow-sm">
                                <div class="card-header border-primary text-white"><i class="bi bi-clipboard-check"></i>&nbsp;Destaques</div>
                                <p class="card-footer d-flex align-items-center justify-content-between">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt delectus ab pariatur vel sed? Maxime quasi veniam laboriosam illum modi, amet aperiam suscipit error, repellat laborum, autem voluptates excepturi inventore voluptas quae facilis. Perferendis amet sint illum architecto officiis sed enim illo quibusdam recusandae tempore repellat et, libero quia labore.</p>
                            </div>
                        </div>
                        <div class="col-xl-9">
                            <div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    Contagem de Pacientes
                                </div>
                                <div class="card-body">
                                    <div id="barChartsTabs" class="card-body text-center mx-auto w-100" style="overflow-x: auto; overflow-y: auto; max-height: 450px;">                      
                                        <ul class="nav nav-tabs d-flex justify-content-center align-items-center" id="barTabs">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" data-tab-target="sexPieChart" id="tabSexBarChart" style="cursor: pointer">Sexo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="ageBarChart" id="tabAgeBarChart" style="cursor: pointer">Faixa Etária</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="cityBarChart" id="tabCityBarChart" style="cursor: pointer">Município</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="symptomsBarChart" id="tabSymptomsBarChart" style="cursor: pointer">Sintomas</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="comorbiditiesBarChart" id="tabComorbiditiesBarChart" style="cursor: pointer">Comorbidades</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="evolutionBarChart" id="tabEvolutionBarChart" style="cursor: pointer">Evolução</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="vaccinationBarChart" id="tabVaccinationBarChart" style="cursor: pointer">Vacinação</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" data-tab-target="diagnosticHypothesisBarChart" id="tabDiagnosticHypothesisBarChart" style="cursor: pointer">Diagnóstico</a>
                                            </li>
                                            <div class="bi bi-arrow-left-circle" id="prevBarTab"></div>
                                            <div class="bi bi-arrow-right-circle" id="nextBarTab"></div>
                                        </ul>
                                        <div id="barTabContent" class="tab-content">
                                            <div class="tab-pane fade show active" id="sexBarChart"></div>
                                            <div class="tab-pane fade" id="ageBarChart"></div>
                                            <div class="tab-pane fade" id="cityBarChart"></div>
                                            <div class="tab-pane fade" id="symptomsBarChart"></div>
                                            <div class="tab-pane fade" id="comorbiditiesBarChart"></div>
                                            <div class="tab-pane fade" id="evolutionBarChart"></div>
                                            <div class="tab-pane fade" id="vaccinationBarChart"></div>
                                            <div class="tab-pane fade" id="diagnosticHypothesisBarChart"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- <div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    Contagem de Pacientes
                                </div>
                                <div class="card-body text-center mx-auto w-100"style="overflow-x: auto; overflow-y: auto; max-height: 400px;">
                                    <div id="sexBarChart"></div>
                                    <div id="ageBarChart"></div>
                                    <div id="cityBarChart"></div>
                                    <div id="symptomsBarChart"></div>
                                    <div id="comorbiditiesBarChart"></div>
                                    <div id="evolutionBarChart"></div>
                                    <div id="vaccinationBarChart"></div>
                                    <div id="diagnosticHypothesisBarChart"></div>
                                </div>
                            </div> -->

                        </div>
                    </div>
                <div class="card mt-5 shadow-sm">
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
<script type="text/javascript" src="js/jsonDataReceiver.js"></script>
<script type="text/javascript" src="js/pieChart.js"></script>
<script type="text/javascript" src="js/barChart.js"></script>
<script type="text/javascript" src="js/timeLineChart.js"></script>
<script type="text/javascript" src="js/markerGeoChart.js"></script>
<script type="text/javascript" src="js/table.js"></script>
<script type="text/javascript" src="js/tabsNavigator.js"></script>
<script type="text/javascript" src="js/filters.js"></script> 