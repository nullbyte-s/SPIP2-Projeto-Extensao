// Função para obter valores únicos de uma propriedade específica
function getUniqueValues(data, property) {
    const uniqueValues = new Set();

    data.forEach(item => {
        uniqueValues.add(item[property]);
    });

    return Array.from(uniqueValues);
}

fetchData(function (error, data) {
    if (error) {
        console.error('Erro ao obter dados:', error);
    } else {
        // Preenche o dropdown de opções
        const filterOptionsDropdown = document.getElementById('filterOptionsDropdown');
        const selectedFilterOptionDropdown = document.getElementById('selectedFilterOptionDropdown');

        const filterOptions = ['Todos', 'internacao', 'semana', 'sexo', 'municipio', 'sintomas', 'comorbidades', 'leito', 'evolucao', 'exames', 'hipotese_diagnostica'];

        filterOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option.replace(/_/g, ' ').charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ');
            filterOptionsDropdown.appendChild(optionElement);
        });

        // Oculta o segundo dropdown
        selectedFilterOptionDropdown.style.display = 'none';

        // Função para atualizar dados e gráficos
        function updateDataAndCharts(data) {
            drawBarChart(data);
            drawPieChart(data);
            // // Em desenvolvimento
            // drawMarkerGeoChart(data);
            populateDataTable(data);
        }

        // Adiciona um ouvinte de evento para o evento de alteração do dropdown de opções
        filterOptionsDropdown.addEventListener('change', function () {
            const selectedOption = filterOptionsDropdown.value;
            const selectedValue = selectedFilterOptionDropdown.value;

            // Limpa o dropdown de opções selecionadas
            selectedFilterOptionDropdown.innerHTML = '';

            if (selectedOption === 'Todos') {
                // Se a opção selecionada for "Todos", oculta o segundo dropdown
                selectedFilterOptionDropdown.style.display = 'none';

                // Limpa o segundo dropdown antes de adicionar as novas opções
                selectedFilterOptionDropdown.innerHTML = "";

                // Restaura window.jsonData com todos os objetos
                window.jsonData = data;
                updateDataAndCharts(window.jsonData);
            } else {
                // Obtemos os valores únicos da propriedade selecionada
                const uniqueValues = getUniqueValues(data, selectedOption);

                // Adiciona uma opção vazia como a primeira opção
                const emptyOption = document.createElement('option');
                selectedFilterOptionDropdown.appendChild(emptyOption);

                // Adiciona as opções do dropdown com base nos valores únicos
                uniqueValues.forEach(value => {
                    const option = document.createElement('option');
                    option.value = value;
                    option.textContent = value;
                    selectedFilterOptionDropdown.appendChild(option);
                });

                // Mostra o segundo dropdown
                selectedFilterOptionDropdown.style.display = 'inline-block';
            }
        });

        // Adiciona um ouvinte de evento para o evento de alteração do dropdown de valores selecionados
        selectedFilterOptionDropdown.addEventListener('change', function () {
            const selectedOption = filterOptionsDropdown.value;
            const selectedValue = selectedFilterOptionDropdown.value;

            // Filtra os dados com base na opção e valor selecionados
            const filteredData = data.filter(item => {
                // Verifica se o valor selecionado é numérico e converte para número se necessário
                const valueToCompare = isNaN(selectedValue) ? selectedValue : Number(selectedValue);
                return item[selectedOption] === valueToCompare;
            });

            // Atualiza window.jsonData com os dados filtrados
            window.jsonData = filteredData;

            // Chama as funções que utilizam a nova window.jsonData após a atualização
            updateDataAndCharts(window.jsonData);
        });
    }
});
