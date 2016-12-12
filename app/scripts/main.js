/* global
    getMessageCount
    renderFAQ
    bindFAQ
    bootstrapWordCloud
 */
/* eslint-env browser */
'use strict';

(function() {
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
})();
