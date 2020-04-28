"use strict";

(function () {
  const MESSAGE_URL =
    "https://4vammoq5j7.execute-api.us-east-1.amazonaws.com/prod/messages";
  const messageDiv = document.getElementById("message-count");
  const config = require("../config");

  let currentVal = parseInt(messageDiv.innerHTML.replace(/,/g, ""), 10);

  window.getMessageCount = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        incrementValue(xhr.responseText);
      } else {
        fail();
      }
    });

    xhr.addEventListener("error", fail);

    xhr.open("GET", MESSAGE_URL);
    xhr.send();
  };

  /**
   * Failure handler for a failed XHR request. Let's just populate with a sane,
   * true-enough value.
   */
  function fail() {
    incrementValue(config.messages.fallbackMessageCount);
  }

  /**
   * Increment the current value by the difference from current to desired / 2.
   *
   * @param  {integer} intVal Value we're shooting for
   */
  function incrementValue(intVal) {
    intVal = parseInt(intVal, 10);

    const difference = intVal - currentVal;

    currentVal += Math.ceil(difference / 2);

    updateDisplay();

    if (currentVal !== intVal) {
      setTimeout(() => {
        incrementValue(intVal);
      }, 125 - Math.log(difference) * 5);
    }
  }

  /**
   * Update the display to currentValue, formatted in 1,231,131,232 format
   */
  function updateDisplay() {
    // format the string with commas every 3 places
    messageDiv.innerHTML = currentVal
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})();
