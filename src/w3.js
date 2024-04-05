/**
 * W3.JS 1.0 Feb 16, 2024 by Aldrin Caballero
 *
 * Description: w3.js is a library owned by w3schools.com.
 * As an aspiring developer, I've rewritten or cloned certain codes/functions
 * to understand and adapt them according to my coding style and needs.
 * This version aims to provide enhanced functionality and usability.
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

  // to camel casing
  w3.toCamelCase = function (str) {
    if (str && "string" == typeof str) {
      let splitStr = str.split("-");
      let ucWord = splitStr.map((word) => {
        return word
          .split("")
          .map((letter, i) => {
            if (i == 0) {
              return letter.toUpperCase();
            }
            return letter;
          })
          .join("");
      });
    }
    return str;
  };

  // hide
  w3.hide = function (selector) {
    this.$(selector).elements.forEach((element) => {
      element.style.display = "none";
    });
    return this;
  };

  // show
  w3.show = function (selector) {
    this.$(selector).elements.forEach((element) => {
      element.style.display = "block";
    });
    return this;
  };

  // toggle show
  w3.toggleShow = function (selector) {

    this.$(selector).elements.forEach((element) => {
      if (element.style.display == "block") {
        element.style.display = "none";
        return
      }
      element.style.display = "block";
    });
  };

  // add style
  w3.addStyle = function (selector, property, value) {
    if (selector && property && value) {
      if (
        [property, value].filter((item) => typeof item != "string").length == 0
      ) {
        this.$(selector).elements.forEach((element) => {
          element.style[this.toCamelCase(property)] = value;
        });
      }
    }
    return this;
  };

  // add class
  w3.addClass = function (selector, className) {
    selector &&
      "string" == typeof className &&
      this.$(selector).elements.forEach((element) => {
        className.split(" ").forEach((str) => {
          element.classList.add(str);
        });
      });
  };

  // filter html
  w3.filterHTML = function (selector, childSelector, value) {
    selector &&
      childSelector &&
      value &&
      this.$(selector).elements.forEach((element) => {
        element.querySelectorAll(childSelector).forEach((childElement) => {
          let content = childElement.innerText.toLowerCase().trim();
          childElement.style.display = content
            .toLowerCase()
            .trim()
            .includes(value)
            ? "block"
            : "none";
        });
      });

    return this;
  };



  // slideShow
  w3.slideshow = function (selector, interval) {
    let elements = this.$(selector).elements;
    elements.forEach((e, i) => {
      if (i == 0) e.style.display = 'block'
      else e.style.display = 'none'
    })
    if (selector && elements.length > 0) {
      let i = 1;
      setInterval(() => {
        elements.forEach((e, _) => {
          if (i == _) e.style.display = 'block'
          else e.style.display = 'none'
        })
        i++;
        if (i >= elements.length) {
          i = 0;
        }
      }, interval);
    }
  };


  // return w3;

  const W3 = Object.defineProperties(w3, {
    $: {
      writable: false,
      enumerable: false,
    },
    toCamelCase: {
      writable: false,
      enumerable: false,
    },
    elements: {
      writable: false,
      enumerable: false,
    }
  });


  return Object.seal(Object.freeze(W3));
})();
