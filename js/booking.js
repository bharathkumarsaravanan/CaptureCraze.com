(function ($) {
    "use strict";

    var bookNowBtn = $(".service-item .btn:first-child");

    bookNowBtn.on("click", function (e) {
            e.preventDefault();
            var service = $(this).data("pop-type");
            console.log(service);
            var modalHeader = $("#popupModal #popupModalLabel");
            modalHeader.text("Book " + service);
            if (localStorage.getItem('userMail')) {
                var mail = localStorage.getItem('userMail');
                $('#popupModal #inputEmail').val(mail);
            }
        });
    
    var editBtn = $(".service-item .btn:nth-child(2)");

    editBtn.on("click", function (e) {
            e.preventDefault();
            var service = $(this).data("pop-type");
            console.log(service);
            var modalHeader = $("#editPop #popupModalLabel");
            modalHeader.text("Book " + service);
            var mail = localStorage.getItem("userMail");
            
            $.ajax('http://localhost:4000/'+mail+'/booking/data', {
                type: 'POST',
                data: JSON.stringify({service: ("Book " + service)}),
                contentType: 'application/json'
            }).done(function(res) {
                var resData = res[0];
                $("#editPop #inputName").val(resData.name);
                $("#editPop #inputEmail").val(resData.email);
                $("#editPop #inputPhone").val(resData.phone);
                $("#editPop #inputFromDate").val(resData.from_date);
                $("#editPop #inputToDate").val(resData.to_date);
                console.log('data has stored in db', res);
            }).fail(function(error) {
                alert('Oops... ' + JSON.stringify(error));
            });

        });
    $("#editPop #delSlot").on("click", function(e){
        e.preventDefault();
        var service = $("#editPop #popupModalLabel").text();
        var mail = localStorage.getItem("userMail");
        $.ajax('http://localhost:4000/'+mail+'/booking/data/delete', {
            type: 'POST',
            data: JSON.stringify({service: service}),
            contentType: 'application/json'
        }).done(function(res) {
            alert('Your booking has been deleted');
            if (service === "Book Weddings") {
                $("#bookWedding").removeClass("booked");
                $("#bookWedding .btn:first-child").text("Book Now");
                $("#bookWedding .btn:first-child").prop("disabled", false);
            }

            var localStorageService = localStorage.getItem("bookedService");
            var bookedServices = JSON.parse(localStorageService);

            bookedServices = bookedServices.filter(function(bservice) {
                return bservice !== service;
            });

        localStorage.setItem("bookedService", JSON.stringify(bookedServices));

        switch (service) {
            case "Book Weddings":
                $("#bookWedding").removeClass("booked");
                $("#bookWedding .btn:first-child").text("Book Now");
                $("#bookWedding .btn:first-child").prop("disabled", false);
                break;
            case "Book Portraits":
                $("#bookPortraits").removeClass("booked");
                $("#bookPortraits .btn:first-child").text("Book Now");
                $("#bookPortraits .btn:first-child").prop("disabled", false);
                break;
            case "Book Fashion":
                $("#bookFashion").addClass("booked");
                $("#bookFashion .btn-firsr-child").text("Booked");
                $("#bookFashion .btn:first-child").prop("disabled", false);
                break;
            case "Book Editorial":
                $("#bookEditorial").removeClass("booked");
                $("#bookEditorial .btn:first-child").text("Book Now");
                $("#bookEditorial .btn:first-child").prop("disabled", false);
                break;
        }

        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });
    });

    $("#editPop form").on("submit", function(event){
        event.preventDefault();
        var formData = $(this).serializeArray();
        var service = $("#editPop #popupModalLabel").text();
        var mail = localStorage.getItem("userMail");
        var orderData = {
                name: formData.find(item => item.name === 'name').value,
                mail: formData.find(item => item.name === 'mail').value,
                from_date: formData.find(item => item.name === 'from').value,
                to_date: formData.find(item => item.name === 'to').value,
                phone: formData.find(item => item.name === 'phone').value,
                desc: formData.find(item => item.name === 'desc').value,
                service: service
            }

        $.ajax('http://localhost:4000/'+mail+'/booking/data/update', {
            type: 'POST',
            data: JSON.stringify(orderData),
            contentType: 'application/json'
        }).done(function() {
            alert('Your booking has been updated');
            console.log('data has stored in db');
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });
    })

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
         
        // $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json'
        // }).done(function() {
        //     alert('Your mail is sent!');
        // }).fail(function(error) {
        //     alert('Oops... ' + JSON.stringify(error));
        // });

        // $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        //     type: 'POST',
        //     data: JSON.stringify(orderData),
        //     contentType: 'application/json'
        // }).done(function() {
        //     alert('Your mail is sent!');
        // }).fail(function(error) {
        //     alert('Oops... ' + JSON.stringify(error));
        // });


        $.ajax('http://localhost:4000/'+1+'/booking', {
            type: 'POST',
            data: JSON.stringify(orderData.template_params),
            contentType: 'application/json'
        }).done(function() {
            console.log('data has stored in db');
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
                $("#bookWedding .btn:first-child").text("Booked");
                $("#bookWedding .btn:first-child").prop("disabled", true);
                break;
            case "Book Portraits":
                $("#bookPortraits").addClass("booked");
                $("#bookPortraits .btn:first-child").text("Booked");
                $("#bookPortraits .btn:first-child").prop("disabled", true);
                break;
            case "Book Fashion":
                $("#bookFashion").addClass("booked");
                $("#bookFashion .btn-firsr-child").text("Booked");
                $("#bookFashion .btn:first-child").prop("disabled", true);
                break;
            case "Book Editorial":
                $("#bookEditorial").addClass("booked");
                $("#bookEditorial .btn:first-child").text("Booked");
                $("#bookEditorial .btn:first-child").prop("disabled", true);
                break;
        }
        setTimeout(function(){
            $("#popupModal").modal('hide');
        }, 3000);
        
    });
    
})(jQuery);