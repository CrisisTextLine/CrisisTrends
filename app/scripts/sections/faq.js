/* global
    hide
    toggle
 */
'use strict';

(function() {
  /**
   * Render the FAQ questions from a file located at /faq.js.
   */
  window.renderFAQ = () => {
    /**
     * Destination of all FAQ items
     * @type {Element}
     */
    const _destination = document.getElementsByClassName('faq-placeholder')[0];

    /**
     * Template for each wrapper section, including an image.
     * @type {Element}
     */
    const _section = document.getElementsByClassName('template faq-section')[0];
    bootstrapTemplate(_section);

    /**
     * Template for each wrapper subsection, including an image.
     * @type {Element}
     */
    const _subsection =
      document.getElementsByClassName('template faq-subsection')[0];
    bootstrapTemplate(_subsection);

    /**
     * Template for each question.
     * @type {[type]}
     */
    const _question = document
      .getElementsByClassName('template faq-question')[0];
    bootstrapTemplate(_question);

    for (let sectionTitle in window.faq) {
      // Since we're working with a global obj, let's make sure we're not
      // screwed by accidental prototyping.
      if (!Object.prototype.hasOwnProperty.call(window.faq, sectionTitle)) {
        continue;
      }

      /** @type {object} Shortcut  */
      const section = window.faq[sectionTitle];

      /** @type {Element} The new section where we're putting the FAQ elements */
      const _thisSection = _section.cloneNode(true);

      // Fill in template data
      _thisSection.querySelectorAll('h1')[0].innerHTML = sectionTitle;
      _thisSection.querySelectorAll('img')[0].src = section.image;

      const _thisDestination = _thisSection.querySelectorAll('.faq-content')[0];

      for (let subsectionTitle in section.questions) {
        if (!Object.prototype.hasOwnProperty.call(section.questions, subsectionTitle)) {
          continue;
        }

        /** @type {object,string} The set of either subsections or questions */
        const subsection = section.questions[subsectionTitle];

        if (typeof subsection === 'string') {
          // we have a question
          addQuestion(subsectionTitle, subsection, _thisDestination);
        } else {
          // we have a subsection
          const _thisSubsection = _subsection.cloneNode(true);

          _thisSubsection.querySelectorAll('h2')[0].innerHTML = subsectionTitle;

          for (let question in subsection) {
            if (!Object.prototype.hasOwnProperty.call(subsection, question)) {
              continue;
            }

            addQuestion(question, subsection[question], _thisSubsection);
          }

          _thisDestination.appendChild(_thisSubsection);
        }
      }
      // Finally, append to the DOM.
      _destination.appendChild(_thisSection);
    }

    /**
     * Bootstrap a template by removing it from the dom and removing the template class.
     *
     * @param {Element} domNode The domNode to bootstrap into a template
     */
    function bootstrapTemplate(domNode) {
      // Remove from DOM
      domNode.parentNode.removeChild(domNode);

      // Remove the template class
      domNode.className = domNode.className.replace('template', '');
    }

    /**
     * Add a question using the global question template to an Element, appendTo.
     * @param {string} question question
     * @param {string} answer answer
     * @param {Element} appendTo Element to append the question to
     */
    function addQuestion(question, answer, appendTo) {
      const _thisQuestion = _question.cloneNode(true);

      _thisQuestion.querySelectorAll('h3')[0].innerHTML = question;
      _thisQuestion.querySelectorAll('p')[0].innerHTML = answer;

      appendTo.appendChild(_thisQuestion);
    }
  };

  /**
   * Bind click events and hide elements from the FAQ
   */
  window.bindFAQ = () => {
    const select = '.faq-content';

    const allElements = document.querySelectorAll(select);
    hide(allElements);

    allElements.forEach(e => {
      e.style.cursor = 'auto';

      // Prevent the click listener on the parent from affecting this (i.e. re-hiding this element)
      e.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    });

    const sections = document.querySelectorAll('.faq-section');
    sections.forEach(e => {
      e.style.cursor = 'pointer';

      e.addEventListener('click', function() {
        this.querySelectorAll(select).forEach(toggle);
      });
    });
  };
})();
