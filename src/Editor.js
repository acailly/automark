import React, {Component} from 'react'

class Editor extends Component {
  state={
    element: 'No element'
  }

  activateSelectMode = () => {
    console.log('SHOULD NOT BE CALLED TWICE') //TODO
    window.addAutomarkEventListener(this.onAutomarkEvent)
  }

  onAutomarkEvent = (event, xpath) =>{
    window.removeAutomarkEventListener(this.onAutomarkEvent)
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
