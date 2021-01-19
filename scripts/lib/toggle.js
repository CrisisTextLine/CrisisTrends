"use strict";window.toggle=function(i){return i instanceof NodeList?(i.forEach(toggle),i):"inherit"===i.style.display?hide(i):show(i)},window.hide=function(i){return i instanceof NodeList?i.forEach(hide):i.style.display="none",i},window.show=function(i){return i instanceof NodeList?i.forEach(hide):i.style.display="inherit",i};
//# sourceMappingURL=toggle.js.map
