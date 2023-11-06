<?php
session_start();

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

require "backend/Config.php";
$config = new Config;
$config->load("local.config");

$auth = (isset($_SESSION["dashbauth"])) || (isset($_COOKIE["login_dashbauth"])) ? true : false;
if(!isset($_SESSION["setup"])){
  if( ($config->get("general.initialsetup")=="0") || ($config->get("general.initialsetup")=="") ){
    header("Location: setup.php");
  }
}

$path=$_SERVER['SCRIPT_FILENAME'];
$fol=substr($path, 0, -9);

$passVal = ($config->get("general.pass")!=='c21f969b5f03d33d43e04f8f136e7682') ? "***notdefault***" : '';

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <script src="js/color-modes.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="apple-mobile-web-app-title" content="Dashboard Hospital">
    <meta name="application-name" content="Dashboard Hospital">
    <meta name="msapplication-TileColor" content="#b91d47">
    <meta name="theme-color" content="#b91d47">
    <link rel="icon" href="assets/img/health-vaccine-svgrepo-com.svg" type="image/svg+xml">
    <link rel="stylesheet" href="css/style.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/bootstrap-5.3.2.min.css">
    <link rel="stylesheet" href="css/bootstrap-icons-1.11.1.css">
    <link rel="stylesheet" href="css/mdtoast.min.css?v=2.0.2">
    <link rel="stylesheet" href="css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="js/jquery-3.6.4.min.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap5.min.js"></script>
    <script src="js/fontawesome-all.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/charts_loader.js"></script>

    <title>Dashboard Hospital</title>

    <style>
    @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 300;
    src: url('fonts/rubik-v12-latin-300.eot');
    src: local(''),
        url('fonts/rubik-v12-latin-300.eot?#iefix') format('embedded-opentype'),
        url('fonts/rubik-v12-latin-300.woff2') format('woff2'),
        url('fonts/rubik-v12-latin-300.woff') format('woff'),
        url('fonts/rubik-v12-latin-300.ttf') format('truetype'),
        url('fonts/rubik-v12-latin-300.svg#Rubik') format('svg');
    }
    body, .mdtoast{
    font-family: 'Rubik', sans-serif;
    }
    .hidden{
    display: none;
    }
    @media screen and (max-width: 530px) {
    #notf {
      display: block;
    }
    #dot{
      display:none;
    }
    }
    .doughnut-chart-container {
      height: 360px;
      width: 360px;
      float: left;
    }
    .preload-screen {
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .preload-screen:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #3194f7;
      border-color: #3282d1 transparent #3282d1 transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
    .b-example-divider {
      width: 100%;
      height: 3rem;
      background-color: rgba(0, 0, 0, .1);
      border: solid rgba(0, 0, 0, .15);
      border-width: 1px 0;
      box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }
    .b-example-vr {
      flex-shrink: 0;
      width: 1.5rem;
      height: 100vh;
    }
    .bi {
      fill: currentColor;
    }
    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
    }
    .nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
    .btn-bd-primary {
      --bd-violet-bg: #712cf9;
      --bd-violet-rgb: 112.520718, 44.062154, 249.437846;
      --bs-btn-font-weight: 600;
      --bs-btn-color: var(--bs-white);
      --bs-btn-bg: var(--bd-violet-bg);
      --bs-btn-border-color: var(--bd-violet-bg);
      --bs-btn-hover-color: var(--bs-white);
      --bs-btn-hover-bg: #6528e0;
      --bs-btn-hover-border-color: #6528e0;
      --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
      --bs-btn-active-color: var(--bs-btn-hover-color);
      --bs-btn-active-bg: #5a23c8;
      --bs-btn-active-border-color: #5a23c8;
    }
    .bd-mode-toggle {
      z-index: 1500;
    }
    .bd-mode-toggle .dropdown-menu .active .bi {
      display: block !important;
    }
    .footer {
      border-bottom: none;
      margin-bottom: 0px;
      border-radius: 0 0 0 0;
    }
    </style>
</head>

<body onload="preload()">
<noscript style="z-index: 99999!important; position: absolute; top: 0; width: 98%; padding: 3%;"><div class="alert alert-danger" role="alert">Essa Aplicação Web <b>requer</b> que o JavaScript esteja habilitado para funcionar corretamente.</div></noscript>

<!-- Alternador de tema -->
<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
  <symbol id="check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
  </symbol>
  <symbol id="circle-half" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
  </symbol>
  <symbol id="moon-stars-fill" viewBox="0 0 16 16">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
  </symbol>
  <symbol id="sun-fill" viewBox="0 0 16 16">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
  </symbol>
</svg>
<div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
  <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
    <svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
    <span class="visually-hidden" id="bd-theme-text">Alternar tema</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text" style="">
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#sun-fill"></use></svg>
        Claro
        <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
      </button>
    </li>
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
        Escuro
        <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
      </button>
    </li>
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
        <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
        Auto
        <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
      </button>
    </li>
  </ul>
</div>

<div class="preload-screen"></div>

<div class="sb-nav-fixed">
  <nav class="sb-topnav navbar navbar-expand navbar-info bg-primary">
      <a class="navbar-brand ps-2 text-light exclude-ajax" href="index.php">💉 Dashboard Hospital</a>
      <button class="btn btn-link btn-sm btn-primary order-1 order-lg-0 me-4 me-lg-0<?php if(!$auth){ echo " hidden"; } ?>" id="sidebarToggle" href="#!"><i
              class="fas fa-bars text-warning"></i></button>
  </nav>

    <!--Barra de navegação lateral-->
  <div class="container">
    <div class="row<?php if(!$auth){ echo " hidden"; } ?>" id="dashboard">
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav class="alert alert-warning border-0 sb-sidenav accordion text-success" id="sidenavAccordion">
            <div class="sb-sidenav-menu"> 
              <div class="nav nav-pills">
                <div class="sb-sidenav-menu-heading">Interface</div>
                <a class="nav-link collapsed exclude-ajax" href="#" data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                    Dashboard
                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a>
                <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" id="dashboardLink" href="includes/dashboard.php">Gráficos</a>
                        <a class="nav-link" href="includes/summary.html">Relatório</a>
                    </nav>
                </div>
                <div class="sb-sidenav-menu-heading">Configurações</div>
                <a class="nav-link" href="includes/conversor_API-based.html">
                    <div class="sb-nav-link-icon"><i class="bi bi-pc-display"></i></div>
                    Conversor
                </a>
                <a class="nav-link" href="includes/editor.php">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    Editor
                </a>
                <button type="button" onclick="logout()" class="nav-link">
                    <div class="sb-nav-link-icon"><i class="fas fa-sign-out"></i></div>
                    Sair
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div id="<?php echo $auth ? 'content' : ''; ?>"></div>
        <?php //include 'includes/dashboard.php'; ?>
    </div>

    <!--Modal de Login -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"><i class="bi bi-shield-lock"></i>&nbsp;Autenticação</h5>
          </div>
          <div class="modal-body">
            <div class='alert alert-info' role='alert'>Informe a senha para acessar o painel</div>
            <form onkeydown="return event.key != 'Enter';">
              <div class="input-group">
                <span class="input-group-text" id="myPsw"><i class="bi bi-key"></i></span>
                <input type="password" id="lpwd" class="form-control" placeholder="" aria-label="Senha" aria-describedby="myPsw" autofocus>
                <div class="invalid-feedback">Senha inválida!</div>
              </div>
            </form>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-block btn-primary" onclick="loginToServer()" id="lbtn">Entrar</button>
        </div>
      </div>
    </div>
    
    <script type="text/javascript" src="js/scripts.js"></script>
    <script type="text/javascript" src="js/bootstrap-5.3.2.bundle.min.js"></script>
    <script type="text/javascript" src="js/mdtoast.min.js?v=2.0.2"></script>
    <script type="text/javascript" src="js/radialIndicator-2.0.0.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/ajax.js"></script>
    <script type="text/javascript" src="js/ajax-index-empty.js"></script>
    <script type="text/javascript" src="js/leaflet.js"></script>
    
</body>

</html>