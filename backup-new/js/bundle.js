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

var checkViewport = function checkViewport() {
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
        var src = $this.find('img').attr('src');
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

    $('.video__button-play').on('click', function () {
        showPopup('#popup-video');
    });
});

$win.on('scroll', function () {
    checkWinOffset();
    checkCurveAnimate();
});

$win.on('resize', function () {
    checkViewport();

    var winWidth = $win.width();

    if (winWidth > 991) {
        $('body').removeClass('mobile-on');
        $('#btnMobile .burger').removeClass('active');
    }

    if (isMobile || isDesktop && servicesSliderInited) {
        if (isSlider && $('#servicesSlider').data('owl.carousel')) {
            $('#servicesSlider').data('owl.carousel').destroy();
            servicesSliderInited = false;
        };
    }

    if (isTablet) {
        if (!servicesSliderInited) {
            initServicesCarousel();
        };
    }
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkZG9jIiwiJCIsImRvY3VtZW50IiwiJHdpbiIsIndpbmRvdyIsImlzU2xpZGVyIiwibGVuZ3RoIiwiYnJpZWZGb3JtVXJsIiwiaXNNb2JpbGUiLCJpc1RhYmxldCIsImlzRGVza3RvcCIsInNlcnZpY2VzU2xpZGVySW5pdGVkIiwiY2hlY2tWaWV3cG9ydCIsIndpbldpZHRoIiwid2lkdGgiLCJzZXRCZ0J5SW1nIiwiZWFjaCIsImkiLCJlbCIsIiR0aGlzIiwic3JjIiwiZmluZCIsImF0dHIiLCJjc3MiLCJ0b2dnbGVNb2JpbGVNZW51Iiwib24iLCJlIiwiY3VycmVudFRhcmdldCIsInRvZ2dsZUNsYXNzIiwiJGJvZHkiLCJtZW51IiwiaXMiLCJ0YXJnZXQiLCJoYXMiLCJyZW1vdmVDbGFzcyIsImNoZWNrRW1wdHlGaWVsZHMiLCIkZWwiLCJ2YWwiLCJhZGRDbGFzcyIsImNoZWNrVGV4dGFyZWFMZW5ndGgiLCJtYWluRm9ybVRleHRhcmVhIiwidGV4dCIsIiR0ZXh0UGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJwYXJzZUludCIsImxlZnRDaGFycyIsImhpZGUiLCJzaG93IiwiaW5pdENsaWVudHNDYXJvdXNlbCIsIm93bENhcm91c2VsIiwibG9vcCIsIm1hcmdpbiIsIm5hdiIsImF1dG9wbGF5IiwiYXV0b3BsYXlIb3ZlclBhdXNlIiwiYXV0b3BsYXlTcGVlZCIsIm5hdlNwZWVkIiwiZHJhZ0VuZFNwZWVkIiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwiaW5pdFNlcnZpY2VzQ2Fyb3VzZWwiLCIkY29udGFpbmVyIiwiY2hlY2tTdWJNZW51cyIsIiRwYXJlbnQiLCJjbG9zZXN0Iiwib3BlblN1Yk1lbnUiLCJwcmVwZW5kIiwiZm9ybUhhbmRsZXIiLCIkc3VibWl0QnV0dG9uIiwiY2xpY2siLCIkZm9ybSIsIiRmb3JtSWQiLCJjaGVja1ZhbGlkaXR5IiwiZGF0YSIsInNlcmlhbGl6ZUFycmF5IiwiYWpheCIsInR5cGUiLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwiZ2EiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJwYXRobmFtZSIsIm9wZW4iLCJoYXNDbGFzcyIsImFsZXJ0Iiwic2V0VGltZW91dCIsImVycm9yIiwic2Nyb2xsVG9BbmNob3IiLCJhbmNob3IiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInNtb290aFNjcm9sbFRvQW5jaG9yIiwiaHJlZiIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tXaW5PZmZzZXQiLCJ3aW5PZmZzZXQiLCJwYWdlWU9mZnNldCIsIiRiYWNrVG9Ub3BCdXR0b24iLCJjaGVja0FuY2hvckZyb21TdG9yYWdlIiwic3RvcmFnZUFuY2hvciIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwibG9hZFlvdVR1YmVWaWRlbyIsInRhZyIsImNyZWF0ZUVsZW1lbnQiLCJmaXJzdFNjcmlwdFRhZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsInBsYXllciIsIm9uWW91VHViZVBsYXllckFQSVJlYWR5IiwiWVQiLCJQbGF5ZXIiLCJoZWlnaHQiLCJ2aWRlb0lkIiwicmVjaGVja0lucHV0cyIsImlzU2luZ2xlIiwiZGVsZWdhdGUiLCJkZWxlZ2F0ZVRhcmdldCIsImNvbnRyb2wiLCJyZWNoZWNrIiwiJGlucHV0cyIsImNoZWNrZWRMZW5ndGgiLCJwcm9wIiwiY2hlY2tib3hDb250cm9sbGVyIiwiY2hlY2tDdXJ2ZUFuaW1hdGUiLCIkc2VydmljZUJveCIsInNlcnZpY2VPZmZzZXQiLCJzZXJ2aWNlSGVpZ2h0Iiwia29lZiIsInJlZ2lzdGVyUG91cENsb3NlIiwic2hvd1BvcHVwIiwic2VsZWN0b3IiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE9BQU9DLEVBQUVDLFFBQUYsQ0FBYjtBQUNBLElBQU1DLE9BQU9GLEVBQUVHLE1BQUYsQ0FBYjtBQUNBLElBQU1DLFdBQVdK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SUUsUUFBSixDQUFhLGtCQUFiO0FBQ0gsS0FGRCxFQUVFLEdBRkY7QUFHSCxDQVBEOztBQVVBdEMsS0FBS3lCLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFlBQU07QUFDbkJiO0FBQ0F1QjtBQUNBWDtBQUNBVDtBQUNBaUM7QUFDQVk7QUFDQTtBQUNBckI7QUFDQXVCO0FBQ0FLO0FBQ0ErQjtBQUNBRztBQUNBSTtBQUNBMEI7QUFDQUM7QUFDQUs7O0FBRUF4SSxNQUFFLHFCQUFGLEVBQXlCd0IsRUFBekIsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBSTtBQUNyQ2lILGtCQUFVLGNBQVY7QUFDSCxLQUZEO0FBSUgsQ0F0QkQ7O0FBMkJBdkksS0FBS3NCLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLFlBQUk7QUFDbEI0RTtBQUNBK0I7QUFDSCxDQUhEOztBQUtBakksS0FBS3NCLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLFlBQU07QUFDcEJiOztBQUVBLFFBQU1DLFdBQVdWLEtBQUtXLEtBQUwsRUFBakI7O0FBR0EsUUFBSUQsV0FBVyxHQUFmLEVBQW9CO0FBQ2hCWixVQUFFLE1BQUYsRUFBVWlDLFdBQVYsQ0FBc0IsV0FBdEI7QUFDQWpDLFVBQUUsb0JBQUYsRUFBd0JpQyxXQUF4QixDQUFvQyxRQUFwQztBQUNIOztBQUVELFFBQUcxQixZQUFZRSxhQUFhQyxvQkFBNUIsRUFBa0Q7QUFDOUMsWUFBR04sWUFBWUosRUFBRSxpQkFBRixFQUFxQndFLElBQXJCLENBQTBCLGNBQTFCLENBQWYsRUFBMEQ7QUFDdER4RSxjQUFFLGlCQUFGLEVBQXFCd0UsSUFBckIsQ0FBMEIsY0FBMUIsRUFBMENtRSxPQUExQztBQUNBakksbUNBQXVCLEtBQXZCO0FBQ0g7QUFDSjs7QUFFRCxRQUFHRixRQUFILEVBQWE7QUFDVCxZQUFHLENBQUNFLG9CQUFKLEVBQTBCO0FBQ3RCaUQ7QUFDSDtBQUNKO0FBQ0osQ0F2QkQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgJGRvYyA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkd2luID0gJCh3aW5kb3cpO1xyXG5jb25zdCBpc1NsaWRlciA9ICQoJyNzZXJ2aWNlc1NsaWRlcicpLmxlbmd0aDtcclxuY29uc3QgYnJpZWZGb3JtVXJsID0gJ2h0dHBzOi8vZG9jcy5nb29nbGUuY29tL2Zvcm1zL2QvZS8xRkFJcFFMU2RCcGJ3Nlk1QzVBNGtpWXBhR0pwMWNVSXhIQ1d6X2tHWEpOU3lHb014ckwwRzBpUS92aWV3Zm9ybSc7XHJcblxyXG5sZXQgaXNNb2JpbGUgPSBmYWxzZTtcclxubGV0IGlzVGFibGV0ID0gZmFsc2U7XHJcbmxldCBpc0Rlc2t0b3AgPSBmYWxzZVxyXG5sZXQgc2VydmljZXNTbGlkZXJJbml0ZWQgPSBmYWxzZTtcclxuXHJcbmNvbnN0IGNoZWNrVmlld3BvcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aW5XaWR0aCA9ICR3aW4ud2lkdGgoKTtcclxuXHJcbiAgICBpZih3aW5XaWR0aCA+IDk5MSkge1xyXG4gICAgICAgIGlzRGVza3RvcCA9IHRydWU7XHJcbiAgICAgICAgaXNUYWJsZXQgPSBmYWxzZTtcclxuICAgICAgICBpc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYod2luV2lkdGggPiA2NTAgJiYgd2luV2lkdGggPD0gOTkxKSB7XHJcbiAgICAgICAgaXNUYWJsZXQgPSB0cnVlO1xyXG4gICAgICAgIGlzRGVza3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIGlzTW9iaWxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZih3aW5XaWR0aCA8PSA2NTApIHtcclxuICAgICAgICBpc01vYmlsZSA9IHRydWU7XHJcbiAgICAgICAgaXNEZXNrdG9wID0gZmFsc2U7XHJcbiAgICAgICAgaXNUYWJsZXQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgc2V0QmdCeUltZyA9ICgpID0+IHtcclxuICAgICQoJy5wZW9wbGVfX2ltZy13cmFwJykuZWFjaCgoaSxlbCk9PntcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQoZWwpO1xyXG4gICAgICAgIGNvbnN0IHNyYyA9ICR0aGlzLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsYHVybChcIiR7c3JjfVwiKWApXHJcbiAgICB9KVxyXG59O1xyXG5cclxuY29uc3QgdG9nZ2xlTW9iaWxlTWVudSA9ICgpID0+IHtcclxuICAgICQoJyNidG5Nb2JpbGUnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbW9iaWxlLW9uJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIChlKT0+e1xyXG4gICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xyXG4gICAgICAgIGNvbnN0IG1lbnUgPSAkKCcuYnVyZGVyLCAjYnRuTW9iaWxlLCAuaGVhZGVyX19uYXYnKTtcclxuXHJcbiAgICAgICAgaWYgKCFtZW51LmlzKGUudGFyZ2V0KSAmJiBtZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdtb2JpbGUtb24nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGNoZWNrRW1wdHlGaWVsZHMgPSAoKSA9PiB7XHJcbiAgICAkKCcuY2hlY2tWYWx1ZScpLm9uKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmICgkZWwudmFsKCkpIHtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdub3RFbXB0eScpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdub3RFbXB0eScpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGNoZWNrVGV4dGFyZWFMZW5ndGggPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtYWluRm9ybVRleHRhcmVhID0gJCgnI3RleHRBcmVhJyk7XHJcblxyXG4gICAgJCgnLmNvdW50JykudGV4dChtYWluRm9ybVRleHRhcmVhLmF0dHIoJ21heGxlbmd0aCcpKVxyXG5cclxuICAgIG1haW5Gb3JtVGV4dGFyZWEub24oJ2NoYW5nZScsIChlKT0+e1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0ICR0ZXh0UGxhY2Vob2xkZXIgPSAkKCcudGV4dC1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgIGNvbnN0IHZhbCA9ICR0aGlzLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IHBhcnNlSW50KCR0aGlzLmF0dHIoJ21heGxlbmd0aCcpKTtcclxuICAgICAgICAvLyBjb25zdCBjaGFyc0NvdW50ID0gJHRoaXMudmFsKCkucmVwbGFjZSgvW1xcc3syLH1dKy9nLCAnJykubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGxlZnRDaGFycyA9IG1heExlbmd0aCAtICR0aGlzLnZhbCgpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgKHZhbCkgPyAkdGV4dFBsYWNlaG9sZGVyLmhpZGUoKSA6ICR0ZXh0UGxhY2Vob2xkZXIuc2hvdygpO1xyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgaW5pdENsaWVudHNDYXJvdXNlbCA9ICgpID0+IHtcclxuICAgICQoJyNjbGllbnRzU2xpZGVyJykuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgIG5hdlNwZWVkOiAyMDAwLFxyXG4gICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuICAgICAgICByZXNwb25zaXZlOntcclxuICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNDYwOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNjAwOntcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDEwMDA6e1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGluaXRTZXJ2aWNlc0Nhcm91c2VsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJyNzZXJ2aWNlc1NsaWRlcicpO1xyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxyXG5cclxuICAgIGlmKHdpbldpZHRoID4gNjUwICYmIHdpbldpZHRoIDwgOTkxICYmICFzZXJ2aWNlc1NsaWRlckluaXRlZCkge1xyXG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgLy8gbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBuYXZTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgZHJhZ0VuZFNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICAvLyBzdGFnZVBhZGRpbmc6IDI1MCxcclxuICAgICAgICAgICAgLy8gYXV0b1dpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOntcclxuICAgICAgICAgICAgICAgIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNjUwOntcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlcnZpY2VzU2xpZGVySW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2hlY2tTdWJNZW51cyA9ICgpID0+IHtcclxuICAgICQoJy5oZWFkZXJfX2xpc3Rfc3ViJykuZWFjaCgoaSxlbCk9PntcclxuICAgICAgICBjb25zdCAkcGFyZW50ID0gJChlbCkuY2xvc2VzdCgnbGknKVxyXG4gICAgICAgIGNvbnN0IG9wZW5TdWJNZW51ID0gJCgnPHNwYW4+PC9zcGFuPicpLmFkZENsYXNzKCdvcGVuU3ViTWVudSBoaWRkZW4teHMgaGlkZGVuLXNtJylcclxuICAgICAgICAkcGFyZW50LnByZXBlbmQob3BlblN1Yk1lbnUpLmFkZENsYXNzKCdoYXMtY2hpbGQnKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybUhhbmRsZXIoKSB7XHJcbiAgICB2YXIgJHN1Ym1pdEJ1dHRvbiA9ICQoJy5mb3JtU3VibWl0Jyk7XHJcblxyXG5cclxuICAgICRzdWJtaXRCdXR0b24uY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAgIHZhciAkZm9ybUlkID0gJGZvcm0uYXR0cignaWQnKTsgIC8qbWFpbkZvcm0gfHwgaW52b2tlRm9ybSovXHJcbiAgICAgICAgaWYgKCRmb3JtWzBdLmNoZWNrVmFsaWRpdHkoKSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICcuLi9oYW5kbGVyLnBocCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2luZG93LmdhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRmb3JtSWQgPT09ICdtYWluRm9ybScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhKCdzZW5kJywgJ2Zvcm1fc2VuZCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kJywgJ2Zvcm1fc2VuZCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJGZvcm1JZCA9PT0gJ2ludm9rZUZvcm0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdhdWRpdCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kJywgJ2F1ZGl0JywgJ0J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9pZGVudGl0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oYnJpZWZGb3JtVXJsLCBcIl9ibGFua1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZm9ybS5maW5kKCcuY29udGFjdF9fZm9ybS1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJGZvcm0uZmluZCgnLmNvbnRhY3RfX2Zvcm0tdGV4dGFyZWEnKS5sZW5ndGgpICRmb3JtLmZpbmQoJy5jb250YWN0X19mb3JtLXRleHRhcmVhJykudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGZvcm0uaGFzQ2xhc3MoJ2ludm9rZV9fZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfQl9Cw0L/RgNC+0YEg0L/RgNC40L3Rj9GCLCDRgdC/0LDRgdC40LHQviEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hZGRDbGFzcygnaXNTZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0ucmVtb3ZlQ2xhc3MoJ2lzU2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCwg0L/QvtC/0YDQvtCx0YPQudGC0LUg0L/QvtC20LDQu9GD0LnRgdGC0LAg0L/QvtC30LbQtSEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2Nyb2xsVG9BbmNob3IgPSAoYW5jaG9yKSA9PiB7XHJcbiAgICBjb25zdCAkZWwgPSAkKGFuY2hvcik7XHJcbiAgICBjb25zdCBpcyA9ICRlbC5sZW5ndGg7XHJcblxyXG4gICAgaWYoaXMpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGVsLm9mZnNldCgpLnRvcCAtIDI1XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FuY2hvcicsIGFuY2hvcilcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCBzbW9vdGhTY3JvbGxUb0FuY2hvciA9ICgpID0+IHtcclxuICAgICQoJ2FbaHJlZl49XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2Nyb2xsVG9BbmNob3IoaHJlZik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgY2hlY2tXaW5PZmZzZXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aW5PZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXRcclxuICAgIGNvbnN0ICRiYWNrVG9Ub3BCdXR0b24gPSAkKCcuYmFjay10b3AnKTtcclxuICAgICh3aW5PZmZzZXQgPiAxMDApID8gJGJhY2tUb1RvcEJ1dHRvbi5yZW1vdmVDbGFzcygnbm90LXZpc2libGUnKSA6ICRiYWNrVG9Ub3BCdXR0b24uYWRkQ2xhc3MoJ25vdC12aXNpYmxlJyk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBjaGVja0FuY2hvckZyb21TdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmFnZUFuY2hvciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbmNob3InKTtcclxuXHJcbiAgICBpZihzdG9yYWdlQW5jaG9yKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FuY2hvcicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgc2Nyb2xsVG9BbmNob3Ioc3RvcmFnZUFuY2hvcilcclxuICAgICAgICB9LDUwMClcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5jb25zdCBsb2FkWW91VHViZVZpZGVvID0gKCkgPT4ge1xyXG4gICAgLy8gTG9hZCB0aGUgSUZyYW1lIFBsYXllciBBUEkgY29kZSBhc3luY2hyb25vdXNseS5cclxuICAgIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL0FJemFTeUQxWkxWdjZuQWUzOUJYLXk0WE1JV0xrT3l5X0NzN1ZvSVwiO1xyXG4gICAgdmFyIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XHJcblxyXG4gICAgLy8gUmVwbGFjZSB0aGUgJ3l0cGxheWVyJyBlbGVtZW50IHdpdGggYW4gPGlmcmFtZT4gYW5kXHJcbiAgICAvLyBZb3VUdWJlIHBsYXllciBhZnRlciB0aGUgQVBJIGNvZGUgZG93bmxvYWRzLlxyXG4gICAgdmFyIHBsYXllcjtcclxuICAgIGZ1bmN0aW9uIG9uWW91VHViZVBsYXllckFQSVJlYWR5KCkge1xyXG4gICAgICAgIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoJ3l0cGxheWVyJywge1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICczNjAnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzY0MCcsXHJcbiAgICAgICAgICAgIHZpZGVvSWQ6ICdnc1Z0Ni1QZ2ROYydcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJlY2hlY2tJbnB1dHMgPSAoZSwgaXNTaW5nbGUpID0+IHtcclxuICAgIGNvbnN0ICRmb3JtID0gJCgnI21haW5Gb3JtJyk7XHJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9ICQoZS5kZWxlZ2F0ZVRhcmdldC5jb250cm9sKTtcclxuICAgIGNvbnN0IHJlY2hlY2sgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgncmVjaGVjaycpO1xyXG4gICAgY29uc3QgJGlucHV0cyA9ICRmb3JtLmZpbmQoJy5jb250YWN0X19mb3JtLXN3aXRjaGVyJyk7XHJcbiAgICBjb25zdCBjaGVja2VkTGVuZ3RoID0gJGZvcm0uZmluZCgnaW5wdXQ6Y2hlY2tib3g6Y2hlY2tlZCcpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmKGlzU2luZ2xlKSB7XHJcbiAgICAgICAgICAkaW5wdXRzLmVhY2goKGksZWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCAkZWwgPSAkKGVsKTtcclxuICAgICAgICAgICAgICAoJGVsLmF0dHIoJ25hbWUnKSAhPSByZWNoZWNrKSA/ICRlbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpIDogICRlbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYoIWlzU2luZ2xlICYmIGNoZWNrZWRMZW5ndGggIT0gMSAmJiBkZWxlZ2F0ZS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgZGVsZWdhdGUucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGVnYXRlLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgfVxyXG59O1xyXG5cclxuY29uc3QgY2hlY2tib3hDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gICAgJCgnLmNvbnRhY3RfX2Zvcm0tY2hlY2tib3gnKS5vbignY2xpY2snLCAoZSk9PntcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmVjaGVja0lucHV0cyhlKVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4kKCdbZGF0YS1yZWNoZWNrXScpLm9uKCdjbGljaycsKGUpPT57XHJcbiAgICByZWNoZWNrSW5wdXRzKGUsIHRydWUpXHJcbn0pO1xyXG5cclxuY29uc3QgY2hlY2tDdXJ2ZUFuaW1hdGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCAkc2VydmljZUJveCA9ICQoJy5zZXJ2aWNlc19fYm94Jyk7XHJcbiAgICBpZigkc2VydmljZUJveC5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCB3aW5PZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZU9mZnNldCA9ICRzZXJ2aWNlQm94Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlSGVpZ2h0ID0gJHNlcnZpY2VCb3guaGVpZ2h0KCk7XHJcbiAgICAgICAgY29uc3Qga29lZiA9IDEuNDtcclxuXHJcbiAgICAgICAgaWYod2luT2Zmc2V0ICoga29lZiA+IHNlcnZpY2VPZmZzZXQgJiYgd2luT2Zmc2V0ICoga29lZiA8IHNlcnZpY2VPZmZzZXQgKyBzZXJ2aWNlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICQoJy5zZXJ2aWNlc19fY3VydmUnKS5yZW1vdmVDbGFzcygnY3VydmUtYW5pbWF0ZScpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBjb25zdCBpbml0TGlua3NDYXJvdXNlbCA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGNvbnN0ICRib3hMaW5rcyA9ICQoJy5ncmV5X19ib3gtbGlua3MnKTtcclxuLy9cclxuLy8gICAgIGlmKCRib3hMaW5rcy5jaGlsZHJlbigpLmxlbmd0aCA+IDIpIHtcclxuLy8gICAgICAgICAkKCcuZ3JleV9fYm94LWxpbmtzJykuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuLy8gICAgICAgICAgICAgLy8gbmF2OiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAvLyBhdXRvcGxheTogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIC8vIGxvb3A6IHRydWUsXHJcbi8vICAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbi8vICAgICAgICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuLy8gICAgICAgICAgICAgbmF2U3BlZWQ6IDIwMDAsXHJcbi8vICAgICAgICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuLy8gICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XHJcbi8vICAgICAgICAgICAgICAgICAwOntcclxuLy8gICAgICAgICAgICAgICAgICAgICBpdGVtczogMVxyXG4vLyAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIDQ4MDp7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDJcclxuLy8gICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkYm94TGlua3MuYWRkQ2xhc3MoJ25vU2xpZGVyJyk7XHJcbi8vICAgICB9XHJcbi8vIH07XHJcblxyXG5jb25zdCByZWdpc3RlclBvdXBDbG9zZSA9ICgpID0+IHtcclxuICAgICRkb2Mub24oJ2NsaWNrJywgJy5wb3B1cF9fY2xvc2UsIC5wb3B1cF9fYmFja2Ryb3AnLCAoKT0+e1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncG9wdXAtc2hvdycpXHJcbiAgICAgICAgJCgnLnBvcHVwX19ib3gtLXNob3cnKS5yZW1vdmVDbGFzcygncG9wdXBfX2JveC0tc2hvdycpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAkKCcucG9wdXAtYmxvY2snKS5yZW1vdmVDbGFzcygncG9wdXAtYmxvY2snKTtcclxuICAgICAgICB9LDUwMClcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNob3dQb3B1cCA9IChzZWxlY3RvcikgPT4ge1xyXG4gICAgY29uc3QgJGVsID0gJChzZWxlY3Rvcik7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3BvcHVwLXNob3cnKVxyXG4gICAgJGVsLmFkZENsYXNzKCdwb3B1cC1ibG9jaycpXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKCdwb3B1cF9fYm94LS1zaG93JylcclxuICAgIH0sMTAwKVxyXG59XHJcblxyXG5cclxuJGRvYy5vbigncmVhZHknLCAoKSA9PiB7XHJcbiAgICBjaGVja1ZpZXdwb3J0KCk7XHJcbiAgICBjaGVja0VtcHR5RmllbGRzKCk7XHJcbiAgICB0b2dnbGVNb2JpbGVNZW51KCk7XHJcbiAgICBzZXRCZ0J5SW1nKCk7XHJcbiAgICBpbml0Q2xpZW50c0Nhcm91c2VsKCk7XHJcbiAgICBpbml0U2VydmljZXNDYXJvdXNlbCgpO1xyXG4gICAgLy8gaW5pdExpbmtzQ2Fyb3VzZWwoKTtcclxuICAgIGNoZWNrVGV4dGFyZWFMZW5ndGgoKTtcclxuICAgIGNoZWNrU3ViTWVudXMoKTtcclxuICAgIGZvcm1IYW5kbGVyKCk7XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcigpO1xyXG4gICAgY2hlY2tXaW5PZmZzZXQoKTtcclxuICAgIGNoZWNrQW5jaG9yRnJvbVN0b3JhZ2UoKTtcclxuICAgIGNoZWNrYm94Q29udHJvbGxlcigpO1xyXG4gICAgY2hlY2tDdXJ2ZUFuaW1hdGUoKTtcclxuICAgIHJlZ2lzdGVyUG91cENsb3NlKCk7XHJcblxyXG4gICAgJCgnLnZpZGVvX19idXR0b24tcGxheScpLm9uKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgc2hvd1BvcHVwKCcjcG9wdXAtdmlkZW8nKTtcclxuICAgIH0pXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiR3aW4ub24oJ3Njcm9sbCcsICgpPT57XHJcbiAgICBjaGVja1dpbk9mZnNldCgpO1xyXG4gICAgY2hlY2tDdXJ2ZUFuaW1hdGUoKTtcclxufSk7XHJcblxyXG4kd2luLm9uKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICBjaGVja1ZpZXdwb3J0KCk7XHJcblxyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkd2luLndpZHRoKCk7XHJcblxyXG5cclxuICAgIGlmICh3aW5XaWR0aCA+IDk5MSkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9iaWxlLW9uJyk7XHJcbiAgICAgICAgJCgnI2J0bk1vYmlsZSAuYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzTW9iaWxlIHx8IGlzRGVza3RvcCAmJiBzZXJ2aWNlc1NsaWRlckluaXRlZCkge1xyXG4gICAgICAgIGlmKGlzU2xpZGVyICYmICQoJyNzZXJ2aWNlc1NsaWRlcicpLmRhdGEoJ293bC5jYXJvdXNlbCcpKSB7XHJcbiAgICAgICAgICAgICQoJyNzZXJ2aWNlc1NsaWRlcicpLmRhdGEoJ293bC5jYXJvdXNlbCcpLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgc2VydmljZXNTbGlkZXJJbml0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzVGFibGV0KSB7XHJcbiAgICAgICAgaWYoIXNlcnZpY2VzU2xpZGVySW5pdGVkKSB7XHJcbiAgICAgICAgICAgIGluaXRTZXJ2aWNlc0Nhcm91c2VsKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSk7Il19
