(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    if (localStorage.getItem('bookedService') === null){
        localStorage.setItem('bookedService', JSON.stringify([]));
    } else {
        var bookedService = JSON.parse(localStorage.getItem('bookedService'));
        bookedService.forEach(service => {
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
                    $("#bookFashion .btn:first-child").text("Booked");
                    $("#bookFashion .btn:first-child").prop("disabled", true);
                    break;
                case "Book Editorial":
                    $("#bookEditorial").addClass("booked");
                    $("#bookEditorial .btn:first-child").text("Booked");
                    $("#bookEditorial .btn:first-child").prop("disabled", true);
                    break;
            }
        });
    }

    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    var signUpSubmit = $('#signUp');
    var mail = $('#userMail');

    
    var cookieMail = localStorage.getItem('userMail');
    if (cookieMail) {
        mail.val(cookieMail);
    }

    if ($('#email').is('*')) {
        $('#email').val(mail.val());
        $('#email').prop('disabled', true);
    }

    var userProf = $("#loggedInUser .user-name");

    if (cookieMail) {
        userProf.text(("@" +cookieMail));
    }

    if (localStorage.getItem('userMail') != null){
        signUpSubmit.text('Sign out');   
    }


    signUpSubmit.on('click', function () {
        if (localStorage.getItem('userMail') != null){
            var confirm = window.confirm("Are you sure you want to sign out?");
            if (confirm){
                localStorage.clear();
                location.reload();
            }
        } else {
            debugger
            if (mail.val() !== '' && mail.val() !== cookieMail){
                localStorage.setItem('userMail', mail.val());
                userProf.text(("@" +localStorage.getItem('userMail')));
                mail.val(localStorage.getItem('userMail'));
                $(this).text('Sign out');

                $.ajax('http://localhost:4000/signin', {
                    type: 'POST',
                    data: JSON.stringify({mail: mail.val()}),
                    contentType: 'application/json'
                }).done(function() {
                    alert('Thank you for signing up!');
                }).fail(function(error) {
                    alert('Oops... ' + JSON.stringify(error));
                });
        
            } 
        }


    });

    
})(jQuery);

