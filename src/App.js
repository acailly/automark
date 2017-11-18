import React, { Component } from 'react';
import Editor from './Editor'

class App extends Component {
  state = {counter: 0}

  increment = (e) => {
    e.preventDefault()
    this.setState({counter: this.state.counter + 1})
  }
  
  decrement = (e) => {
    e.preventDefault()
    this.setState({counter: this.state.counter - 1})
  }

  render() {
    return (
      <div>
        <h1>Automark</h1>
        <div className='row flex-top'>
          <div className='col'>
            <h2>Playground</h2>
            <div>
              Counter value is <b>{this.state.counter}</b> 
            </div>
            <div style={{margin: 5}}>
              <button className="btn-small" onClick={this.increment}>+</button>
              <button className="btn-small" onClick={this.decrement}>-</button>
            </div>
            <div style={{margin: 5}}>
              <input className="input-block" type='text' />
            </div>
          </div>
          <div className='col col-fill'>
            <h2>Editor</h2>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
