import React, {Component} from 'react'

class TextParam extends Component {

  inputChanged = (event) => {
    const {onChange} = this.props
    onChange(event.target.value)
  }

  render () {
    return (
      <input type='text' onChange={this.inputChanged} />
    )
  }
}

export default TextParam
