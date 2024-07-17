import express from "express";
import path from "path";

import upload from "./upload";

import {
  countWordsInDocx,
  countWordsInImg,
  countWordsInPdf
} from "./report";
import userRoutes from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3000;

// upload file routing
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).json({ message: err.message });
		} else {
			if (req.file === undefined) {
				res.status(400).json({ message: "No file selected!" });
			} else {
				res.status(200).json({
					message: "File uploaded successfully!",
					file: `uploads/${req.file.filename}`,
				});
			}
		}
	});
});

app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "..")));

// Example of a simple API endpoint (order matters)
app.get("/api", (req, res) => {
	res.json({ message: "Hello, world!" });
});

// Endpoint to count total words in a PDF
app.get('/count-words-pdf', async (req, res) => {
  const filePath = req.query.filePath as string; // Assuming filePath is passed as a query parameter
  const minLength = parseInt(req.query.minLength as string, 10) || 1;
  try {
    const wordCount = await countWordsInPdf(filePath, minLength);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words in PDF' });
  }
});

// Endpoint to count words in an image
app.get('/count-words-img', async (req, res) => {
  const filePath = req.query.filePath as string;
  const minLength = parseInt(req.query.minLength as string, 10) || 1;
  try {
    const wordCount = await countWordsInImg(filePath, minLength);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words in IMG' });
  }
});

// Endpoint to count words in a DOCX file
app.get('/count-words-docx', async (req, res) => {
  const filePath = req.query.filePath as string;
  const minLength = parseInt(req.query.minLength as string, 10) || 1;
  try {
    const wordCount = await countWordsInDocx(filePath, minLength);
    res.json({ wordCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count words in DOCX file' });
  }
});


// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..')));

// Example of a simple API endpoint (order matters)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Fallback for SPA routing
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
