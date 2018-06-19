'use strict';

(function() {
  /**
   * Custom polyfills that aren't included in es5-shim.
   */
  if (NodeList.prototype.forEach === undefined) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (!Object.entries) {
    Object.entries = function(obj) {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      let resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }
}());
