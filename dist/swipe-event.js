"use strict";

function attachSwipeEvent() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      element = _ref.element,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 85 : _ref$threshold,
      _ref$allowedTime = _ref.allowedTime,
      allowedTime = _ref$allowedTime === void 0 ? 300 : _ref$allowedTime,
      itemSelector = _ref.itemSelector,
      activeSelector = _ref.activeSelector;

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!(element instanceof HTMLElement)) {
    throw new Error('The touchable element is invalid.');
  }

  if (!itemSelector) {
    throw new Error('An item selector must be provided. Items must be child of ' + element + '.');
  }

  if (!activeSelector) {
    throw new Error('An active selector must be provided. It must be applicable to items.');
  }

  var swiping = false;
  var clicked = false;
  var defaults = {
    direction: undefined,
    // left; right; down; up;
    duration: 0,
    distance: {
      x: 0,
      y: 0
    },
    start: {
      x: 0,
      y: 0,
      time: undefined,
      // new Date()
      touch: undefined
    },
    end: {
      x: 0,
      y: 0,
      time: undefined,
      // new Date()
      touch: undefined
    },
    threshold: threshold,
    //required min distance traveled to be considered swipe
    allowedTime: allowedTime // maximum time allowed to travel that distance

  };
  Object.defineProperty(defaults, 'threshold', {
    configurable: false,
    writable: false
  });
  Object.defineProperty(defaults, 'allowedTime', {
    configurable: false,
    writable: false
  }); // Object cloning

  var swipe = JSON.parse(JSON.stringify(defaults));
  element.addEventListener('touchstart', function (e) {
    if (!element.querySelector(itemSelector + activeSelector)) {
      e.preventDefault();
      clicked = false;

      if (!swiping) {
        swipe = defaults;
        swipe.start.touch = e.changedTouches[0];
        swipe.start.x = swipe.start.touch.pageX;
        swipe.start.y = swipe.start.touch.pageY;
        swipe.distance.x = 0;
        swipe.distance.y = 0;
        swipe.start.time = new Date();
        swiping = true;
      }
    }
  }, {
    passive: false
  });
  element.addEventListener('touchmove', function (e) {
    if (!element.querySelector(itemSelector + activeSelector)) {
      e.preventDefault();

      if (!swiping) {
        swipe.direction = null;
      }
    }
  }, {
    passive: false
  });
  element.addEventListener('touchabort', function (e) {
    if (!element.querySelector(itemSelector + activeSelector)) {
      e.preventDefault();
      swiping = false;
      swipe.direction = null;
    }
  }, {
    passive: false
  });
  element.addEventListener('touchend', function (e) {
    if (!element.querySelector(itemSelector + activeSelector)) {
      e.preventDefault();

      if (swiping) {
        swipe.end.touch = e.changedTouches[0];
        swipe.end.x = swipe.end.touch.pageX;
        swipe.end.y = swipe.end.touch.pageY;
        swipe.end.time = new Date();
        swipe.duration = swipe.end.time.getTime() - swipe.start.time.getTime();
        swipe.distance.x = swipe.end.x - swipe.start.x;
        swipe.distance.y = swipe.end.y - swipe.start.y;

        if (swipe.duration <= swipe.allowedTime) {
          if (Math.sqrt(Math.pow(swipe.distance.x, 2) + Math.pow(swipe.distance.y, 2)) >= swipe.threshold) {
            if (Math.abs(swipe.distance.x) >= Math.abs(swipe.distance.y)) {
              // 2nd condition for horizontal swipe met
              swipe.direction = swipe.distance.x < 0 ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
            }

            if (Math.abs(swipe.distance.y) >= Math.abs(swipe.distance.x)) {
              // 2nd condition for vertical swipe met
              swipe.direction = swipe.distance.y < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }

            if (swipe.direction && swipe.direction !== null && swipe.distance.x !== 0 && swipe.distance.y !== 0) {
              var swipeEvent = null;

              if (typeof window.CustomEvent !== 'function') {
                swipeEvent = document.createEvent('swipe');
                swipeEvent.initCustomEvent('swipe', false, false, swipe);
              } else {
                swipeEvent = new CustomEvent('swipe', {
                  detail: swipe
                });
              }

              element.dispatchEvent(swipeEvent);
            } else {
              clicked = true;
            }
          } else {
            clicked = true;
          }
        }

        swiping = false;
      } else {
        clicked = true;
      }

      if (clicked) {
        var clickedElement = document.elementFromPoint(swipe.end.touch.pageX, swipe.end.touch.pageY);

        if (clickedElement !== null) {
          var clickEvent = document.createEvent('MouseEvent');
          clickEvent.initMouseEvent('click', true,
          /* bubble */
          true,
          /* cancelable */
          window, null, swipe.end.touch.pageX, swipe.end.touch.pageY, 0, 0,
          /* coordinates */
          false, false, false, false,
          /* modifier keys */
          0,
          /*left*/
          null);
          clickedElement.dispatchEvent(clickEvent);
          clickedElement.focus();
        }

        clicked = false;
      }

      swipe = defaults;
    }
  }, {
    passive: false
  });
  return true;
}