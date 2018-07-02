const $doc = $(document);
const $win = $(window);
const isSlider = $('#servicesSlider').length;
let isMobile = false;
let isTablet = false;
let isDesktop = false
let servicesSliderInited = false;

// const makeHash = (length) => {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (var i = 0; i < length; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// };

// (function() {
//     const cssLink = document.createElement("link");
//     cssLink.rel = "stylesheet";
//     cssLink.href = "css/style.css?ver=" + makeHash(20);
//     document.getElementsByTagName('head')[0].appendChild(cssLink);
//     initDotDotDot();
// })();

const checkViewport = () => {
    const winWidth = $win.width();

    if(winWidth > 991) {
        isDesktop = true;
        isTablet = false;
        isMobile = false;
    }
    if(winWidth > 650 && winWidth <= 991) {
        isTablet = true;
        isDesktop = false;
        isMobile = false;
    }
    if(winWidth <= 650) {
        isMobile = true;
        isDesktop = false;
        isTablet = false;
    }
}

const setBgByImg = () => {
    $('.people__img-wrap').each((i,el)=>{
        const $this = $(el);
        const src = $this.find('img').attr('src');
        $this.css('background-image',`url("${src}")`)
    })
};

const toggleMobileMenu = () => {
    $('#btnMobile').on('click', (e) => {
        const $this = $(e.currentTarget);
        $('body').toggleClass('mobile-on');
    })

    $(document).on('click', (e)=>{
        const $body = $('body');
        const menu = $('.burder, #btnMobile, .header__nav');

        if (!menu.is(e.target) && menu.has(e.target).length === 0) {
            $body.removeClass('mobile-on');
        }

    })
};

const checkEmptyFields = () => {
    $('.checkValue').on('keyup', (e) => {
        const $el = $(e.currentTarget);
        if ($el.val()) {
            $el.addClass('notEmpty')
        } else {
            $el.removeClass('notEmpty')
        }
    })
};

const checkTextareaLength = () => {
    const mainFormTextarea = $('#textArea');

    $('.count').text(mainFormTextarea.attr('maxlength'))

    mainFormTextarea.on('change', (e)=>{
        const $this = $(e.currentTarget);
        const $textPlaceholder = $('.text-placeholder');
        const val = $this.val();
        const maxLength = parseInt($this.attr('maxlength'));
        // const charsCount = $this.val().replace(/[\s{2,}]+/g, '').length;
        const leftChars = maxLength - $this.val().length;

        (val) ? $textPlaceholder.hide() : $textPlaceholder.show();
    })

    // $('#textArea').on('keypress, keydown', (e)=>{
    //     const $this = $(e.currentTarget);
    //     const maxLength = parseInt($this.attr('maxlength'));
    //     const currentLength = $this.val().length + 1;
    //     const $count = $this.siblings('.count');
    //     const leftChars = maxLength - currentLength;
    //     const countErrorCls = 'count-error';
    //
    //     console.log(maxLength, ' - ', currentLength, ' = ', leftChars);
    //     console.log('currentLength',currentLength);
    //
    //     if(currentLength <= maxLength) {
    //         $count.text(leftChars);
    //     }
    //
    //     if(leftChars === 0) {
    //         $count.addClass(countErrorCls)
    //     } else if($count.hasClass(countErrorCls)) {
    //         $count.removeClass(countErrorCls)
    //     }
    // })

}

const initClientsCarousel = () => {
    $('#clientsSlider').addClass('owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        navSpeed: 2000,
        dragEndSpeed: 2000,
        responsive:{
            0: {
                items: 1
            },
            460: {
              items: 2
            },
            600:{
                items: 3
            },
            1000:{
                items: 7
            }
        }
    })
}

const initServicesCarousel = () => {
    const $container = $('#servicesSlider');
    const winWidth = $(window).width()

    if(winWidth > 650 && winWidth < 991 && !servicesSliderInited) {
        $container.addClass('owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            // nav: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplaySpeed: 2000,
            navSpeed: 2000,
            dragEndSpeed: 2000,
            responsive:{
                0:{
                    items: 1
                },
                650:{
                    items: 2
                },
                991:{
                    items: 3
                }
            }
        })
        servicesSliderInited = true;
    }
}

const checkSubMenus = () => {
    $('.header__list_sub').each((i,el)=>{
        const $parent = $(el).closest('li')
        const openSubMenu = $('<span></span>').addClass('openSubMenu hidden-xs hidden-sm')
        $parent.prepend(openSubMenu).addClass('has-child')
    })
}

function formHandler() {
    var $submitButton = $('.formSubmit');
    $submitButton.click(function (e) {
        var $form = $(e.currentTarget).closest('form');
        if ($form[0].checkValidity()) {
            var data = $form.serializeArray();
            $.ajax({
                type: 'post',
                url: '../handler.php',
                data: data,
                success: function success(res) {
                    $form.find('.contact__form-input').val('')
                    if($form.find('.contact__form-textarea').length) $form.find('.contact__form-textarea').val('');
                    if ($form.hasClass('invoke__form')) {
                        alert('Запрос принят, спасибо!');
                    } else {
                        $form.addClass('isSend');
                        setTimeout(function () {
                            $form.removeClass('isSend');
                        }, 3000);
                    }
                },
                error: function () {
                    alert('Произошла ошибка, попробуйте пожалуйста позже!')
                }
            });
            return false;
        }
    });
};

const scrollToAnchor = (anchor) => {
    const $el = $(anchor);
    const is = $el.length;

    if(is) {
        $('html, body').animate({
            scrollTop: $el.offset().top - 25
        }, 300);
    } else {
        localStorage.setItem('anchor', anchor)
        window.location = '/';
    }

    return false;
}

const smoothScrollToAnchor = () => {
    $('a[href^="#"]').click(function(e) {
        const href = $(this).attr('href');
        e.preventDefault();
        scrollToAnchor(href);
    });
}

const checkWinOffset = () => {
    const winOffset = window.pageYOffset
    const $backToTopButton = $('.back-top');
    (winOffset > 100) ? $backToTopButton.removeClass('not-visible') : $backToTopButton.addClass('not-visible');
}


const checkAnchorFromStorage = () => {
    const storageAnchor = localStorage.getItem('anchor')

    if(storageAnchor) {
        localStorage.removeItem('anchor')
        setTimeout(()=>{
            scrollToAnchor(storageAnchor)
        },500)
    }
}


const inputMaskInit = () => {
    $(".inputMask").inputmask({
        "mask": "+38(099)999-99-99",
        "clearIncomplete": true
    });
}

$doc.on('ready', () => {
    checkViewport();
    checkEmptyFields();
    toggleMobileMenu();
    setBgByImg();
    initClientsCarousel();
    initServicesCarousel();
    checkTextareaLength();
    checkSubMenus();
    formHandler();
    smoothScrollToAnchor();
    checkWinOffset();
    checkAnchorFromStorage();
    inputMaskInit();
});

$win.on('scroll', ()=>{
    checkWinOffset();
})

$win.on('resize', () => {
    checkViewport();

    const winWidth = $win.width();


    if (winWidth > 991) {
        $('body').removeClass('mobile-on');
        $('#btnMobile .burger').removeClass('active');
    }

    if(isMobile || isDesktop && servicesSliderInited) {
        if(isSlider && $('#servicesSlider').data('owl.carousel')) {
            $('#servicesSlider').data('owl.carousel').destroy();
            servicesSliderInited = false;
        };
    }

    if(isTablet) {
        if(!servicesSliderInited) {
            initServicesCarousel();
        };
    }
});