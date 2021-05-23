import React from 'react'
import './App.css';
import ToggleSwitch from './toggle-switch/toggle-switch'

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';

function WelcomeMessage() {
  return <p>Welcome!</p>
}

function App() {
  return (
    <div className="App">
      <div className="App-sidebar">
        <ToggleSwitch Name='hello' /> <p className="toggle-description">Enable autonomous mode (we could add stuff like move towards x-coloured ball</p>
      
      
      <header className="App-buttons">
        <img src={up} className="App-logo" alt="up-button" /><br></br>
        <img src={left} className="App-logo" alt="left-button" />
        <img src={down} className="App-logo" alt="down-button" />
        <img src={right} className="App-logo" alt="right-button" />

      </header>
      </div>
    </div>
  );
}

export default App;
