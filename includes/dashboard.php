<div id="layoutSidenav">
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Dashboard Hospital</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <div class="row">
                    <div class="col-sm-8 pt-1 pt-md-0">
                        <div class="card shadow-sm">
                            <div class="card-header border-primary text-primary"><i class="bi bi-info-circle"></i>&nbsp;Informações gerais</div>
                            <div class="card-body">
                            <h5 id="sys1" class="card-title"><span id="overallstate"></span></h5>
                            <p id="sys11" class="card-text"></p>
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
                            <div class="card shadow-sm">
                            <div class="card-header border-primary text-primary"><i class="bi bi-command"></i>&nbsp;Opções</div>
                            <div class="card-body">
                                <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-outline-success mt-1"><i class="bi bi-1-circle"></i>&nbsp;Info1</button>&nbsp;
                                <button type="button" class="btn btn-outline-primary mt-1"><i class="bi bi-2-circle"></i>&nbsp;Info2</button>&nbsp;
                                <button type="button" class="btn btn-outline-info mt-1"><i class="bi bi-3-circle"></i>&nbsp;Info3</button>
                            </div>
                        </div>
                        </div>
                        <div class="col-sm-12 pt-3">
                            <div class="card shadow-sm">
                                <div class="card-header border-primary text-primary"><i class="bi bi-sliders2"></i>&nbsp;Avançado</div>
                                <div class="card-body">
                                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-outline-success mt-1"><i class="bi bi-1-circle"></i>&nbsp;Info1</button>&nbsp;
                                    <button type="button" class="btn btn-outline-primary mt-1"><i class="bi bi-2-circle"></i>&nbsp;Info2</button>&nbsp;
                                    <button type="button" class="btn btn-outline-info mt-1"><i class="bi bi-3-circle"></i>&nbsp;Info3</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3"></div>
                    <div class="col-12 col-sm-6 col-md-5 pt-1 pt-md-0">
                        <div class="card text-center border-info shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-map"></i>&nbsp;<span></span></h5>
                                <p class="card-text"></b>Mapa: <b><span id="death-by-city"></span> mortes por município</b></p>
                                <p class="card-text"><small class="text-muted">Atualizado <span name="lastupdated">hoje</span></small></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 pt-1 pt-md-0">
                        <div class="card text-center border-danger shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-pie-chart"></i>&nbsp;<span></span></h5>
                                <p class="card-text"><b><span style="font-size: 20px" id="info2"></span></b></p>
                                <p class="card-text"><small class="text-muted">Atualizado <span name="lastupdated">hoje</span></small></p>
                            </div>
                        </div>
                    </div>
                        <div class="col-12 col-sm-6 col-md-4 pt-1 pt-md-0">
                        <div class="card text-center border-warning shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-bar-chart-line"></i>&nbsp;<span id="sample_bar"></span></h5>
                                <div class="progress">
                                    <div class="progress-bar bg-success" id="sample1" role="progressbar" style="" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                    <div class="progress-bar bg-danger" id="sample2" role="progressbar" style="" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p class="card-text"><b><span style="font-size: 20px" id="info2"></span></b></p>
                                <p class="card-text"><small class="text-muted">Atualizado <span name="lastupdated">hoje</span></small></p>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-4"></div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4 shadow-sm">
                            <div class="card-body">Primary Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-warning text-white mb-4 shadow-sm">
                            <div class="card-body">Warning Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4 shadow-sm">
                            <div class="card-body">Success Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-danger text-white mb-4 shadow-sm">
                            <div class="card-body">Danger Card</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link" href="#">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="card mb-4 shadow-sm">
                            <div class="card-header">
                                <i class="fas fa-map me-1"></i>
                                Pacientes por Município
                            </div>
                            <div class="card-body text-center" width="100%" height="100%" id="markerGeoChart"><canvas></canvas></div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card mb-4 shadow-sm">
                            <div class="card-header">
                                <i class="fas fa-chart-bar me-1"></i>
                                Bar Chart Example
                            </div>
                            <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
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
<script type="text/javascript" src="js/table.js"></script>
<script type="text/javascript" src="js/markerGeoChart.js"></script>