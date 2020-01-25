import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

// Overwrites native 'lastElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
(function(constructor) {
  if (constructor && constructor.prototype && constructor.prototype.lastElementChild == null) {
    Object.defineProperty(constructor.prototype, 'lastElementChild', {
      get: function() {
        var node,
          nodes = this.childNodes,
          i = nodes.length - 1;
        while ((node = nodes[i--])) {
          if (node.nodeType === 1) {
            return node;
          }
        }
        return null;
      },
    });
  }
})(window.Node || window.Element);

// Element.closest() polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
