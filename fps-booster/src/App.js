import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import Form from './components/Form'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <h1> Om Shri Ganeshah namah!</h1>    */}
        <Form />       
      </div>
    );
  }
}

export default App;
