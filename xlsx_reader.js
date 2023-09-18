// Função para ler o arquivo XLSX e chamar as funções de criação de gráficos
function readXLSXFile(filePath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'blob';

    xhr.onload = function (e) {
        var blob = xhr.response;
        var reader = new FileReader();

        reader.onload = function (event) {
            var data = event.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            var sheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[sheetName];
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

            callback(jsonData);
        };

        reader.readAsBinaryString(blob);
    };

    xhr.send();
}

// Gráfico de barras de Ganho/Perda
function drawGanhoPerdaChart(data) {
    var ganhoPerdaData = [['Ativo', 'Ganho/Perda']];

    for (var i = 4; i < data.length - 1; i++) {
        var ativo = data[i]["__EMPTY_1"];
        var ganhoPerda = data[i]["__EMPTY_9"];

        ganhoPerdaData.push([ativo, ganhoPerda]);
    }

    var chartData = google.visualization.arrayToDataTable(ganhoPerdaData);

    var options = {
        title: 'Ganho/Perda por Ativo',
        chartArea: { width: '70%' },
        hAxis: {
            title: 'Ativo',
            minValue: 0
        },
        vAxis: {
            title: 'Ganho/Perda'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('ganhoPerdaChart'));
    chart.draw(chartData, options);
}

// Gráfico de pizza do percentual de ações
function drawQuantidadeAcoesChart(data) {
    var quantidadeAcoesPorAtivo = {};

    for (var i = 4; i < data.length - 1; i++) {
        var ativo = data[i]["__EMPTY_1"];
        var quantidade = data[i]["__EMPTY_4"];

        if (quantidadeAcoesPorAtivo[ativo]) {
            quantidadeAcoesPorAtivo[ativo] += quantidade;
        } else {
            quantidadeAcoesPorAtivo[ativo] = quantidade;
        }
    }

    var quantidadeAcoesData = [['Ativo', 'Quantidade']];
    for (var ativo in quantidadeAcoesPorAtivo) {
        quantidadeAcoesData.push([ativo, quantidadeAcoesPorAtivo[ativo]]);
    }

    var chartData = google.visualization.arrayToDataTable(quantidadeAcoesData);

    var options = {
        title: 'Percentual de Quantidade de Ações por Ativo',
    };

    var chart = new google.visualization.PieChart(document.getElementById('quantidadeAcoesChart'));
    chart.draw(chartData, options);
}

// Gráfico de barras empilhadas para Volume Financeiro e resultado bruto em percentual
function drawVolumeFinanceiroChart(data) {
    var volumeFinanceiroData = [['Ativo', 'Volume Financeiro Anterior', 'Volume Financeiro Atual', 'Resultado Bruto (%)']];

    // Pule as linhas de cabeçalho e a linha final vazia
    for (var i = 4; i < data.length - 1; i++) {
        var ativo = data[i]["__EMPTY_1"];
        var volumeFinanceiroMontagem = data[i]["__EMPTY_5"];
        var volumeFinanceiroDesmontagem = data[i]["__EMPTY_8"];
        var resultadoBruto = data[i]["__EMPTY_10"];

        var resultadoBrutoPercentual = ((resultadoBruto / volumeFinanceiroMontagem) * 100).toFixed(2);

        volumeFinanceiroData.push([ativo, volumeFinanceiroMontagem, volumeFinanceiroDesmontagem, parseFloat(resultadoBrutoPercentual)]);
    }

    var chartData = google.visualization.arrayToDataTable(volumeFinanceiroData);

    var options = {
        title: 'Volume Financeiro e Resultado Bruto (%) por Ativo',
        isStacked: true,
        hAxis: {
            title: 'Ativo'
        },
        vAxis: {
            title: 'Valor',
            format: 'currency'
        },
        series: {
            2: { type: 'line' },
            3: { type: 'line' }
        },
        colors: ['#3366CC', '#DC3912', '#FF9900']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('volumeFinanceiroChart'));
    chart.draw(chartData, options);
}

function onFileRead(data) {
    var jsonData = data;

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function () {
        drawGanhoPerdaChart(jsonData);
        drawQuantidadeAcoesChart(jsonData);
        drawVolumeFinanceiroChart(jsonData);
    });
}

// Chame a função para ler o arquivo XLSX e iniciar o processo
var xlsxFilePath = 'db/Investimentos.xlsx';
readXLSXFile(xlsxFilePath, onFileRead);
