const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TeamUp';

async function setupDb() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const collections = ['users'];

    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map(col => col.name);

    for (let collectionName of collections) {
      if (!existingCollectionNames.includes(collectionName)) {
        await db.createCollection(collectionName);
        console.log(`Created collection: ${collectionName}`);
      } else {
        console.log(`Collection ${collectionName} already exists`);
      }
    }
  } catch (err) {
    console.error("Error setting up database", err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

setupDb();
