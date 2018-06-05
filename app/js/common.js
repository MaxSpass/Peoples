const $doc = $(document);
const $win = $(window);

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



const alertForDisableLinks = (e) => {
    $('a').on('click', (e) => {
        e.preventDefault();
        const $el = $(e.currentTarget);
        const href = $el.attr('href');
        if (href == "#" || href == '' || !e.currentTarget.hasAttribute('href')) {
            alert('Раздел/функционал в разработке')
        } else {
            document.location.href = href;
        }
    })
};

const toggleMobileMenu = () => {
    $('#btnMobile').on('click', (e) => {
        const $this = $(e.currentTarget);
        $this.find('.burger').toggleClass('active');
        $('body').toggleClass('mobile-on');
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

$doc.on('ready', () => {
    alertForDisableLinks();
    checkEmptyFields();
    toggleMobileMenu();
});

$win.on('resize', () => {
    const winWidth = $win.width();

    if (winWidth > 1099) {
        $('body').removeClass('mobile-on');
        $('#btnMobile .burger').removeClass('active');
    }
});