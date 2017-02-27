(function() {
    //No idea if this is still needed
    $(document).ready(function() {

        //This is such a mess, I can't stop laughing
        //I have no idea how this works cross browser
        //Sticking to responsive behavior in CSS
        var init = true;
        var carousel;

        if (init) {
            checkWindow();

            //resizeCarousel(40, 10);
            init = false;
        }

        window.addEventListener("resize", function(){

            $('.carousel .active').removeClass('active');
            $('.carousel li:first-of-type').addClass('active');
            checkWindow();

        });


        //Responsive carousel workaround
        //https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
        function checkWindow() {
            if (window.matchMedia("(min-width: 60rem)").matches) {
                resizeCarousel(40, 10);
            } else if (window.matchMedia("(max-width: 59.999rem) and (min-width: 45rem)").matches) {
                resizeCarousel(30, 7);
            } else if (window.matchMedia("(max-width: 44.999rem) and (min-width: 30rem)").matches) {
                resizeCarousel(20, 5);
            } else if (window.matchMedia("(max-width: 29.999rem").matches) {
                resizeCarousel(12, 3);
            }
        }



        function resizeCarousel(width, height){
            //Weapon Carousel
            var options = {
                unit: 'rem',
                ovalWidth: width,
                ovalHeight: height,
                offsetX: 8,
                offsetY: 39,
                angle: 0,
                activeItem: 0,
                duration: 250,
                className: 'item'
            }
            carousel = $('.carousel').CircularCarousel(options);
        }


        /* Manaully click an item anywhere in the carousel */
        $('.carousel .item').click(function(e) {
            var index = $(this).index('li');
            carousel.cycleActiveTo(index);
            e.preventDefault();
        });

    });

})();