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
      if(element.style.display == 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = "none";
      }
    });
    
    return this;
  };
  
  
  // add style
  w3.addStyle = function (selector, property, value) {
    if(selector && property && value) {
      if([property, value]
      .filter(item => typeof item != 'string').length == 0) {
        
      }
    }
    return this;
  }
  
  // to camel casing
  w3.toCamelCase = function (str) {
    if(str && 'string' == typeof str) {
      let splitStr = str.split('-');
      let ucWord = splitStr.map(word => {
        return word.split('').map((letter, i)=>{
          if(i == 0) {
            return letter.toUpperCase();
          }
          return letter;
        }).join('');
      })
    }
    return str;
  }

  // Return the w3 object.
  return w3;
})();
