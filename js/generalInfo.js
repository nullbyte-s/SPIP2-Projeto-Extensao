const generalInfo = document.getElementById('generalInfo');

// Função para calcular a faixa etária média
function calculateAverageAge(data) {
    const totalAge = data.reduce((sum, patient) => sum + patient.idade, 0);
    const averageAge = totalAge / data.length;
    return averageAge.toFixed(2);
}

// Função para contar a ocorrência de itens em uma lista
function countOccurrences(list) {
    const count = {};
    list.forEach(item => {
        count[item] = (count[item] || 0) + 1;
    });

    // Convertendo o objeto em um array de pares chave-valor
    const countArray = Object.entries(count);

    return countArray;
}

function colorizeText(text) {
    return `<span style="color: #008B8B;">${text}</span>`;
}

function countOccurrencesArray(array) {
    return array.reduce((count, value) => {
        count[value] = (count[value] || 0) + 1;
        return count;
    }, {});
}

function formatData(data) {
    return data.map(([key, value]) => `<span style="color: #9932CC;">${key}:</span><span style="color: #008B8B;">${value}</span>`).join(', ');
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// Função para calcular a média das datas
function calculateAverageDate(dates) {
    const totalMilliseconds = dates.reduce((total, date) => total + date.getTime(), 0);
    const averageMilliseconds = totalMilliseconds / dates.length;

    return new Date(averageMilliseconds);
}

function formatAsDDMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

// Função para exibir as informações no painel
function displayDashboardInfo(data) {
    // Número Total de Casos
    const totalCases = data.length;

    // Distribuição por Sexo
    const genderDistribution = countOccurrences(data.map(item => item.sexo));

    // Faixa Etária Média
    const averageAge = calculateAverageAge(data);

    // Top 3 Sintomas Mais Comuns
    const allSymptoms = data.flatMap(patient => JSON.parse(patient.sintomas));
    const flatSymptoms = allSymptoms.flatMap(symptom => symptom);
    const uniqueSymptoms = [...new Set(flatSymptoms)];
    const topSymptoms = countOccurrencesArray(flatSymptoms);
    const top3Symptoms = Object.entries(topSymptoms)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

    const formattedTop3Symptoms = top3Symptoms.join(', ');

    // Principais Comorbidades
    const allComorbidities = data.flatMap(patient => JSON.parse(patient.comorbidades));
    const topComorbidities = Object.entries(countOccurrencesArray(allComorbidities))
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 3)
        .map(([comorbidity, count]) => [comorbidity, count]);

    // Tipo de Leito Mais Utilizado
    const bedTypes = countOccurrencesArray(data.map(patient => patient.leito));
    const mostUsedBedType = Object.entries(bedTypes).sort((a, b) => b[1] - a[1])[0][0];

    // Evolução dos Casos
    const allEvolutionTypes = data
        .map(patient => patient.evolucao)
        .filter(evolution => evolution.trim() !== '')
    const evolutionTypes = Object.entries(countOccurrencesArray(allEvolutionTypes))
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 3)
        .map(([evolution, count]) => [evolution, count]);

    // Vacinação
    // const vaccinationStatus = countOccurrences(data.map(patient => patient.vacina));
    const totalPatients = data.length;
    const vaccinatedPatients = data.filter(patient => patient.vacina !== '0D').length;
    const vaccinationPercentage = (vaccinatedPatients / totalPatients) * 100;

    // Principais Hipóteses Diagnósticas
    const allDiagnoses = data.flatMap(patient => JSON.parse(patient.hipotese_diagnostica));
    const topDiagnoses = Object.entries(countOccurrencesArray(allDiagnoses))
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 3)
        .map(([comorbidity, count]) => [comorbidity, count]);

    // Top 3 Municípios com Mais Casos
    const topCities = countOccurrences(data
        .map(patient => patient.municipio)
        .filter(city => city.trim() !== '')
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

    // Data Média de Internação
    const internationDates = data
        .filter(patient => isValidDate(patient.internacao))
        .map(patient => new Date(patient.internacao));
    const averageInternationDate = calculateAverageDate(internationDates);

    // Número de Casos por Semana
    const casesPerWeek = countOccurrences(data.map(patient => patient.semana));

    // Construindo o HTML para exibir as informações
    let dashboardHTML = `
        <ul>
            <li><strong>Número Total de Casos:</strong> ${colorizeText(totalCases)}</li>
            <li><strong>Distribuição por Sexo:</strong> ${formatData(genderDistribution)}</li>
            <li><strong>Faixa Etária Média:</strong> ${colorizeText(averageAge)}</li>
            <li><strong>Sintomas Mais Comuns:</strong> ${colorizeText(formattedTop3Symptoms)}</li>
            <li><strong>Principais Comorbidades:</strong> ${formatData(topComorbidities)}</li>
            <li><strong>Tipo de Leito Mais Utilizado:</strong> ${colorizeText(mostUsedBedType)}</li>
            <li><strong>Evolução dos Casos:</strong> ${formatData(evolutionTypes)}</li>
            <li><strong>Vacinação:</strong> ${colorizeText(vaccinationPercentage.toFixed(2))}${colorizeText(`%`)}</li>
            <li><strong>Principais Hipóteses Diagnósticas:</strong> ${formatData(topDiagnoses)}</li>
            <li><strong>Municípios com Mais Casos:</strong> ${colorizeText(topCities.join(', '))}</li>
            <li><strong>Data Média de Internação:</strong> ${colorizeText(formatAsDDMMYYYY(averageInternationDate))}</li>
            <li><strong>Número de Casos por Semana:</strong> ${formatData(casesPerWeek)}</li>
        </ul >
        `;

    if (generalInfo) {
        // Exibindo as informações no painel
        generalInfo.innerHTML = dashboardHTML;
    }
}

// Função para exibir as informações assim que os dados forem carregados
fetchData(function (error, data) {
    if (error) {
        console.error('Erro ao obter dados:', error);
    } else {
        displayDashboardInfo(data);
    }
});