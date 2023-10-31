// Função para formatar datas usando moment.js
function tipoData(data, type, row, meta) {
	if (data && typeof data === 'string') {
		if (type === 'sort') {
			return moment(data, 'DD/MM/YYYY').format('YYYY/MM/DD');
		}
		return data.trim();
	}
	return data;
}

// Configuração da tabela DataTables
function populateDataTable(data) {

	if ($.fn.DataTable.isDataTable('#dataTable')) {
		// 	$('#dataTable').DataTable().destroy();
		// 	table.clear();
		// 	table.ajax.reload();
		table.clear().destroy();
	}

	// data.forEach(function (row, index) {
	// 	row['id'] = index + 1;
	// });

	var table = $('#dataTable').DataTable({
		// autoWidth: false,
		paging: true,
		language: {
			"sEmptyTable": "Nenhum dado encontrado",
			"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
			"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
			"sInfoFiltered": "(Filtrados de _MAX_ registros)",
			"sInfoPostFix": "",
			"sInfoThousands": ".",
			"sLengthMenu": "_MENU_ resultados por página",
			"sLoadingRecords": "Carregando...",
			"sProcessing": "Processando...",
			"sZeroRecords": "Nenhum registro encontrado",
			"sSearch": "Pesquisar",
			"oPaginate": {
				"sNext": "Próximo",
				"sPrevious": "Anterior",
				"sFirst": "Primeiro",
				"sLast": "Último"
			},
			"oAria": {
				"sSortAscending": ": Ordenar colunas de forma ascendente",
				"sSortDescending": ": Ordenar colunas de forma descendente"
			}
		},
		data: data,
		columns: [
			{
				title: 'Ações',
				width: '5%',
				render: function (data, type, row) {
					var buttons = `
						<div class="text-center align-items-center justify-content-center">
							<input type="hidden" name="indice" value="${row.indice}">
							<button class="bi bi-pencil-fill editar-btn" name="editar"></button><br>
							<button class="bi bi-trash3 excluir-btn" name="excluir"></button><br>
							<button class="bi bi-plus-circle adc-btn" name="adicionar"></button>
						</div>
					`;
					return buttons;
				}
			},
			{ data: 'internacao', title: 'Internação', render: tipoData },
			{ data: 'semana', title: 'Semana' },
			{ data: 'paciente', title: 'Paciente' },
			{ data: 'sexo', title: 'Sexo' },
			{ data: 'idade', title: 'Idade' },
			{ data: 'municipio', title: 'Município' },
			{ data: 'estado', title: 'Estado' },
			{ data: 'sintomas', title: 'Sintomas' },
			{ data: 'data_sintomas', title: 'Data dos Sintomas', render: tipoData },
			{ data: 'comorbidades', title: 'Comorbidades' },
			{ data: 'vacina', title: 'Vacina' },
			{ data: 'leito', title: 'Leito' },
			{ data: 'evolucao', title: 'Evolução' },
			{ data: 'exames', title: 'Exames' },
			{ data: 'data_exames', title: 'Data dos Exames', render: tipoData },
			{ data: 'hipotese_diagnostica', title: 'Hipótese Diagnóstica' },
			{ data: 'agravo', title: 'Agravo' },
			{ data: 'data_agravo', title: 'Data do Agravo', render: tipoData },
			{ data: 'finalizacao_do_caso', title: 'Finalização do Caso' },
			{ data: 'data_finalizacao', title: 'Data de Finalização', render: tipoData },
			{ data: 'id', title: 'id', visible: true }
		],
		// order: [],
		// ordering: false,
		scrollX: true,
		responsive: {
			details: {
				type: 'column'
			}
		},
		columnDefs: [
			{
				targets: '_all',
				width: 150,
				render: function (data, type, row, meta) {
					var isLongText = type === 'display' && data.length > 60;
					var displayText = isLongText ? data.substr(0, 60) + ' <strong>(...)</strong>' : data;
					var cssClass = isLongText ? 'expandable' : '';
					return `<span class="${cssClass}" title="${data}">${displayText}</span>`;
				}
			}
		],
	});
	// table.rows.add(data).draw();
	table.order([1, 'desc']).draw();
	$('.expandable').click(function () {
		var content = $(this).attr('title');
		$(this).html(content);
	});
}
$(document).ready(function () {
	$.ajax({
		url: 'backend/get_data.php',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			// console.log(data);
			populateDataTable(data);
		},
		error: function (xhr, status, error) {
			console.error('Erro ao obter dados:', status, error);
		}
	});
});