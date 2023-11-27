function drawPieChart(data, tabIndex = 0) {

    function drawChart(dataTable, options, elementId) {
        var chart = new google.visualization.PieChart(document.getElementById(elementId));
        chart.draw(dataTable, options);
    }

    function createPieChartOptions(title) {
        return {
            title: `Distribuição por ${title}`,
            width: 630,
            height: 280,
            legend: { position: 'top', maxLines: 3 },
            pieSliceText: 'percentage',
            backgroundColor: '#cfd3e3',
            titleTextStyle: { color: '#a3960a' },
            legendTextStyle: { color: '#5c550a' }
        };
    }

    var sexOptions = createPieChartOptions('Sexo');
    var ageOptions = createPieChartOptions('Faixa Etária');
    var cityOptions = createPieChartOptions('Município');
    var symptomOptions = createPieChartOptions('Sintoma');
    var comorbidityOptions = createPieChartOptions('Comorbidade');
    var evolutionOptions = createPieChartOptions('Evolução');
    var vaccinationOptions = createPieChartOptions('Vacinação');
    var diagnosticHypothesisOptions = createPieChartOptions('Hipótese Diagnóstica');

    // Cria e desenha os gráficos de pizza
    var sexChart = new google.visualization.PieChart(document.getElementById('sexPieChart'));
    sexChart.clearChart();
    drawChart(google.visualization.arrayToDataTable([
        ['Sexo', 'Número de Pacientes'],
        ['Masculino', countOccurrencesByValue(data, 'sexo', 'MASCULINO')],
        ['Feminino', countOccurrencesByValue(data, 'sexo', 'FEMININO')]
    ]), sexOptions, 'sexPieChart');

    var ageChart = new google.visualization.PieChart(document.getElementById('agePieChart'));
    ageChart.clearChart();
    drawChart(google.visualization.arrayToDataTable([
        ['Faixa Etária', 'Número de Pacientes'],
        ['0-30', countAgeRange(data, 0, 30)],
        ['31-50', countAgeRange(data, 31, 50)],
        ['51-70', countAgeRange(data, 51, 70)],
        ['71-100', countAgeRange(data, 71, 100)],
    ]), ageOptions, 'agePieChart');

    var cityPieChart = new google.visualization.PieChart(document.getElementById('cityPieChart'));
    cityPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable(getCityChartData(data)), cityOptions, 'cityPieChart');

    var symptomPieChart = new google.visualization.PieChart(document.getElementById('symptomsPieChart'));
    symptomPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable(getSymptomChartData(data)), symptomOptions, 'symptomsPieChart');

    var comorbidityPieChart = new google.visualization.PieChart(document.getElementById('comorbiditiesPieChart'));
    comorbidityPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable(getComorbidityChartData(data)), comorbidityOptions, 'comorbiditiesPieChart');

    var evolutionPieChart = new google.visualization.PieChart(document.getElementById('evolutionPieChart'));
    evolutionPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable([
        ['Evolução', 'Número de Pacientes'],
        ['CLÍNICO', countOccurrencesByValue(data, 'evolucao', 'CLINICO')],
        ['CARDIO', countOccurrencesByValue(data, 'evolucao', 'CARDIO')],
        ['ONCO', countOccurrencesByValue(data, 'evolucao', 'ONCO')]
    ]), evolutionOptions, 'evolutionPieChart');

    var vaccinationPieChart = new google.visualization.PieChart(document.getElementById('vaccinationPieChart'));
    vaccinationPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable([
        ['Vacinação', 'Número de Pacientes'],
        ['0D', countOccurrencesByValue(data, 'vacina', '0D')],
        ['1D', countOccurrencesByValue(data, 'vacina', '1D')],
        ['2D', countOccurrencesByValue(data, 'vacina', '2D')],
        ['3D', countOccurrencesByValue(data, 'vacina', '3D')],
        ['4D', countOccurrencesByValue(data, 'vacina', '4D')]
    ]), vaccinationOptions, 'vaccinationPieChart');

    var diagnosticHypothesisPieChart = new google.visualization.PieChart(document.getElementById('diagnosticHypothesisPieChart'));
    diagnosticHypothesisPieChart.clearChart();
    drawChart(google.visualization.arrayToDataTable(getDiagnosticHypothesisChartData(data)), diagnosticHypothesisOptions, 'diagnosticHypothesisPieChart');

    // if (tabIndex === 0) {
    //     var sexChart = new google.visualization.PieChart(document.getElementById('sexPieChart'));
    //     sexChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable([
    //         ['Sexo', 'Número de Pacientes'],
    //         ['Masculino', countOccurrencesByValue(data, 'sexo', 'MASCULINO')],
    //         ['Feminino', countOccurrencesByValue(data, 'sexo', 'FEMININO')]
    //     ]), sexOptions, 'sexPieChart');
    // } else if (tabIndex === 1) {
    //     var ageChart = new google.visualization.PieChart(document.getElementById('agePieChart'));
    //     ageChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable([
    //         ['Faixa Etária', 'Número de Pacientes'],
    //         ['0-30', countAgeRange(data, 0, 30)],
    //         ['31-50', countAgeRange(data, 31, 50)],
    //         ['51-70', countAgeRange(data, 51, 70)],
    //         ['71-100', countAgeRange(data, 71, 100)],
    //     ]), ageOptions, 'agePieChart');
    // } else if (tabIndex === 2) {
    //     var cityChart = new google.visualization.PieChart(document.getElementById('cityPieChart'));
    //     cityChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable(getCityChartData(data)), cityOptions, 'cityPieChart');
    // } else if (tabIndex === 3) {
    //     var symptomChart = new google.visualization.PieChart(document.getElementById('symptomsPieChart'));
    //     symptomChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable(getSymptomChartData(data)), symptomOptions, 'symptomsPieChart');
    // } else if (tabIndex === 4) {
    //     var comorbidityChart = new google.visualization.PieChart(document.getElementById('comorbiditiesPieChart'));
    //     comorbidityChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable(getComorbidityChartData(data)), comorbidityOptions, 'comorbiditiesPieChart');
    // } else if (tabIndex === 5) {
    //     var evolutionChart = new google.visualization.PieChart(document.getElementById('evolutionPieChart'));
    //     evolutionChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable([
    //         ['Evolução', 'Número de Pacientes'],
    //         ['CLÍNICO', countOccurrencesByValue(data, 'evolucao', 'CLINICO')],
    //         ['CARDIO', countOccurrencesByValue(data, 'evolucao', 'CARDIO')],
    //         ['ONCO', countOccurrencesByValue(data, 'evolucao', 'ONCO')]
    //     ]), evolutionOptions, 'evolutionPieChart');
    // } else if (tabIndex === 6) {
    //     var vaccinationChart = new google.visualization.PieChart(document.getElementById('vaccinationPieChart'));
    //     vaccinationChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable([
    //         ['Vacinação', 'Número de Pacientes'],
    //         ['0D', countOccurrencesByValue(data, 'vacina', '0D')],
    //         ['1D', countOccurrencesByValue(data, 'vacina', '1D')],
    //         ['2D', countOccurrencesByValue(data, 'vacina', '2D')],
    //         ['3D', countOccurrencesByValue(data, 'vacina', '3D')],
    //         ['4D', countOccurrencesByValue(data, 'vacina', '4D')]
    //     ]), vaccinationOptions, 'vaccinationPieChart');
    // } else if (tabIndex === 7) {
    //     var diagnosticHypothesisChart = new google.visualization.PieChart(document.getElementById('diagnosticHypothesisPieChart'));
    //     diagnosticHypothesisChart.clearChart();
    //     drawChart(google.visualization.arrayToDataTable(getDiagnosticHypothesisChartData(data)), diagnosticHypothesisOptions, 'diagnosticHypothesisPieChart');
    // }
}

// Funções auxiliares

function getCityChartData(data) {
    const cities = getAllCities(data);
    const cityChartData = [['Município', 'Número de Pacientes']];
    cities.forEach(city => {
        cityChartData.push([city, countOccurrencesByCity(data, 'municipio', city)]);
    });
    return cityChartData;
}

function getSymptomChartData(data) {
    const symptoms = getAllSymptoms(data);
    const symptomChartData = [['Sintomas', 'Número de Pacientes']];
    symptoms.forEach(symptom => {
        symptomChartData.push([symptom, countOccurrencesBySymptom(data, 'sintomas', symptom)]);
    });
    return symptomChartData;
}

function getComorbidityChartData(data) {
    const comorbidities = getAllComorbidities(data);
    const comorbidityChartData = [['Comorbidades', 'Número de Pacientes']];
    comorbidities.forEach(comorbidity => {
        comorbidityChartData.push([comorbidity, countOccurrencesByComorbidity(data, 'comorbidades', comorbidity)]);
    });
    return comorbidityChartData;
}

function getDiagnosticHypothesisChartData(data) {
    const diagnosticHypotheses = getAllDiagnosticHypotheses(data);
    const diagnosticHypothesisChartData = [['Hipótese Diagnóstica', 'Número de Pacientes']];
    diagnosticHypotheses.forEach(diagnosticHypothesis => {
        diagnosticHypothesisChartData.push([diagnosticHypothesis, countOccurrencesByDiagnosticHypothesis(data, 'hipotese_diagnostica', diagnosticHypothesis)]);
    });
    return diagnosticHypothesisChartData;
}

// function loadCharts(data = jsonData, tabIndex) {
//     google.charts.load('current', { 'packages': ['corechart'] });
//     google.charts.setOnLoadCallback(() => {
//         // Chama a função para desenhar o gráfico da aba clicada
//         drawPieChart(data, tabIndex);
//     });
// }

// // Captura os IDs únicos das abas (Pizza)
// var pieTabsContainer = document.getElementById('pieChartsTabs');
// var pieTabs = pieTabsContainer.querySelectorAll('.nav-link');

// pieTabs.forEach(function (tab, index) {
//     tab.addEventListener('click', function (event) {
//         event.preventDefault();
//         loadCharts(window.jsonData, index);
//     });
// });

// // Carrega os gráficos para a primeira aba inicialmente
// // if (!window.jsonData || shouldReloadCharts()) {
// if (!window.jsonData) {
//     google.charts.load('current', { 'packages': ['corechart'] });
//     google.charts.setOnLoadCallback(() => {
//         drawTimelineChart(jsonData);
//         drawBarChart(jsonData);
//         drawPieChart(jsonData);
//     });
// }

// // Função para verificar se os gráficos devem ser recarregados
// function shouldReloadCharts() {
//     document.getElementById('dashboardLink').addEventListener('click', function (event) {
//         var target = event.target;

//         if (target.getAttribute('href') === 'includes/dashboard.php') {
//             event.preventDefault();
//             drawPieChart(window.jsonData);
//         }
//     });
// }