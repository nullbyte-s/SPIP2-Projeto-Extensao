function drawTimelineChart(data, tabIndex = 0) {
    const allSymptoms = getAllSymptoms(data);

    function getAllSymptoms(data) {
        const symptomsSet = new Set();

        data.forEach(item => {
            // Parse para converter a string JSON em um array
            const symptomsArray = JSON.parse(item.sintomas);

            symptomsArray.forEach(symptom => {
                symptomsSet.add(symptom);
            });
        });

        return Array.from(symptomsSet);
    }

    function drawChart(dataTable, options, elementId) {
        var chart = new google.visualization.ColumnChart(document.getElementById(elementId));
        chart.draw(dataTable, options);
    }

    function createTimelineChartOptions(title) {
        return {
            title: title,
            isStacked: true,
            legend: { position: 'bottom' },
            width: 510,
            height: 320,
        };
    }

    const timelineOptions = createTimelineChartOptions('Evolução do Número de Casos ao Longo do Tempo');
    const symptomsOptions = createTimelineChartOptions('Distribuição de Sintomas ao Longo do Tempo');

    // Cria um array para armazenar os dados do gráfico de linha do tempo
    const timelineData = [];

    // Cria um array para armazenar os dados do gráfico de distribuição de sintomas
    const symptomsData = [];

    // Itera sobre todas as semanas nos dados
    const weeks = Array.from(new Set(data.map(item => item.semana)));

    // Preenche o array com os dados de cada semana
    weeks.forEach(week => {
        // Filtra os dados para a semana atual
        const filteredData = data.filter(item => item.semana === week);

        // Cria uma linha com os totais
        const row = [week, filteredData.length];
        timelineData.push(row);

        // Cria uma linha para o gráfico de distribuição de sintomas
        const symptomsRow = [week];

        // Adiciona colunas para cada sintoma
        allSymptoms.forEach(symptom => {
            const symptomCount = filteredData.filter(item => JSON.parse(item.sintomas).includes(symptom)).length;
            symptomsRow.push(symptomCount);
        });

        // Adiciona a linha ao array do gráfico de distribuição de sintomas
        symptomsData.push(symptomsRow);
    });

    // Cria um DataTable do Google Charts para o gráfico de linha do tempo
    const timelineDataTable = new google.visualization.DataTable();
    timelineDataTable.addColumn({ type: 'number', label: 'Semana' });
    timelineDataTable.addColumn({ type: 'number', label: 'Número de Casos' });
    timelineDataTable.addRows(timelineData);

    // Cria um DataTable do Google Charts para o gráfico de distribuição de sintomas
    const symptomsDataTable = new google.visualization.DataTable();
    symptomsDataTable.addColumn({ type: 'number', label: 'Semana' });

    // Adiciona colunas para cada sintoma
    allSymptoms.forEach(symptom => {
        symptomsDataTable.addColumn({ type: 'number', label: symptom });
    });

    // Adiciona as linhas ao DataTable
    symptomsData.forEach(row => {
        if (row.length !== symptomsDataTable.getNumberOfColumns()) {
            console.error('Número de colunas não corresponde ao esperado:', row);
        }
        symptomsDataTable.addRow(row);
    });

    // Desenha o gráfico de linha do tempo
    var casesTimeLineChart = new google.visualization.LineChart(document.getElementById('casesTimeLineChart'));
    casesTimeLineChart.clearChart();
    drawChart(timelineDataTable, timelineOptions, 'casesTimeLineChart');

    // Desenha o gráfico de distribuição de sintomas
    var symptomsTimeLineChart = new google.visualization.ColumnChart(document.getElementById('symptomsTimeLineChart'));
    symptomsTimeLineChart.clearChart();
    drawChart(symptomsDataTable, symptomsOptions, 'symptomsTimeLineChart');
}

// Função para calcular a distribuição de sintomas
function calculateSymptomsDistribution(data) {
    const symptoms = getAllSymptoms(data);
    const distribution = [];

    symptoms.forEach(symptom => {
        const count = countOccurrencesBySymptom(data, 'sintomas', symptom);
        distribution.push(count);
    });

    return distribution;
}

function loadCharts(data = jsonData, tabIndex) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        // Chama a função para desenhar o gráfico da aba clicada
        drawTimelineChart(data, tabIndex);
    });
}

// // Captura os IDs únicos das abas (Linha de Tempo)
// var timeLinetabsContainer = document.getElementById('timeLineChartsTabs');
// var timeLineTabsLinks = timeLinetabsContainer.querySelectorAll('.nav-link');

// timeLineTabsLinks.forEach(function (tab, index) {
//     tab.addEventListener('click', function (event) {
//         event.preventDefault();
//         loadCharts(window.jsonData, index);
//     });
// });