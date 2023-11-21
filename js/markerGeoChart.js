// Cria um conjunto para armazenar cidades e estados únicos
const uniqueCitiesAndStates = new Set();

async function listUniqueCitiesAndStates(data) {
	// Itera sobre o array de objetos e adiciona cidades e estados únicos ao conjunto
	data.forEach(entry => {
		// Verifica se a cidade e o estado não são vazios ou nulos antes de adicionar ao conjunto
		if (entry.municipio && entry.estado) {
			uniqueCitiesAndStates.add(`${entry.municipio}, ${entry.estado}`);
		}
	});

	// Converte o conjunto de volta para um array
	const uniqueArray = Array.from(uniqueCitiesAndStates);

	return uniqueArray;
}

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

async function getCoordinatesForUniqueCities(data) {
	// Cria um conjunto de cidades e estados únicos
	const uniqueCitiesAndStates = await listUniqueCitiesAndStates(data);

	// Exibe o carregamento
	showLoading();

	// Mapeia o conjunto para obter as coordenadas para cada cidade
	const coordinatesPromises = Array.from(uniqueCitiesAndStates).map(async item => {
		const [city, state] = item.split(', ');
		return await getCoordinatesFromCityDb(state, city);
	});

	try {
		// Aguarda todas as chamadas assíncronas
		const coordinates = await Promise.all(coordinatesPromises);

		drawMarkerGeoChart(data, uniqueCitiesAndStates, coordinates);

		// Esconde o carregamento após a conclusão
		hideLoading();

	} catch (error) {
		console.error('Erro ao obter coordenadas para cidades:', error);
	}
}

async function drawMarkerGeoChart(data, uniqueCitiesAndStates, coordinates) {
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

	// Exibe o carregamento
	showLoading();

	// Itera sobre a lista de cidades e estados únicos
	for (let i = 0; i < uniqueCitiesAndStates.length; i++) {
		const item = uniqueCitiesAndStates[i];
		const [city, state] = item.split(', ');

		// Adiciona a cidade ao geojsonData
		var feature = {
			type: 'Feature',
			properties: {
				city: city,
				count: cityCount[city] || 0
			},
			geometry: {
				type: 'Point',
				coordinates: coordinates[i]
			}
		};

		geojsonData.features.push(feature);
	}

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

	// Esconde o carregamento após a conclusão
	hideLoading();
}

function showLoading() {
	document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
	document.getElementById('loading').style.display = 'none';
}

fetchData(function (error, data) {
	if (error) {
		console.error('Erro ao obter dados:', error);
	} else {
		getCoordinatesForUniqueCities(data);
	}
});