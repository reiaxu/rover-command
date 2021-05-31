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

import { Connector } from 'mqtt-react-hooks';

import Status from './Status.js';
import PostMqtt from './postMessage.js';

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';

var mqtt    = require('mqtt');
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'rover' 	
};
var client  = mqtt.connect('mqtt://test.mosquitto.org:8080', options);

// preciouschicken.com is the MQTT topic
client.subscribe('marsrover');


function Frontend() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note);
    client.end();
    });

  // Sets default React state 
  const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);

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

    return (
      <div className="App">
        <div className="App-lhs">
          <header className="App-map">

          </header>

        </div>

        <div className="App-sidebar">

          <header className="App-description">
            <Status />
            <p>The message is: {mesg}</p>
    
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

export default function App() {
  return (
    <Connector brokerUrl="wss://localhost:8080"
    options={{
      keepalive:0,
      clientId: "rover",
    }}
    >
        <Frontend />
    </Connector>
  );
}
