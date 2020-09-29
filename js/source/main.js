/**
 * File main.js.
 */

( function( $ ) {

    // Select all links with hashes
    $( 'a[href*="#"]' )
        // Remove links that don't actually link to anything
        .not( '[href="#"]' )
        .not( '[href="#0"]' )
        .on( 'click', function( event ) {
            // On-page links
            if (
                location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $( this.hash );
                target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
                // Does a scroll target exist?
                if ( target.length ) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();

                    $( 'html, body' ).animate( {
                        scrollTop: target.offset().top
                    }, 500 );
                }
            }
        } );

    $( ".animsition" ).animsition( {
        inClass: 'fade-in-down',
        outClass: 'fade-out-up',
        inDuration: 1000,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration' ],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition: function( url ) {
            window.location.href = url;
        }
    } );

    function fade() {
        var animation_height = $(window).innerHeight() * 0.25;
        var ratio = Math.round((1 / animation_height) * 10000) / 10000;

        $(".fade").each(function () {

            var objectTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();

            if (objectTop < windowBottom) {
                if (objectTop < windowBottom - animation_height) {
                    $(this).css({
                        transition: 'opacity 0.1s linear,transform 0.5s cubic-bezier(0,0,0,1)',
                        opacity: 1,
                        transform: 'translateY(0)'
                    });

                } else {
                    $(this).css({
                        transition: 'opacity 0.25s linear,transform 0.5s cubic-bezier(0,0,0,1)',
                        opacity: (windowBottom - objectTop) * ratio,
                        transform: 'translateY(2em)'
                    });
                }
            } else {
                $(this).css('opacity', 0);
            }
        });
    }

    /**
     * Fade sections in on scroll
     */
    $( window ).on( "load", function() {

        $( '.fade' ).css( 'opacity', 0 );

        fade();

    } );

    $(window).on('scroll', function () {
        fade();
    });


} )( jQuery );
