const $doc = $(document);
const $win = $(window);
const isSlider = $('#servicesSlider').length;
let isMobile = false;
let isTablet = false;
let isDesktop = false
let servicesSliderInited = false;

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
            // stagePadding: 250,
            // autoWidth: true,
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
        });
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
        var $formId = $form.attr('id');  /*mainForm || invokeForm*/
        if ($form[0].checkValidity()) {
            var data = $form.serializeArray();
            $.ajax({
                type: 'post',
                url: '../handler.php',
                data: data,
                success: function success(res) {

                    if(window.ga) {
                        if($formId === 'mainForm') {
                            ga('send', 'form_send', 'Button');
                            console.log('send', 'form_send', 'Button');
                        }

                        if($formId === 'invokeForm') {
                            ga('send', 'audit', 'Button');
                            console.log('send', 'audit', 'Button');
                        }
                    }

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
    const storageAnchor = localStorage.getItem('anchor');

    if(storageAnchor) {
        localStorage.removeItem('anchor');
        setTimeout(()=>{
            scrollToAnchor(storageAnchor)
        },500)
    }
};


const loadYouTubeVideo = () => {
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/AIzaSyD1ZLVv6nAe39BX-y4XMIWLkOyy_Cs7VoI";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Replace the 'ytplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer', {
            height: '360',
            width: '640',
            videoId: 'gsVt6-PgdNc'
        });
    }
};

const recheckInputs = (e, isSingle) => {
    const $form = $('#mainForm');
    const delegate = $(e.delegateTarget.control);
    const recheck = $(e.currentTarget).data('recheck');
    const $inputs = $form.find('.contact__form-switcher');
    const checkedLength = $form.find('input:checkbox:checked').length;

      if(isSingle) {
          $inputs.each((i,el) => {
              const $el = $(el);
              ($el.attr('name') != recheck) ? $el.prop('checked', false) :  $el.prop('checked', true);
          })
      } else if(!isSingle && checkedLength != 1 && delegate.is(':checked')) {
          delegate.prop('checked', false);
      } else {
          delegate.prop('checked', true);
      }
};

const checkboxController = () => {
    $('.contact__form-checkbox').on('click', (e)=>{
        e.preventDefault();
        recheckInputs(e)
    });
};

$('[data-recheck]').on('click',(e)=>{
    recheckInputs(e, true)
});

const checkCurveAnimate = () => {
    const $serviceBox = $('.services__box');
    if($serviceBox.length) {
        const winOffset = window.pageYOffset;
        const serviceOffset = $serviceBox.offset().top;
        const serviceHeight = $serviceBox.height();
        const koef = 1.4;

        if(winOffset * koef > serviceOffset && winOffset * koef < serviceOffset + serviceHeight) {
            $('.services__curve').removeClass('curve-animate')
        }
    } else {
        return false;
    }
};

// const initLinksCarousel = () => {
//
//     const $boxLinks = $('.grey__box-links');
//
//     if($boxLinks.children().length > 2) {
//         $('.grey__box-links').addClass('owl-carousel').owlCarousel({
//             // nav: true,
//             // autoplay: false,
//             // loop: true,
//             margin: 10,
//             autoplayHoverPause: true,
//             autoplaySpeed: 2000,
//             navSpeed: 2000,
//             dragEndSpeed: 2000,
//             responsive:{
//                 0:{
//                     items: 1
//                 },
//                 480:{
//                     items: 2
//                 },
//             }
//         })
//     } else {
//         $boxLinks.addClass('noSlider');
//     }
// };

const registerPoupClose = () => {
    $doc.on('click', '.popup__close, .popup__backdrop', ()=>{
        $('body').removeClass('popup-show')
        $('.popup__box--show').removeClass('popup__box--show')
        setTimeout(()=>{
            $('.popup-block').removeClass('popup-block');
        },500)
    })
}

const showPopup = (selector) => {
    const $el = $(selector);
    $('body').addClass('popup-show')
    $el.addClass('popup-block')
    setTimeout(()=>{
        $el.addClass('popup__box--show')
    },100)
}


$doc.on('ready', () => {
    checkViewport();
    checkEmptyFields();
    toggleMobileMenu();
    setBgByImg();
    initClientsCarousel();
    initServicesCarousel();
    // initLinksCarousel();
    checkTextareaLength();
    checkSubMenus();
    formHandler();
    smoothScrollToAnchor();
    checkWinOffset();
    checkAnchorFromStorage();
    checkboxController();
    checkCurveAnimate();
    registerPoupClose();

    $('.video__button-play').on('click', ()=>{
        showPopup('#popup-video');
    })

});




$win.on('scroll', ()=>{
    checkWinOffset();
    checkCurveAnimate();
});

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