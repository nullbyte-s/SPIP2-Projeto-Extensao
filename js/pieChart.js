function drawPieChart(data) {
    // Função para desenhar gráficos de pizza
    function drawChart(dataTable, options, elementId) {
        var chart = new google.visualization.PieChart(document.getElementById(elementId));
        chart.draw(dataTable, options);
    }

    // Contagem de pacientes por sexo
    var sexData = google.visualization.arrayToDataTable([
        ['Sexo', 'Número de Pacientes'],
        ['Masculino', countOccurrencesByValue(data, 'sexo', 'MASCULINO')],
        ['Feminino', countOccurrencesByValue(data, 'sexo', 'FEMININO')]
    ]);

    // Contagem de pacientes por idade
    var ageData = google.visualization.arrayToDataTable([
        ['Faixa Etária', 'Número de Pacientes'],
        ['0-30', countAgeRange(data, 0, 30)],
        ['31-50', countAgeRange(data, 31, 50)],
        ['51-70', countAgeRange(data, 51, 70)],
        ['71-100', countAgeRange(data, 71, 100)],
    ]);

    // Obter uma lista única de todas as cidades
    const cities = getAllCities(data);

    // Criar uma matriz de dados para o gráfico
    const cityChartData = [['Município', 'Número de Pacientes']];

    // Preencher a matriz de dados com contagens para cada cidade
    cities.forEach(city => {
        cityChartData.push([city, countOccurrencesByCity(data, 'municipio', city)]);
    });

    // Contagem de pacientes por município
    var cityDataTable = google.visualization.arrayToDataTable(cityChartData);

    // Obter uma lista única de todos os sintomas
    const synthoms = getAllSymptoms(data);

    // Criar uma matriz de dados para o gráfico
    const symptomChartData = [['Sintomas', 'Número de Pacientes']];

    // Preencher a matriz de dados com contagens para cada sintoma
    synthoms.forEach(synthom => {
        symptomChartData.push([synthom, countOccurrencesBySymptom(data, 'sintomas', synthom)]);
    });

    // Contagem de pacientes por sintomas
    var symptomDataTable = google.visualization.arrayToDataTable(symptomChartData);

    // Obter uma lista única de todas as comorbidades
    const comorbidities = getAllComorbidities(data);

    // Criar uma matriz de dados para o gráfico
    const comorbidityChartData = [['Comorbidades', 'Número de Pacientes']];

    // Preencher a matriz de dados com contagens para cada comorbidade
    comorbidities.forEach(comorbidity => {
        comorbidityChartData.push([comorbidity, countOccurrencesByComorbidity(data, 'comorbidades', comorbidity)]);
    });

    // Contagem de pacientes por comorbidades
    var comorbidityDataTable = google.visualization.arrayToDataTable(comorbidityChartData);

    // Contagem de pacientes por evolução
    var evolutionData = google.visualization.arrayToDataTable([
        ['Evolução', 'Número de Pacientes'],
        ['CLÍNICO', countOccurrencesByValue(data, 'evolucao', 'CLINICO')],
        ['CARDIO', countOccurrencesByValue(data, 'evolucao', 'CARDIO')],
        ['ONCO', countOccurrencesByValue(data, 'evolucao', 'ONCO')]
    ]);

    // Contagem de pacientes por vacinação
    var vaccinationData = google.visualization.arrayToDataTable([
        ['Vacinação', 'Número de Pacientes'],
        ['0D', countOccurrencesByValue(data, 'vacina', '0D')],
        ['1D', countOccurrencesByValue(data, 'vacina', '1D')],
        ['2D', countOccurrencesByValue(data, 'vacina', '2D')],
        ['3D', countOccurrencesByValue(data, 'vacina', '3D')],
        ['4D', countOccurrencesByValue(data, 'vacina', '4D')]
    ]);

    // Contagem de pacientes por hipótese diagnóstica
    var diagnosticHypothesisData = google.visualization.arrayToDataTable([
        ['Hipótese Diagnóstica', 'Número de Pacientes'],
        // Adicione chamadas para countOccurrences para cada hipótese diagnóstica
    ]);

    // Obter uma lista única de todos as hipóteses diagnósticas
    const diagnosticHypotheses = getAllDiagnosticHypotheses(data);

    // Criar uma matriz de dados para o gráfico
    const diagnosticHypothesisChartData = [['Hipótese Diagnóstica', 'Número de Pacientes']];

    // Preencher a matriz de dados com contagens para cada hipótese diagnóstica
    diagnosticHypotheses.forEach(diagnosticHypothesis => {
        diagnosticHypothesisChartData.push([diagnosticHypothesis, countOccurrencesByDiagnosticHypothesis(data, 'hipotese_diagnostica', diagnosticHypothesis)]);
    });

    // Contagem de pacientes por hipóteses diagnósticas
    var diagnosticHypothesisDataTable = google.visualization.arrayToDataTable(diagnosticHypothesisChartData);

    // Opções específicas para cada gráfico de pizza
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

    // Cria e desenha os gráficos de pizza
    drawChart(sexData, sexOptions, 'sexPieChart');
    drawChart(ageData, ageOptions, 'agePieChart');
    drawChart(cityDataTable, cityOptions, 'cityPieChart');
    drawChart(symptomDataTable, symptomOptions, 'symptomsPieChart');
    drawChart(comorbidityDataTable, comorbidityOptions, 'comorbiditiesPieChart');
    drawChart(evolutionData, evolutionOptions, 'evolutionPieChart');
    drawChart(vaccinationData, vaccinationOptions, 'vaccinationPieChart');
    drawChart(diagnosticHypothesisDataTable, diagnosticHypothesisOptions, 'diagnosticHypothesisPieChart');
}

// Executa a função de desenho quando o documento estiver pronto
google.charts.load('current', { 'packages': ['corechart'] });

// Executa a função de desenho quando o documento estiver pronto
google.charts.setOnLoadCallback(() => {
    // Acessa a variável jsonData (escopo global)
    drawPieChart(jsonData);
});
