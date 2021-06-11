import React, { useState, useRef, useEffect } from 'react'

var mqtt    = require('mqtt');
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'rover',
  keepalive:0, 	
};
var client  = mqtt.connect('wss://test.mosquitto.org:8081', options);

// MQTT topic
client.subscribe("marsrover");
client.subscribe('marsrovercoord'); // topic that coodinates are sent over


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


  var note;

  // Sets default React state 
  const [mesg, setMesg] = useState();
  
  client.on('message', function (topic, message, packet) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note);
    });

  const canvasRef = useRef(null)
  
  const draw = ctx => {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(475,340);

    const imageObj1 = new Image();
    imageObj1.src = 'https://image.flaticon.com/icons/png/512/1767/1767183.png'
    imageObj1.onload = function() {
        ctx.drawImage(imageObj1,0,0, 50, 50);
    }
    console.log({mesg});


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