/* globals XPathResult automark */

registerClickAction()

function registerClickAction () {
  automark.actions['click'] = {
    type: 'click',
    params: {
      target: 'element'
    },
    getDescription: function (params) {
      return 'I click on ' + params.target
    },
    execute: automarkClickExecute
  }
}

function automarkClickExecute (params) {
  var domElement = fromXPath(params.target)
  if (!domElement) return

  var rect = domElement.getBoundingClientRect()
  var x = rect.left + ((rect.right - rect.left) / 2)
  var y = rect.top + ((rect.bottom - rect.top) / 2)
  showClick(x, y)

  domElement.click()
}

function fromXPath (xpath) {
  try {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  } catch (e) {
    console.error('Invalid xpath', xpath)
  }
  return null
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
