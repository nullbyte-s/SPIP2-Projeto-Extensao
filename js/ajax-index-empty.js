$(document).ready(function () {
    var sessionValue = sessionStorage.getItem('temp_data');

    if ($('#content').is(':empty') && $('#staticBackdrop').is(':hidden')) {
        if (sessionValue === 'op_line') {
            sessionStorage.removeItem('temp_data');
            $.ajax({
                url: '/includes/editor.php',
                type: 'GET',
                success: function (data) {
                    $('#content').html(data);
                    // $('html, body').scrollTop(0);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao carregar a página:', status, error);
                }
            });
        } else {
            $.ajax({
                url: '/includes/dashboard.php',
                type: 'GET',
                success: function (data) {
                    $('#content').html(data);
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao carregar a página:', status, error);
                }
            });
        }
    }
});
