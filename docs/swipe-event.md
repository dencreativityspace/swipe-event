<a name="SwipeEvent"></a>

## SwipeEvent(param)
Utility wrapper to expose a simple way to handle swipe events.

**Kind**: global function  
**Throws**:

- Will throw an error if `element` is invalid.
- Will throw an error if `itemSelector` isn't provided.
- Will throw an error if `activeSelector` isn't provided.

**Contributor**: Guido Belluomo  
**Version**: 2.0.0  
**Author:** Gennaro Landolfi <gennarolandolfi@codedwork.it>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>object</code> |  |
| param.element | <code>string</code> &#124; <code>HTMLElement</code> | Container of the swipable elements. |
| param.threshold | <code>number</code> | Minimum spatial distance that makes valid a swipe. |
| param.allowedTime | <code>number</code> | Maximum temporal distance that makes valid a swipe. |
| param.itemSelector | <code>string</code> | Selector of the swipable elements. |
| param.itemSelector | <code>string</code> | Selector for the urrent swipable element. |


* [SwipeEvent(param)](#SwipeEvent)
    * [~swiping](#SwipeEvent..swiping) : <code>boolean</code> ℗
    * [~clicked](#SwipeEvent..clicked) : <code>boolean</code> ℗
    * [~defaults](#SwipeEvent..defaults) ℗
    * [~swipe](#SwipeEvent..swipe) ℗

<a name="SwipeEvent..swiping"></a>

### SwipeEvent~swiping : <code>boolean</code> ℗
Determines if the element is swiping or not.

**Kind**: inner property of <code>[SwipeEvent](#SwipeEvent)</code>  
**Access:** private  
<a name="SwipeEvent..clicked"></a>

### SwipeEvent~clicked : <code>boolean</code> ℗
Determines if a child has been clicked.

**Kind**: inner property of <code>[SwipeEvent](#SwipeEvent)</code>  
**Access:** private  
<a name="SwipeEvent..defaults"></a>

### SwipeEvent~defaults ℗
Sets the default `swipe` object.

**Kind**: inner property of <code>[SwipeEvent](#SwipeEvent)</code>  
**Access:** private  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| defaults | <code>object</code> |  |
| defaults.direction | <code>string</code> &#124; <code>null</code> | Direction of the swipe. Can be 'left', 'right', 'down' or 'up'. |
| defaults.duration | <code>duration</code> | Duration of the swipe. |
| defaults.distance | <code>object</code> | Distance covered by the finger while swiping. |
| defaults.distance.x | <code>number</code> | Distance in horizontal direction. |
| defaults.distance.y | <code>number</code> | Distance in vertical direction. |
| defaults.start | <code>object</code> | Details about the start of the swipe. |
| defaults.start.x | <code>number</code> | Horizontal coordinate of the start point. |
| defaults.start.y | <code>number</code> | Vertical coordinate of the start point. |
| defaults.start.time | <code>Date</code> | Date instance of start point. |
| defaults.start.touch | <code>Date</code> | Touch event for the start point. |
| defaults.end | <code>object</code> | Details about the end of the swipe. |
| defaults.end.x | <code>number</code> | Horizontal coordinate of the end point. |
| defaults.end.y | <code>number</code> | Vertical coordinate of the end point. |
| defaults.end.time | <code>Date</code> | Date instance of end point. |
| defaults.end.touch | <code>Date</code> | Touch event for the end point. |

<a name="SwipeEvent..swipe"></a>

### SwipeEvent~swipe ℗
Sets the default `swipe` object.

**Kind**: inner property of <code>[SwipeEvent](#SwipeEvent)</code>  
**Access:** private  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| defaults | <code>object</code> |  |
| defaults.direction | <code>string</code> &#124; <code>null</code> | Direction of the swipe. Can be 'left', 'right', 'down' or 'up'. |
| defaults.duration | <code>duration</code> | Duration of the swipe. |
| defaults.distance | <code>object</code> | Distance covered by the finger while swiping. |
| defaults.distance.x | <code>number</code> | Distance in horizontal direction. |
| defaults.distance.y | <code>number</code> | Distance in vertical direction. |
| defaults.start | <code>object</code> | Details about the start of the swipe. |
| defaults.start.x | <code>number</code> | Horizontal coordinate of the start point. |
| defaults.start.y | <code>number</code> | Vertical coordinate of the start point. |
| defaults.start.time | <code>Date</code> | Date instance of start point. |
| defaults.start.touch | <code>Date</code> | Touch event for the start point. |
| defaults.end | <code>object</code> | Details about the end of the swipe. |
| defaults.end.x | <code>number</code> | Horizontal coordinate of the end point. |
| defaults.end.y | <code>number</code> | Vertical coordinate of the end point. |
| defaults.end.time | <code>Date</code> | Date instance of end point. |
| defaults.end.touch | <code>Date</code> | Touch event for the end point. |

