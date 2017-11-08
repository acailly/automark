/* globals automark */
import React, {Component} from 'react'
import click from './actions/click'
import fromXPath from './actions/fromXPath'

class Editor extends Component {
  state={
    elementXPath: 'No element'
  }

  activateSelectMode = (event) => {
    event.preventDefault()
    console.log('[EDITOR]', 'Activate select mode') 
    automark.addEventListener(this.onAutomarkEvent)
  }

  onAutomarkEvent = (event, xpath) =>{
    event.preventDefault()
    console.log('[EDITOR]', 'Deactivate select mode') 
    automark.removeEventListener(this.onAutomarkEvent)
    this.setState({
      elementXPath: xpath
    })
  }

  replay = () => {
    var element = fromXPath(this.state.elementXPath)
    if (!element) return

    click(element)
  }

  render () {
    return (
      <div>
        <button onClick={this.activateSelectMode}>Select an element</button>
        <div>
            You clicked on <b>{this.state.elementXPath}</b>
        </div>
        <button onClick={this.replay}>Click on that element</button>
      </div>
    )
  }
}

export default Editor
