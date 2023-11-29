function drawBarChart(data) {
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

    // Opções específicas para cada gráfico de barras
    function createChartOptions(title) {
        return {
            title: `Distribuição por ${title}`,
            width: 800,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
            backgroundColor: '#ffffff',
            titleTextStyle: { color: '#a3960a' },
            legendTextStyle: { color: '#5c550a' },
            annotations: {
                textStyle: {
                    fontSize: 12,
                    color: 'black',
                },
            },
        };
    }

    var sexOptions = createChartOptions('Sexo');
    var ageOptions = createChartOptions('Faixa Etária');
    var cityOptions = createChartOptions('Município');
    var symptomOptions = createChartOptions('Sintoma');
    var comorbidityOptions = createChartOptions('Comorbidade');
    var evolutionOptions = createChartOptions('Evolução');
    var vaccinationOptions = createChartOptions('Vacinação');
    var diagnosticHypothesisOptions = createChartOptions('Hipótese Diagnóstica');


    // Cria e desenha os gráficos de barras
    var sexChart = new google.visualization.BarChart(document.getElementById('sexBarChart'));
    sexChart.draw(sexData, sexOptions);

    var ageChart = new google.visualization.BarChart(document.getElementById('ageBarChart'));
    ageChart.draw(ageData, ageOptions);

    var cityChart = new google.visualization.BarChart(document.getElementById('cityBarChart'));
    cityChart.draw(cityDataTable, cityOptions);

    var symptomsChart = new google.visualization.BarChart(document.getElementById('symptomsBarChart'));
    symptomsChart.draw(symptomDataTable, symptomOptions);

    var comorbiditiesChart = new google.visualization.BarChart(document.getElementById('comorbiditiesBarChart'));
    comorbiditiesChart.draw(comorbidityDataTable, comorbidityOptions);

    var evolutionChart = new google.visualization.BarChart(document.getElementById('evolutionBarChart'));
    evolutionChart.draw(evolutionData, evolutionOptions);

    var vaccinationChart = new google.visualization.BarChart(document.getElementById('vaccinationBarChart'));
    vaccinationChart.draw(vaccinationData, vaccinationOptions);

    var diagnosticHypothesisChart = new google.visualization.BarChart(document.getElementById('diagnosticHypothesisBarChart'));
    diagnosticHypothesisChart.draw(diagnosticHypothesisDataTable, diagnosticHypothesisOptions);
}

function countOccurrencesByValue(data, key, value) {
    return data.filter(item => item[key] === value).length;
}

function countAgeRange(data, minAge, maxAge) {
    return data.filter(item => item.idade >= minAge && item.idade <= maxAge).length;
}

// Função para obter uma lista única de todas as cidades
function getAllCities(data) {
    const citiesSet = new Set();
    data.forEach(entry => {
        citiesSet.add(entry.municipio);
    });
    return Array.from(citiesSet);
}

// Função para contar as ocorrências de uma cidade específica
function countOccurrencesByCity(data, key, city) {
    return data.reduce((count, entry) => {
        return entry[key] === city ? count + 1 : count;
    }, 0);
}

// Função para obter uma lista única de todos os sintomas
function getAllSymptoms(data) {
    const symptomsSet = new Set();
    data.forEach(entry => {
        const symptomsArray = JSON.parse(entry.sintomas);
        symptomsArray.forEach(symptom => symptomsSet.add(symptom));
    });
    return Array.from(symptomsSet);
}

// Função para contar as ocorrências de um sintoma específico
function countOccurrencesBySymptom(data, key, symptom) {
    return data.reduce((count, entry) => {
        const symptomsArray = JSON.parse(entry[key]);
        return symptomsArray.includes(symptom) ? count + 1 : count;
    }, 0);
}

// Função para obter uma lista única de todas as comorbidades
function getAllComorbidities(data) {
    const comorbiditiesSet = new Set();
    data.forEach(entry => {
        const comorbiditiesArray = JSON.parse(entry.comorbidades);
        comorbiditiesArray.forEach(comorbidity => comorbiditiesSet.add(comorbidity));
    });
    return Array.from(comorbiditiesSet);
}

// Função para contar as ocorrências de uma comorbidade específica
function countOccurrencesByComorbidity(data, key, comorbidity) {
    return data.reduce((count, entry) => {
        const comorbiditiesArray = JSON.parse(entry[key]);
        return comorbiditiesArray.includes(comorbidity) ? count + 1 : count;
    }, 0);
}

// Função para obter uma lista única de todas as hipóteses diagnósticas
function getAllDiagnosticHypotheses(data) {
    const diagnosticHypothesesSet = new Set();
    data.forEach(entry => {
        const diagnosticHypothesesArray = JSON.parse(entry.hipotese_diagnostica);
        diagnosticHypothesesArray.forEach(diagnosticHypothesis => diagnosticHypothesesSet.add(diagnosticHypothesis));
    });
    return Array.from(diagnosticHypothesesSet);
}

// Função para contar as ocorrências de uma hipótese diagnóstica específica
function countOccurrencesByDiagnosticHypothesis(data, key, diagnosticHypothesis) {
    return data.reduce((count, entry) => {
        const diagnosticHypothesesArray = JSON.parse(entry[key]);
        return diagnosticHypothesesArray.includes(diagnosticHypothesis) ? count + 1 : count;
    }, 0);
}

function drawTimelineChart(data) {
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
            width: 800,
            height: 400,
            titleTextStyle: { color: '#a3960a' },
            legendTextStyle: { color: '#5c550a' },
            textStyle: { fontSize: 8 },
            chartArea: { height: '70%' }
        };
    }

    const timelineOptions = createTimelineChartOptions('Evolução do Número de Casos ao Longo do Tempo', allSymptoms.length);
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

// Executa a função de desenho quando o documento estiver pronto
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(() => {
    drawTimelineChart(jsonData);
    drawBarChart(jsonData);
});