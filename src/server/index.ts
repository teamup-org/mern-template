import express from 'express';
import path from 'path';

import connectDB from './helpers/db';
import userRoutes from './routes/user';
import docRoutes from './routes/doc';

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
}

main().catch(console.error);

app.use(express.json());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/docs', docRoutes);

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
