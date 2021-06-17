import React, { useState, Fragment, Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Colorselect from './selectColour.js';
import Canvas from './map/map.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';
import rotate from './images/rotate.png';
import turn from './images/turn.png';

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryThreeQuarters, faBolt, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faBatteryThreeQuarters, faBolt, faDotCircle, faCircle);

var mqtt    = require('mqtt');
var count = 0;
var options = {
  protocol: 'ws',
  // username: 'rover',
  // password: 'marsrover',
  keepalive: 60,
  reconnectPeriod: 1000,
};
var client  = mqtt.connect('ws://localhost:8081', options);
 
// MQTT topic
client.subscribe('marsrovercoord'); // topic that coodinates are sent over

// frontend

function Frontend() {

  const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("http://localhost:5000/api")
        .then((res) => res.json())
        .then((data) => setData(data));
        
    }, []);
    React.useEffect(()=>{        
      console.log(data);
  },[data]);

  var note;

  // Sets default React state 
  const [mesg, setMesg] = useState(<Fragment><em>Nothing heard</em></Fragment>);
  const [connectionStatus, setConnectionStatus] = useState(<Fragment><em>Not connected</em></Fragment>);

  client.on("connect",function(){	
    console.log("connected  "+ client.connected);
    //client.publish("marsrover", '0.', options);
    setConnectionStatus("Connected");
  });

  client.on("error",function(error){
    console.log("Can't connect" + error);
    setConnectionStatus("Disconnected");
  });
  
  client.on('message', function (topic, message, packet) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    });

    function sendMessage(topic,msg,options){
      console.log("publishing",msg);
        
      if (client.connected == true){
          
      client.publish(topic,msg,options);
        
      }	
    }

    return (
      <div className="App">
        <div className="App-lhs">
          <header className="App-map">
            <Canvas/>
          </header>

        </div>

        <div className="App-sidebar">

          <header className="App-description">

          <p style={{paddingLeft: "10px", paddingTop: "4px"}}><FontAwesomeIcon icon="bolt" /> Connection status: {connectionStatus}</p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="dot-circle" /> Coordinate received: {mesg}</p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="battery-three-quarters" /> Battery status: </p> 
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="circle" style={{color: "#FF5630"}} /> Distance from red ball: {!data ? "Loading..." : data.red.dist} </p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="circle" style={{color: "#FF8B00"}} /> Distance from orange ball: {!data ? "Loading..." : data.orange.dist} </p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="circle" style={{color: "#36B37E"}} /> Distance from green ball: {!data ? "Loading..." : data.green.dist} </p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="circle" style={{color: "#00B8D9"}} /> Distance from blue ball: {!data ? "Loading..." : data.blue.dist} </p>
          <p style={{paddingLeft: "10px"}}><FontAwesomeIcon icon="circle" style={{color: "#5243AA"}} /> Distance from violet ball: {!data ? "Loading..." : data.violet.dist} </p>
          </header>

          <header className="color-selector">
            <Colorselect Name='select' /> 
          </header>
        
          <header className="App-buttons">
            <img src={turn} className="App-logo" alt="180-button" style={{width: "15%", height: "15%", marginTop: "65px"}} onClick={() => sendMessage('marsrover', '5.', options)} />
            <img src={up} className="App-logo" alt="up-button" onClick={() => sendMessage('marsrover', '1.', options)} />
            <img src={rotate} className="App-logo" alt="360-button" style={{width: "15%", height: "15%", marginTop: "65px"}} onClick={() => sendMessage('marsrover', '6.', options)} />
            <br></br>
            <img src={left} className="App-logo" alt="left-button" onClick={() => sendMessage('marsrover', '3.', options)} />
            <img src={down} className="App-logo" alt="down-button" onClick={() => sendMessage('marsrover', '2.', options)} />
            <img src={right} className="App-logo" alt="right-button" onClick={() => sendMessage('marsrover', '4.', options)} />
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
