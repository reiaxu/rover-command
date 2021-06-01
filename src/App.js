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

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';
import rotate from './images/rotate.png';

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryThreeQuarters, faBolt, faDotCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faBatteryThreeQuarters, faBolt, faDotCircle);

var mqtt    = require('mqtt');
var count = 0;
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'rover',
  keepalive:0, 	
};
var client  = mqtt.connect('wss://test.mosquitto.org:8081', options);

// MQTT topic
client.subscribe('marsrovercoord'); // topic that coodinates are sent over

  client.on("connect",function(){	
    console.log("connected  "+ client.connected);
    // client.publish('marsrover','connected',options);
  });

  client.on("error",function(error){
    console.log("Can't connect" + error);
    // process.exit(1)
  });

function Frontend() {
  var note;

  // Sets default React state 
  const [mesg, setMesg] = useState(<Fragment><em>Nothing heard</em></Fragment>);
  const [connectionStatus, setConnectionStatus] = useState(<Fragment><em>Not connected</em></Fragment>);

  client.on("connect",function(){	
    setConnectionStatus("Connected");
  });
  
  client.on('message', function (topic, message, packet) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note);
    });

    function sendMessage(topic,msg,options){
      console.log("publishing",msg);
        
      if (client.connected == true){
          
      client.publish(topic,msg,options);
        
      }
      // count+=1;
      // if (count==2) //end script
      //   // clearTimeout(timer_id); //stop timer
      //   client.end();	
    }


    return (
      <div className="App">
        <div className="App-lhs">
          <header className="App-map">

          </header>

        </div>

        <div className="App-sidebar">

          <header className="App-description">

          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="bolt" /> Connection status: {connectionStatus}</p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="dot-circle" /> Coordinate received: {mesg}</p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="battery-three-quarters" /> Battery status: </p>
    
          </header>

          <header className="App-warnings">
            <Circle center={[1004, 294]} radius={10} color='#BADA55' />
            <p>Your rover is safe! No potential collisions detected.</p>
          </header>

          <ToggleSwitch Name='toggle' /> <p className="toggle-description">Enable autonomous mode</p>
          {/* (we could add stuff like move towards x-coloured ball etc) */}
        
        
          <header className="App-buttons">
            <img src={up} className="App-logo" alt="up-button" onClick={() => sendMessage('marsrover', '1', options)} />
            <br></br>
            <img src={left} className="App-logo" alt="left-button" onClick={() => sendMessage('marsrover', '3', options)} />
            <img src={down} className="App-logo" alt="down-button" onClick={() => sendMessage('marsrover', '2', options)} />
            <img src={right} className="App-logo" alt="right-button" onClick={() => sendMessage('marsrover', '4', options)} />
          </header>
        </div>
      </div>
    );

}

export default function App() {
  return (
        <Frontend />
  );
}
