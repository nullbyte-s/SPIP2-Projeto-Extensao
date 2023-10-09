class ntwReq {
  constructor(url, successfct, timeoutfct, type = "GET", encode = false, data = null) {
    if (!navigator.onLine) {
      $('#overallstate').html('<font class="text-danger"><i class="bi bi-question-circle"></i>&nbsp;Você está offline...</font>');
    }
    this.xmlhttp = new XMLHttpRequest();
    this.xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        successfct(this);
      }
    };
    this.xmlhttp.open(type, url, true);
    if (encode) {
      this.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    this.xmlhttp.timeout = 4 * 1000;
    this.xmlhttp.ontimeout = timeoutfct;
    if (type == "POST") {
      console.log("POSTING...");
      this.xmlhttp.send(data);
    } else {
      this.xmlhttp.send();
    }

  }
}
window.addEventListener("offline", function (e) {
  console.log("offline");
}, false);
window.addEventListener("online", function (e) {
  console.log("online");
}, false);

function preload() {
  updatedb();
  if (window.location.search == "?live=disabled") {
    console.info("Live Update was disabled through site parameters.");
    document.getElementById("pctl").innerHTML = '<i class="bi bi-play"></i>';
  }
  setTimeout(function () { $(".preload-screen").fadeOut("slow"); }, 500);
}

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=None; secure=true";
}

function logout() {
  var vReq = new ntwReq("backend/serv.php?logout", function (data) {
    console.log(data.responseText);
    document.title = 'Aguardando autenticação...';
    $('#overallstate').html('<font class="text-muted"><i class="bi bi-hourglass-split"></i>&nbsp;Aguardando autenticação...</font>');
    $("#staticBackdrop").modal("show");
  }, function () {
    alert("Saída falhou!");
  });
  deleteCookie("login_dashbauth");
}

Chart.defaults.global.legend.display = false;

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

function updatedb() {
  var vReq = new ntwReq("backend/auth.php", function (data) {
    var result = JSON.parse(data.responseText);
    document.title = 'Dashboard Hospital';
    if (result.auth == "false") {
      document.title = 'Aguardando autenticação...';
      $('#overallstate').html('<font class="text-muted"><i class="bi bi-hourglass-split"></i>&nbsp;Aguardando autenticação...</font>');
      $('#staticBackdrop').modal('show');
      $("footer").addClass("fixed-bottom");
      return;
    }
  });
}
y = 0;
$('#staticBackdrop').on('hidden.bs.modal', function (e) {
  $("footer").removeClass("fixed-bottom");
  $("#lpwd").prop("disabled", "");
  $("#lbtn").prop("disabled", "");
  $("#lpwd").val("").removeClass("is-valid is-invalid");
  $("#lbtn").html("Login").addClass("btn-primary").removeClass("btn-success");
});
function loginToServer() {
  var value = $("#lpwd").val();
  if (value.length == 0) { $("#lpwd").addClass("is-invalid"); return; }
  $("#lpwd").prop("disabled", "true");
  $("#lbtn").prop("disabled", "true");
  $("#lbtn").html("Verificando...");
  var vReq = new ntwReq("backend/serv.php", function (data) {
    console.log(data.responseText);
    if (data.responseText == "correctCredentials") {
      $("#lpwd").addClass("is-valid").removeClass("is-invalid");
      $("#lbtn").html("Carregando...").addClass("btn-success").removeClass("btn-primary");
      setTimeout(() => {
        location.reload();
        setTimeout(() => {
          $('#staticBackdrop').modal('hide');
          $(".row").removeClass("hidden");
          $("#ldiv").removeClass("hidden");
        }, 500);
        // setTimeout(() => {
        //   location.reload(true);
        //   $.ajax({
        //     url: '/includes/dashboard.php',
        //     type: 'GET',
        //     dataType: 'html',
        //     success: function (response) {
        //       $('#content').html(response);
        //     },
        //     error: function (xhr, status, error) {
        //       console.error('Erro ao carregar a página:', status, error);
        //     }
        //   });
        // }, 50);
      }, 1000);
    } else {
      $("#lpwd").prop("disabled", "");
      $("#lpwd").addClass("is-invalid");
      $("#lbtn").html("Tente novamente");
      $("#lbtn").prop("disabled", "");
    }
  }, null, "POST", true, "login=true&pw=" + value);
}
$("#lpwd").keyup(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    loginToServer();
  }
});
$("#inputPassword2").keyup(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    authorize(document.getElementById('inputPassword2').value);
  }
});