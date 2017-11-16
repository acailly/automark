/* globals automark */
import React, {Component} from 'react'
import StepCreator from './StepCreator'
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
    const renderedSteps = this.state.steps.map(step => {
      return (
        <div>
          {automark.getStepDescription(step)}
        </div>
      )
    })

    
    return (
      <div>
        <StepCreator onAdd={this.onAddStep}/>
        <div>
            {renderedSteps}
        </div>
        <button onClick={this.replay}>Click on these elements</button>
        <a href={this.bookmarklet()}>Bookmarklet</a>
      </div>
    )
  }
}

export default Editor
