(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $doc = $(document);
var $win = $(window);
var isSlider = $('#servicesSlider').length;
var briefFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdBpbw6Y5C5A4kiYpaGJp1cUIxHCWz_kGXJNSyGoMxrL0G0iQ/viewform';

var isMobile = false;
var isTablet = false;
var isDesktop = false;
var servicesSliderInited = false;
var peoplesSliderInited = false;

var switchViewportVars = function switchViewportVars() {
    var winWidth = $win.width();

    if (winWidth > 991) {
        isDesktop = true;
        isTablet = false;
        isMobile = false;
    }
    if (winWidth > 650 && winWidth <= 991) {
        isTablet = true;
        isDesktop = false;
        isMobile = false;
    }
    if (winWidth <= 650) {
        isMobile = true;
        isDesktop = false;
        isTablet = false;
    }
};

var setBgByImg = function setBgByImg() {
    $('.people__img-wrap').each(function (i, el) {
        var $this = $(el);
        var srcDefault = $this.find('img').attr('src');
        var src = srcDefault ? srcDefault : $this.find('img').attr('srcset').split(" ")[0];
        $this.css('background-image', 'url("' + src + '")');
    });
};

var toggleMobileMenu = function toggleMobileMenu() {
    $('#btnMobile').on('click', function (e) {
        var $this = $(e.currentTarget);
        $('body').toggleClass('mobile-on');
    });

    $(document).on('click', function (e) {
        var $body = $('body');
        var menu = $('.burder, #btnMobile, .header__nav');

        if (!menu.is(e.target) && menu.has(e.target).length === 0) {
            $body.removeClass('mobile-on');
        }
    });
};

var checkEmptyFields = function checkEmptyFields() {
    $('.checkValue').on('keyup', function (e) {
        var $el = $(e.currentTarget);
        if ($el.val()) {
            $el.addClass('notEmpty');
        } else {
            $el.removeClass('notEmpty');
        }
    });
};

var checkTextareaLength = function checkTextareaLength() {
    var mainFormTextarea = $('#textArea');

    $('.count').text(mainFormTextarea.attr('maxlength'));

    mainFormTextarea.on('change', function (e) {
        var $this = $(e.currentTarget);
        var $textPlaceholder = $('.text-placeholder');
        var val = $this.val();
        var maxLength = parseInt($this.attr('maxlength'));
        // const charsCount = $this.val().replace(/[\s{2,}]+/g, '').length;
        var leftChars = maxLength - $this.val().length;

        val ? $textPlaceholder.hide() : $textPlaceholder.show();
    });
};

var initPeoplesCarousel = function initPeoplesCarousel() {
    if (isDesktop && !peoplesSliderInited) {
        peoplesSliderInited = true;
        $('#peopleListCarousel').addClass('owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            // autoplay: true,
            autoplay: false,
            autoplayHoverPause: true,
            autoplaySpeed: 4000,
            navSpeed: 2000,
            mouseDrag: false,
            responsive: {
                1000: {
                    items: 3
                }
            }
            /*            onTranslated: changeSliderOffsets,
                        onDragged: changeSliderOffsets,
                        onInitialized : changeSliderOffsets,*/
        });
    }
};

/*const changeSliderOffsets = (e) => {
    const element   = e.target;
    const $slider = $(element);
    setTimeout(()=>{
        const $active = $slider.find('.owl-item.active');
        $slider.find('.owl-item').each((i,el)=>{
            const $el = $(el);
            const index = $active.index($el);
            const inFocusIndex = `focus-${index}`;

            if($el.hasClass('active')) {
                $el.addClass('focus');
                $el.addClass(inFocusIndex);
                $el.data('index',index);
                $el.removeClass('focus-'+$el.data('index'));
            } else {
                $el.removeClass('focus');
            }

        });
    },0)
};*/

var initClientsCarousel = function initClientsCarousel() {
    $('#clientsSlider').addClass('owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        navSpeed: 2000,
        dragEndSpeed: 2000,
        responsive: {
            0: {
                items: 1
            },
            460: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 7
            }
        }
    });
};

var initServicesCarousel = function initServicesCarousel() {
    var $container = $('#servicesSlider');
    var winWidth = $(window).width();

    if (winWidth > 650 && winWidth < 991 && !servicesSliderInited) {
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
            responsive: {
                0: {
                    items: 1
                },
                650: {
                    items: 2
                },
                991: {
                    items: 3
                }
            }
        });
        servicesSliderInited = true;
    }
};

var checkSubMenus = function checkSubMenus() {
    $('.header__list_sub').each(function (i, el) {
        var $parent = $(el).closest('li');
        var openSubMenu = $('<span></span>').addClass('openSubMenu hidden-xs hidden-sm');
        $parent.prepend(openSubMenu).addClass('has-child');
    });
};

function formHandler() {
    var $submitButton = $('.formSubmit');

    $submitButton.click(function (e) {
        var $form = $(e.currentTarget).closest('form');
        var $formId = $form.attr('id'); /*mainForm || invokeForm*/
        if ($form[0].checkValidity()) {
            var data = $form.serializeArray();
            $.ajax({
                type: 'post',
                url: '../handler.php',
                data: data,
                success: function success(res) {

                    if (window.ga) {
                        if ($formId === 'mainForm') {
                            ga('send', 'form_send', 'Button');
                            console.log('send', 'form_send', 'Button');
                        }

                        if ($formId === 'invokeForm') {
                            ga('send', 'audit', 'Button');
                            console.log('send', 'audit', 'Button');
                            if (window.location.pathname === "/identity") {
                                window.open(briefFormUrl, "_blank");
                            }
                        }
                    }

                    $form.find('.contact__form-input').val('');
                    if ($form.find('.contact__form-textarea').length) $form.find('.contact__form-textarea').val('');
                    if ($form.hasClass('invoke__form')) {
                        alert('Запрос принят, спасибо!');
                    } else {
                        $form.addClass('isSend');
                        setTimeout(function () {
                            $form.removeClass('isSend');
                        }, 3000);
                    }
                },
                error: function error() {
                    alert('Произошла ошибка, попробуйте пожалуйста позже!');
                }
            });
            return false;
        }
    });
};

var scrollToAnchor = function scrollToAnchor(anchor) {
    var $el = $(anchor);
    var is = $el.length;

    if (is) {
        $('html, body').animate({
            scrollTop: $el.offset().top - 25
        }, 300);
    } else {
        localStorage.setItem('anchor', anchor);
        window.location = '/';
    }

    return false;
};

var smoothScrollToAnchor = function smoothScrollToAnchor() {
    $('a[href^="#"]').click(function (e) {
        var href = $(this).attr('href');
        e.preventDefault();
        scrollToAnchor(href);
    });
};

var checkWinOffset = function checkWinOffset() {
    var winOffset = window.pageYOffset;
    var $backToTopButton = $('.back-top');
    winOffset > 100 ? $backToTopButton.removeClass('not-visible') : $backToTopButton.addClass('not-visible');
};

var checkAnchorFromStorage = function checkAnchorFromStorage() {
    var storageAnchor = localStorage.getItem('anchor');

    if (storageAnchor) {
        localStorage.removeItem('anchor');
        setTimeout(function () {
            scrollToAnchor(storageAnchor);
        }, 500);
    }
};

var loadYouTubeVideo = function loadYouTubeVideo() {
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

var recheckInputs = function recheckInputs(e, isSingle) {
    var $form = $('#mainForm');
    var delegate = $(e.delegateTarget.control);
    var recheck = $(e.currentTarget).data('recheck');
    var $inputs = $form.find('.contact__form-switcher');
    var checkedLength = $form.find('input:checkbox:checked').length;

    if (isSingle) {
        $inputs.each(function (i, el) {
            var $el = $(el);
            $el.attr('name') != recheck ? $el.prop('checked', false) : $el.prop('checked', true);
        });
    } else if (!isSingle && checkedLength != 1 && delegate.is(':checked')) {
        delegate.prop('checked', false);
    } else {
        delegate.prop('checked', true);
    }
};

var checkboxController = function checkboxController() {
    $('.contact__form-checkbox').on('click', function (e) {
        e.preventDefault();
        recheckInputs(e);
    });
};

$('[data-recheck]').on('click', function (e) {
    recheckInputs(e, true);
});

var checkCurveAnimate = function checkCurveAnimate() {
    var $serviceBox = $('.services__box');
    if ($serviceBox.length) {
        var winOffset = window.pageYOffset;
        var serviceOffset = $serviceBox.offset().top;
        var serviceHeight = $serviceBox.height();
        var koef = 1.4;

        if (winOffset * koef > serviceOffset && winOffset * koef < serviceOffset + serviceHeight) {
            $('.services__curve').removeClass('curve-animate');
        }
    } else {
        return false;
    }
};

var initLinksCarousel = function initLinksCarousel() {

    var $boxLinks = $('.grey__box-links');

    if ($boxLinks.children().length > 1) {
        $boxLinks.addClass('owl-carousel').owlCarousel({
            nav: true,
            // autoplay: false,
            // loop: true,
            margin: 10,
            autoplayHoverPause: true,
            autoplaySpeed: 2000,
            navSpeed: 2000,
            dragEndSpeed: 2000,
            responsive: {
                0: {
                    items: 2
                }
            }
        });
    }
    // else {
    //     $boxLinks.addClass('noSlide2r');
    // }
};

var registerPoupClose = function registerPoupClose() {
    $doc.on('click', '.popup__close, .popup__backdrop', function () {
        $('body').removeClass('popup-show');
        $('.popup__box--show').removeClass('popup__box--show');
        setTimeout(function () {
            $('.popup-block').removeClass('popup-block');
        }, 500);
    });
};

var showPopup = function showPopup(selector) {
    var $el = $(selector);
    $('body').addClass('popup-show');
    $el.addClass('popup-block');
    setTimeout(function () {
        $el.addClass('popup__box--show');
    }, 100);
};

$doc.on('ready', function () {
    $('.removed').remove();

    switchViewportVars();
    checkEmptyFields();
    toggleMobileMenu();
    setBgByImg();
    initPeoplesCarousel();
    initClientsCarousel();
    initServicesCarousel();
    initLinksCarousel();
    checkTextareaLength();
    checkSubMenus();
    formHandler();
    smoothScrollToAnchor();
    checkWinOffset();
    checkAnchorFromStorage();
    checkboxController();
    checkCurveAnimate();
    registerPoupClose();

    $('.video__button-play').on('click', function () {
        showPopup('#popup-video');
    });
});

$win.on('scroll', function () {
    checkWinOffset();
    checkCurveAnimate();
});

$win.on('resize', function () {
    switchViewportVars();

    var winWidth = $win.width();

    if (winWidth > 991) {
        $('body').removeClass('mobile-on');
        $('#btnMobile .burger').removeClass('active');
    }

    if (isMobile || isDesktop && servicesSliderInited) {
        if (isSlider && $('#servicesSlider').data('owl.carousel')) {
            servicesSliderInited = false;
            $('#servicesSlider').data('owl.carousel').destroy();
        };
    }

    if (!isDesktop && peoplesSliderInited) {
        if ($('#peopleListCarousel').data('owl.carousel')) {
            peoplesSliderInited = false;
            $('#peopleListCarousel').data('owl.carousel').destroy();
        }
    } else {
        initPeoplesCarousel();
    }

    if (isTablet) {
        if (!servicesSliderInited) {
            initServicesCarousel();
        };
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkZG9jIiwiJCIsImRvY3VtZW50IiwiJHdpbiIsIndpbmRvdyIsImlzU2xpZGVyIiwibGVuZ3RoIiwiYnJpZWZGb3JtVXJsIiwiaXNNb2JpbGUiLCJpc1RhYmxldCIsImlzRGVza3RvcCIsInNlcnZpY2VzU2xpZGVySW5pdGVkIiwicGVvcGxlc1NsaWRlckluaXRlZCIsInN3aXRjaFZpZXdwb3J0VmFycyIsIndpbldpZHRoIiwid2lkdGgiLCJzZXRCZ0J5SW1nIiwiZWFjaCIsImkiLCJlbCIsIiR0aGlzIiwic3JjRGVmYXVsdCIsImZpbmQiLCJhdHRyIiwic3JjIiwic3BsaXQiLCJjc3MiLCJ0b2dnbGVNb2JpbGVNZW51Iiwib24iLCJlIiwiY3VycmVudFRhcmdldCIsInRvZ2dsZUNsYXNzIiwiJGJvZHkiLCJtZW51IiwiaXMiLCJ0YXJnZXQiLCJoYXMiLCJyZW1vdmVDbGFzcyIsImNoZWNrRW1wdHlGaWVsZHMiLCIkZWwiLCJ2YWwiLCJhZGRDbGFzcyIsImNoZWNrVGV4dGFyZWFMZW5ndGgiLCJtYWluRm9ybVRleHRhcmVhIiwidGV4dCIsIiR0ZXh0UGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJwYXJzZUludCIsImxlZnRDaGFycyIsImhpZGUiLCJzaG93IiwiaW5pdFBlb3BsZXNDYXJvdXNlbCIsIm93bENhcm91c2VsIiwibG9vcCIsIm1hcmdpbiIsIm5hdiIsImF1dG9wbGF5IiwiYXV0b3BsYXlIb3ZlclBhdXNlIiwiYXV0b3BsYXlTcGVlZCIsIm5hdlNwZWVkIiwibW91c2VEcmFnIiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwiaW5pdENsaWVudHNDYXJvdXNlbCIsImRyYWdFbmRTcGVlZCIsImluaXRTZXJ2aWNlc0Nhcm91c2VsIiwiJGNvbnRhaW5lciIsImNoZWNrU3ViTWVudXMiLCIkcGFyZW50IiwiY2xvc2VzdCIsIm9wZW5TdWJNZW51IiwicHJlcGVuZCIsImZvcm1IYW5kbGVyIiwiJHN1Ym1pdEJ1dHRvbiIsImNsaWNrIiwiJGZvcm0iLCIkZm9ybUlkIiwiY2hlY2tWYWxpZGl0eSIsImRhdGEiLCJzZXJpYWxpemVBcnJheSIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsInJlcyIsImdhIiwiY29uc29sZSIsImxvZyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJvcGVuIiwiaGFzQ2xhc3MiLCJhbGVydCIsInNldFRpbWVvdXQiLCJlcnJvciIsInNjcm9sbFRvQW5jaG9yIiwiYW5jaG9yIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzbW9vdGhTY3JvbGxUb0FuY2hvciIsImhyZWYiLCJwcmV2ZW50RGVmYXVsdCIsImNoZWNrV2luT2Zmc2V0Iiwid2luT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCIkYmFja1RvVG9wQnV0dG9uIiwiY2hlY2tBbmNob3JGcm9tU3RvcmFnZSIsInN0b3JhZ2VBbmNob3IiLCJnZXRJdGVtIiwicmVtb3ZlSXRlbSIsImxvYWRZb3VUdWJlVmlkZW8iLCJ0YWciLCJjcmVhdGVFbGVtZW50IiwiZmlyc3RTY3JpcHRUYWciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJwbGF5ZXIiLCJvbllvdVR1YmVQbGF5ZXJBUElSZWFkeSIsIllUIiwiUGxheWVyIiwiaGVpZ2h0IiwidmlkZW9JZCIsInJlY2hlY2tJbnB1dHMiLCJpc1NpbmdsZSIsImRlbGVnYXRlIiwiZGVsZWdhdGVUYXJnZXQiLCJjb250cm9sIiwicmVjaGVjayIsIiRpbnB1dHMiLCJjaGVja2VkTGVuZ3RoIiwicHJvcCIsImNoZWNrYm94Q29udHJvbGxlciIsImNoZWNrQ3VydmVBbmltYXRlIiwiJHNlcnZpY2VCb3giLCJzZXJ2aWNlT2Zmc2V0Iiwic2VydmljZUhlaWdodCIsImtvZWYiLCJpbml0TGlua3NDYXJvdXNlbCIsIiRib3hMaW5rcyIsImNoaWxkcmVuIiwicmVnaXN0ZXJQb3VwQ2xvc2UiLCJzaG93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bUJBQWpCLEVBQXNDO0FBQ2xDLFlBQUdYLEVBQUUscUJBQUYsRUFBeUI2RSxJQUF6QixDQUE4QixjQUE5QixDQUFILEVBQWtEO0FBQzlDbEUsa0NBQXNCLEtBQXRCO0FBQ0FYLGNBQUUscUJBQUYsRUFBeUI2RSxJQUF6QixDQUE4QixjQUE5QixFQUE4Q3VFLE9BQTlDO0FBQ0g7QUFDSixLQUxELE1BS087QUFDSGxHO0FBQ0g7O0FBRUQsUUFBRzFDLFFBQUgsRUFBYTtBQUNULFlBQUcsQ0FBQ0Usb0JBQUosRUFBMEI7QUFDdEJzRDtBQUNIO0FBQ0o7QUFDSixDQWhDRCIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkZG9jID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICR3aW4gPSAkKHdpbmRvdyk7XHJcbmNvbnN0IGlzU2xpZGVyID0gJCgnI3NlcnZpY2VzU2xpZGVyJykubGVuZ3RoO1xyXG5jb25zdCBicmllZkZvcm1VcmwgPSAnaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZEJwYnc2WTVDNUE0a2lZcGFHSnAxY1VJeEhDV3pfa0dYSk5TeUdvTXhyTDBHMGlRL3ZpZXdmb3JtJztcclxuXHJcbmxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5sZXQgaXNUYWJsZXQgPSBmYWxzZTtcclxubGV0IGlzRGVza3RvcCA9IGZhbHNlXHJcbmxldCBzZXJ2aWNlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG5sZXQgcGVvcGxlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG5cclxuY29uc3Qgc3dpdGNoVmlld3BvcnRWYXJzID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkd2luLndpZHRoKCk7XHJcblxyXG4gICAgaWYod2luV2lkdGggPiA5OTEpIHtcclxuICAgICAgICBpc0Rlc2t0b3AgPSB0cnVlO1xyXG4gICAgICAgIGlzVGFibGV0ID0gZmFsc2U7XHJcbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKHdpbldpZHRoID4gNjUwICYmIHdpbldpZHRoIDw9IDk5MSkge1xyXG4gICAgICAgIGlzVGFibGV0ID0gdHJ1ZTtcclxuICAgICAgICBpc0Rlc2t0b3AgPSBmYWxzZTtcclxuICAgICAgICBpc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYod2luV2lkdGggPD0gNjUwKSB7XHJcbiAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xyXG4gICAgICAgIGlzRGVza3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIGlzVGFibGV0ID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBzZXRCZ0J5SW1nID0gKCkgPT4ge1xyXG4gICAgJCgnLnBlb3BsZV9faW1nLXdyYXAnKS5lYWNoKChpLGVsKT0+e1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlbCk7XHJcbiAgICAgICAgY29uc3Qgc3JjRGVmYXVsdCA9ICR0aGlzLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IChzcmNEZWZhdWx0KSA/IHNyY0RlZmF1bHQgOiAkdGhpcy5maW5kKCdpbWcnKS5hdHRyKCdzcmNzZXQnKS5zcGxpdChcIiBcIilbMF07XHJcbiAgICAgICAgJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyxgdXJsKFwiJHtzcmN9XCIpYClcclxuICAgIH0pXHJcbn07XHJcblxyXG5jb25zdCB0b2dnbGVNb2JpbGVNZW51ID0gKCkgPT4ge1xyXG4gICAgJCgnI2J0bk1vYmlsZScpLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtb24nKTtcclxuICAgIH0pXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICAgICAgY29uc3QgbWVudSA9ICQoJy5idXJkZXIsICNidG5Nb2JpbGUsIC5oZWFkZXJfX25hdicpO1xyXG5cclxuICAgICAgICBpZiAoIW1lbnUuaXMoZS50YXJnZXQpICYmIG1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ21vYmlsZS1vbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59O1xyXG5cclxuY29uc3QgY2hlY2tFbXB0eUZpZWxkcyA9ICgpID0+IHtcclxuICAgICQoJy5jaGVja1ZhbHVlJykub24oJ2tleXVwJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYgKCRlbC52YWwoKSkge1xyXG4gICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ25vdEVtcHR5JylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ25vdEVtcHR5JylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuY29uc3QgY2hlY2tUZXh0YXJlYUxlbmd0aCA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1haW5Gb3JtVGV4dGFyZWEgPSAkKCcjdGV4dEFyZWEnKTtcclxuXHJcbiAgICAkKCcuY291bnQnKS50ZXh0KG1haW5Gb3JtVGV4dGFyZWEuYXR0cignbWF4bGVuZ3RoJykpO1xyXG5cclxuICAgIG1haW5Gb3JtVGV4dGFyZWEub24oJ2NoYW5nZScsIChlKT0+e1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0ICR0ZXh0UGxhY2Vob2xkZXIgPSAkKCcudGV4dC1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgIGNvbnN0IHZhbCA9ICR0aGlzLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IHBhcnNlSW50KCR0aGlzLmF0dHIoJ21heGxlbmd0aCcpKTtcclxuICAgICAgICAvLyBjb25zdCBjaGFyc0NvdW50ID0gJHRoaXMudmFsKCkucmVwbGFjZSgvW1xcc3syLH1dKy9nLCAnJykubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGxlZnRDaGFycyA9IG1heExlbmd0aCAtICR0aGlzLnZhbCgpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgKHZhbCkgPyAkdGV4dFBsYWNlaG9sZGVyLmhpZGUoKSA6ICR0ZXh0UGxhY2Vob2xkZXIuc2hvdygpO1xyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGluaXRQZW9wbGVzQ2Fyb3VzZWwgPSAoKSA9PiB7XHJcbiAgICBpZihpc0Rlc2t0b3AgJiYgIXBlb3BsZXNTbGlkZXJJbml0ZWQpIHtcclxuICAgICAgICBwZW9wbGVzU2xpZGVySW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICAkKCcjcGVvcGxlTGlzdENhcm91c2VsJykuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2U6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXHJcbiAgICAgICAgICAgIG5hdlNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOntcclxuICAgICAgICAgICAgICAgIDEwMDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbi8qICAgICAgICAgICAgb25UcmFuc2xhdGVkOiBjaGFuZ2VTbGlkZXJPZmZzZXRzLFxyXG4gICAgICAgICAgICBvbkRyYWdnZWQ6IGNoYW5nZVNsaWRlck9mZnNldHMsXHJcbiAgICAgICAgICAgIG9uSW5pdGlhbGl6ZWQgOiBjaGFuZ2VTbGlkZXJPZmZzZXRzLCovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKmNvbnN0IGNoYW5nZVNsaWRlck9mZnNldHMgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCAgID0gZS50YXJnZXQ7XHJcbiAgICBjb25zdCAkc2xpZGVyID0gJChlbGVtZW50KTtcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICBjb25zdCAkYWN0aXZlID0gJHNsaWRlci5maW5kKCcub3dsLWl0ZW0uYWN0aXZlJyk7XHJcbiAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLWl0ZW0nKS5lYWNoKChpLGVsKT0+e1xyXG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKGVsKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkYWN0aXZlLmluZGV4KCRlbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluRm9jdXNJbmRleCA9IGBmb2N1cy0ke2luZGV4fWA7XHJcblxyXG4gICAgICAgICAgICBpZigkZWwuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoaW5Gb2N1c0luZGV4KTtcclxuICAgICAgICAgICAgICAgICRlbC5kYXRhKCdpbmRleCcsaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdmb2N1cy0nKyRlbC5kYXRhKCdpbmRleCcpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnZm9jdXMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sMClcclxufTsqL1xyXG5cclxuY29uc3QgaW5pdENsaWVudHNDYXJvdXNlbCA9ICgpID0+IHtcclxuICAgICQoJyNjbGllbnRzU2xpZGVyJykuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgIG5hdlNwZWVkOiAyMDAwLFxyXG4gICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuICAgICAgICByZXNwb25zaXZlOntcclxuICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNDYwOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNjAwOntcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDEwMDA6e1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG5jb25zdCBpbml0U2VydmljZXNDYXJvdXNlbCA9ICgpID0+IHtcclxuICAgIGNvbnN0ICRjb250YWluZXIgPSAkKCcjc2VydmljZXNTbGlkZXInKTtcclxuICAgIGNvbnN0IHdpbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcclxuXHJcbiAgICBpZih3aW5XaWR0aCA+IDY1MCAmJiB3aW5XaWR0aCA8IDk5MSAmJiAhc2VydmljZXNTbGlkZXJJbml0ZWQpIHtcclxuICAgICAgICAkY29udGFpbmVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgIC8vIG5hdjogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgbmF2U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgLy8gc3RhZ2VQYWRkaW5nOiAyNTAsXHJcbiAgICAgICAgICAgIC8vIGF1dG9XaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XHJcbiAgICAgICAgICAgICAgICAwOntcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDY1MDp7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXJ2aWNlc1NsaWRlckluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrU3ViTWVudXMgPSAoKSA9PiB7XHJcbiAgICAkKCcuaGVhZGVyX19saXN0X3N1YicpLmVhY2goKGksZWwpPT57XHJcbiAgICAgICAgY29uc3QgJHBhcmVudCA9ICQoZWwpLmNsb3Nlc3QoJ2xpJylcclxuICAgICAgICBjb25zdCBvcGVuU3ViTWVudSA9ICQoJzxzcGFuPjwvc3Bhbj4nKS5hZGRDbGFzcygnb3BlblN1Yk1lbnUgaGlkZGVuLXhzIGhpZGRlbi1zbScpXHJcbiAgICAgICAgJHBhcmVudC5wcmVwZW5kKG9wZW5TdWJNZW51KS5hZGRDbGFzcygnaGFzLWNoaWxkJylcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1IYW5kbGVyKCkge1xyXG4gICAgdmFyICRzdWJtaXRCdXR0b24gPSAkKCcuZm9ybVN1Ym1pdCcpO1xyXG5cclxuXHJcbiAgICAkc3VibWl0QnV0dG9uLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRmb3JtID0gJChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJ2Zvcm0nKTtcclxuICAgICAgICB2YXIgJGZvcm1JZCA9ICRmb3JtLmF0dHIoJ2lkJyk7ICAvKm1haW5Gb3JtIHx8IGludm9rZUZvcm0qL1xyXG4gICAgICAgIGlmICgkZm9ybVswXS5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnLi4vaGFuZGxlci5waHAnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5nYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkZm9ybUlkID09PSAnbWFpbkZvcm0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdmb3JtX3NlbmQnLCAnQnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZCcsICdmb3JtX3NlbmQnLCAnQnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRmb3JtSWQgPT09ICdpbnZva2VGb3JtJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAnYXVkaXQnLCAnQnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZCcsICdhdWRpdCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvaWRlbnRpdHlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGJyaWVmRm9ybVVybCwgXCJfYmxhbmtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGZvcm0uZmluZCgnLmNvbnRhY3RfX2Zvcm0taW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCRmb3JtLmZpbmQoJy5jb250YWN0X19mb3JtLXRleHRhcmVhJykubGVuZ3RoKSAkZm9ybS5maW5kKCcuY29udGFjdF9fZm9ybS10ZXh0YXJlYScpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRmb3JtLmhhc0NsYXNzKCdpbnZva2VfX2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgn0JfQsNC/0YDQvtGBINC/0YDQuNC90Y/Rgiwg0YHQv9Cw0YHQuNCx0L4hJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0uYWRkQ2xhc3MoJ2lzU2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLnJlbW92ZUNsYXNzKCdpc1NlbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9Cf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAsINC/0L7Qv9GA0L7QsdGD0LnRgtC1INC/0L7QttCw0LvRg9C50YHRgtCwINC/0L7Qt9C20LUhJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHNjcm9sbFRvQW5jaG9yID0gKGFuY2hvcikgPT4ge1xyXG4gICAgY29uc3QgJGVsID0gJChhbmNob3IpO1xyXG4gICAgY29uc3QgaXMgPSAkZWwubGVuZ3RoO1xyXG5cclxuICAgIGlmKGlzKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICRlbC5vZmZzZXQoKS50b3AgLSAyNVxyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbmNob3InLCBhbmNob3IpXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuY29uc3Qgc21vb3RoU2Nyb2xsVG9BbmNob3IgPSAoKSA9PiB7XHJcbiAgICAkKCdhW2hyZWZePVwiI1wiXScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zdCBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNjcm9sbFRvQW5jaG9yKGhyZWYpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrV2luT2Zmc2V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgd2luT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICBjb25zdCAkYmFja1RvVG9wQnV0dG9uID0gJCgnLmJhY2stdG9wJyk7XHJcbiAgICAod2luT2Zmc2V0ID4gMTAwKSA/ICRiYWNrVG9Ub3BCdXR0b24ucmVtb3ZlQ2xhc3MoJ25vdC12aXNpYmxlJykgOiAkYmFja1RvVG9wQnV0dG9uLmFkZENsYXNzKCdub3QtdmlzaWJsZScpO1xyXG59XHJcblxyXG5cclxuY29uc3QgY2hlY2tBbmNob3JGcm9tU3RvcmFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHN0b3JhZ2VBbmNob3IgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYW5jaG9yJyk7XHJcblxyXG4gICAgaWYoc3RvcmFnZUFuY2hvcikge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhbmNob3InKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHNjcm9sbFRvQW5jaG9yKHN0b3JhZ2VBbmNob3IpXHJcbiAgICAgICAgfSw1MDApXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgbG9hZFlvdVR1YmVWaWRlbyA9ICgpID0+IHtcclxuICAgIC8vIExvYWQgdGhlIElGcmFtZSBQbGF5ZXIgQVBJIGNvZGUgYXN5bmNocm9ub3VzbHkuXHJcbiAgICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICB0YWcuc3JjID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9BSXphU3lEMVpMVnY2bkFlMzlCWC15NFhNSVdMa095eV9DczdWb0lcIjtcclxuICAgIHZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG5cclxuICAgIC8vIFJlcGxhY2UgdGhlICd5dHBsYXllcicgZWxlbWVudCB3aXRoIGFuIDxpZnJhbWU+IGFuZFxyXG4gICAgLy8gWW91VHViZSBwbGF5ZXIgYWZ0ZXIgdGhlIEFQSSBjb2RlIGRvd25sb2Fkcy5cclxuICAgIHZhciBwbGF5ZXI7XHJcbiAgICBmdW5jdGlvbiBvbllvdVR1YmVQbGF5ZXJBUElSZWFkeSgpIHtcclxuICAgICAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCd5dHBsYXllcicsIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMzYwJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc2NDAnLFxyXG4gICAgICAgICAgICB2aWRlb0lkOiAnZ3NWdDYtUGdkTmMnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCByZWNoZWNrSW5wdXRzID0gKGUsIGlzU2luZ2xlKSA9PiB7XHJcbiAgICBjb25zdCAkZm9ybSA9ICQoJyNtYWluRm9ybScpO1xyXG4gICAgY29uc3QgZGVsZWdhdGUgPSAkKGUuZGVsZWdhdGVUYXJnZXQuY29udHJvbCk7XHJcbiAgICBjb25zdCByZWNoZWNrID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3JlY2hlY2snKTtcclxuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKCcuY29udGFjdF9fZm9ybS1zd2l0Y2hlcicpO1xyXG4gICAgY29uc3QgY2hlY2tlZExlbmd0aCA9ICRmb3JtLmZpbmQoJ2lucHV0OmNoZWNrYm94OmNoZWNrZWQnKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZihpc1NpbmdsZSkge1xyXG4gICAgICAgICAgJGlucHV0cy5lYWNoKChpLGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgICAgKCRlbC5hdHRyKCduYW1lJykgIT0gcmVjaGVjaykgPyAkZWwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKSA6ICAkZWwucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIGlmKCFpc1NpbmdsZSAmJiBjaGVja2VkTGVuZ3RoICE9IDEgJiYgZGVsZWdhdGUuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgIGRlbGVnYXRlLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxlZ2F0ZS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGNoZWNrYm94Q29udHJvbGxlciA9ICgpID0+IHtcclxuICAgICQoJy5jb250YWN0X19mb3JtLWNoZWNrYm94Jykub24oJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJlY2hlY2tJbnB1dHMoZSlcclxuICAgIH0pO1xyXG59O1xyXG5cclxuJCgnW2RhdGEtcmVjaGVja10nKS5vbignY2xpY2snLChlKT0+e1xyXG4gICAgcmVjaGVja0lucHV0cyhlLCB0cnVlKVxyXG59KTtcclxuXHJcbmNvbnN0IGNoZWNrQ3VydmVBbmltYXRlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgJHNlcnZpY2VCb3ggPSAkKCcuc2VydmljZXNfX2JveCcpO1xyXG4gICAgaWYoJHNlcnZpY2VCb3gubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3Qgd2luT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VPZmZzZXQgPSAkc2VydmljZUJveC5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZUhlaWdodCA9ICRzZXJ2aWNlQm94LmhlaWdodCgpO1xyXG4gICAgICAgIGNvbnN0IGtvZWYgPSAxLjQ7XHJcblxyXG4gICAgICAgIGlmKHdpbk9mZnNldCAqIGtvZWYgPiBzZXJ2aWNlT2Zmc2V0ICYmIHdpbk9mZnNldCAqIGtvZWYgPCBzZXJ2aWNlT2Zmc2V0ICsgc2VydmljZUhlaWdodCkge1xyXG4gICAgICAgICAgICAkKCcuc2VydmljZXNfX2N1cnZlJykucmVtb3ZlQ2xhc3MoJ2N1cnZlLWFuaW1hdGUnKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgaW5pdExpbmtzQ2Fyb3VzZWwgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgJGJveExpbmtzID0gJCgnLmdyZXlfX2JveC1saW5rcycpO1xyXG5cclxuICAgIGlmKCRib3hMaW5rcy5jaGlsZHJlbigpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAkYm94TGlua3MuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgbmF2U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XHJcbiAgICAgICAgICAgICAgICAwOntcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIHtcclxuICAgIC8vICAgICAkYm94TGlua3MuYWRkQ2xhc3MoJ25vU2xpZGUycicpO1xyXG4gICAgLy8gfVxyXG59O1xyXG5cclxuY29uc3QgcmVnaXN0ZXJQb3VwQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAkZG9jLm9uKCdjbGljaycsICcucG9wdXBfX2Nsb3NlLCAucG9wdXBfX2JhY2tkcm9wJywgKCk9PntcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3BvcHVwLXNob3cnKVxyXG4gICAgICAgICQoJy5wb3B1cF9fYm94LS1zaG93JykucmVtb3ZlQ2xhc3MoJ3BvcHVwX19ib3gtLXNob3cnKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgJCgnLnBvcHVwLWJsb2NrJykucmVtb3ZlQ2xhc3MoJ3BvcHVwLWJsb2NrJyk7XHJcbiAgICAgICAgfSw1MDApXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBzaG93UG9wdXAgPSAoc2VsZWN0b3IpID0+IHtcclxuICAgIGNvbnN0ICRlbCA9ICQoc2VsZWN0b3IpO1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdwb3B1cC1zaG93JylcclxuICAgICRlbC5hZGRDbGFzcygncG9wdXAtYmxvY2snKVxyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICRlbC5hZGRDbGFzcygncG9wdXBfX2JveC0tc2hvdycpXHJcbiAgICB9LDEwMClcclxufVxyXG5cclxuXHJcbiRkb2Mub24oJ3JlYWR5JywgKCkgPT4ge1xyXG4gICAgJCgnLnJlbW92ZWQnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBzd2l0Y2hWaWV3cG9ydFZhcnMoKTtcclxuICAgIGNoZWNrRW1wdHlGaWVsZHMoKTtcclxuICAgIHRvZ2dsZU1vYmlsZU1lbnUoKTtcclxuICAgIHNldEJnQnlJbWcoKTtcclxuICAgIGluaXRQZW9wbGVzQ2Fyb3VzZWwoKTtcclxuICAgIGluaXRDbGllbnRzQ2Fyb3VzZWwoKTtcclxuICAgIGluaXRTZXJ2aWNlc0Nhcm91c2VsKCk7XHJcbiAgICBpbml0TGlua3NDYXJvdXNlbCgpO1xyXG4gICAgY2hlY2tUZXh0YXJlYUxlbmd0aCgpO1xyXG4gICAgY2hlY2tTdWJNZW51cygpO1xyXG4gICAgZm9ybUhhbmRsZXIoKTtcclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCk7XHJcbiAgICBjaGVja1dpbk9mZnNldCgpO1xyXG4gICAgY2hlY2tBbmNob3JGcm9tU3RvcmFnZSgpO1xyXG4gICAgY2hlY2tib3hDb250cm9sbGVyKCk7XHJcbiAgICBjaGVja0N1cnZlQW5pbWF0ZSgpO1xyXG4gICAgcmVnaXN0ZXJQb3VwQ2xvc2UoKTtcclxuXHJcbiAgICAkKCcudmlkZW9fX2J1dHRvbi1wbGF5Jykub24oJ2NsaWNrJywgKCk9PntcclxuICAgICAgICBzaG93UG9wdXAoJyNwb3B1cC12aWRlbycpO1xyXG4gICAgfSlcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuJHdpbi5vbignc2Nyb2xsJywgKCk9PntcclxuICAgIGNoZWNrV2luT2Zmc2V0KCk7XHJcbiAgICBjaGVja0N1cnZlQW5pbWF0ZSgpO1xyXG59KTtcclxuXHJcbiR3aW4ub24oJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIHN3aXRjaFZpZXdwb3J0VmFycygpO1xyXG5cclxuICAgIGNvbnN0IHdpbldpZHRoID0gJHdpbi53aWR0aCgpO1xyXG5cclxuXHJcbiAgICBpZiAod2luV2lkdGggPiA5OTEpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vYmlsZS1vbicpO1xyXG4gICAgICAgICQoJyNidG5Nb2JpbGUgLmJ1cmdlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihpc01vYmlsZSB8fCBpc0Rlc2t0b3AgJiYgc2VydmljZXNTbGlkZXJJbml0ZWQpIHtcclxuICAgICAgICBpZihpc1NsaWRlciAmJiAkKCcjc2VydmljZXNTbGlkZXInKS5kYXRhKCdvd2wuY2Fyb3VzZWwnKSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKCcjc2VydmljZXNTbGlkZXInKS5kYXRhKCdvd2wuY2Fyb3VzZWwnKS5kZXN0cm95KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZighaXNEZXNrdG9wICYmIHBlb3BsZXNTbGlkZXJJbml0ZWQpIHtcclxuICAgICAgICBpZigkKCcjcGVvcGxlTGlzdENhcm91c2VsJykuZGF0YSgnb3dsLmNhcm91c2VsJykpIHtcclxuICAgICAgICAgICAgcGVvcGxlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKCcjcGVvcGxlTGlzdENhcm91c2VsJykuZGF0YSgnb3dsLmNhcm91c2VsJykuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdFBlb3BsZXNDYXJvdXNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzVGFibGV0KSB7XHJcbiAgICAgICAgaWYoIXNlcnZpY2VzU2xpZGVySW5pdGVkKSB7XHJcbiAgICAgICAgICAgIGluaXRTZXJ2aWNlc0Nhcm91c2VsKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSk7Il19
