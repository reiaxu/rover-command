import React from 'react';
import './App.css';
import { useMqttState } from 'mqtt-react-hooks';

import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';


export default function PostMessage() {

    const { client } = useMqttState();

    function moveForward() {
        return client.publish('marsrover', '1');
    }

    function turnBackwards() {
        return client.publish('marsrover', '2');
    }

    function turnLeft() {
        return client.publish('marsrover', '3');
    }

    function turnRight() {
        return client.publish('marsrover', '4');
    }
        return (
            <div className="App">
                <div className="App-lhs">

            <img src={up} className="App-logo" alt="up-button" onClick={() => moveForward} />
            <br></br>
            <img src={left} className="App-logo" alt="left-button" onClick={() => turnBackwards} />
            <img src={down} className="App-logo" alt="down-button" onClick={() => turnLeft} />
            <img src={right} className="App-logo" alt="right-button" onClick={() => turnRight} />


                </div>
            </div>
        );
    
}
