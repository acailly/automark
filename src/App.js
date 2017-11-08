import React, { Component } from 'react';
import './App.css';
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
      <div className="App">
        <div className="App-header">
          <h2>Automark</h2>
          <div>
            <div>
              Counter value is <b>{this.state.counter}</b> 
            </div>
            <div style={{margin: 5}}>
              <button onClick={this.increment}>+</button>
              <button onClick={this.decrement}>-</button>
            </div>
          </div>
        </div>
        <div style={{margin: 5}}>
          <Editor />
        </div>
      </div>
    );
  }
}

export default App;
