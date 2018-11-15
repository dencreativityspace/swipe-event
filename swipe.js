function attachSwipeEvent({element = undefined, threshold = 75, restraint = 75, allowedTime = 300} = {}) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!(element instanceof HTMLElement)) {
        throw new Error('The touchable element is invalid.');
    }
    
    let swipe = {
        direction: undefined, // left; right; down; up;
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
        duration: 0,
        threshold: threshold, //required min distance traveled to be considered swipe
        restraint: restraint, // maximum distance allowed at the same time in perpendicular direction
        allowedTime: allowedTime // maximum time allowed to travel that distance
    };

    Object.defineProperty(swipe, 'threshold', { configurable: false, writable: false });
    Object.defineProperty(swipe, 'restraint', { configurable: false, writable: false });
    Object.defineProperty(swipe, 'allowedTime', { configurable: false, writable: false });

    element.addEventListener('touchstart', (e) => {
        e.preventDefault();

        swipe.start.touch = e.changedTouches[0];

        swipe.start.x = swipe.start.touch.pageX;
        swipe.start.y = swipe.start.touch.pageY;

        swipe.distance.x = 0;
        swipe.distance.y = 0;

        swipe.start.time = new Date();
    });

    /*element.addEventListener('touchmove', (e) => {
        //e.preventDefault();
    });*/

    element.addEventListener('touchend', (e) => {
        e.preventDefault();

        swipe.end.touch = e.changedTouches[0];

        swipe.end.x = swipe.end.touch.pageX;
        swipe.end.y = swipe.end.touch.pageY - swipe.start.y;

        swipe.end.time = new Date();
        
        swipe.duration = swipe.end.time.getTime() - swipe.start.time.getTime();
        
        const distX = swipe.end.touch.pageX  - swipe.start.x;
        const distY = swipe.end.touch.pageY  - swipe.start.y;
        
        swipe.distance.x = swipe.end.touch.pageX  - swipe.start.x;
        swipe.distance.y = swipe.end.touch.pageY  - swipe.start.y;
        
        if (swipe.duration <= allowedTime) {
            if (Math.abs(swipe.distance.x) >= threshold && Math.abs(swipe.distance.y) <= restraint) { // 2nd condition for horizontal swipe met
                swipe.direction = (swipe.distance.x < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(swipe.distance.y) >= threshold && Math.abs(swipe.distance.x) <= restraint) { // 2nd condition for vertical swipe met
                swipe.direction = (swipe.distance.y < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
            
            if (swipe.direction) {
                element.dispatchEvent(new CustomEvent('swipe', { detail: swipe }));
            }
        }
    });
}
