$(document).ready(function () {
    $('a:not(.exclude-ajax)').on('click', function (e) {
        e.preventDefault();

        var pageUrl = $(this).attr('href');

        $('html, body').scrollTop(0);

        $.ajax({
            url: pageUrl,
            type: 'GET',
            success: function (data) {
                $('#content').html(data);
            },
            error: function () {
                alert('Erro ao carregar a página.');
            }
        });
    });
});