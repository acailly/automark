/* globals EventTarget */

if (!automark) {
  console.log('[AUTOMARK]', 'Initializing...')

  var automark = {}
  automark.listeners = []

  automark.addEventListener = function (listener) {
    var index = automark.listeners.indexOf(listener)
    if (index > -1) {
      console.log('[AUTOMARK][ERROR]', 'The listener to add is already present')
    } else {
      console.log('[AUTOMARK]', 'Add a listener')
      automark.listeners.push(listener)
    }
  }

  automark.removeEventListener = function (listener) {
    var index = automark.listeners.indexOf(listener)
    if (index > -1) {
      automark.listeners.splice(index, 1)
      console.log('[AUTOMARK]', 'Remove a listener')
    } else {
      console.log('[AUTOMARK][ERROR]', 'The listener to remove has not been found')
    }
  }

  console.log('[AUTOMARK]', 'Proxify document.addEventListener function')
  proxifyAddEventListener(automarkProxy)

  console.log('[AUTOMARK]', 'Add an event listener for every DOM event type')
  listenAllDocumentEvents()

  console.log('[AUTOMARK]', 'Initialized.')
}

function automarkProxy (event) {
  if (event.type === 'click') {
    var xpath = getPathTo(event.target)
    console.log('[AUTOMARK]', 'I just seen a click event on', event.target, event)
    automark.listeners.forEach(function (listener) {
      listener(event, xpath)
    })
  }

  /* if(event.type === 'click'){

    console.log('CLICK', xpath)

    //Find the element from the xpath
    var element = document.evaluate( xpath ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue
    if (!element) return
    console.log('FOUND', element)

    //Show click on the element
    eventFire(element, 'mousedown')

    var rect = element.getBoundingClientRect();
    var x = rect.left + (rect.right - rect.left) / 2
    var y = rect.top + (rect.bottom - rect.top) /2
    showClick(x, y)
  }
  else if(event.type === 'mousedown'){
    console.log('MOUSE DOWN!')
  } */
}

function proxifyAddEventListener (callback) {
  var oldAddEventListener = EventTarget.prototype.addEventListener
  function addEventListenerEx () {
    // Copy arguments (type, listener, ...)
    var argumentsEx = []
    for (var i = 0; i < arguments.length; i++) {
      argumentsEx[i] = arguments[i]
    }

    // Proxify the listener
    var listenerToAdd = arguments[1]
    var listenerProxy = function () {
      callback.apply(this, arguments)
      listenerToAdd.apply(this, arguments)
    }
    listenerToAdd.proxy = listenerProxy
    argumentsEx[1] = listenerProxy

    // Register the proxified listener
    oldAddEventListener.apply(this, argumentsEx)
  }
  EventTarget.prototype.addEventListener = addEventListenerEx

  var oldRemoveEventListener = EventTarget.prototype.removeEventListener
  function removeEventListenerEx () {
    // Copy arguments (type, listener, ...)
    var argumentsEx = []
    for (var i = 0; i < arguments.length; i++) {
      argumentsEx[i] = arguments[i]
    }

    // Deproxify the listener
    var listenerToRemove = arguments[1].proxy || arguments[1]
    argumentsEx[1] = listenerToRemove

    oldRemoveEventListener.apply(this, argumentsEx)
  }
  EventTarget.prototype.removeEventListener = removeEventListenerEx
}

function listenAllDocumentEvents () {
  /*

  function getAllEventTypes(){

    if(location.href !='https://developer.mozilla.org/en-US/docs/Web/Events') return;

    var types = {};
    $('.standard-table:eq(0) tr').find('td:eq(1)').map(function(){
      var type = $.trim(this.innerText) || 'OtherEvent';
      types[type] = types[type] || [];
      var event = $.trim(this.previousElementSibling.innerText);
      if(event) types[type].push(event);
    });
    for(var t in types) types[t] = types[t].join(' ');
    return "var DOMEvents = "+JSON.stringify(types, null, 4).replace(/"(\w+)\":/ig, '$1:');
  }

  */

  var DOMEvents = {
    UIEvent: 'abort DOMActivate error load resize scroll select unload',
    ProgressEvent: 'abort error load loadend loadstart progress progress timeout',
    Event: 'abort afterprint beforeprint cached canplay canplaythrough change chargingchange chargingtimechange checking close dischargingtimechange DOMContentLoaded downloading durationchange emptied ended ended error error error error fullscreenchange fullscreenerror input invalid languagechange levelchange loadeddata loadedmetadata noupdate obsolete offline online open open orientationchange pause pointerlockchange pointerlockerror play playing ratechange readystatechange reset seeked seeking stalled submit success suspend timeupdate updateready visibilitychange volumechange waiting',
    AnimationEvent: 'animationend animationiteration animationstart',
    AudioProcessingEvent: 'audioprocess',
    BeforeUnloadEvent: 'beforeunload',
    TimeEvent: 'beginEvent endEvent repeatEvent',
    OtherEvent: 'blocked complete upgradeneeded versionchange',
    FocusEvent: 'blur DOMFocusIn  Unimplemented DOMFocusOut  Unimplemented focus focusin focusout',
    MouseEvent: 'click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show',
    SensorEvent: 'compassneedscalibration Unimplemented userproximity',
    OfflineAudioCompletionEvent: 'complete',
    CompositionEvent: 'compositionend compositionstart compositionupdate',
    ClipboardEvent: 'copy cut paste',
    DeviceLightEvent: 'devicelight',
    DeviceMotionEvent: 'devicemotion',
    DeviceOrientationEvent: 'deviceorientation',
    DeviceProximityEvent: 'deviceproximity',
    MutationNameEvent: 'DOMAttributeNameChanged DOMElementNameChanged',
    MutationEvent: 'DOMAttrModified DOMCharacterDataModified DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified',
    DragEvent: 'drag dragend dragenter dragleave dragover dragstart drop',
    GamepadEvent: 'gamepadconnected gamepaddisconnected',
    HashChangeEvent: 'hashchange',
    KeyboardEvent: 'keydown keypress keyup',
    MessageEvent: 'message message message message',
    PageTransitionEvent: 'pagehide pageshow',
    PopStateEvent: 'popstate',
    StorageEvent: 'storage',
    SVGEvent: 'SVGAbort SVGError SVGLoad SVGResize SVGScroll SVGUnload',
    SVGZoomEvent: 'SVGZoom',
    TouchEvent: 'touchcancel touchend touchenter touchleave touchmove touchstart',
    TransitionEvent: 'transitionend',
    WheelEvent: 'wheel'
  }

  var RecentlyLoggedDOMEventTypes = {}

  for (DOMEvent in DOMEvents) {
    var DOMEventTypes = DOMEvents[DOMEvent].split(' ')

    DOMEventTypes.filter(function (DOMEventType) {
      var DOMEventCategory = DOMEvent + ' ' + DOMEventType
      document.addEventListener(DOMEventType, function (e) {
        // if(RecentlyLoggedDOMEventTypes[DOMEventCategory]) return;
        // RecentlyLoggedDOMEventTypes[DOMEventCategory] = true;
        // setTimeout(function(){ RecentlyLoggedDOMEventTypes[DOMEventCategory] = false }, 5000);
        // var isActive = e.target==document.activeElement;
        // if(isActive) {
        //   console.info(DOMEventCategory,
        //     ' target=', e.target,
        //     ' active=', document.activeElement,
        //     ' isActive=', true );
        // } else {
        //   console.log(DOMEventCategory,
        //     ' target=', e.target,
        //     ' active=', document.activeElement,
        //     ' isActive=', false );
        // }
      }, true)
    })
  }
}

function getPathTo (element) {
  if (element.id !== '') { return "//*[@id='" + element.id + "']" }

  if (element === document.body) { return element.tagName.toLowerCase() }

  var ix = 0
  var siblings = element.parentNode.childNodes
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i]

    if (sibling === element) return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']'

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++
    }
  }
}

function eventFire (el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype)
  } else {
    var evObj = document.createEvent('Events')
    evObj.initEvent(etype, true, false)
    el.dispatchEvent(evObj)
  }
}

function showClick (x, y) {
  var clickSignal = document.createElement('div')
  clickSignal.style.zIndex = 2000
  clickSignal.style.border = '3px solid red'
  clickSignal.style['border-radius'] = '50%' // Chrome
  clickSignal.style.borderRadius = '50%'     // Mozilla
  clickSignal.style.width = '40px'
  clickSignal.style.height = '40px'
  clickSignal.style['box-sizing'] = 'border-box'
  clickSignal.style.position = 'absolute'
  clickSignal.style.webkitTransition = 'opacity 1s ease-out'
  clickSignal.style.mozTransition = 'opacity 1s ease-out'
  clickSignal.style.transition = 'opacity 1s ease-out'
  clickSignal.style.left = (x - 20) + 'px'
  clickSignal.style.top = (y - 20) + 'px'
  var element = document.body.appendChild(clickSignal)
  setTimeout(function () {
    document.body.removeChild(element)
  }, 1000)
  setTimeout(function () {
    element.style.opacity = 0
  }, 50)
}
