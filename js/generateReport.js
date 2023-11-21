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

    // Enriquece o relatório com dados gerais
    const generalInfoData = localStorage.getItem('generalInfoData');
    enrichReportWithGeneralInfo(generalInfoData);

    // Enriquece o relatório com destaques
    const highlightsData = localStorage.getItem('highlightsData');
    enrichReportWithHighlights(highlightsData);

    // Itera sobre os dados e constrói o relatório
    data.forEach(patient => {
        const patientSection = document.createElement('div');
        patientSection.classList.add('patientSection');

        const patientTitle = document.createElement('h4');
        patientTitle.innerText = `Paciente: ${patient.paciente}`;
        patientSection.appendChild(patientTitle);

        const patientDetails = document.createElement('div');
        const detailsList = document.createElement('ul');

        const patientDetailsItems = createPatientsData([patient])[0];

        Object.entries(patientDetailsItems).forEach(([type, value]) => {
            const listItem = createColoredElement(value.type, value.value);
            detailsList.appendChild(listItem);
        });

        patientDetails.appendChild(detailsList);
        patientSection.appendChild(patientDetails);

        // Adiciona a seção do paciente ao contêiner do relatório
        reportContainer.appendChild(patientSection);
    });
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