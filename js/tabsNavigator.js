document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.dataset.toggle === 'tab') {
        event.preventDefault();

        var tabId = target.dataset.target;
        var pieTabs = document.getElementById('pieTabs');
        var barTabs = document.getElementById('barTabs');
        var pieTabContent = document.querySelector('#pieChartsTabs .tab-content');
        var barTabContent = document.querySelector('#barChartsTabs .tab-content');

        var pieLinksContainer = document.getElementById('pieTabs');
        var pieTabLinks = pieLinksContainer.querySelectorAll('.nav-link');

        var barLinksContainer = document.getElementById('barTabs');
        var barTabLinks = barLinksContainer.querySelectorAll('.nav-link');

        pieTabLinks.forEach(function (tabLink) {
            tabLink.classList.remove('active');
        });

        barTabLinks.forEach(function (tabLink) {
            tabLink.classList.remove('active');
        });

        target.classList.add('active');

        var pieTabContentsContainer = document.getElementById('pieTabContent');
        var pieTabContents = pieTabContentsContainer.querySelectorAll('.tab-pane');
        var activePieTabIndex = Array.from(pieTabLinks).indexOf(target);

        var barTabContentsContainer = document.getElementById('barTabContent');
        var barTabContents = barTabContentsContainer.querySelectorAll('.tab-pane');
        var activeBarTabIndex = Array.from(barTabLinks).indexOf(target);


        if (activePieTabIndex >= 0 && activePieTabIndex < pieTabContents.length) {
            var activePieTabContent = pieTabContents[activePieTabIndex];
            pieTabContents.forEach(function (tab) {
                tab.classList.remove('show');
                tab.style.display = 'none';
            });
            activePieTabContent.classList.add('show');
            activePieTabContent.offsetHeight; // Trigger a reflow, forçando um redesenho
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
    var totalTabs = document.querySelectorAll('#barTabs .nav-item').length;
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

// Força o redesenho e atualizar os gráficos de pizza
function updatePieCharts() {
    var activeTabLinkContainer = document.getElementById('pieTabs');
    var activePieTabLink = activeTabLinkContainer.querySelector('.nav-link.active');
    var activeTabIndex = Array.from(tabs).indexOf(activePieTabLink);
    loadCharts(window.jsonData, activeTabIndex);
}

// Força o redesenho e atualizar os gráficos de barras
function updateBarCharts() {
    var activeTabLinkContainer = document.getElementById('barTabs');
    var activeBarTabLink = activeTabLinkContainer.querySelector('.nav-link.active');
    var activeTabIndex = Array.from(tabs).indexOf(activeBarTabLink);
    loadCharts(window.jsonData, activeTabIndex);
}

// Inicializa as abas visíveis
updateVisibleTabs();