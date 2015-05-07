$(function() {
    var $window = $(window);
    var breakpoints = {
        medium: 'screen and (min-width: 45em)',
        large: 'screen and (min-width: 96em)'
    }

    Harvey.attach(breakpoints.medium, {
        on: function(){
            $('body').addClass('breakpoint-medium');
        },
        off: function(){
            $('body').removeClass('breakpoint-medium');
        }
    });
    Harvey.attach(breakpoints.large, {
        on: function(){
            $('body').addClass('breakpoint-large');
        },
        off: function(){
            $('body').removeClass('breakpoint-large');
        }
    });


    // Scroll all anchor links
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // Menu toggle
    $(".menu-button").click(function() {
        $('nav ul').toggleClass('visible');
    });

    // Share hide
    $(".share a").click(function() {
        $('.share ul').toggleClass('visible');
    });

    // News-letter PLAY toggle
    $('.sign-up').on('click', function() {
      $('.newsletter-wrapper-top').toggleClass('show');
    });

    // News-letter PLAY height container
    $('.sign-up').on('click', function() {
      $('header.container').toggleClass('taller');
    });

    // main blur // Slows down the browser too much
    //$('.sign-up').on('click', function() {
    //  $('main').toggleClass('blur');
   //});

    // Dropdown menus for mobile
    $('.dropdown').click(function() {
        $('.dropdown').toggleClass('open');
        $('.popular-tags .closed').slideToggle();
    });
    var querystring = window.location.search;
    if ((querystring.indexOf('tag') > 0) && ($('.dropdown').css('display') == 'block')) {
        $('.dropdown').addClass('open');
        $('.popular-tags .closed').slideToggle();
    }

    // Sticky elements
    $('.pick').each(function(){
        var $stickyEl = $('.pick');
        var elTop = $stickyEl.length && $stickyEl.offset().top - 4;

        $stickyEl.toggleClass('fixed', $window.scrollTop() > elTop);

        $window.scroll(function() {
            $stickyEl.toggleClass('fixed', $window.scrollTop() > elTop);
        });
    });

    $('.nextprev').each(function(){
        var $stickyEl = $('.nextprev');
        var elTop = $stickyEl.length && $stickyEl.offset().top - 10;

        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);

        $window.scroll(function() {
            $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });
    });

    // fitVids
    $('.responsive-object').fitVids();

    // get some stats about the video
    $('.responsive-object').each(function() {
        var $this = $(this);
        var iframe = $('iframe', $this)[0];
        var player = $f(iframe);

        $(document).on('click tap', '.poster, .play', function(){
            player.api('play');
        });

        player.addEvent('ready', function() {
            player.addEvent('play', function(id){
                $('.play').hide();
                $('.breakpoint-medium header, .breakpoint-medium .hero-video h1').animate({
                    opacity: 0,
                }, 500, function() {});
                $('.poster').fadeOut(300);
                ga('send', 'event', 'video', 'played', id);
            });
            player.addEvent('pause', function(id){
                $('header').animate({
                    opacity: 1,
                }, 500, function() {});
                ga('send', 'event', 'video', 'paused', id);
            });
            player.addEvent('finish', function(id){
                 $('header').animate({
                    opacity: 1,
                }, 500, function() {});
                $('.poster').fadeIn(500);
                ga('send', 'event', 'video', 'finished', id);
            });
        });
    });

    //featherlight used for lightboxes in streamfield-enabled pages
    $('.gallery').featherlightGallery();

    // Animate contact form in footer
    $('.contact-form').hide();
    $('.footerbleed a[href^="/contact"]').click(function(e) {
        e.preventDefault();
        $('.contact-form').slideToggle();
    });

    inputIsNotEmpty();

});




function inputIsNotEmpty() {
    // Add class to form elements when blurred if they contain content.
    $(".field-container input, .field-container textarea").on("blur", function() {
        var el = $(this);
        var value = el.val().length;
        if (value > 0) {
           el.addClass("active-input");
        } else {
           el.removeClass("active-input");
       }
    });
    // Blur all form fields on function call to ensure correct handling on
    // page load.
    $(".field-container input, .field-container textarea").blur();
}
