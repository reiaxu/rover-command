import React, { useState, Fragment } from 'react';
import './App.css';
import ToggleSwitch from './toggle-switch/toggle-switch';
import {
  Line,
  SteppedLine,
  PolyLine,
  Circle,
  Rectangle
} from 'draw-shape-reactjs';
import mqttService from "./mqtt/mqtt";

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';

// var mqtt    = require('mqtt');
// var options = {
// 	protocol: 'mqtts',
// 	// clientId uniquely identifies client
// 	// choose any string you wish
// 	clientId: 'marsrover' 	
// };
// var client  = mqtt.connect('mqtt://test.mosquitto.org:8081', options);
// client.subscribe('topic'); // topic



function WelcomeMessage() {
  return <p>Welcome!</p>
}

function moveup() {
  console.log("1");
}

function movedown() {
  console.log("2");
}

function moveleft() {
  console.log("3");
}

function moveright() {
  console.log("4");
}

function App() {
  // var note;
  // client.on('message', function (topic, message) {
  //   note = message.toString();
  //   // Updates React state with message 
  //   setMesg(note);
  //   console.log(note);
  //   client.end();
  //   });

  // // Sets default React state 
  // const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);

  return (
    <div className="App">
      <div className="App-lhs">
        <header className="App-map">

        </header>

      </div>

      <div className="App-sidebar">

        <header className="App-description">
        {/* <p>The message is: {mesg}</p> */}
	
        </header>

        <header className="App-warnings">
          <Circle center={[1004, 294]} radius={10} color='#BADA55' />
          <p>Your rover is safe! No potential collisions detected.</p>
        </header>

        <ToggleSwitch Name='toggle' /> <p className="toggle-description">Enable autonomous mode</p>
        {/* (we could add stuff like move towards x-coloured ball etc) */}
      
      
        <header className="App-buttons">
          <button><img src={up} className="App-logo" alt="up-button" onClick={this.moveup} /></button><br></br>
          <button><img src={left} className="App-logo" alt="left-button" onClick={this.moveleft} /></button>
          <button><img src={down} className="App-logo" alt="down-button" onClick={this.movedown} /></button>
          <button><img src={right} className="App-logo" alt="right-button" onClick={this.moveright} /></button>

        </header>
      </div>
    </div>
  );
}

export default App;
