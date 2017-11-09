/* globals automark */
import React, {Component} from 'react'
import click from './actions/click'
import fromXPath from './actions/fromXPath'

class Editor extends Component {
  state={
    steps: []
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
      steps: [...this.state.steps, xpath]
    })
  }

  replay = () => {
    this.state.steps.reduce((promise, step) => {
      const element = fromXPath(step)
      if (!element) return

      return promise
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => click(element))
    }, Promise.resolve())
  }

  render () {
    const renderedSteps = this.state.steps.map(step => {
      return (
        <tr>
          <td>
            {step}
          </td>
        </tr>
      )
    })

    return (
      <div>
        <button onClick={this.activateSelectMode}>Select an element</button>
        <table>
            {renderedSteps}
        </table>
        <button onClick={this.replay}>Click on these elements</button>
      </div>
    )
  }
}

export default Editor
