function drawPieChart(data, tabIndex = 0) {

    function drawChart(dataTable, options, elementId) {
        var chart = new google.visualization.PieChart(document.getElementById(elementId));
        chart.draw(dataTable, options);
    }

    function createPieChartOptions(title) {
        return {
            title: `Distribuição por ${title}`,
            width: 500,
            height: 300,
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

    if (tabIndex === 0) {
        drawChart(google.visualization.arrayToDataTable([
            ['Sexo', 'Número de Pacientes'],
            ['Masculino', countOccurrencesByValue(data, 'sexo', 'MASCULINO')],
            ['Feminino', countOccurrencesByValue(data, 'sexo', 'FEMININO')]
        ]), sexOptions, 'sexPieChart');
    } else if (tabIndex === 1) {
        drawChart(google.visualization.arrayToDataTable([
            ['Faixa Etária', 'Número de Pacientes'],
            ['0-30', countAgeRange(data, 0, 30)],
            ['31-50', countAgeRange(data, 31, 50)],
            ['51-70', countAgeRange(data, 51, 70)],
            ['71-100', countAgeRange(data, 71, 100)],
        ]), ageOptions, 'agePieChart');
    } else if (tabIndex === 2) {
        drawChart(google.visualization.arrayToDataTable(getCityChartData(data)), cityOptions, 'cityPieChart');
    } else if (tabIndex === 3) {
        drawChart(google.visualization.arrayToDataTable(getSymptomChartData(data)), symptomOptions, 'symptomsPieChart');
    } else if (tabIndex === 4) {
        drawChart(google.visualization.arrayToDataTable(getComorbidityChartData(data)), comorbidityOptions, 'comorbiditiesPieChart');
    } else if (tabIndex === 5) {
        drawChart(google.visualization.arrayToDataTable([
            ['Evolução', 'Número de Pacientes'],
            ['CLÍNICO', countOccurrencesByValue(data, 'evolucao', 'CLINICO')],
            ['CARDIO', countOccurrencesByValue(data, 'evolucao', 'CARDIO')],
            ['ONCO', countOccurrencesByValue(data, 'evolucao', 'ONCO')]
        ]), evolutionOptions, 'evolutionPieChart');
    } else if (tabIndex === 6) {
        drawChart(google.visualization.arrayToDataTable([
            ['Vacinação', 'Número de Pacientes'],
            ['0D', countOccurrencesByValue(data, 'vacina', '0D')],
            ['1D', countOccurrencesByValue(data, 'vacina', '1D')],
            ['2D', countOccurrencesByValue(data, 'vacina', '2D')],
            ['3D', countOccurrencesByValue(data, 'vacina', '3D')],
            ['4D', countOccurrencesByValue(data, 'vacina', '4D')]
        ]), vaccinationOptions, 'vaccinationPieChart');
    } else if (tabIndex === 7) {
        drawChart(google.visualization.arrayToDataTable(getDiagnosticHypothesisChartData(data)), diagnosticHypothesisOptions, 'diagnosticHypothesisPieChart');
    }
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

function loadCharts(data = jsonData, tabIndex) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        // Chama a função para desenhar o gráfico da aba clicada
        drawPieChart(data, tabIndex);
    });
}

// Captura os IDs únicos das suas abas
var tabsContainer = document.getElementById('pieChartsTabs');
var tabs = tabsContainer.querySelectorAll('.nav-link');

tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        loadCharts(window.jsonData, index);
    });
});

// Carrega os gráficos para a primeira aba inicialmente
if (!window.jsonData) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        drawPieChart(jsonData);
    });
}