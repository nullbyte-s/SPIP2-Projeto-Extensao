const timeLineTabs = document.getElementById('timeLineTabs');
const pieTabs = document.getElementById('pieTabs');
const barTabs = document.getElementById('barTabs');
const timeLineTabLinks = timeLineTabs.querySelectorAll('.nav-link');
const pieTabLinks = pieTabs.querySelectorAll('.nav-link');
const barTabLinks = barTabs.querySelectorAll('.nav-link');
const allTabs = [...timeLineTabLinks, ...pieTabLinks, ...barTabLinks];

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.dataset.toggle === 'tab') {
        event.preventDefault();

        var tabId = target.dataset.target;
        var timeLineTabContent = document.querySelector('#timeLineChartsTabs .tab-content');
        var pieTabContent = document.querySelector('#pieChartsTabs .tab-content');
        var barTabContent = document.querySelector('#barChartsTabs .tab-content');

        allTabs.forEach(function (tabLink) {
            tabLink.classList.remove('active');
        });

        // timeLineTabLinks.forEach(function (tabLink) {
        //     tabLink.classList.remove('active');
        // });

        // pieTabLinks.forEach(function (tabLink) {
        //     tabLink.classList.remove('active');
        // });

        // barTabLinks.forEach(function (tabLink) {
        //     tabLink.classList.remove('active');
        // });

        target.classList.add('active');

        var timeLineTabContentsContainer = document.getElementById('timeLineTabContent');
        var timeLineTabContents = timeLineTabContentsContainer.querySelectorAll('.tab-pane');
        var activeTimeLineTabIndex = Array.from(timeLineTabLinks).indexOf(target);

        var pieTabContentsContainer = document.getElementById('pieTabContent');
        var pieTabContents = pieTabContentsContainer.querySelectorAll('.tab-pane');
        var activePieTabIndex = Array.from(pieTabLinks).indexOf(target);

        var barTabContentsContainer = document.getElementById('barTabContent');
        var barTabContents = barTabContentsContainer.querySelectorAll('.tab-pane');
        var activeBarTabIndex = Array.from(barTabLinks).indexOf(target);


        if (activeTimeLineTabIndex >= 0 && activeTimeLineTabIndex < timeLineTabContents.length) {
            var activeTimeLineTabContent = timeLineTabContents[activeTimeLineTabIndex];
            timeLineTabContents.forEach(function (tab) {
                tab.classList.remove('show');
                tab.style.display = 'none';
            });
            activeTimeLineTabContent.classList.add('show');
            activeTimeLineTabContent.offsetHeight; // Trigger a reflow, forçando um redesenho
            activeTimeLineTabContent.style.display = 'block';
            updateTimeLineCharts();
        }

        if (activePieTabIndex >= 0 && activePieTabIndex < pieTabContents.length) {
            var activePieTabContent = pieTabContents[activePieTabIndex];
            pieTabContents.forEach(function (tab) {
                tab.classList.remove('show');
                tab.style.display = 'none';
            });
            activePieTabContent.classList.add('show');
            activePieTabContent.offsetHeight;
            activePieTabContent.style.display = 'block';
            updatePieCharts();
        }

        if (activeBarTabIndex >= 0 && activeBarTabIndex < barTabContents.length) {
            var activeBarTabContent = barTabContents[activeBarTabIndex];
            barTabContents.forEach(function (tab) {
                tab.classList.remove('show');
                tab.style.display = 'none';
            });
            activeBarTabContent.classList.add('show');
            activeBarTabContent.offsetHeight; // Trigger a reflow, forçando um redesenho
            activeBarTabContent.style.display = 'block';
            updateBarCharts();
        }

        allTabs.forEach(function (tab, index) {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                fetchData(function (error, data) {
                    if (error) {
                        console.error('Erro ao obter dados:', error);
                    } else {
                        // Chama a função para desenhar o gráfico da aba clicada
                        var tabIndex = index;
                        loadCharts(data, tabIndex);
                    }
                });
            });
        });
    }
});

document.getElementById('dashboardLink').addEventListener('click', function (event) {
    var target = event.target;

    if (target.getAttribute('href') === 'includes/dashboard.php') {
        event.preventDefault();
        location.reload();
    }
});

var prevPieTabBtn = document.getElementById('prevPieTab');
var nextPieTabBtn = document.getElementById('nextPieTab');
var prevBarTabBtn = document.getElementById('prevBarTab');
var nextBarTabBtn = document.getElementById('nextBarTab');
var visiblePieTabs = 4; // Número de abas visíveis ao mesmo tempo
var startPieTabIndex = 0;
var visibleBarTabs = 4;
var startBarTabIndex = 0;

prevPieTabBtn.addEventListener('click', function () {
    if (startPieTabIndex > 0) {
        startPieTabIndex -= 1;
        updateVisibleTabs();
    }
});

nextPieTabBtn.addEventListener('click', function () {
    var totalTabs = document.querySelectorAll('#pieTabs .nav-item').length;
    if (startPieTabIndex + visiblePieTabs < totalTabs) {
        startPieTabIndex += 1;
        updateVisibleTabs();
    }
});

prevBarTabBtn.addEventListener('click', function () {
    if (startBarTabIndex > 0) {
        startBarTabIndex -= 1;
        updateVisibleTabs();
    }
});

nextBarTabBtn.addEventListener('click', function () {
    var totalTabs = document.querySelectorAll('#barTabs .nav-item').length;
    if (startBarTabIndex + visibleBarTabs < totalTabs) {
        startBarTabIndex += 1;
        updateVisibleTabs();
    }
});

function updateVisibleTabs() {
    var pieTabs = document.querySelectorAll('#pieTabs .nav-item');
    var barTabs = document.querySelectorAll('#barTabs .nav-item');

    pieTabs.forEach(function (tab, index) {
        if (index >= startPieTabIndex && index < startPieTabIndex + visiblePieTabs) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    });

    barTabs.forEach(function (tab, index) {
        if (index >= startBarTabIndex && index < startBarTabIndex + visibleBarTabs) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    });

    // Atualiza a classe 'show' para a aba correta
    var visiblePieTabLinks = Array.from(pieTabs).slice(startPieTabIndex, startPieTabIndex + visiblePieTabs);
    var activePieTabLink = visiblePieTabLinks.find(tab => tab.classList.contains('active'));

    var visibleBarTabLinks = Array.from(barTabs).slice(startBarTabIndex, startBarTabIndex + visibleBarTabs);
    var activeBarTabLink = visibleBarTabLinks.find(tab => tab.classList.contains('active'));

    var visibleTimeLineTabLinks = Array.from(timeLineTabs);
    var activeTimeLineTabLink = visibleTimeLineTabLinks.find(tab => tab.classList.contains('active'));

    // if (activeTimeLineTabLink) {
    //     var activeTimeLineTabIndex = Array.from(timeLineTabs).indexOf(activeTimeLineTabLink);

    //     var timeLineTabContentsContainer = document.getElementById('timeLineChartsTabs');
    //     var timeLineTabContents = timeLineTabContentsContainer.querySelectorAll('.tab-content .tab-pane');
    //     timeLineTabContents.forEach(function (tab) {
    //         tab.classList.remove('show');
    //     });

    //     if (timeLineTabContents && timeLineTabContents.length > 0) {
    //         timeLineTabContents.classList.add('show');
    //     }
    // }

    if (activePieTabLink) {
        var activePieTabIndex = Array.from(pieTabs).indexOf(activePieTabLink);

        var pieTabContentsContainer = document.getElementById('pieChartsTabs');
        var pieTabContents = pieTabContentsContainer.querySelectorAll('.tab-content .tab-pane');
        pieTabContents.forEach(function (tab) {
            tab.classList.remove('show');
        });

        if (pieTabContents && pieTabContents.length > 0 && activePieTabIndex >= 0 && activePieTabIndex < pieTabContents.length) {
            pieTabContents[activePieTabIndex].classList.add('show');
        }
    }

    if (activeBarTabLink) {
        var activeBarTabIndex = Array.from(barTabs).indexOf(activeBarTabLink);

        var barTabContentsContainer = document.getElementById('barChartsTabs');
        var barTabContents = barTabContentsContainer.querySelectorAll('.tab-content .tab-pane');
        barTabContents.forEach(function (tab) {
            tab.classList.remove('show');
        });

        if (barTabContents && barTabContents.length > 0 && activeBarTabIndex >= 0 && activeBarTabIndex < barTabContents.length) {
            barTabContents[activeBarTabIndex].classList.add('show');
        }
    }
}

// Força o redesenho e atualizar os gráficos de linha do tempo
function updateTimeLineCharts() {
    var activeTabLinkContainer = document.getElementById('timeLineTabs');
    var activeTimeLineTabLink = activeTabLinkContainer.querySelector('.nav-link.active');
    var activeTabIndex = Array.from(activeTabLinkContainer.querySelectorAll('.nav-link')).indexOf(activeTimeLineTabLink);
    loadCharts(window.jsonData, activeTabIndex);
}

// Força o redesenho e atualizar os gráficos de pizza
function updatePieCharts() {
    var activeTabLinkContainer = document.getElementById('pieTabs');
    var activePieTabLink = activeTabLinkContainer.querySelector('.nav-link.active');
    var activeTabIndex = Array.from(activeTabLinkContainer.querySelectorAll('.nav-link')).indexOf(activePieTabLink);
    loadCharts(window.jsonData, activeTabIndex);
}

// Força o redesenho e atualizar os gráficos de barras
function updateBarCharts() {
    var activeTabLinkContainer = document.getElementById('barTabs');
    var activeBarTabLink = activeTabLinkContainer.querySelector('.nav-link.active');
    var activeTabIndex = Array.from(activeTabLinkContainer.querySelectorAll('.nav-link')).indexOf(activeBarTabLink);
    loadCharts(window.jsonData, activeTabIndex);
}

// Função para carregar os gráficos
function loadCharts(tabIndex, chartType) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        fetchData(function (error, data) {
            if (error) {
                console.error('Erro ao obter dados:', error);
            } else {
                if (chartType === 'timeline') {
                    drawTimelineChart(data, tabIndex);
                } else if (chartType === 'pie') {
                    drawPieChart(data, tabIndex);
                } else if (chartType === 'bar') {
                    drawBarChart(data, tabIndex);
                }
            }
        });
    });
}

// Inicializa as abas visíveis
updateVisibleTabs();

// Função para carregar os gráficos
function loadCharts(tabIndex, chartType) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        fetchData(function (error, data) {
            if (error) {
                console.error('Erro ao obter dados:', error);
            } else {
                if (chartType === 'timeline') {
                    drawTimelineChart(data, tabIndex);
                } else if (chartType === 'pie') {
                    drawPieChart(data, tabIndex);
                } else if (chartType === 'bar') {
                    drawBarChart(data, tabIndex);
                }
            }
        });
    });
}

timeLineTabLinks.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        var tabIndex = index;
        // Chama a função para desenhar o gráfico da aba clicada (gráfico de pizza)
        loadCharts(tabIndex, 'timeline');
    });
});

pieTabLinks.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        var tabIndex = index;
        // Chama a função para desenhar o gráfico da aba clicada (gráfico de pizza)
        loadCharts(tabIndex, 'pie');
    });
});

pieTabLinks.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        var tabIndex = index;
        // Chama a função para desenhar o gráfico da aba clicada (gráfico de pizza)
        loadCharts(tabIndex, 'pie');
    });
});

barTabLinks.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        var tabIndex = index;
        // Chama a função para desenhar o gráfico da aba clicada (gráfico de barras)
        loadCharts(tabIndex, 'bar');
    });
});

// Carrega os gráficos para a primeira aba inicialmente
// if (!window.jsonData) {
//     google.charts.load('current', { 'packages': ['corechart'] });
//     google.charts.setOnLoadCallback(() => {
//         drawTimelineChart(jsonData);
//         drawBarChart(jsonData);
//         drawPieChart(jsonData);
//     });
// }

(function checkAndLoadCharts() {
    if (window.jsonData) {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            drawTimelineChart(window.jsonData);
            drawBarChart(window.jsonData);
            drawPieChart(window.jsonData);
        });
    } else {
        setTimeout(checkAndLoadCharts, 1000);
    }
})();