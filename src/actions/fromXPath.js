/* globals XPathResult */

export default xpath => {
  try {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  } catch (e) {
    console.error('Invalid xpath', xpath)
  }
  return null
}
