import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Upload file route
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  // Handle file upload logic here
  // You can access the uploaded file using req.file
  // Save the file details to a database or perform any other necessary operations
  res.status(200).json({ message: 'File uploaded successfully' });
});

// View files route
router.get('/files', (req: Request, res: Response) => {
  const directory = '/uploads';

  fs.readdir(directory, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve files' });
    } else {
      res.status(200).json({ files });
    }
  });
});

// View classes route
router.get('/classes', (req: Request, res: Response) => {
  // Handle class retrieval logic here
  res.status(200).json({ classes: ['Math', 'Science', 'History'] });
});

// View 

export default router;