const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TeamUp';
const client = new MongoClient(url);

async function testMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection('users');

    const newUser = {
      name: "test user",
      description: "this is a test description",
      time: new Date()
    };

    await collection.insertOne(newUser);
    console.log("Inserted new user");
  } catch (error) {
    console.error('Error during DB operation:', error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

testMongoDB().catch(console.error);
