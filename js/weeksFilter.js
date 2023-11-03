// Função para obter valores únicos da propriedade "semana"
function getWeeks(data) {
    // Cria um objeto Set para armazenar valores únicos
    var weeks = new Set();

    // Percorre cada objeto no array e adiciona a propriedade "semana" ao Set
    data.forEach(function (item) {
        weeks.add(item.semana);
    });

    // Converte o Set de volta para um array
    return Array.from(weeks);
}

// Função para preencher o dropdown com as semanas
function fillWeekDropdown(data) {
    const dropdown = document.getElementById('semanaDropdown');

    // Obtemos as semanas dos dados
    const weeks = getWeeks(data);

    // Limpa o dropdown antes de adicionar as novas opções
    dropdown.innerHTML = "";

    // Adiciona uma opção vazia como a primeira opção
    const emptyOption = document.createElement('option');
    dropdown.appendChild(emptyOption);

    // Adiciona as opções do dropdown com base na lista de semanas
    weeks.forEach(week => {
        const option = document.createElement('option');
        option.value = week;
        option.textContent = week;
        dropdown.appendChild(option);
    });

    // Função para atualizar dados e gráficos
    function updateDataAndCharts(data) {
        drawBarChart(data);
        drawPieChart(data);
        // // Em desenvolvimento
        // $('#patient-by-city').load(location.href + ' #patient-by-city');
        // drawMarkerGeoChart(data);
        // $('#dataTable').load(location.href + ' #dataTable');
        // populateDataTable(data)
    }

    // Adiciona um ouvinte de evento para o evento de alteração do dropdown
    dropdown.addEventListener('change', function () {
        const selectedWeek = dropdown.value;

        if (selectedWeek === "") {
            // Restaura window.jsonData com todos os objetos
            window.jsonData = data;
            updateDataAndCharts(window.jsonData);
        } else {
            // Filtra os dados com base na semana selecionada
            const filteredData = data.filter(item => item.semana === Number(selectedWeek));

            // Atualiza window.jsonData com os dados filtrados
            window.jsonData = filteredData;

            // Chama as funções que utilizam a nova window.jsonData após a atualização
            updateDataAndCharts(window.jsonData);

            // var layoutSidenav_content = document.getElementById('layoutSidenav_content');
            // layoutSidenav_content.innerHTML = layoutSidenav_content.innerHTML;
        }
    });
}

fetchData(function (error, data) {
    if (error) {
        console.error('Erro ao obter dados:', error);
    } else {
        fillWeekDropdown(data);
    }
});