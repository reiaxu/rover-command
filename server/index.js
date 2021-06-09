const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const ballRouter = require('./routes/ball-router')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.use('/api', ballRouter)

const { MongoClient } = require("mongodb");
var mqtt = require("mqtt");
var mqttUri  = 'wss://test.mosquitto.org:8081';
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'rover',
  keepalive:0, 	
};
var mqttclient = mqtt.connect(mqttUri, options);
mqttclient.subscribe('marsroverballs')

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {

    mqttclient.on('connect', function () {
        //mqttclient.subscribe(config.mqtt.namespace);
        console.log("connected  "+ client.connected);
    });
  try {
    await client.connect();

    const database = client.db('map');
    const balls = database.collection('balls');
    console.log('hi')
    
    
    

    client.on('message', function (topic, message) {
        console.log('hi2')
        var messageObject = {
            colour: message.toString().substring(0,1),
            // xcoord: 
            // ycoord:
            // dist:
        };

        balls.insertOne(messageObject, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });

    // Query for a movie that has the title 'Back to the Future'

    const red = await balls.findOne({ colour: 'red' }); 
    const orange = await balls.findOne({ colour: 'orange' }); 
    const green = await balls.findOne({ colour: 'green' }); 
    const blue = await balls.findOne({ colour: 'blue' }); 
    const violet = await balls.findOne({ colour: 'violet' }); 

    console.log(red,orange,green,blue,violet);
    app.get("/api", (req, res) => {
        res.json({ red,orange,green,blue,violet });
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))