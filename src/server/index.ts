import express from 'express';
import path from 'path';

import upload from './upload';

const app = express();
const PORT = process.env.PORT || 3000;
import { countWordsInPdf, countWordsInPdf3char, countWordsInImg } from './report';

// upload file routing
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ message: 'No file selected!' });
      } else {
        res.status(200).json({
          message: 'File uploaded successfully!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});


// Endpoint to count total words in a PDF
app.get('/count-words', async (req, res) => {
  const filePath = req.query.filePath as string; // Assuming filePath is passed as a query parameter
  try {
    const wordCount = await countWordsInPdf(filePath);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words in PDF' });
  }
});

// Endpoint to count words longer than 3 characters in a PDF
app.get('/count-words-3char', async (req, res) => {
  const filePath = req.query.filePath as string; // Assuming filePath is passed as a query parameter
  try {
    const wordCount = await countWordsInPdf3char(filePath);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words longer than 3 characters in PDF' });
  }
});

app.get('/count-words-img', async (req, res) => {
  const filePath = req.query.filePath as string;
  try {
    const wordCount = await countWordsInImg(filePath);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words in IMG' });
  }
});


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