/* globals XPathResult automark */

registerSetValueAction()

function registerSetValueAction () {
  automark.actions['setValue'] = {
    type: 'setValue',
    params: {
      target: 'element',
      value: 'text'
    },
    getDescription: function (params) {
      return 'I enter ' + params.value + ' in field ' + params.target
    },
    execute: automarkSetValueExecute
  }
}

function automarkSetValueExecute (params) {
  var domElement = fromXPath(params.target)
  if (!domElement) return

  domElement.value = params.value
}

function fromXPath (xpath) {
  try {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  } catch (e) {
    console.error('Invalid xpath', xpath)
  }
  return null
}
