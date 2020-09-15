/* global config */
'use strict';

(() => {
  const CONVERSATION_URL = 'https://4vammoq5j7.execute-api.us-east-1.amazonaws.com/prod/conversations';
  const conversationDiv = document.getElementById('conversation-count');

  /**
   * Update the display to currentValue, formatted in 1,231,131,232 format
   */
  const updateDisplay = () =>
    // format the string with commas every 3 places
    conversationDiv.innerHTML = currentVal
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let currentVal = config.conversations.fallbackConversationCount;
  updateDisplay();

  window.getConversationCount = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        incrementValue(xhr.responseText);
      } else {
        fail();
      }
    });

    xhr.addEventListener('error', fail);

    xhr.open('GET', CONVERSATION_URL);
    xhr.send();
  };

  /**
   * Failure handler for a failed XHR request.
   */
  function fail() {
    incrementValue(config.conversations.fallbackConversationCount);
  }

  /**
   * Increment the current value by the difference from current to desired / 2.
   *
   * @param {integer} intVal Value we're shooting for
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
})();
