// import express from 'express';
// import path from 'path';
// import { MongoClient } from 'mongodb';

// const app = express();
// const PORT = process.env.PORT || 3000;

// const url = 'mongodb://localhost:27017';
// const dbName = 'TeamUp';
// const client = new MongoClient(url);

// async function main() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     app.locals.db = client.db(dbName);
//   } catch (error) {
//     console.error('Unable to connect to MongoDB:', error);
//     process.exit(1);
//   }
// }

// main().catch(console.error);

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

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import userRoutes from './routes/user'; // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURL = 'mongodb://localhost:27017/TeamUp';

mongoose.connect(mongoURL, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Unable to connect to MongoDB:', error);
  process.exit(1);
});

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..')));

// Use routes
app.use('/api/users', userRoutes);

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
