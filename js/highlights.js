const highlights = document.getElementById('highlights');

// Função para calcular a proporção entre os sexos
function calculateGenderRatio(data) {
    const totalCases = data.length;
    const maleCases = data.filter(patient => patient.sexo === 'MASCULINO').length;
    const femaleCases = totalCases - maleCases;

    return {
        MASCULINO: (maleCases / totalCases) * 100,
        FEMININO: (femaleCases / totalCases) * 100,
    };
}

// Função para calcular o percentual de incidência por cidade
function calculateCityPercentage(data) {
    const totalCases = data.length;
    const cityOccurrences = countOccurrences(data.map(patient => patient.municipio));

    const percentageByCity = {};
    cityOccurrences.forEach(([city, occurrences]) => {
        const percentage = (occurrences / totalCases) * 100;
        percentageByCity[city] = percentage;
    });

    return percentageByCity;
}

// Função para calcular a taxa de internação por faixa etária
function calculateHospitalizationRate(data) {
    const ageGroups = {
        '0-20': 0,
        '21-40': 0,
        '41-60': 0,
        '61+': 0,
    };

    data.forEach(patient => {
        const age = patient.idade;
        if (age <= 20) {
            ageGroups['0-20']++;
        } else if (age <= 40) {
            ageGroups['21-40']++;
        } else if (age <= 60) {
            ageGroups['41-60']++;
        } else {
            ageGroups['61+']++;
        }
    });

    const totalPatients = data.length;
    const rateByAge = {};

    for (const [group, count] of Object.entries(ageGroups)) {
        rateByAge[group] = (count / totalPatients) * 100;
    }

    return rateByAge;
}

// Função para calcular a distribuição de sintomas por sexo
function calculateSymptomDistributionByGender(data) {
    const symptomDistribution = {};

    data.forEach(patient => {
        const gender = patient.sexo;
        const symptoms = JSON.parse(patient.sintomas);

        if (!symptomDistribution[gender]) {
            symptomDistribution[gender] = {};
        }

        symptoms.forEach(symptom => {
            symptomDistribution[gender][symptom] = (symptomDistribution[gender][symptom] || 0) + 1;
        });
    });

    return symptomDistribution;
}

// Função para calcular a variação da idade média ao longo do tempo
function calculateAgeVariation(data) {
    const ageVariation = {};

    data.forEach(patient => {
        const week = patient.semana;
        const age = patient.idade;

        if (!ageVariation[week]) {
            ageVariation[week] = { totalAge: 0, totalPatients: 0 };
        }

        ageVariation[week].totalAge += age;
        ageVariation[week].totalPatients++;
    });

    const averageAgeByWeek = {};

    for (const [week, { totalAge, totalPatients }] of Object.entries(ageVariation)) {
        averageAgeByWeek[week] = totalAge / totalPatients;
    }

    return averageAgeByWeek;
}

// Função para comparar comorbidades em diferentes estados
function compareComorbiditiesByState(data) {
    const comorbiditiesByState = {};

    data.forEach(patient => {
        const state = patient.estado;
        const comorbidities = JSON.parse(patient.comorbidades);

        if (!comorbiditiesByState[state]) {
            comorbiditiesByState[state] = {};
        }

        comorbidities.forEach(comorbidity => {
            comorbiditiesByState[state][comorbidity] = (comorbiditiesByState[state][comorbidity] || 0) + 1;
        });
    });

    return comorbiditiesByState;
}

// Função para calcular a evolução dos casos por leito
function calculateEvolutionByBedType(data) {
    const evolutionByBedType = {};

    data.forEach(patient => {
        const bedType = patient.leito;
        const evolution = patient.evolucao;

        if (!evolutionByBedType[bedType]) {
            evolutionByBedType[bedType] = {};
        }

        evolutionByBedType[bedType][evolution] = (evolutionByBedType[bedType][evolution] || 0) + 1;
    });

    return evolutionByBedType;
}

// Função para analisar a evolução temporal da vacinação
function analyzeVaccinationTemporalEvolution(data) {
    const vaccinationEvolution = {};

    data.forEach(patient => {
        const week = patient.semana;
        const vaccinationStatus = patient.vacina;

        if (!vaccinationEvolution[week]) {
            vaccinationEvolution[week] = { totalPatients: 0, vaccinatedPatients: 0 };
        }

        vaccinationEvolution[week].totalPatients++;
        if (vaccinationStatus !== '0D') {
            vaccinationEvolution[week].vaccinatedPatients++;
        }
    });

    const percentageByWeek = {};

    for (const [week, { totalPatients, vaccinatedPatients }] of Object.entries(vaccinationEvolution)) {
        percentageByWeek[week] = (vaccinatedPatients / totalPatients) * 100;
    }

    return percentageByWeek;
}

function formatNestedData(data) {
    if (Array.isArray(data)) {
        return data.map(([key, value]) => `<span style="color: #9932CC;">${key}:</span><span style="color: #008B8B;">${typeof value === 'number' ? value.toFixed(2) : value}</span>`).join(', ');
    } else if (typeof data === 'object') {
        const formattedData = Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object') {
                // Se o valor for outro objeto, chama a função recursivamente
                return `<span style="color: #9932CC;">${key}:</span>${formatNestedData(value)}`;
            } else {
                return `<span style="color: #9932CC;">${key}:</span><span style="color: #008B8B;">${typeof value === 'number' ? value.toFixed(2) : value}</span>`;
            }
        });
        return formattedData.join(', ');
    } else {
        return data;
    }
}

// Atualização da função formatData
function formatHighlightsData(data) {
    return formatNestedData(data);
}

// Função para exibir as informações avançadas no painel
function displayhighlights(data) {
    // Relação entre Número de Casos por Sexo
    const genderRatio = calculateGenderRatio(data);

    // Percentual de Incidência de Casos por Cidade
    const cityPercentage = calculateCityPercentage(data);

    // Taxa de Internação por Faixa Etária
    const hospitalizationRate = calculateHospitalizationRate(data);

    // Distribuição de Sintomas por Sexo
    const symptomDistributionByGender = calculateSymptomDistributionByGender(data);

    // Variação da Idade Média ao Longo do Tempo
    const ageVariation = calculateAgeVariation(data);

    // Comparação de Comorbidades em Diferentes Estados
    const comorbiditiesByState = compareComorbiditiesByState(data);

    // Evolução dos Casos por Leito
    const evolutionByBedType = calculateEvolutionByBedType(data);

    // Análise Temporal da Vacinação
    const vaccinationTemporalEvolution = analyzeVaccinationTemporalEvolution(data);

    // Construindo o HTML para exibir as informações avançadas
    let highlightsHTML = `
        <ul>
            <li><strong>Relação entre Número de Casos por Sexo:</strong> ${formatHighlightsData(genderRatio)}</li>
            <li><strong>Percentual de Incidência de Casos por Cidade:</strong> ${formatHighlightsData(cityPercentage)}</li>
            <li><strong>Taxa de Internação por Faixa Etária:</strong> ${formatHighlightsData(hospitalizationRate)}</li>
            <li><strong>Distribuição de Sintomas por Sexo:</strong> ${formatHighlightsData(symptomDistributionByGender)}</li>
            <li><strong>Variação da Idade Média ao Longo do Tempo:</strong> ${formatHighlightsData(ageVariation)}</li>
            <li><strong>Comparação de Comorbidades em Diferentes Estados:</strong> ${formatHighlightsData(comorbiditiesByState)}</li>
            <li><strong>Evolução dos Casos por Leito:</strong> ${formatHighlightsData(evolutionByBedType)}</li>
            <li><strong>Análise Temporal da Vacinação:</strong> ${formatHighlightsData(vaccinationTemporalEvolution)}</li>
        </ul>
    `;

    // Exibindo as informações no painel
    highlights.innerHTML = highlightsHTML;
}

// Função para exibir as informações assim que os dados forem carregados
fetchData(function (error, data) {
    if (error) {
        console.error('Erro ao obter dados:', error);
    } else {
        displayhighlights(data);
        localStorage.setItem('generalInfoData', document.getElementById('generalInfo').innerHTML);
        localStorage.setItem('highlightsData', document.getElementById('highlights').innerHTML);
    }
});
