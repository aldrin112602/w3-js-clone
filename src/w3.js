/**
 * W3.JS 1.0 Feb 16, 2024 by Aldrin Caballero
 */
const w3 = (() => {
  ("use strict");

  // Define w3 object.
  const w3 = {},
    d = document,
    w = window;


  function findAllChildrenWithAttribute(parent, attributeName, results = []) {
    if (!parent || !parent.children) {
      return results;
    }
    for (let child of parent.children) {
      if (child.getAttribute(attributeName)) {
        results.push(child);
      }
      findAllChildrenWithAttribute(child, attributeName, results);
    }
    return results;
  }

  function appendRow(row, obj) {
    let clonedRow = row.cloneNode(true);
    let parentNode = row.parentNode;
    row.remove();

    for (let key in obj) {
      if (obj[key] instanceof Array) {
        obj[key].forEach(_obj => {
          let copyClone = clonedRow.cloneNode(true);
          copyClone.removeAttribute('w3-repeat');
          for (let _key in _obj) {
            let regex = new RegExp(`{{\\s*${_key}\\s*}}`, 'g');
            copyClone.innerHTML = copyClone.innerHTML.replace(regex, match => _obj[_key]);
          }
          parentNode.appendChild(copyClone);
        });
      }
    }
  }


  // element selector
  w3.$ = function (selector) {
    let elements = [];
    if (typeof selector === "string") {
      // and push elements into this.elements array.
      elements = d.querySelectorAll(selector);
    } else if (selector) {
      elements.push(selector);
    }
    return elements;
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
    this.$(selector).forEach((element) => {
      element.style.display = "none";
    });
    return this;
  };

  // show
  w3.show = function (selector) {
    this.$(selector).forEach((element) => {
      element.style.display = "block";
    });
    return this;
  };

  // toggle show
  w3.toggleShow = function (selector) {

    this.$(selector).forEach((element) => {
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
        this.$(selector).forEach((element) => {
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
      this.$(selector).forEach((element) => {
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
      this.$(selector).forEach((element) => {
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
    let elements = this.$(selector);
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

  w3.includeHTML = function (callback) {
    this.$('body *').forEach(element => {
      let w3IncludeURL = element.getAttribute('w3-include-html');
      if (w3IncludeURL && 'string' === typeof w3IncludeURL && w3IncludeURL.includes('.')) {
        fetch(w3IncludeURL)
          .then(res => {
            if (res.status == 200) return res.text()
            else throw new Error(res.statusText)
          })
          .then(html => {
            element.innerHTML = html;
          })
          .catch(err => console.log(err))
          .finally(() => (callback && callback instanceof Function) && callback())
      }
    })
    return this;
  }

  w3.displayObject = function (id, obj) {
    let parent = document.getElementById(id);
    if (parent && obj && obj instanceof Object) {
      let childs = [...parent.children];

      if (childs.length === 0) {
        for (let key in obj) {

          let regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          parent.innerHTML = parent.innerHTML.replace(regex, match => obj[key]);
        }
      } else {
        [...childs].filter(child => child.getAttribute('w3-repeat') != null)
          .forEach(child => {
            var clonedElement = child.cloneNode(true);
            var parentNode = child.parentNode;
            child.remove();
            for (let key in obj) {
              if (obj[key] instanceof Array) {
                obj[key].forEach(_obj => {
                  let copyClone = clonedElement.cloneNode(true)
                  for (let _key in _obj) {
                    let regex = new RegExp(`{{\\s*${_key}\\s*}}`, 'g');
                    copyClone.innerHTML = copyClone.innerHTML.replace(regex, match => _obj[_key]);

                  }
                  parentNode.appendChild(copyClone)
                })
              }
            }
          });

        [...childs].filter(child => {
          return findAllChildrenWithAttribute(child, 'w3-repeat').length > 0 || child.getAttribute('w3-repeat') != null;
        })
          .forEach(child => {
            let rowsWithW3Repeat = findAllChildrenWithAttribute(child, 'w3-repeat');
            rowsWithW3Repeat.forEach(row => {
              appendRow(row, obj)
            });
          });
      }
    }
  }

  w3.getHttpObject = function (path, callback) {
    fetch(path)
      .then(res => {
        if (res.status == 200) return res.json()
        else throw new Error(res.statusText)
      })
      .then(json => {
        if (callback && callback instanceof Function) {
          callback(json)
        }
      })
      .catch(err => console.log(err))
  }


  const W3 = Object.defineProperties(w3, {
    $: {
      writable: false,
      enumerable: false,
    },
    toCamelCase: {
      writable: false,
      enumerable: false,
    }
  });


  return Object.seal(Object.freeze(W3));
})();
