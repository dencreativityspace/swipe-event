/**
 * Utility wrapper to expose a simple way to handle swipe events.
 *
 * @param {object} param
 * @param {string|HTMLElement} param.element Container of the swipable elements.
 * @param {number} param.threshold Minimum spatial distance that makes valid a swipe.
 * @param {number} param.allowedTime Maximum temporal distance that makes valid a swipe.
 * @param {string} param.itemSelector Selector of the swipable elements.
 * @param {string} param.itemSelector Selector for the urrent swipable element.
 *
 * @throws Will throw an error if `element` is invalid.
 * @throws Will throw an error if `itemSelector` isn't provided.
 * @throws Will throw an error if `activeSelector` isn't provided.
 *
 * @version 2.0.0
 *
 * @author Gennaro Landolfi <gennarolandolfi@codedwork.it>
 * @contributor Guido Belluomo
 *
 */
function SwipeEvent({element, threshold = 85, allowedTime = 300, itemSelector, activeSelector} = {}) {
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

    /**
     * Determines if the element is swiping or not.
     *
     * @type {boolean}
     *
     * @private
     */
    let swiping = false;

    /**
     * Determines if a child has been clicked.
     *
     * @type {boolean}
     *
     * @private
     */
    let clicked = false;

    /**
     * Contains the default values for `swipe` object.
     *
     * @property {object} defaults
     * @property {string|null} defaults.direction Direction of the swipe. Can be 'left', 'right', 'down' or 'up'.
     * @property {duration} defaults.duration Duration of the swipe.
     * @property {object} defaults.distance Distance covered by the finger while swiping.
     * @property {number} defaults.distance.x Distance in horizontal direction.
     * @property {number} defaults.distance.y Distance in vertical direction.
     * @property {object} defaults.start Details about the start of the swipe.
     * @property {number} defaults.start.x Horizontal coordinate of the start point.
     * @property {number} defaults.start.y Vertical coordinate of the start point.
     * @property {Date} defaults.start.time Date instance of start point.
     * @property {Date} defaults.start.touch Touch event for the start point.
     * @property {object} defaults.end Details about the end of the swipe.
     * @property {number} defaults.end.x Horizontal coordinate of the end point.
     * @property {number} defaults.end.y Vertical coordinate of the end point.
     * @property {Date} defaults.end.time Date instance of end point.
     * @property {Date} defaults.end.touch Touch event for the end point.
     *
     * @private
     */
    const defaults = {
        direction: undefined, // left; right; down; up;
        duration: 0,
        distance: {
            x: 0,
            y: 0
        },
        start: {
            x: 0,
            y: 0,
            time: undefined, // new Date()
            touch: undefined
        },
        end: {
            x: 0,
            y: 0,
            time: undefined, // new Date()
            touch: undefined
        },
    };

    // Object cloning
    /**
     * Sets the mutable `swipe` object.
     *
     * @property {object} defaults
     * @property {string|null} defaults.direction Direction of the swipe. Can be 'left', 'right', 'down' or 'up'.
     * @property {duration} defaults.duration Duration of the swipe.
     * @property {object} defaults.distance Distance covered by the finger while swiping.
     * @property {number} defaults.distance.x Distance in horizontal direction.
     * @property {number} defaults.distance.y Distance in vertical direction.
     * @property {object} defaults.start Details about the start of the swipe.
     * @property {number} defaults.start.x Horizontal coordinate of the start point.
     * @property {number} defaults.start.y Vertical coordinate of the start point.
     * @property {Date} defaults.start.time Date instance of start point.
     * @property {Date} defaults.start.touch Touch event for the start point.
     * @property {object} defaults.end Details about the end of the swipe.
     * @property {number} defaults.end.x Horizontal coordinate of the end point.
     * @property {number} defaults.end.y Vertical coordinate of the end point.
     * @property {Date} defaults.end.time Date instance of end point.
     * @property {Date} defaults.end.touch Touch event for the end point.
     *
     * @private
     */
    let swipe = JSON.parse(JSON.stringify(defaults));

    /**
     * Caches the event callbacks.
     *
     * @type {object}
     *
     * @private
     */
    const eventCallbacks = {
        start: (e) => {
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
        },
        move: (e) => {
            if (!element.querySelector(itemSelector + activeSelector)) {
                e.preventDefault();

                if (!swiping) {
                    swipe.direction = null;
                }
            }
        },
        abort: (e) => {
            if (!element.querySelector(itemSelector + activeSelector)) {
                e.preventDefault();

                swiping = false;
                swipe = defaults;
            }
        },
        end: (e) => {
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

                    if (swipe.duration <= allowedTime) {
                        if (Math.sqrt(Math.pow(swipe.distance.x, 2) + Math.pow(swipe.distance.y, 2)) >= threshold)
                        {
                            if (Math.abs(swipe.distance.x) >= Math.abs(swipe.distance.y)) { // 2nd condition for horizontal swipe met
                                swipe.direction = (swipe.distance.x < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
                            }
                            if (Math.abs(swipe.distance.y) >= Math.abs(swipe.distance.x)) { // 2nd condition for vertical swipe met
                                swipe.direction = (swipe.distance.y < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
                            }

                            if ((swipe.direction && swipe.direction !== null) && (swipe.distance.x !== 0 && swipe.distance.y !== 0)) {
                                let swipeEvent = null;

                                if (typeof window.CustomEvent !== 'function') {
                                    swipeEvent = document.createEvent('swipe');

                                    swipeEvent.initCustomEvent('swipe', false, false, swipe);
                                }
                                else {
                                    swipeEvent = new CustomEvent('swipe', { detail: swipe });
                                }

                                element.dispatchEvent(swipeEvent);
                            }
                            else {
                                clicked = true;
                            }
                        }
                        else
                        {
                            clicked = true;
                        }
                    }

                    swiping = false;
                }
                else {
                    clicked = true;
                }

                if (clicked) {
                    let clickedElement = document.elementFromPoint(
                        swipe.end.touch.pageX,
                        swipe.end.touch.pageY
                    );

                    if (clickedElement !== null) {
                        let clickEvent = document.createEvent('MouseEvent');
                        clickEvent.initMouseEvent(
                            'click',
                            true, /* bubble */
                            true, /* cancelable */
                            window,
                            null,
                            swipe.end.touch.pageX, swipe.end.touch.pageY, 0, 0, /* coordinates */
                            false, false, false, false, /* modifier keys */
                            0, /*left*/
                            null
                        );
                        clickedElement.dispatchEvent(clickEvent);
                        clickedElement.focus();
                    }

                    clicked = false;
                }

                swipe = defaults;
            }
        }
    };

    /**
     * Attaches the listeners that makes possible to detect the swipe.
     *
     * @emits SwipeEvent#swipe
     *
     * @public
     */
    this.attach = () => {
        element.addEventListener('touchstart', eventCallbacks.start, {passive: false});
        element.addEventListener('touchmove', eventCallbacks.move, {passive: false});
        element.addEventListener('touchabort', eventCallbacks.abort, {passive: false});
        element.addEventListener('touchend', eventCallbacks.end, {passive: false});
    };

    /**
     * Detaches the listeners that makes possible to detect the swipe.
     *
     * @public
     */
    this.detach = () => {
        element.removeEventListener('touchstart', eventCallbacks.start, {passive: false});
        element.removeEventListener('touchmove', eventCallbacks.move, {passive: false});
        element.removeEventListener('touchabort', eventCallbacks.abort, {passive: false});
        element.removeEventListener('touchend', eventCallbacks.end, {passive: false});
    };
}
