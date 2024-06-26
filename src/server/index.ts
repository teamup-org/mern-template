import express from 'express';
import path from 'path';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

const url = 'mongodb://root:example@localhost:27017';
const dbName = 'TeamUp';
const client = new MongoClient(url);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:8080',                  // replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],        // add the HTTP methods you're using
  allowedHeaders: ['Content-Type', 'Authorization'] // add the headers you're using
}));

async function setupDb() {
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

setupDb().catch(console.error);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..')));

// Example of a simple API endpoint (order matters)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;