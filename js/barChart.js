function drawBarChart(data, tabIndex = 0) {
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
            width: 700,
            height: 350,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
            backgroundColor: '#cfd3e3',
            titleTextStyle: { color: '#a3960a' },
            legendTextStyle: { color: '#5c550a' }
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
    sexChart.clearChart();
    sexChart.draw(sexData, sexOptions);

    var ageChart = new google.visualization.BarChart(document.getElementById('ageBarChart'));
    ageChart.clearChart();
    ageChart.draw(ageData, ageOptions);

    var cityChart = new google.visualization.BarChart(document.getElementById('cityBarChart'));
    cityChart.clearChart();
    cityChart.draw(cityDataTable, cityOptions);

    var symptomsChart = new google.visualization.BarChart(document.getElementById('symptomsBarChart'));
    symptomsChart.clearChart();
    symptomsChart.draw(symptomDataTable, symptomOptions);

    var comorbiditiesChart = new google.visualization.BarChart(document.getElementById('comorbiditiesBarChart'));
    comorbiditiesChart.clearChart();
    comorbiditiesChart.draw(comorbidityDataTable, comorbidityOptions);

    var evolutionChart = new google.visualization.BarChart(document.getElementById('evolutionBarChart'));
    evolutionChart.clearChart();
    evolutionChart.draw(evolutionData, evolutionOptions);

    var vaccinationChart = new google.visualization.BarChart(document.getElementById('vaccinationBarChart'));
    vaccinationChart.clearChart();
    vaccinationChart.draw(vaccinationData, vaccinationOptions);

    var diagnosticHypothesisChart = new google.visualization.BarChart(document.getElementById('diagnosticHypothesisBarChart'));
    diagnosticHypothesisChart.clearChart();
    diagnosticHypothesisChart.draw(diagnosticHypothesisDataTable, diagnosticHypothesisOptions);

    if (tabIndex === 0) {
        sexChart.draw(sexData, sexOptions);
    } else if (tabIndex === 1) {
        ageChart.draw(ageData, ageOptions);
    } else if (tabIndex === 2) {
        cityChart.draw(cityDataTable, cityOptions);
    } else if (tabIndex === 3) {
        symptomsChart.draw(symptomDataTable, symptomOptions);
    } else if (tabIndex === 4) {
        comorbiditiesChart.draw(comorbidityDataTable, comorbidityOptions);
    } else if (tabIndex === 5) {
        evolutionChart.draw(evolutionData, evolutionOptions);
    } else if (tabIndex === 6) {
        vaccinationChart.draw(vaccinationData, vaccinationOptions);
    } else if (tabIndex === 7) {
        diagnosticHypothesisChart.draw(diagnosticHypothesisDataTable, diagnosticHypothesisOptions);
    }
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

// Captura os IDs únicos das suas abas
var tabsContainer = document.getElementById('barTabs');
var tabs = tabsContainer.querySelectorAll('.nav-link');

tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            fetchData(function (error, data) {
                if (error) {
                    console.error('Erro ao obter dados:', error);
                } else {
                    // Chama a função para desenhar o gráfico da aba clicada
                    drawBarChart(jsonData, data);
                }
            });
        });
    });
});

// Carrega os gráficos de barras para a primeira aba inicialmente
if (!window.jsonData) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        drawBarChart(jsonData);
    });
}

// // Executa a função de desenho quando o documento estiver pronto
// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(() => {

// // Abordagem antiga: carregava o JSON para cada script.js
// $.ajax({
//     url: 'backend/get_data.php',
//     type: 'GET',
//     dataType: 'json',
//     success: function (data) {
//         drawBarChart(data);
//     },
//     error: function (xhr, status, error) {
//         console.error('Erro ao obter dados:', status, error);
//     }
// });

// Acessa a variável jsonData (escopo global) - Obsoleto para alguns cenários: se os dados demorarem a carregar, a variável não será chamada
// drawBarChart(jsonData);

// // Alternativa à variável jsonData
// fetchData(function (error, data) {
//     if (error) {
//         console.error('Erro ao obter dados:', error);
//     } else {
//         drawBarChart(data);
//     }
// });
// });