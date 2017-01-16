/* global
    getMessageCount
    renderFAQ
    bindFAQ
    bootstrapWordCloud
    toggle
    hide
 */
'use strict';

(function() {
  polyfill();
  attachHamburger();
  getMessageCount();
  // renderCarousel(); TODOCAROUSEL
  renderFAQ();
  bindFAQ();
  bootstrapWordCloud();
  scrollToTop();

  let resizeTimer;
  let w = window.outerWidth;
  window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (window.outerWidth === w) {
        return;
      }

      w = window.outerWidth;
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

  /**
   * Attach click binder to make #top scroll ALL THE WAY to the top
   */
  function scrollToTop() {
    document.querySelectorAll('a[href="#top"]').forEach(function(element) {
      element.addEventListener('click', (event) => {
        window.scrollTo(0, 0);
        event.preventDefault();
      });
    });
  }
})();
