async function listUniqueCitiesAndStates(data) {
	// Cria um conjunto para armazenar cidades e estados únicos
	const uniqueCitiesAndStates = new Set();

	// Itera sobre o array de objetos e adiciona cidades e estados únicos ao conjunto
	data.forEach(entry => {
		uniqueCitiesAndStates.add(`${entry.municipio}, ${entry.estado}`);
	});

	// Converte o conjunto de volta para um array
	const uniqueArray = Array.from(uniqueCitiesAndStates);

	// Exibe a lista de cidades e estados únicos
	uniqueArray.forEach(async item => {
		console.log(item);
		const [city, state] = item.split(', ');

		// Chama a função getCoordinatesFromCityDb para obter as coordenadas de cada cidade
		const coordinates = await getCoordinatesFromCityDb(state, city);
		console.log(`Coordenadas de ${city}, ${state}:`, coordinates);
	});
}

// Abordagem antiga: carregava o JSON para cada script.js
// $(document).ready(function () {
// 	$.ajax({
// 		url: 'backend/get_data.php',
// 		type: 'GET',
// 		dataType: 'json',
// 		success: function (data) {
// 			listUniqueCitiesAndStates(data);
// 		},
// 		error: function (xhr, status, error) {
// 			console.error('Erro ao obter dados:', status, error);
// 		}
// 	});
// });

fetchData(function (error, data) {
	if (error) {
		console.error('Erro ao obter dados:', error);
	} else {
		listUniqueCitiesAndStates(data);
	}
});

async function getCoordinatesFromCityDb(state, city) {
	try {
		const response = await fetch(`backend/api.php?state=${state}&city=${city}`);
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const latitude = parseFloat(doc.querySelector('.latitude').textContent);
		const longitude = parseFloat(doc.querySelector('.longitude').textContent);

		return [longitude, latitude];
	} catch (error) {
		console.error('Erro ao obter coordenadas da cidade:', error);
		return [0, 0];
	}
}

async function drawMarkerGeoChart(data) {
	var cityCount = {};

	// Contagem de pacientes por cidade
	data.forEach(function (patient) {
		var city = patient.municipio;

		if (cityCount[city]) {
			cityCount[city]++;
		} else {
			cityCount[city] = 1;
		}
	});

	var geojsonData = {
		type: 'FeatureCollection',
		features: []
	};

	// Obtém a lista de cidades e estados únicos
	const uniqueCitiesAndStates = [];
	data.forEach(entry => {
		uniqueCitiesAndStates.push(`${entry.municipio}, ${entry.estado}`);
	});

	// Exibe o carregamento
	showLoading();

	// Itera sobre a lista de cidades e estados únicos
	for (const item of uniqueCitiesAndStates) {
		const [city, state] = item.split(', ');

		// Chama a função getCoordinatesFromCityDb para obter as coordenadas de cada cidade
		const coordinates = await getCoordinatesFromCityDb(state, city);

		// Adiciona a cidade ao geojsonData
		var feature = {
			type: 'Feature',
			properties: {
				city: city,
				count: cityCount[city] || 0
			},
			geometry: {
				type: 'Point',
				coordinates: coordinates
			}
		};

		geojsonData.features.push(feature);
	}

	// Esconde o carregamento após a conclusão
	hideLoading();

	var map = L.map('markerGeoChart').setView([-7.100, -37.000], 6);

	// Camada do OpenStreetMap
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '© OpenStreetMap contributors'
	}).addTo(map);

	// Dados geoespaciais
	L.geoJSON(geojsonData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng).bindPopup(feature.properties.city + '<br>Número de Pacientes: ' + feature.properties.count);
		}
	}).addTo(map);
}

function showLoading() {
	document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
	document.getElementById('loading').style.display = 'none';
}

// // Abordagem antiga: carregava o JSON para cada script.js
// $(document).ready(function () {
// 	$.ajax({
// 		url: 'backend/get_data.php',
// 		type: 'GET',
// 		dataType: 'json',
// 		success: function (data) {
// 			drawMarkerGeoChart(data);
// 		},
// 		error: function (xhr, status, error) {
// 			console.error('Erro ao obter dados:', status, error);
// 		}
// 	});
// });

fetchData(function (error, data) {
	if (error) {
		console.error('Erro ao obter dados:', error);
	} else {
		drawMarkerGeoChart(data);
	}
});