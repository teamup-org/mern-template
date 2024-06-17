import express from 'express';
import path from 'path';
import cors from 'cors'
import OpenAI from 'openai';
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

app.use(cors())

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..')));

// Example of a simple API endpoint (order matters)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.post('/rewrite-ai', async (req, res) => {
  const message = req.query.message

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `Rewrite this description with 30 words or less: ${message}` }],
    model: "gpt-3.5-turbo",
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