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
			{ data: 'id', title: 'id', visible: true },
			{
				title: 'Ações',
				width: '5%',
				render: function (data, type, row) {
					var buttons = `
						<div class="text-center align-items-center justify-content-center">
							<input type="hidden" name="indice" value="${row.indice}">
							<button class="bi bi-pencil-fill editar-btn" name="editar"></button><br>
							<button class="bi bi-trash3" type="submit" name="excluir"></button><br>
							<button class="bi bi-plus-circle" type="submit" name="adicionar"></button>
						</div>
					`;
					return buttons;
				}
			},
			{
				data: 'data',
				title: 'Data',
				// width: '15%',
				render: function (data, type, row, meta) {
					if (type === 'sort') {
						return moment(data, 'DD/MM/YYYY').format('YYYY/MM/DD');
					}
					return data;
				}
			},
			{ data: 'nome', title: 'Nome' },
			{ data: 'sexo', title: 'Sexo' },
			{ data: 'idade', title: 'Idade' },
			{ data: 'sintomas', title: 'Sintomas' },
			{ data: 'comorbidades', title: 'Comorbidades' },
			{ data: 'municipio', title: 'Município' },
			{ data: 'comorbidades', title: 'Comorbidades' },
			{ data: 'vacina', title: 'Vacina' },
			{ data: 'leito', title: 'Leito' },
			{ data: 'evolucao', title: 'Evolução' },
			{ data: 'data_sintomas', title: 'Data dos Sintomas' },
			{ data: 'exames', title: 'Exames' },
			{ data: 'hipotese_diagnostica', title: 'Hipótese Diagnóstica' },
			{ data: 'cotificacoes', title: 'Cotificações' },
			{ data: 'data_de_atualizacao', title: 'Data de Atualização' },
			{ data: 'status', title: 'Status' }
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
	table.order([2, 'desc']).draw();
	$('.expandable').click(function () {
		var content = $(this).attr('title');
		$(this).html(content);
	});
	table.on('draw.dt', function () {
		$(document).on('click', '.editar-btn', function () {
			var rowIndex = $(this).closest('tr').index();
			var realIndex = table.row(rowIndex).index();
			var idValue = table.cell(realIndex, 'id:name').data();
			$('html, body').animate({ scrollTop: 0 }, 'fast');
			preencherCamposEditar(idValue);
		});
	});
}
$(document).ready(function () {
	$.ajax({
		url: 'backend/get_data.php',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			console.log(data);
			populateDataTable(data);
		},
		error: function (xhr, status, error) {
			console.error('Erro ao obter dados:', status, error);
		}
	});
});