$(function(){
    var header = $('#header'),
        introH = $('#intro').innerHeight(),
        scrollOffset = $(window).scrollTop(),
        divs = $('[data-scrolled]');

    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
    
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    
    });

    /* Fixed header */
    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH-65) {
            header.addClass("fixed")
        } else {
            header.removeClass("fixed")
        }
    };

    /* Nav-toggle */
    $('#nav_toggle').on('click', (event) => {
        event.preventDefault()

        header.toggleClass('mobile_active')
        $('#nav_toggle').toggleClass('active')
        $('#nav').toggleClass('active')
        $(document).on('click', (event) => {
            event.preventDefault()
    
            if (event.target.id !== 'nav_toggle__item') {
                header.removeClass('mobile_active')
                $('#nav_toggle').removeClass('active')
                $('#nav').removeClass('active')
            }
        })
    })


    /* Smooth scroll */
    $(window).on('scroll', () => {
        divs.each(function() {
            var top = $(this).offset().top-66,
                bottom = top+$(this).outerHeight();

                if(scrollOffset >= top && scrollOffset <= bottom) {
                    header.find('a').removeClass('active');
                    header.find('[data-scrollto="#'+$(this).attr('id')+'"]').addClass('active');
                }
        })
    });
    $('[data-scrollto]').on('click', function(event) {
        event.preventDefault()

        blockId = $(this).data('scrollto')
        blockOffset = $(blockId).offset().top-65

        $('nav a').removeClass('active')
        $('#nav').removeClass('active')
        $(this).addClass('active')
        $("#nav_toggle").removeClass("active")

        $('html, body').animate({
            scrollTop: blockOffset
        }, 500)
    });

    /* Slider */
    
    const sliderElems = document.querySelectorAll('.testimonial__item');
    const dotWrapper = document.querySelector('.dot__wrapper');
    createDots();
    const dotElems = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideIndex = 1
    
    showSlides(slideIndex)

    function plusSlides(n) {
        showSlides(slideIndex += n)
    }

    function currentSlide(n) {
        showSlides(slideIndex = n)
    }


    prevBtn.addEventListener('click', () => {
        plusSlides(-1)
    })
    nextBtn.addEventListener('click', () => {
        plusSlides(1)
    })

    for (let i = 0; i < dotElems.length; i++) {
        dotElems[i].addEventListener('click', () => {
            currentSlide(i + 1)
        })
    }

    function createDots() {
        dotWrapper.innerHTML = ''
        for (i = 0; i < sliderElems.length; i++) {
            const dotElem = document.createElement('span')
            dotElem.classList.add('dot')

            dotWrapper.insertAdjacentElement('afterbegin', dotElem)
        }
    }

    function showSlides(n) {
        if (n > sliderElems.length) {slideIndex = 1};
        if (n < 1) {slideIndex = sliderElems.length};

        sliderElems.forEach((slide) => {
            slide.style.display = 'none'
        });
        dotElems.forEach((dot) => {
            dot.classList.remove('dot-active')
        });

        sliderElems[slideIndex - 1].style.display = 'flex'
        dotElems[slideIndex - 1].classList.add('dot-active')
    }


});