/* eslint-env browser */
/**
 * Toggle the display of an element.
 *
 * @param  {element} e The element to toggle.
 *
 * @return {element}   The element that was toggled.
 */
window.toggle = function(e) {
  if (e instanceof NodeList) {
    e.forEach(toggle);
    return e;
  }

  if (e.style.display === 'inherit') {
    return hide(e);
  }

  return show(e);
}

/**
 * Hide an element or elements.
 *
 * @param  {element|NodeList} e The element(s) to hide
 *
 * @return {element} The element hidden
 */
window.hide = function(e) {
  if (e instanceof NodeList) {
    e.forEach(hide);
  } else {
    e.style.display = 'none';
  }

  return e;
}

/**
 * Unhide an element.
 *
 * @param  {element} e The element to unhide.
 *
 * @return {element} The element unhidden
 */
window.show = function(e) {
  if (e instanceof NodeList) {
    e.forEach(hide);
  } else {
    e.style.display = 'inherit';
  }

  return e;
}
