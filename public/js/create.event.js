/* eslint-disable */
$(function () {
    /* date picker js */
    $('.dattaPikkara').datepicker({
        autoclose: true
    });

    /* Country - City */
    var changeOptionCitues = function (cities) {
        var $cityInput = $('#city-input');

        // Clear old data
        $cityInput.empty();

        // Set the new data
        $(`<option value="">Select one</option>`).appendTo($cityInput);
        Object.keys(cities).forEach((city) => {
            $(`<option value="${cities[city].name}" >${cities[city].name}</option>`).appendTo($cityInput);
        });
    }

    $('#country-input').change(function () {
        var country = $(this).val();

        $.ajax({
            type: "GET",
            url: "/cities",
            data: {
                country: country,
            },
            success: function (data) {
                changeOptionCitues(data);
            }
        });
    });


    /* Categories - SubCategories */
    var changeOptionSubCategories = function (categories) {
        var $subCategorieInput = $('#subcategory-input');

        // Clear old data
        $subCategorieInput.empty();

        // Set the new data
        $(`<option value="">Select one</option>`).appendTo($subCategorieInput);
        Object.keys(categories).forEach((categorie) => {
            $(`<option value="${categories[categorie].title}" >${categories[categorie].title}</option>`).appendTo($subCategorieInput);
        });
    }

    $('#category-input').change(function () {
        var categorie = $(this).val();

        $.ajax({
            type: "GET",
            url: '/subCategories',
            data: {
                categorie: categorie
            },
            success: function (data) {
                changeOptionSubCategories(data);
            }
        });

    });

    /* Get data from inputs and send it */
    $('#createEventForm').find('#create-event-button').click(function (e) {

        var eventInfo = {
            title: $('#event-title-input').val(),
            date: $('#date-input').val(),
            time: $('#start-time-input').val(),
            country: $('#country-input').val(),
            city: $('#city-input').val(),
            placeName: $('#place-name-input').val(),
            address: $('#address-input').val(),
            description: $('#event-desc-input').val(),
            category: $('#category-input').val(),
            subcategory: $('#subcategory-input').val(),
            capacity: $('#capacity-input').val(),
            price: $('#price-input').val(),

        }

        $.ajax({
            method: 'POST',
            async: true,
            url: '/event/create',
            dataType: 'json',
            data: eventInfo,
            error: function (error) {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#alertdiv')
                    .html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>' + error.responseJSON["err"] + '</span></div>')
            },
            success: function (data) {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                var messageAlert = 'Good job! You successfully updated your profile!';
                $('#alertdiv')
                    .html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>' + messageAlert + '</span></div>')
            }
        });

        return false;
    });
});
/* eslint-enable */
