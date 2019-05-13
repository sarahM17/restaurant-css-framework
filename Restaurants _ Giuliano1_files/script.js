$(function () {

    svgFallback();

    navigation();
    initLanguageSelect();
    initSpectagram();
    formDatePicker();
    formIntegerInput();


    if ($('.notification').length) {
        $('.js-close-notification').click(function (event) {
            /* Act on the event */
            event.preventDefault();
            Cookies.set('cookie_policy', 'accepted', {expires: 7});

            $(this).parent().hide();

            if ($('.modal-overlay').length) {
                $('.modal-overlay').hide();
            }
        });

        var getCookie = Cookies.get('cookie_policy');

        if (getCookie) {
            $('.notification').addClass('notification-none');
            $('.modal-overlay').addClass('modal-none');
        } else {
            $('.notification').removeClass('notification-none');
            $('.modal-overlay').removeClass('modal-none');
        }
    }
    //initScripts();
});


function initSpectagram() {
    
    jQuery.fn.spectragram.accessData = {
        accessToken: '2252041795.1b55b5b.294fc70ac2ff4a2ba04b6de3d6a7648e',
        clientID: '1b55b5b2915a4b7e8f8efc06bec6b599'
    };
    
    $('.spectagram').spectragram('getUserFeed', {
        query: 'giulianoristorante',
        size:'big',
        max: '8'
    });
    
    $(window).load(function(){
        $('.spectagram img').each(function(){
            $(this).wrap('<div class="img-wrap"></div>');
        });
    });
}



function navigation() {
    $('.mainnavigation-mobile-open, .mainnavigation-mobile-close').on('click', function () {
        $('body').toggleClass('has-open-navigation').toggleClass('no-scroll');
    });
}


function initLanguageSelect() {

    $('.language-select').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
}

function formIntegerInput() {
    var elements = $('.integer-input');
    if (elements.length > 0) {

        var changeNumberInput = function (input, step) {
            var oldValue = input.val();
            var min = input.attr('min');
            var max = input.attr('max');

            if (oldValue === '') {
                oldValue = 0;
            }
            var newValue = parseInt(oldValue) + parseInt(step);

            if (min !== undefined && min > newValue) {
                newValue = min;
            }
            if (max !== undefined && max < newValue) {
                newValue = max;
            }
            if (newValue != oldValue) {
                input.val(newValue).trigger('change');
            }
        };

        var increaseNumberInput = function (input) {
            var step = input.attr('step');

            if (step === undefined) {
                step = 1;
            }
            changeNumberInput(input, step);
        };

        var decreaseNumberInput = function (input) {
            var step = input.attr('step');

            if (step === undefined) {
                step = 1;
            }
            changeNumberInput(input, step * -1);
        };

        elements.each(function () {
            var input = $(this).find('[type="number"]');
            var increaseButton = $(this).find('.integer-input-increase');
            var decreaseButton = $(this).find('.integer-input-decrease');

            increaseButton.on('click', function (ev) {
                ev.preventDefault();
                increaseNumberInput(input);
            });

            decreaseButton.on('click', function (ev) {
                ev.preventDefault();
                decreaseNumberInput(input);
            });
        });
    }
}

function formDatePicker() {
    $('.form-controls-date [type="text"], .form-controls-date [type="date"]').pikaday({
        format: 'DD-MM-YYYY',
        firstDay: 1,
        yearRange: 100,
        minDate: new Date(),
        i18n: {
            previousMonth: 'Vorige maand',
            nextMonth: 'Volgende maand',
            months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            weekdays: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
            weekdaysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
        }
    });
}

function svgFallback() {
    if (!svgasimg()) {
        var e = document.getElementsByTagName("img");
        if (!e.length) {
            e = document.getElementsByTagName("IMG");
        }
        for (var i = 0, n = e.length; i < n; i++) {
            var img = e[i],
                    src = img.getAttribute("src");
            if (src.match(/svgz?$/)) {
                img.setAttribute("src", img.getAttribute("data-fallback"));
            }
        }
    }
}

function svgasimg() {
    return document.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

