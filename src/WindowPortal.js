import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'

// From https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202

class WindowPortal extends PureComponent {
  constructor (props) {
    super(props)
    // STEP 1: create a container <div>
    this.containerEl = document.createElement('div')
    this.externalWindow = null
  }

  render () {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl)
  }

  componentDidMount () {
    // STEP 3: open a new browser window and store a reference to it
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200')

    copyStyles(document, this.externalWindow.document)
    // Copy automark
    this.externalWindow.automark = window.automark

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl)
  }

  componentWillUnmount () {
    // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by closing the window
    this.externalWindow.close()
  }
}

function copyStyles (sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style')

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText))
      })

      targetDoc.head.appendChild(newStyleEl)
    } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link')

      newLinkEl.rel = 'stylesheet'
      newLinkEl.href = styleSheet.href
      targetDoc.head.appendChild(newLinkEl)
    }
  })
}

export default WindowPortal
