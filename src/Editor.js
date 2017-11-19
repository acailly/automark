/* globals automark */
import React, {Component} from 'react'
import {isEmpty} from 'ramda'
import StepCreator from './StepCreator'
import WindowPortal from './WindowPortal'
import bookmarkletFromCode from './bookmarklet/bookmarkletFromCode'

class Editor extends Component {
  state={
    steps: []
  }

  onAddStep = (step) => {
    this.setState({
      steps: [...this.state.steps, step]
    })
  }

  replay = () => {
    automark.replaySteps(this.state.steps)
  }

  bookmarklet = () => {
    const stringifiedSteps = JSON.stringify(this.state.steps)
    const replayCode = `automark.replaySteps(${stringifiedSteps})`
    return bookmarkletFromCode(replayCode)
  }

  render () {    

    const renderedSteps = this.state.steps.map((step, stepIndex) => {
      return (
        <tr key={'step' + stepIndex}>
          <td>{stepIndex + 1}</td>
          <td>{automark.getStepDescription(step)}</td>
        </tr>
      )
    })
    
    const editorWindowPortal = (
      <WindowPortal>
        <h4>Create a step</h4>
        <StepCreator onAdd={this.onAddStep}/>
        <h4>Steps</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isEmpty(renderedSteps) ? 
              <tr>
                <td></td>
                <td>No Step</td>
              </tr>
              : renderedSteps}
          </tbody>
        </table>
        <button onClick={this.replay}>Click to replay</button>
        or use this <a href={this.bookmarklet()}>Bookmarklet</a>
      </WindowPortal>
    )

    return (
      <div>
        {false && editorWindowPortal}        
        <h4>Create a step</h4>
        <StepCreator onAdd={this.onAddStep}/>
        <h4>Steps</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isEmpty(renderedSteps) ? 
              <tr>
                <td></td>
                <td>No Step</td>
              </tr>
              : renderedSteps}
          </tbody>
        </table>
        <button onClick={this.replay}>Click to replay</button>
        or use this <a href={this.bookmarklet()}>Bookmarklet</a>
      </div>
    )
  }
}

export default Editor
