import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'

class App extends Component {
  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(json => console.log(json))
  }
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
