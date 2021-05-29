import React, { useState, Fragment, Component } from 'react';
import './App.css';
import ToggleSwitch from './toggle-switch/toggle-switch';
import {
  Line,
  SteppedLine,
  PolyLine,
  Circle,
  Rectangle
} from 'draw-shape-reactjs';

import { Connector } from "mqtt-react";
import PostMqtt from './postMessage.js';

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';

class App extends Component {
  // function moveup() {
  //   console.log('1');
  // }

  // function movedown() {
  //   console.log('2');
  // }

  // function moveleft() {
  //   console.log('3');
  // }
  
  // function moveright() {
  //   console.log('4');
  // }
  render() {
    return (
      <div className="App">
        <div className="App-lhs">
          <header className="App-map">

          </header>

        </div>

        <div className="App-sidebar">

          <header className="App-description">
    
          </header>

          <header className="App-warnings">
            <Circle center={[1004, 294]} radius={10} color='#BADA55' />
            <p>Your rover is safe! No potential collisions detected.</p>
          </header>

          <ToggleSwitch Name='toggle' /> <p className="toggle-description">Enable autonomous mode</p>
          {/* (we could add stuff like move towards x-coloured ball etc) */}
        
        
          <header className="App-buttons">
            <PostMqtt />
          </header>
        </div>
      </div>
    );
  }
}

export default () => (
  <Connector mqttProps="wss://test.mosquitto.org">
      <App />
  </Connector>
);
