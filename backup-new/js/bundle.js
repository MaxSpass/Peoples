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

window.switchViewportVars = switchViewportVars;

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

var initPeoplesCarousel = function initPeoplesCarousel() {
    return false;
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
            // mouseDrag: false,
            responsive: {
                1000: {
                    items: 3
                }
            },
            onTranslated: changeSliderOffsets,
            onDragged: changeSliderOffsets,
            onInitialized: changeSliderOffsets
        });
    }
};

var changeSliderOffsets = function changeSliderOffsets(e) {
    console.log('changeSliderOffsets ONCE');
    var element = e.target;
    var $slider = $(element);
    setTimeout(function () {
        var $active = $slider.find('.owl-item.active');
        $slider.find('.owl-item').each(function (i, el) {
            var $el = $(el);
            var index = $active.index($el);
            var inFocusIndex = 'focus-' + index;

            if ($el.hasClass('active')) {
                $el.addClass('focus');
                $el.addClass(inFocusIndex);
                $el.data('index', index);
                $el.removeClass('focus-' + $el.data('index'));
            } else {
                $el.removeClass('focus');
            }
        });
    }, 0);
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
    $('.removed').remove();

    switchViewportVars();
    checkEmptyFields();
    toggleMobileMenu();
    setBgByImg();
    initPeoplesCarousel();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkZG9jIiwiJCIsImRvY3VtZW50IiwiJHdpbiIsIndpbmRvdyIsImlzU2xpZGVyIiwibGVuZ3RoIiwiYnJpZWZGb3JtVXJsIiwiaXNNb2JpbGUiLCJpc1RhYmxldCIsImlzRGVza3RvcCIsInNlcnZpY2VzU2xpZGVySW5pdGVkIiwicGVvcGxlc1NsaWRlckluaXRlZCIsInN3aXRjaFZpZXdwb3J0VmFycyIsIndpbldpZHRoIiwid2lkdGgiLCJzZXRCZ0J5SW1nIiwiZWFjaCIsImkiLCJlbCIsIiR0aGlzIiwic3JjIiwiZmluZCIsImF0dHIiLCJjc3MiLCJ0b2dnbGVNb2JpbGVNZW51Iiwib24iLCJlIiwiY3VycmVudFRhcmdldCIsInRvZ2dsZUNsYXNzIiwiJGJvZHkiLCJtZW51IiwiaXMiLCJ0YXJnZXQiLCJoYXMiLCJyZW1vdmVDbGFzcyIsImNoZWNrRW1wdHlGaWVsZHMiLCIkZWwiLCJ2YWwiLCJhZGRDbGFzcyIsImNoZWNrVGV4dGFyZWFMZW5ndGgiLCJtYWluRm9ybVRleHRhcmVhIiwidGV4dCIsIiR0ZXh0UGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJwYXJzZUludCIsImxlZnRDaGFycyIsImhpZGUiLCJzaG93IiwiaW5pdFBlb3BsZXNDYXJvdXNlbCIsIm93bENhcm91c2VsIiwibG9vcCIsIm1hcmdpbiIsIm5hdiIsImF1dG9wbGF5IiwiYXV0b3BsYXlIb3ZlclBhdXNlIiwiYXV0b3BsYXlTcGVlZCIsIm5hdlNwZWVkIiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwib25UcmFuc2xhdGVkIiwiY2hhbmdlU2xpZGVyT2Zmc2V0cyIsIm9uRHJhZ2dlZCIsIm9uSW5pdGlhbGl6ZWQiLCJjb25zb2xlIiwibG9nIiwiZWxlbWVudCIsIiRzbGlkZXIiLCJzZXRUaW1lb3V0IiwiJGFjdGl2ZSIsImluZGV4IiwiaW5Gb2N1c0luZGV4IiwiaGFzQ2xhc3MiLCJkYXRhIiwiaW5pdENsaWVudHNDYXJvdXNlbCIsImRyYWdFbmRTcGVlZCIsImluaXRTZXJ2aWNlc0Nhcm91c2VsIiwiJGNvbnRhaW5lciIsImNoZWNrU3ViTWVudXMiLCIkcGFyZW50IiwiY2xvc2VzdCIsIm9wZW5TdWJNZW51IiwicHJlcGVuZCIsImZvcm1IYW5kbGVyIiwiJHN1Ym1pdEJ1dHRvbiIsImNsaWNrIiwiJGZvcm0iLCIkZm9ybUlkIiwiY2hlY2tWYWxpZGl0eSIsInNlcmlhbGl6ZUFycmF5IiwiYWpheCIsInR5cGUiLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwiZ2EiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwib3BlbiIsImFsZXJ0IiwiZXJyb3IiLCJzY3JvbGxUb0FuY2hvciIsImFuY2hvciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic21vb3RoU2Nyb2xsVG9BbmNob3IiLCJocmVmIiwicHJldmVudERlZmF1bHQiLCJjaGVja1dpbk9mZnNldCIsIndpbk9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiJGJhY2tUb1RvcEJ1dHRvbiIsImNoZWNrQW5jaG9yRnJvbVN0b3JhZ2UiLCJzdG9yYWdlQW5jaG9yIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJsb2FkWW91VHViZVZpZGVvIiwidGFnIiwiY3JlYXRlRWxlbWVudCIsImZpcnN0U2NyaXB0VGFnIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwicGxheWVyIiwib25Zb3VUdWJlUGxheWVyQVBJUmVhZHkiLCJZVCIsIlBsYXllciIsImhlaWdodCIsInZpZGVvSWQiLCJyZWNoZWNrSW5wdXRzIiwiaXNTaW5nbGUiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlVGFyZ2V0IiwiY29udHJvbCIsInJlY2hlY2siLCIkaW5wdXRzIiwiY2hlY2tlZExlbmd0aCIsInByb3AiLCJjaGVja2JveENvbnRyb2xsZXIiLCJjaGVja0N1cnZlQW5pbWF0ZSIsIiRzZXJ2aWNlQm94Iiwic2VydmljZU9mZnNldCIsInNlcnZpY2VIZWlnaHQiLCJrb2VmIiwicmVnaXN0ZXJQb3VwQ2xvc2UiLCJzaG93UG9wdXAiLCJzZWxlY3RvciIsInJlbW92ZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsT0FBT0MsRUFBRUMsUUFBRixDQUFiO0FBQ0EsSUFBTUMsT0FBT0YsRUFBRUcsTUFBRixDQUFiO0FBQ0EsSUFBTUMsV0FBV0osRUFBRSxpQkFBRixFQUFxQkssTUFBdEM7QUFDQSxJQUFNQyxlQUFlLHFHQUFyQjs7QUFFQSxJQUFJQyxXQUFXLEtBQWY7QUFDQSxJQUFJQyxXQUFXLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEtBQWhCO0FBQ0EsSUFBSUMsdUJBQXVCLEtBQTNCO0FBQ0EsSUFBSUMsc0JBQXNCLEtBQTFCOztBQUVBLElBQU1DLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQU07QUFDN0IsUUFBTUMsV0FBV1gsS0FBS1ksS0FBTCxFQUFqQjs7QUFFQSxRQUFHRCxXQUFXLEdBQWQsRUFBbUI7QUFDZkosb0JBQVksSUFBWjtBQUNBRCxtQkFBVyxLQUFYO0FBQ0FELG1CQUFXLEtBQVg7QUFDSDtBQUNELFFBQUdNLFdBQVcsR0FBWCxJQUFrQkEsWUFBWSxHQUFqQyxFQUFzQztBQUNsQ0wsbUJBQVcsSUFBWDtBQUNBQyxvQkFBWSxLQUFaO0FBQ0FGLG1CQUFXLEtBQVg7QUFDSDtBQUNELFFBQUdNLFlBQVksR0FBZixFQUFvQjtBQUNoQk4sbUJBQVcsSUFBWDtBQUNBRSxvQkFBWSxLQUFaO0FBQ0FELG1CQUFXLEtBQVg7QUFDSDtBQUNKLENBbEJEOztBQW9CQUwsT0FBT1Msa0JBQVAsR0FBNEJBLGtCQUE1Qjs7QUFFQSxJQUFNRyxhQUFhLFNBQWJBLFVBQWEsR0FBTTtBQUNyQmYsTUFBRSxtQkFBRixFQUF1QmdCLElBQXZCLENBQTRCLFVBQUNDLENBQUQsRUFBR0MsRUFBSCxFQUFRO0FBQ2hDLFlBQU1DLFFBQVFuQixFQUFFa0IsRUFBRixDQUFkO0FBQ0EsWUFBTUUsTUFBTUQsTUFBTUUsSUFBTixDQUFXLEtBQVgsRUFB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QUhEOztBQUtBNUksS0FBS3VCLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLFlBQU07QUFDcEJiOztBQUVBLFFBQU1DLFdBQVdYLEtBQUtZLEtBQUwsRUFBakI7O0FBR0EsUUFBSUQsV0FBVyxHQUFmLEVBQW9CO0FBQ2hCYixVQUFFLE1BQUYsRUFBVWtDLFdBQVYsQ0FBc0IsV0FBdEI7QUFDQWxDLFVBQUUsb0JBQUYsRUFBd0JrQyxXQUF4QixDQUFvQyxRQUFwQztBQUNIOztBQUVELFFBQUczQixZQUFZRSxhQUFhQyxvQkFBNUIsRUFBa0Q7QUFDOUMsWUFBR04sWUFBWUosRUFBRSxpQkFBRixFQUFxQndFLElBQXJCLENBQTBCLGNBQTFCLENBQWYsRUFBMEQ7QUFDdEQ5RCxtQ0FBdUIsS0FBdkI7QUFDQVYsY0FBRSxpQkFBRixFQUFxQndFLElBQXJCLENBQTBCLGNBQTFCLEVBQTBDK0UsT0FBMUM7QUFDSDtBQUNKOztBQUVELFFBQUcsQ0FBQzlJLFNBQUQsSUFBY0UsbUJBQWpCLEVBQXNDO0FBQ2xDLFlBQUdYLEVBQUUscUJBQUYsRUFBeUJ3RSxJQUF6QixDQUE4QixjQUE5QixDQUFILEVBQWtEO0FBQzlDN0Qsa0NBQXNCLEtBQXRCO0FBQ0FYLGNBQUUscUJBQUYsRUFBeUJ3RSxJQUF6QixDQUE4QixjQUE5QixFQUE4QytFLE9BQTlDO0FBQ0g7QUFDSixLQUxELE1BS087QUFDSHZHO0FBQ0g7O0FBRUQsUUFBR3hDLFFBQUgsRUFBYTtBQUNULFlBQUcsQ0FBQ0Usb0JBQUosRUFBMEI7QUFDdEJpRTtBQUNIO0FBQ0o7QUFDSixDQWhDRCIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkZG9jID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICR3aW4gPSAkKHdpbmRvdyk7XHJcbmNvbnN0IGlzU2xpZGVyID0gJCgnI3NlcnZpY2VzU2xpZGVyJykubGVuZ3RoO1xyXG5jb25zdCBicmllZkZvcm1VcmwgPSAnaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQUlwUUxTZEJwYnc2WTVDNUE0a2lZcGFHSnAxY1VJeEhDV3pfa0dYSk5TeUdvTXhyTDBHMGlRL3ZpZXdmb3JtJztcclxuXHJcbmxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5sZXQgaXNUYWJsZXQgPSBmYWxzZTtcclxubGV0IGlzRGVza3RvcCA9IGZhbHNlXHJcbmxldCBzZXJ2aWNlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG5sZXQgcGVvcGxlc1NsaWRlckluaXRlZCA9IGZhbHNlO1xyXG5cclxuY29uc3Qgc3dpdGNoVmlld3BvcnRWYXJzID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkd2luLndpZHRoKCk7XHJcblxyXG4gICAgaWYod2luV2lkdGggPiA5OTEpIHtcclxuICAgICAgICBpc0Rlc2t0b3AgPSB0cnVlO1xyXG4gICAgICAgIGlzVGFibGV0ID0gZmFsc2U7XHJcbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKHdpbldpZHRoID4gNjUwICYmIHdpbldpZHRoIDw9IDk5MSkge1xyXG4gICAgICAgIGlzVGFibGV0ID0gdHJ1ZTtcclxuICAgICAgICBpc0Rlc2t0b3AgPSBmYWxzZTtcclxuICAgICAgICBpc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYod2luV2lkdGggPD0gNjUwKSB7XHJcbiAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xyXG4gICAgICAgIGlzRGVza3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIGlzVGFibGV0ID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG53aW5kb3cuc3dpdGNoVmlld3BvcnRWYXJzID0gc3dpdGNoVmlld3BvcnRWYXJzO1xyXG5cclxuY29uc3Qgc2V0QmdCeUltZyA9ICgpID0+IHtcclxuICAgICQoJy5wZW9wbGVfX2ltZy13cmFwJykuZWFjaCgoaSxlbCk9PntcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQoZWwpO1xyXG4gICAgICAgIGNvbnN0IHNyYyA9ICR0aGlzLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsYHVybChcIiR7c3JjfVwiKWApXHJcbiAgICB9KVxyXG59O1xyXG5cclxuY29uc3QgdG9nZ2xlTW9iaWxlTWVudSA9ICgpID0+IHtcclxuICAgICQoJyNidG5Nb2JpbGUnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbW9iaWxlLW9uJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIChlKT0+e1xyXG4gICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xyXG4gICAgICAgIGNvbnN0IG1lbnUgPSAkKCcuYnVyZGVyLCAjYnRuTW9iaWxlLCAuaGVhZGVyX19uYXYnKTtcclxuXHJcbiAgICAgICAgaWYgKCFtZW51LmlzKGUudGFyZ2V0KSAmJiBtZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdtb2JpbGUtb24nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGNoZWNrRW1wdHlGaWVsZHMgPSAoKSA9PiB7XHJcbiAgICAkKCcuY2hlY2tWYWx1ZScpLm9uKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmICgkZWwudmFsKCkpIHtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdub3RFbXB0eScpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdub3RFbXB0eScpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGNoZWNrVGV4dGFyZWFMZW5ndGggPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtYWluRm9ybVRleHRhcmVhID0gJCgnI3RleHRBcmVhJyk7XHJcblxyXG4gICAgJCgnLmNvdW50JykudGV4dChtYWluRm9ybVRleHRhcmVhLmF0dHIoJ21heGxlbmd0aCcpKTtcclxuXHJcbiAgICBtYWluRm9ybVRleHRhcmVhLm9uKCdjaGFuZ2UnLCAoZSk9PntcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCAkdGV4dFBsYWNlaG9sZGVyID0gJCgnLnRleHQtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICBjb25zdCB2YWwgPSAkdGhpcy52YWwoKTtcclxuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBwYXJzZUludCgkdGhpcy5hdHRyKCdtYXhsZW5ndGgnKSk7XHJcbiAgICAgICAgLy8gY29uc3QgY2hhcnNDb3VudCA9ICR0aGlzLnZhbCgpLnJlcGxhY2UoL1tcXHN7Mix9XSsvZywgJycpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBsZWZ0Q2hhcnMgPSBtYXhMZW5ndGggLSAkdGhpcy52YWwoKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICh2YWwpID8gJHRleHRQbGFjZWhvbGRlci5oaWRlKCkgOiAkdGV4dFBsYWNlaG9sZGVyLnNob3coKTtcclxuICAgIH0pXHJcbn07XHJcblxyXG5jb25zdCBpbml0UGVvcGxlc0Nhcm91c2VsID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYoaXNEZXNrdG9wICYmICFwZW9wbGVzU2xpZGVySW5pdGVkKSB7XHJcbiAgICAgICAgcGVvcGxlc1NsaWRlckluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgJCgnI3Blb3BsZUxpc3RDYXJvdXNlbCcpLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxyXG4gICAgICAgICAgICBuYXZTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgLy8gbW91c2VEcmFnOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XHJcbiAgICAgICAgICAgICAgICAxMDAwOntcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogM1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zbGF0ZWQ6IGNoYW5nZVNsaWRlck9mZnNldHMsXHJcbiAgICAgICAgICAgIG9uRHJhZ2dlZDogY2hhbmdlU2xpZGVyT2Zmc2V0cyxcclxuICAgICAgICAgICAgb25Jbml0aWFsaXplZCA6IGNoYW5nZVNsaWRlck9mZnNldHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjaGFuZ2VTbGlkZXJPZmZzZXRzID0gKGUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VTbGlkZXJPZmZzZXRzIE9OQ0UnKTtcclxuICAgIGNvbnN0IGVsZW1lbnQgICA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgJHNsaWRlciA9ICQoZWxlbWVudCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgY29uc3QgJGFjdGl2ZSA9ICRzbGlkZXIuZmluZCgnLm93bC1pdGVtLmFjdGl2ZScpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykuZWFjaCgoaSxlbCk9PntcclxuICAgICAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJGFjdGl2ZS5pbmRleCgkZWwpO1xyXG4gICAgICAgICAgICBjb25zdCBpbkZvY3VzSW5kZXggPSBgZm9jdXMtJHtpbmRleH1gO1xyXG5cclxuICAgICAgICAgICAgaWYoJGVsLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKGluRm9jdXNJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAkZWwuZGF0YSgnaW5kZXgnLGluZGV4KTtcclxuICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnZm9jdXMtJyskZWwuZGF0YSgnaW5kZXgnKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LDApXHJcbn07XHJcblxyXG5jb25zdCBpbml0Q2xpZW50c0Nhcm91c2VsID0gKCkgPT4ge1xyXG4gICAgJCgnI2NsaWVudHNTbGlkZXInKS5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgbmF2U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgZHJhZ0VuZFNwZWVkOiAyMDAwLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6e1xyXG4gICAgICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICA0NjA6IHtcclxuICAgICAgICAgICAgICBpdGVtczogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICA2MDA6e1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTAwMDp7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogN1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbmNvbnN0IGluaXRTZXJ2aWNlc0Nhcm91c2VsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJyNzZXJ2aWNlc1NsaWRlcicpO1xyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxyXG5cclxuICAgIGlmKHdpbldpZHRoID4gNjUwICYmIHdpbldpZHRoIDwgOTkxICYmICFzZXJ2aWNlc1NsaWRlckluaXRlZCkge1xyXG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgLy8gbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBuYXZTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgZHJhZ0VuZFNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICAvLyBzdGFnZVBhZGRpbmc6IDI1MCxcclxuICAgICAgICAgICAgLy8gYXV0b1dpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOntcclxuICAgICAgICAgICAgICAgIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNjUwOntcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlcnZpY2VzU2xpZGVySW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2hlY2tTdWJNZW51cyA9ICgpID0+IHtcclxuICAgICQoJy5oZWFkZXJfX2xpc3Rfc3ViJykuZWFjaCgoaSxlbCk9PntcclxuICAgICAgICBjb25zdCAkcGFyZW50ID0gJChlbCkuY2xvc2VzdCgnbGknKVxyXG4gICAgICAgIGNvbnN0IG9wZW5TdWJNZW51ID0gJCgnPHNwYW4+PC9zcGFuPicpLmFkZENsYXNzKCdvcGVuU3ViTWVudSBoaWRkZW4teHMgaGlkZGVuLXNtJylcclxuICAgICAgICAkcGFyZW50LnByZXBlbmQob3BlblN1Yk1lbnUpLmFkZENsYXNzKCdoYXMtY2hpbGQnKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybUhhbmRsZXIoKSB7XHJcbiAgICB2YXIgJHN1Ym1pdEJ1dHRvbiA9ICQoJy5mb3JtU3VibWl0Jyk7XHJcblxyXG5cclxuICAgICRzdWJtaXRCdXR0b24uY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAgIHZhciAkZm9ybUlkID0gJGZvcm0uYXR0cignaWQnKTsgIC8qbWFpbkZvcm0gfHwgaW52b2tlRm9ybSovXHJcbiAgICAgICAgaWYgKCRmb3JtWzBdLmNoZWNrVmFsaWRpdHkoKSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICcuLi9oYW5kbGVyLnBocCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2luZG93LmdhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRmb3JtSWQgPT09ICdtYWluRm9ybScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhKCdzZW5kJywgJ2Zvcm1fc2VuZCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kJywgJ2Zvcm1fc2VuZCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJGZvcm1JZCA9PT0gJ2ludm9rZUZvcm0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdhdWRpdCcsICdCdXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kJywgJ2F1ZGl0JywgJ0J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9pZGVudGl0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oYnJpZWZGb3JtVXJsLCBcIl9ibGFua1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZm9ybS5maW5kKCcuY29udGFjdF9fZm9ybS1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJGZvcm0uZmluZCgnLmNvbnRhY3RfX2Zvcm0tdGV4dGFyZWEnKS5sZW5ndGgpICRmb3JtLmZpbmQoJy5jb250YWN0X19mb3JtLXRleHRhcmVhJykudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGZvcm0uaGFzQ2xhc3MoJ2ludm9rZV9fZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfQl9Cw0L/RgNC+0YEg0L/RgNC40L3Rj9GCLCDRgdC/0LDRgdC40LHQviEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hZGRDbGFzcygnaXNTZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0ucmVtb3ZlQ2xhc3MoJ2lzU2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCwg0L/QvtC/0YDQvtCx0YPQudGC0LUg0L/QvtC20LDQu9GD0LnRgdGC0LAg0L/QvtC30LbQtSEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2Nyb2xsVG9BbmNob3IgPSAoYW5jaG9yKSA9PiB7XHJcbiAgICBjb25zdCAkZWwgPSAkKGFuY2hvcik7XHJcbiAgICBjb25zdCBpcyA9ICRlbC5sZW5ndGg7XHJcblxyXG4gICAgaWYoaXMpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGVsLm9mZnNldCgpLnRvcCAtIDI1XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FuY2hvcicsIGFuY2hvcilcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCBzbW9vdGhTY3JvbGxUb0FuY2hvciA9ICgpID0+IHtcclxuICAgICQoJ2FbaHJlZl49XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2Nyb2xsVG9BbmNob3IoaHJlZik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgY2hlY2tXaW5PZmZzZXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aW5PZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXRcclxuICAgIGNvbnN0ICRiYWNrVG9Ub3BCdXR0b24gPSAkKCcuYmFjay10b3AnKTtcclxuICAgICh3aW5PZmZzZXQgPiAxMDApID8gJGJhY2tUb1RvcEJ1dHRvbi5yZW1vdmVDbGFzcygnbm90LXZpc2libGUnKSA6ICRiYWNrVG9Ub3BCdXR0b24uYWRkQ2xhc3MoJ25vdC12aXNpYmxlJyk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBjaGVja0FuY2hvckZyb21TdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmFnZUFuY2hvciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbmNob3InKTtcclxuXHJcbiAgICBpZihzdG9yYWdlQW5jaG9yKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FuY2hvcicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgc2Nyb2xsVG9BbmNob3Ioc3RvcmFnZUFuY2hvcilcclxuICAgICAgICB9LDUwMClcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5jb25zdCBsb2FkWW91VHViZVZpZGVvID0gKCkgPT4ge1xyXG4gICAgLy8gTG9hZCB0aGUgSUZyYW1lIFBsYXllciBBUEkgY29kZSBhc3luY2hyb25vdXNseS5cclxuICAgIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL0FJemFTeUQxWkxWdjZuQWUzOUJYLXk0WE1JV0xrT3l5X0NzN1ZvSVwiO1xyXG4gICAgdmFyIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XHJcblxyXG4gICAgLy8gUmVwbGFjZSB0aGUgJ3l0cGxheWVyJyBlbGVtZW50IHdpdGggYW4gPGlmcmFtZT4gYW5kXHJcbiAgICAvLyBZb3VUdWJlIHBsYXllciBhZnRlciB0aGUgQVBJIGNvZGUgZG93bmxvYWRzLlxyXG4gICAgdmFyIHBsYXllcjtcclxuICAgIGZ1bmN0aW9uIG9uWW91VHViZVBsYXllckFQSVJlYWR5KCkge1xyXG4gICAgICAgIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoJ3l0cGxheWVyJywge1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICczNjAnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzY0MCcsXHJcbiAgICAgICAgICAgIHZpZGVvSWQ6ICdnc1Z0Ni1QZ2ROYydcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJlY2hlY2tJbnB1dHMgPSAoZSwgaXNTaW5nbGUpID0+IHtcclxuICAgIGNvbnN0ICRmb3JtID0gJCgnI21haW5Gb3JtJyk7XHJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9ICQoZS5kZWxlZ2F0ZVRhcmdldC5jb250cm9sKTtcclxuICAgIGNvbnN0IHJlY2hlY2sgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgncmVjaGVjaycpO1xyXG4gICAgY29uc3QgJGlucHV0cyA9ICRmb3JtLmZpbmQoJy5jb250YWN0X19mb3JtLXN3aXRjaGVyJyk7XHJcbiAgICBjb25zdCBjaGVja2VkTGVuZ3RoID0gJGZvcm0uZmluZCgnaW5wdXQ6Y2hlY2tib3g6Y2hlY2tlZCcpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmKGlzU2luZ2xlKSB7XHJcbiAgICAgICAgICAkaW5wdXRzLmVhY2goKGksZWwpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCAkZWwgPSAkKGVsKTtcclxuICAgICAgICAgICAgICAoJGVsLmF0dHIoJ25hbWUnKSAhPSByZWNoZWNrKSA/ICRlbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpIDogICRlbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYoIWlzU2luZ2xlICYmIGNoZWNrZWRMZW5ndGggIT0gMSAmJiBkZWxlZ2F0ZS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgZGVsZWdhdGUucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGVnYXRlLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgfVxyXG59O1xyXG5cclxuY29uc3QgY2hlY2tib3hDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gICAgJCgnLmNvbnRhY3RfX2Zvcm0tY2hlY2tib3gnKS5vbignY2xpY2snLCAoZSk9PntcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmVjaGVja0lucHV0cyhlKVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4kKCdbZGF0YS1yZWNoZWNrXScpLm9uKCdjbGljaycsKGUpPT57XHJcbiAgICByZWNoZWNrSW5wdXRzKGUsIHRydWUpXHJcbn0pO1xyXG5cclxuY29uc3QgY2hlY2tDdXJ2ZUFuaW1hdGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCAkc2VydmljZUJveCA9ICQoJy5zZXJ2aWNlc19fYm94Jyk7XHJcbiAgICBpZigkc2VydmljZUJveC5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCB3aW5PZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZU9mZnNldCA9ICRzZXJ2aWNlQm94Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlSGVpZ2h0ID0gJHNlcnZpY2VCb3guaGVpZ2h0KCk7XHJcbiAgICAgICAgY29uc3Qga29lZiA9IDEuNDtcclxuXHJcbiAgICAgICAgaWYod2luT2Zmc2V0ICoga29lZiA+IHNlcnZpY2VPZmZzZXQgJiYgd2luT2Zmc2V0ICoga29lZiA8IHNlcnZpY2VPZmZzZXQgKyBzZXJ2aWNlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICQoJy5zZXJ2aWNlc19fY3VydmUnKS5yZW1vdmVDbGFzcygnY3VydmUtYW5pbWF0ZScpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBjb25zdCBpbml0TGlua3NDYXJvdXNlbCA9ICgpID0+IHtcclxuLy9cclxuLy8gICAgIGNvbnN0ICRib3hMaW5rcyA9ICQoJy5ncmV5X19ib3gtbGlua3MnKTtcclxuLy9cclxuLy8gICAgIGlmKCRib3hMaW5rcy5jaGlsZHJlbigpLmxlbmd0aCA+IDIpIHtcclxuLy8gICAgICAgICAkKCcuZ3JleV9fYm94LWxpbmtzJykuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcclxuLy8gICAgICAgICAgICAgLy8gbmF2OiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAvLyBhdXRvcGxheTogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIC8vIGxvb3A6IHRydWUsXHJcbi8vICAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbi8vICAgICAgICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuLy8gICAgICAgICAgICAgbmF2U3BlZWQ6IDIwMDAsXHJcbi8vICAgICAgICAgICAgIGRyYWdFbmRTcGVlZDogMjAwMCxcclxuLy8gICAgICAgICAgICAgcmVzcG9uc2l2ZTp7XHJcbi8vICAgICAgICAgICAgICAgICAwOntcclxuLy8gICAgICAgICAgICAgICAgICAgICBpdGVtczogMVxyXG4vLyAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIDQ4MDp7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDJcclxuLy8gICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkYm94TGlua3MuYWRkQ2xhc3MoJ25vU2xpZGVyJyk7XHJcbi8vICAgICB9XHJcbi8vIH07XHJcblxyXG5jb25zdCByZWdpc3RlclBvdXBDbG9zZSA9ICgpID0+IHtcclxuICAgICRkb2Mub24oJ2NsaWNrJywgJy5wb3B1cF9fY2xvc2UsIC5wb3B1cF9fYmFja2Ryb3AnLCAoKT0+e1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncG9wdXAtc2hvdycpXHJcbiAgICAgICAgJCgnLnBvcHVwX19ib3gtLXNob3cnKS5yZW1vdmVDbGFzcygncG9wdXBfX2JveC0tc2hvdycpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAkKCcucG9wdXAtYmxvY2snKS5yZW1vdmVDbGFzcygncG9wdXAtYmxvY2snKTtcclxuICAgICAgICB9LDUwMClcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNob3dQb3B1cCA9IChzZWxlY3RvcikgPT4ge1xyXG4gICAgY29uc3QgJGVsID0gJChzZWxlY3Rvcik7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3BvcHVwLXNob3cnKVxyXG4gICAgJGVsLmFkZENsYXNzKCdwb3B1cC1ibG9jaycpXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKCdwb3B1cF9fYm94LS1zaG93JylcclxuICAgIH0sMTAwKVxyXG59XHJcblxyXG5cclxuJGRvYy5vbigncmVhZHknLCAoKSA9PiB7XHJcbiAgICAkKCcucmVtb3ZlZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIHN3aXRjaFZpZXdwb3J0VmFycygpO1xyXG4gICAgY2hlY2tFbXB0eUZpZWxkcygpO1xyXG4gICAgdG9nZ2xlTW9iaWxlTWVudSgpO1xyXG4gICAgc2V0QmdCeUltZygpO1xyXG4gICAgaW5pdFBlb3BsZXNDYXJvdXNlbCgpO1xyXG4gICAgaW5pdENsaWVudHNDYXJvdXNlbCgpO1xyXG4gICAgaW5pdFNlcnZpY2VzQ2Fyb3VzZWwoKTtcclxuICAgIC8vIGluaXRMaW5rc0Nhcm91c2VsKCk7XHJcbiAgICBjaGVja1RleHRhcmVhTGVuZ3RoKCk7XHJcbiAgICBjaGVja1N1Yk1lbnVzKCk7XHJcbiAgICBmb3JtSGFuZGxlcigpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoKTtcclxuICAgIGNoZWNrV2luT2Zmc2V0KCk7XHJcbiAgICBjaGVja0FuY2hvckZyb21TdG9yYWdlKCk7XHJcbiAgICBjaGVja2JveENvbnRyb2xsZXIoKTtcclxuICAgIGNoZWNrQ3VydmVBbmltYXRlKCk7XHJcbiAgICByZWdpc3RlclBvdXBDbG9zZSgpO1xyXG5cclxuICAgICQoJy52aWRlb19fYnV0dG9uLXBsYXknKS5vbignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIHNob3dQb3B1cCgnI3BvcHVwLXZpZGVvJyk7XHJcbiAgICB9KVxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4kd2luLm9uKCdzY3JvbGwnLCAoKT0+e1xyXG4gICAgY2hlY2tXaW5PZmZzZXQoKTtcclxuICAgIGNoZWNrQ3VydmVBbmltYXRlKCk7XHJcbn0pO1xyXG5cclxuJHdpbi5vbigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgc3dpdGNoVmlld3BvcnRWYXJzKCk7XHJcblxyXG4gICAgY29uc3Qgd2luV2lkdGggPSAkd2luLndpZHRoKCk7XHJcblxyXG5cclxuICAgIGlmICh3aW5XaWR0aCA+IDk5MSkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9iaWxlLW9uJyk7XHJcbiAgICAgICAgJCgnI2J0bk1vYmlsZSAuYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzTW9iaWxlIHx8IGlzRGVza3RvcCAmJiBzZXJ2aWNlc1NsaWRlckluaXRlZCkge1xyXG4gICAgICAgIGlmKGlzU2xpZGVyICYmICQoJyNzZXJ2aWNlc1NsaWRlcicpLmRhdGEoJ293bC5jYXJvdXNlbCcpKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2VzU2xpZGVySW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQoJyNzZXJ2aWNlc1NsaWRlcicpLmRhdGEoJ293bC5jYXJvdXNlbCcpLmRlc3Ryb3koKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFpc0Rlc2t0b3AgJiYgcGVvcGxlc1NsaWRlckluaXRlZCkge1xyXG4gICAgICAgIGlmKCQoJyNwZW9wbGVMaXN0Q2Fyb3VzZWwnKS5kYXRhKCdvd2wuY2Fyb3VzZWwnKSkge1xyXG4gICAgICAgICAgICBwZW9wbGVzU2xpZGVySW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQoJyNwZW9wbGVMaXN0Q2Fyb3VzZWwnKS5kYXRhKCdvd2wuY2Fyb3VzZWwnKS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0UGVvcGxlc0Nhcm91c2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaXNUYWJsZXQpIHtcclxuICAgICAgICBpZighc2VydmljZXNTbGlkZXJJbml0ZWQpIHtcclxuICAgICAgICAgICAgaW5pdFNlcnZpY2VzQ2Fyb3VzZWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KTsiXX0=
