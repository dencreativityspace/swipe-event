# swipeEvent

swipeEvent is a pure JS library created to improve swipe events.

## How it works?

Due to the low support of functional native events for swiping, we created an utility that helps to easily handle them.

It depends on `touchstart`, `touchmove` and `touchend` events.

When they are triggered, the code rispectively:
- Initializes the `swipe` object;
- Sets the direction to `null` to determine that a swipe event is effectively happend;
- Calculates the direction using Pythagorean theorem. If a click appends, triggers it.

## How to use it?

Include the file in your HTML file:
```html
<script src="/js/path/to/swipe.min.js"></script>
```

When needed, call the function:
```js
attachSwipeEvent({
    element: document.getElementById('swipable'),
    itemSelector: '.item',
    activeSelector: '.active'
});
```

It uses [RORO pattern](https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd) to pass arguments.

### Arguments

#### `element` [String | `HTMLElement`]

The element to attach the swipe event.
**Required**.

#### `threshold` [Integer]

The minimum length that determines the validity of the swipe.

Default: `85`.

#### `allowedTime` [Integer]

The minimum time (in milliseconds) that determines the validity of the swipe.

Default: `300`.

#### `itemSelector` [String]

The selector of the children of the swipable element.
**Required**.

#### `activeSelector` [String]

The selector for the current child of the swipable element.
**Required**.
