/* ==========================================
   VARNIQA SKIN SCIENCES
   Mobile navigation, and the gallery lightbox
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

/* ==========================================
   Gallery lightbox

   Progressive enhancement, and it has to stay that way: every
   photograph in the gallery is a plain link to its own image file, so
   with this script absent or failed the gallery still works — the link
   just navigates to the image. Nothing below runs unless the page
   actually has a gallery and the browser has <dialog>.
========================================== */

(function () {

    'use strict';

    var box = document.getElementById('lightbox');
    var links = document.querySelectorAll('.gallery-media');

    /* showModal is the feature that matters: it puts the dialog in the
       top layer and contains focus. Without it, leave the links alone
       rather than half-building a lightbox that traps nobody. */
    if (!box || !links.length || typeof box.showModal !== 'function') {
        return;
    }

    var image = document.getElementById('lightbox-image');
    var caption = document.getElementById('lightbox-caption');
    var closer = box.querySelector('.lightbox-close');

    /* Where focus came from, so it can be put back on close. The dialog
       restores focus to the invoker itself in current browsers, but that
       is recent enough to be worth not relying on. */
    var opener = null;

    function open(link) {

        var img = link.querySelector('img');

        opener = link;

        /* The full file, not the srcset variant the grid is showing:
           the point of the dialog is to see the photograph bigger. */
        image.src = link.getAttribute('href');

        /* The grid img carries the description of the photograph; the
           dialog is showing the same photograph, so it carries the same
           description rather than inventing a second one. */
        image.alt = img ? img.getAttribute('alt') : '';

        caption.textContent = link.getAttribute('data-caption') || '';

        box.showModal();

        closer.focus();

    }

    Array.prototype.forEach.call(links, function (link) {

        link.addEventListener('click', function (event) {

            /* Leave the modified clicks alone — a middle click or
               ctrl-click on an image link means "open the file
               separately", and intercepting that is rude. */
            if (event.metaKey || event.ctrlKey || event.shiftKey
                || event.altKey || event.button !== 0) {
                return;
            }

            event.preventDefault();

            open(link);

        });

    });

    closer.addEventListener('click', function () {
        box.close();
    });

    /* Clicking the backdrop closes. The backdrop is not an element, so
       the click lands on the dialog itself; anything inside the figure
       is a click on the photograph, not outside it. */
    box.addEventListener('click', function (event) {

        if (event.target === box) {
            box.close();
        }

    });

    /* Covers both the close button and the Escape key, which the dialog
       handles on its own. Dropping the src frees the decoded full-size
       image instead of holding every photograph opened this visit. */
    box.addEventListener('close', function () {

        image.removeAttribute('src');

        caption.textContent = '';

        if (opener) {
            opener.focus();
            opener = null;
        }

    });

}());
