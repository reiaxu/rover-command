import React, { useState, useRef, useEffect } from 'react'

import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'

var mqtt    = require('mqtt');
var options = {
  protocol: 'ws',
  username: 'rover',
  password: 'marsrover',
  keepalive: 60,
  reconnectPeriod: 1000,
};
var client  = mqtt.connect('ws://localhost:8081', options);

// AWS.config.region = 'us-east-1' // your region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-east-1:4c401337-1b4e-43f4-962f-b56b513f2150',
// });

// const client = new AWSMqttClient({
//   region: AWS.config.region,
//   credentials: AWS.config.credentials,
//   endpoint: 'aliowe90dtiwt-ats.iot.us-east-1.amazonaws.com', // NOTE: See below on how to get the endpoint domain
//   expires: 600, // Sign url with expiration of 600 seconds
//   clientId: '6sumb39hv8b187ak5osp19ukpg', // clientId to register with MQTT broker. Need to be unique per client
//   will: {
//       topic: 'marsrover',
//       payload: 'Connection Closed abnormally..!',
//       qos: 0,
//       retain: false
//   } 
// })

// MQTT topic
client.subscribe("marsrover");
client.subscribe('marsrovercoord'); // topic that coodinates are sent over
var note;
var rotate;

const Canvas = props => {

  const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data));
        
    }, []);
    React.useEffect(()=>{        
      console.log(data);
  },[data]);

  // Sets default React state 
  const [mesg, setMesg] = useState();
  
  client.on('message', function (topic, message, packet) {
    if (message.toString().length > 1) {
      note = message.toString();
      // Updates React state with message 
      setMesg(note);
    }
    else {
      rotate = message.toString();
    }
    });

  const canvasRef = useRef(null)
  
  const draw = ctx => {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(475,340);

    const imageObj1 = new Image();
    imageObj1.src = 'https://image.flaticon.com/icons/png/512/1767/1767183.png'
    imageObj1.onload = function() {
        console.log("Coord received " + note);
        console.log("rotate "+ rotate);
        if (rotate == "3") {
          ctx.translate(25, 25);
          ctx.rotate(-90 * Math.PI / 180);
          ctx.translate(-25, -25);
        } // west

        if (rotate == "4") {
          ctx.translate(25, 25);
          ctx.rotate(90 * Math.PI / 180);
          ctx.translate(-25, -25);
        } // east

        if (rotate == "5") {
          ctx.translate(25, 25);
          ctx.rotate(180 * Math.PI / 180);
          ctx.translate(-25, -25);
        } // south

        if (rotate == "6") {
          ctx.translate(25, 25);
          ctx.rotate(360 * Math.PI / 180);
          ctx.translate(-25, -25);
        } // north 

        ctx.drawImage(imageObj1, (!note) ? 0 : note.substring(0,note.length/2), (!note) ? 0 : note.substring(note.length/2, note.length) , 50, 50);
    }



      const red = !data ? "Loading..." : 
      ctx.fillStyle = '#FF5630'
      ctx.beginPath()
      ctx.arc(!data ? "Loading..." :data.red.xcoord, !data ? "Loading..." :data.red.ycoord, 10, 0, 2*Math.PI)
      ctx.fill()

      const orange = !data ? "Loading..." : 
      ctx.fillStyle = '#FF8B00'
      ctx.beginPath()
      ctx.arc(!data ? "Loading..." :data.orange.xcoord, !data ? "Loading..." :data.orange.ycoord, 10, 0, 2*Math.PI)
      ctx.fill()

      const green = !data ? "Loading..." : 
      ctx.fillStyle = '#36B37E'
      ctx.beginPath()
      ctx.arc(!data ? "Loading..." :data.green.xcoord, !data ? "Loading..." :data.green.ycoord, 10, 0, 2*Math.PI)
      ctx.fill()

      const blue = !data ? "Loading..." : 
      ctx.fillStyle = '#00B8D9'
      ctx.beginPath()
      ctx.arc(!data ? "Loading..." :data.blue.xcoord, !data ? "Loading..." :data.blue.ycoord, 10, 0, 2*Math.PI)
      ctx.fill()

      const violet = !data ? "Loading..." : 
      ctx.fillStyle = '#5243AA'
      ctx.beginPath()
      ctx.arc(!data ? "Loading..." :data.violet.xcoord, !data ? "Loading..." :data.violet.ycoord, 10, 0, 2*Math.PI)
      ctx.fill()
  
     

  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here
    draw(context)
  }, [draw])
  
  return <canvas ref={canvasRef} {...props} width="getWidth()" height="getHeight()"/> 
}

export default Canvas