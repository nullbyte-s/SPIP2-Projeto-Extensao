$(document).ready(function () {
<<<<<<< HEAD
    var sessionValue = sessionStorage.getItem('temp_data');

=======
>>>>>>> 6fbeee5127afad50395df9c4ad42f710a0b8411d
    if ($('#content').is(':empty') && $('#staticBackdrop').is(':hidden')) {

        $('html, body').scrollTop(0);

<<<<<<< HEAD
        if (sessionValue === 'op_line') {
            sessionStorage.removeItem('temp_data');
            $.ajax({
                url: '/includes/editor.php',
                type: 'GET',
                success: function (data) {
                    $('#content').html(data);
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
=======
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
>>>>>>> 6fbeee5127afad50395df9c4ad42f710a0b8411d
    }
});
