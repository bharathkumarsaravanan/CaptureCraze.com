(function ($) {
    "use strict";

    var bookNowBtn = $(".service-item .btn");

    bookNowBtn.on("click", function (e) {
            e.preventDefault();
            var service = $(this).data("pop-type");
            console.log(service);
            var modalHeader = $("#popupModal #popupModalLabel");
            modalHeader.text("Book " + service);
        });

    $("#popupModal form").on("submit", function(event){
        event.preventDefault();

        var formData = $(this).serializeArray();
        var service = $("#popupModal #popupModalLabel").text();

        var data = {
            service_id: 'service_ia9z3tq',
            template_id: 'template_mqlrg83',
            user_id: 'o9I4mhBV574UM0uhp',
            template_params: {
                name: formData.find(item => item.name === 'name').value,
                to_mail: formData.find(item => item.name === 'mail').value,
            }
        };

        var orderData = {
            service_id: 'service_ia9z3tq',
            template_id: 'template_qjndbf6',
            user_id: 'o9I4mhBV574UM0uhp',
            template_params: {
                name: formData.find(item => item.name === 'name').value,
                mail: formData.find(item => item.name === 'mail').value,
                from_date: formData.find(item => item.name === 'from').value,
                to_date: formData.find(item => item.name === 'to').value,
                phone: formData.find(item => item.name === 'phone').value,
                desc: formData.find(item => item.name === 'desc').value,
                service: service
            }
        };
         
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function() {
            alert('Your mail is sent!');
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });

        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(orderData),
            contentType: 'application/json'
        }).done(function() {
            alert('Your mail is sent!');
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });



        var bookedService = JSON.parse(localStorage.getItem("bookedService"));
        bookedService.push(service);
        localStorage.setItem("bookedService", JSON.stringify(bookedService));

        var successMessage = '<div class="alert alert-success" role="alert">Form submitted successfully!</div>';
        $(this).prepend(successMessage);
        this.reset();
        debugger;
        switch (service) {
            case "Book Weddings":
                $("#bookWedding").addClass("booked");
                $("#bookWedding .btn").text("Booked");
                $("#bookWedding .btn").prop("disabled", true);
                break;
            case "Book Portraits":
                $("#bookPortraits").addClass("booked");
                $("#bookPortraits .btn").text("Booked");
                $("#bookPortraits .btn").prop("disabled", true);
                break;
            case "Book Fashion":
                $("#bookFashion").addClass("booked");
                $("#bookFashion .btn").text("Booked");
                $("#bookFashion .btn").prop("disabled", true);
                break;
            case "Book Editorial":
                $("#bookEditorial").addClass("booked");
                $("#bookEditorial .btn").text("Booked");
                $("#bookEditorial .btn").prop("disabled", true);
                break;
        }
        setTimeout(function(){
            $("#popupModal").modal('hide');
        }, 3000);
        
    });
    
})(jQuery);