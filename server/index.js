const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//const db = require('./db')
//const ballRouter = require('./routes/ball-router')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.use('/api', ballRouter)

const { MongoClient } = require("mongodb");
var mqtt     = require('mqtt');
var mqttUri  = 'ws://localhost:8081';

var options = {
  protocol: 'ws',
  // username: 'rover',
  // password: 'marsrover',
  keepalive: 60,
  reconnectPeriod: 1000,
};

var mqttclient   = mqtt.connect(mqttUri, options);

mqttclient.on('connect', function () {
    mqttclient.subscribe("marsroverballs");
    console.log('connected')
});

// const AWS = require('aws-sdk')
// const AWSMqttClient = require('aws-mqtt/lib/NodeClient')
 
// AWS.config.region = 'us-east-1' 
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:4c401337-1b4e-43f4-962f-b56b513f2150',
// });
 
// const mqttclient = new AWSMqttClient({
//   region: AWS.config.region,
//   credentials: AWS.config.credentials,
//   endpoint: 'aliowe90dtiwt-ats.iot.us-east-1.amazonaws.com', // NOTE: get this value with `aws iot describe-endpoint`
//   clientId: '6sumb39hv8b187ak5osp19ukpg', // clientId to register with MQTT broker. Need to be unique per client
//   caPath: "rx319-key-pair-06-02-21.pem",
//   protocol: "wss",
//   will: {
//     topic: 'marsrover',
//     payload: 'Connection Closed abnormally..!',
//     qos: 0,
//     retain: false
//   } 
// })

// mqttclient.on('connect', function () {
//     mqttclient.subscribe("marsroverballs");
//     console.log('connected')
// });

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

MongoClient.connect(uri, function(error, client) {
    var database = client.db('map')
    if(error != null) {
        throw error;
    }

    var collection = database.collection('balls');
    collection.createIndex( 
    { "topic" : 1, "xcoord" : 1, "ycoord" : 1, "dist" : 1 } );

    mqttclient.on('message', function (topic, message) {
        console.log(message.toString());
        var filter = {colour: message.toString().substring(0,1)};
        const options = { upsert: true };
        var messageObject = { $set: {
            colour: message.toString().substring(0,1),
            xcoord: parseInt(message.toString().substring(1,5)),
            ycoord: parseInt(message.toString().substring(5,9)),
            dist: parseInt(message.toString().substring(9,13)),
        }};

        collection.findOneAndUpdate(filter, messageObject, options, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});

async function run() {

  try {
    await client.connect();


    const database = client.db('map');
    const balls = database.collection('balls');


    // Query for a movie that has the title 'Back to the Future'

    const red = await balls.findOne({ colour: 'r' }); 
    const orange = await balls.findOne({ colour: 'o' }); 
    const green = await balls.findOne({ colour: 'g' }); 
    const blue = await balls.findOne({ colour: 'b' }); 
    const violet = await balls.findOne({ colour: 'v' }); 

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
