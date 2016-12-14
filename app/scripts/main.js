/* global
    getMessageCount
    renderFAQ
    bindFAQ
    bootstrapWordCloud
    toggle
    hide
 */
/* eslint-env browser */
'use strict';

(function() {
  polyfill();
  attachHamburger();
  getMessageCount();
  renderFAQ();
  bindFAQ();
  bootstrapWordCloud();

  let resizeTimer;
  window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      const newEvent = new Event('resize-complete');
      newEvent.originalEvent = e;
      window.dispatchEvent(newEvent);
    }, 500);
  });

  /**
   * Attach the hamburger click binders.
   */
  function attachHamburger() {
    document.querySelectorAll('.hamburger')[0].addEventListener('click', () => {
      toggle(document.querySelectorAll('.hamburger-menu'));
    });

    document.querySelectorAll('.hamburger-menu a').forEach(function(element) {
      element.addEventListener('click', function() {
        hide(document.querySelectorAll('.hamburger-menu'));
      });
    });
  }

  /**
   * Custom polyfills that aren't included in es5-shim.
   */
  function polyfill() {
    if (NodeList.prototype.forEach === undefined) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  }
})();
