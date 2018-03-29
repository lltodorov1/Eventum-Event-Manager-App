/* eslint-disable */
$(document).ready(function(e) {
        $('#userForm > button').click(function(e){
        var userInfo = {
            name: $('input[name=urname]').val(),
            username: $('input[name=username]').val(),
            email:  $('input[name=email]').val(),
            password: $('input[name=password]').val(),
            passwordRepeat: $('input[name=passwordRepeat]').val(),
        }
        // if(password!== password) {
            
        // } 
        $.ajax({
            method: 'POST',
            async: true,
            url: '/register/user',
            dataType: 'json',
            data: userInfo,
            error: function (error) {
                $('#alertdiv')
                .html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>' + error.responseJSON["err"] +'</span></div>')
            },
            success: function (data) {
                window.location.href = '/login';
            }
        });
        return false;
    });
});

/* eslint-enable */
