// Função para exibir os dados gerais
function enrichReportWithGeneralInfo(generalInfoData) {
    const generalInfoSection = document.createElement('div');
    generalInfoSection.innerHTML = `<h4>Dados Gerais</h4>${generalInfoData}`;
    document.getElementById('reportContainer').appendChild(generalInfoSection);
}

// Função para exibir os destaques
function enrichReportWithHighlights(highlightsData) {
    const highlightsSection = document.createElement('div');
    highlightsSection.innerHTML = `<h4>Destaques</h4>${highlightsData}<br><hr><br>`;
    document.getElementById('reportContainer').appendChild(highlightsSection);
}

// Função para exibir os gráficos
function enrichReportWithCharts() {

    const chartIds = [
        'sexBarChart',
        'ageBarChart',
        'cityBarChart',
        'symptomsBarChart',
        'comorbiditiesBarChart',
        'evolutionBarChart',
        'vaccinationBarChart',
        'diagnosticHypothesisBarChart',
        'charts'
    ];

    const chartsSection = document.createElement('div');
    chartsSection.innerHTML = `<h4>Gráficos</h4>`;
    document.getElementById('reportContainer').appendChild(chartsSection);

    const containerElement = document.getElementById('reportContainer');
    containerElement.appendChild(generateChartElements(chartIds));

    const scriptElement = document.createElement('script');
    scriptElement.src = 'js/barChartReport.js';
    document.head.appendChild(scriptElement);
}

// Função para gerar os elementos dinamicamente
function generateChartElements(chartIds) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'mx-auto', 'w-100');
    // cardBody.style.maxHeight = '400px';

    chartIds.forEach(chartId => {
        const chartDiv = document.createElement('div');
        chartDiv.classList.add('d-flex', 'justify-content-center', 'align-items-center');
        chartDiv.id = chartId;
        cardBody.appendChild(chartDiv);
    });

    return cardBody;
}

// Função para criar a variável patientsData
function createPatientsData(data) {
    return data.map(patient => {
        return {
            sexo: { type: 'Sexo', value: patient.sexo },
            idade: { type: 'Idade', value: `${patient.idade} anos` },
            municipio_estado: { type: 'Município/Estado', value: `${patient.municipio}, ${patient.estado}` },
            sintomas: { type: 'Sintomas', value: JSON.parse(patient.sintomas).join(', ') },
            data_sintomas: { type: 'Data de Sintomas', value: patient.data_sintomas },
            comorbidades: { type: 'Comorbidades', value: JSON.parse(patient.comorbidades).join(', ') },
            vacinacao: { type: 'Vacinação', value: patient.vacina },
            leito: { type: 'Leito', value: patient.leito },
            evolucao: { type: 'Evolução', value: patient.evolucao },
            exames: { type: 'Exames', value: patient.exames },
            data_exames: { type: 'Data de Exames', value: patient.data_exames },
            hipotese_diagnostica: { type: 'Hipótese Diagnóstica', value: JSON.parse(patient.hipotese_diagnostica).join(', ') }
        };
    });
}

// Função para criar elementos com cores
function createColoredElement(type, value) {
    const listItem = document.createElement('li');
    const typeSpan = document.createElement('span');
    const valueSpan = document.createElement('span');

    typeSpan.innerText = type + ': ';
    typeSpan.style.color = '#008B8B';

    valueSpan.innerText = value;
    valueSpan.style.color = '#9932CC';

    listItem.appendChild(typeSpan);
    listItem.appendChild(valueSpan);

    return listItem;
}

function generateReport(data) {
    const reportContainer = document.getElementById('reportContainer');

    const generalInfoData = localStorage.getItem('generalInfoData');
    enrichReportWithGeneralInfo(generalInfoData);
    const highlightsData = localStorage.getItem('highlightsData');
    enrichReportWithHighlights(highlightsData);
    enrichReportWithCharts();
}

// Função para acionar a impressão
function printReport() {
    var content = document.getElementById('reportContainer').innerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Relatório - Hospital Dashboard</title></head><body>' + content + '</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Verifica se window.jsonData está definido
if (window.jsonData) {
    // Chama a função para gerar o relatório com os dados disponíveis
    generateReport(window.jsonData);
} else {
    console.error('Dados não encontrados. Certifique-se de que window.jsonData está definido.');
}