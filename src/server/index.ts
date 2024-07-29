import express from 'express';
import path from 'path';
import cors from 'cors'
import OpenAI from 'openai';
const dotenv = require('dotenv');
dotenv.config();

import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

app.use(cors())
app.use(express.json())

const url = 'mongodb://localhost:27017'; 
// const url = 'mongodb://root:example@localhost:27017'; // use this link when using Docker for MongoDB
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

app.post('/api/users/create', async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(409).json({ message: 'User already exists' });
    }

    const result = await users.insertOne({ 
      name, 
      email, 
      description: description || '', 
      time: new Date() 
    });
    console.log(`New user created with ID: ${result.insertedId}`);
    await client.close();
    res.status(201).json({ message: 'User created', id: result.insertedId });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/api/users/update', async (req, res) => {
  try {
    const { email, time } = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const users = db.collection('users');

    const result = await users.updateOne({ email }, { $set: { time } });
    if (result.modifiedCount === 0) {
      await client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User updated with email: ${email}`);
    await client.close();
    res.status(200).json({ message: 'User time updated' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Update user profile description
app.put('/api/profiledescription', async (req, res) => {
  try {
    const { email, profileDescription } = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const users = db.collection('users');

    const result = await users.updateOne(
      { email },
      { $set: { description: profileDescription } }
    );

    if (result.modifiedCount === 0) {
      await client.close();
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Profile description updated successfully');
    await client.close();
    res.json({ message: 'Profile description updated successfully' });
  } catch (error) {
    console.error('Error updating profile description:', error);
    res.status(500).json({ error: 'Error updating profile description' });
  }
});

app.get('/api/profiledescription', async (req, res) => {
  try {
    const { email } = req.query;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ email });

    if (!user) {
      await client.close();
      return res.status(404).json({ error: 'User not found' });
    }

    await client.close();
    res.json({ description: user.description });
  } catch (error) {
    console.error('Error fetching profile description:', error);
    res.status(500).json({ error: 'Error fetching profile description' });
  }
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..')));

// Example of a simple API endpoint (order matters)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.post('/rewrite-ai', async (req, res) => {
  const {message, temperature, maxWords, tone} = req.body;

  const completion = await openai.chat.completions.create({
    messages: [ {role: "system", content: `You are an assistant that provides information in an ${tone} tone.`},
      { role: "user", content: `Rewrite this description in the first person with ${maxWords} words or less: ${message}` }],
    model: "gpt-3.5-turbo",
    temperature: temperature,
  });

  res.json({message: completion.choices[0].message.content})
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;