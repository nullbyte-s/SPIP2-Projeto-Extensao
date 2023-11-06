if (typeof jsonData === 'undefined') {
    let jsonData;
}

function fetchData(callback) {
    $(document).ready(function () {
        $.ajax({
            url: 'backend/get_data.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                jsonData = data;
                // Chama o callback com os dados quando estiverem prontos
                callback(null, jsonData);
                window.jsonData = jsonData;
            },
            error: function (xhr, status, error) {
                // Chama o callback com erro, se houver
                callback(error, null);
            }
        });
    });
}