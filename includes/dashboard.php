<div id="layoutSidenav">
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Dashboard Hospital</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <label for="semanaDropdown">Filtrar por semana:</label>
                <select id="semanaDropdown" name="semana"></select>
                <div class="row pt-3">
                    <div class="col-sm-8 pt-1 pt-md-0">
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
                    <div class="col-sm-4 pt-1 pt-md-0">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card text-center border-danger shadow-sm">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-bar-chart-line"></i>&nbsp;<span></span></h5>
                                        <p class="card-text"><b><span style="font-size: 20px" id="info2"></span></b></p>
                                        <p class="card-text"><small class="text-muted">Atualizado <span name="lastupdated">hoje</span></small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-3"></div>
                        <div class="col-md-7 pt-1 pt-md-0">
                            <div class="card text-center border-warning shadow-sm">
                                <div class="card-body">
                                    <div class="card-body text-center mx-auto w-100" style="overflow-x: auto; overflow-y: auto; max-height: 200px;">
                                        <div id="sexPieChart"></div>
                                        <div id="agePieChart"></div>
                                        <div id="cityPieChart"></div>
                                        <div id="symptomsPieChart"></div>
                                        <div id="comorbiditiesPieChart"></div>
                                        <div id="evolutionPieChart"></div>
                                        <div id="vaccinationPieChart"></div>
                                        <div id="diagnosticHypothesisPieChart"></div>
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
                            <div class="card bg-primary text-white mb-4 shadow-sm">
                                <div class="card-body">Primary Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                            <div class="card bg-warning text-white mb-4 shadow-sm">
                                <div class="card-body">Warning Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                            <div class="card bg-danger text-white mb-4 shadow-sm">
                                <div class="card-body">Danger Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                            <div class="card bg-success text-white mb-4 shadow-sm">
                                <div class="card-body">Success Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                    <div class="col-xl-9">
                        <div class="card mb-4 shadow-sm">
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
                        </div>
                    </div>
                </div>
            <div class="card mt-5 shadow-sm">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    Tabela de Dados
                </div>
                <div class="card-body">
                    <table id="dataTable" class="table table-striped table-bordered"></table>
                        <!-- <thead><tr></tr></thead><tbody></tbody> -->
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
<script type="text/javascript" src="js/markerGeoChart.js"></script>
<script type="text/javascript" src="js/table.js"></script>
<script type="text/javascript" src="js/weeksFilter.js"></script>