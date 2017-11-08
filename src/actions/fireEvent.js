export default (element, eventType) => {
  if (element.fireEvent) {
    element.fireEvent('on' + eventType)
  } else {
    var evObj = document.createEvent('Events')
    evObj.initEvent(eventType, true, false)
    element.dispatchEvent(evObj)
  }
}
