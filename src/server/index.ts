import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'TeamUp';
const client = new MongoClient(url);

async function main() {
  console.log('Connecting to MongoDB...');
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const newUser = {
      name: 'test user',
      description: 'test description',
      time: new Date() 
    };
    await collection.insertOne(newUser);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);


// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, '..')));

// // Example of a simple API endpoint (order matters)
// app.get('/api', (req, res) => {
//   res.json({ message: 'Hello, world!' });
// });

// // Fallback for SPA routing
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// export default app;