/**
 * W3.JS 1.0 Feb 16, 2024 by Aldrin Caballero
 *
 * w3.js is owned by w3schools.com,
 * as an aspiring developer,
 * I want to clone or rewrite the codes/functions in my own way of coding.
 */

const w3 = (() => {
  ("use strict");

  // Define w3 object.
  const w3 = {},
    d = document,
    w = window;

  // elements array
  w3.elements = [];

  // element selector
  w3.$ = function (selector) {
    if (typeof selector === "string") {
      // and push elements into this.elements array.
      this.elements.push(...d.querySelectorAll(selector));
    } else if (selector) {
      this.elements.push(selector);
    }
    return this;
  };

  // hide
  w3.hide = function (selector) {
    this.$(selector).elements.forEach((element) => {
      element.style.display = "none";
    });
  };

  // show
  w3.show = function (selector) {
    this.$(selector).elements.forEach((element) => {
      element.style.display = "block";
    });
  };

  // toggle show
  w3.toggleShow = function (selector) {
    this.$(selector).elements.forEach((element) => {
      if(element.style.display == 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = "none";
      }
    });
  };

  // Return the w3 object.
  return w3;
})();
