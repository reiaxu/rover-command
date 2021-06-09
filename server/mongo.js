const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('map');
    const movies = database.collection('balls');

    // Query for a movie that has the title 'Back to the Future'
    // const query = { colour: 'red' };
    // const movie = await movies.findOne(query);

    console.log(movies);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);