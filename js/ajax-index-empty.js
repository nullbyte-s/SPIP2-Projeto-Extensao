$(document).ready(function () {
    if ($('#content').is(':empty') && $('#staticBackdrop').is(':hidden')) {

        $('html, body').scrollTop(0);

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
});
