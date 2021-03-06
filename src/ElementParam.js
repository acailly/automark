/* globals automark */
import React, {Component} from 'react'

class ElementParam extends Component {
  
  state={}

  activateSelectMode = (event) => {
    event.preventDefault()
    console.log('[EDITOR]', 'Activate select mode') 
    automark.addEventListener(this.onAutomarkEvent)
  }
  
  onAutomarkEvent = (event, xpath) =>{
    event.preventDefault()
    console.log('[EDITOR]', 'Deactivate select mode') 
    automark.removeEventListener(this.onAutomarkEvent)
    
    const {onChange} = this.props
    onChange(xpath)

    this.setState({xpath})
  }

  render () {
    return (
      <div>
        <button onClick={this.activateSelectMode}>{this.state.xpath || 'Select an element'}</button>
      </div>
    )
  }
}

export default ElementParam
