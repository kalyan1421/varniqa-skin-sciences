/* ==========================================
   VARNIQA SKIN SCIENCES
   Mobile navigation
========================================== */

(function () {

    'use strict';

    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');

    if (!toggle || !links) {
        return;
    }

    function setOpen(open) {

        toggle.setAttribute('aria-expanded', String(open));

        links.classList.toggle('is-open', open);

    }

    function isOpen() {
        return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    /* Close after picking a destination, so the page isn't
       hidden behind the panel once it scrolls. */
    links.addEventListener('click', function (event) {

        if (event.target.closest('a')) {
            setOpen(false);
        }

    });

    document.addEventListener('keydown', function (event) {

        if (event.key === 'Escape' && isOpen()) {

            setOpen(false);

            toggle.focus();

        }

    });

    /* The panel only exists below 900px; if the viewport grows
       past that, drop the open state so it can't get stuck. */
    var wide = window.matchMedia('(min-width: 901px)');

    wide.addEventListener('change', function (event) {

        if (event.matches) {
            setOpen(false);
        }

    });

}());
