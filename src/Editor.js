/* globals automark */
import React, {Component} from 'react'

class Editor extends Component {
  state={
    element: 'No element'
  }

  activateSelectMode = (e) => {
    e.preventDefault()
    console.log('[EDITOR]', 'Activate select mode') 
    automark.addEventListener(this.onAutomarkEvent)
  }

  onAutomarkEvent = (event, xpath) =>{
    console.log('[EDITOR]', 'Deactivate select mode') 
    automark.removeEventListener(this.onAutomarkEvent)
    this.setState({
      element: xpath
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.activateSelectMode}>Select an element</button>
        <div>
            You clicked on <b>{this.state.element}</b>
        </div>
      </div>
    )
  }
}

export default Editor
