function attachSwipeEvent({element = undefined, threshold = 85, restraint = 75, allowedTime = 300, itemSelector = '.scroll', currentSelector = '.current', activeSelector = '.active', closeButtonSelector = '.close-active-post'} = {}) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!(element instanceof HTMLElement)) {
        throw new Error('The touchable element is invalid.');
    }
    
    let swiping = false;
    
    let activeClass = activeSelector.substr(1);
    
    const directions = [
        'left',
        'right',
        'up',
        'down'
    ];
    
    let clicked = false;
    
    let swipe = {
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
        threshold: threshold, //required min distance traveled to be considered swipe
        restraint: restraint, // maximum distance allowed at the same time in perpendicular direction
        allowedTime: allowedTime // maximum time allowed to travel that distance
    };

    Object.defineProperty(swipe, 'threshold', { configurable: false, writable: false });
    Object.defineProperty(swipe, 'restraint', { configurable: false, writable: false });
    Object.defineProperty(swipe, 'allowedTime', { configurable: false, writable: false });
    
    const defaults = JSON.parse(JSON.stringify(swipe));

    element.addEventListener('touchstart', (e) => {
        if (!element.querySelector(itemSelector + activeSelector)) {
            e.preventDefault();

            clicked = false;

            if (!swiping) {
                console.log('swiping');
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
        
    });

    element.addEventListener('touchmove', (e) => {
        if (!element.querySelector(itemSelector + activeSelector)) {
            e.preventDefault();
        
            if (!swiping) {
                swipe.direction = null;
            }
        }
    });

    element.addEventListener('touchend', (e) => {
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
                    if (Math.abs(swipe.distance.x) >= swipe.threshold && Math.abs(swipe.distance.y) <= swipe.restraint) { // 2nd condition for horizontal swipe met
                        swipe.direction = (swipe.distance.x < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
                    }
                    else if (Math.abs(swipe.distance.y) >= swipe.threshold && Math.abs(swipe.distance.x) <= swipe.restraint) { // 2nd condition for vertical swipe met
                        swipe.direction = (swipe.distance.y < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
                    }

                    if ((swipe.direction && swipe.direction !== null) && (swipe.distance.x !== 0 && swipe.distance.y !== 0)) {
                        element.dispatchEvent(new CustomEvent('swipe', { detail: swipe }));
                    }
                    else {
                        clicked = true;
                    }
                }

                swiping = false;
            }
            else {
                clicked = true;
            }

            if (clicked) {
                let clickedElement = element.querySelector(itemSelector + currentSelector);

                if (!clickedElement.classList.contains(activeClass)) {
                    clickedElement.click();
                }
                else {
                    clickedElement.querySelector(closeButtonSelector).click();
                }

                clicked = false;
            }

            swipe = defaults;
        }
    });
}
