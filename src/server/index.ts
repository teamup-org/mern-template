import express from "express";
import path from "path";

import cors from "cors";
import connectDB from "../db";
import { countWordsInDocx, countWordsInImg, countWordsInPdf } from "./report";
import userRoutes from "./routes/user";

import teacherRoutes from "./routes/teacher";

import Doc from '.././models/doc';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// upload file routing

app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:8080", // replace with your frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"], // add the HTTP methods you're using
		allowedHeaders: ["Content-Type", "Authorization"], // add the headers you're using
	})
);

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/teacher", teacherRoutes);
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "..")));

// Example of a simple API endpoint (order matters)
app.get("/api", (req, res) => {
	res.json({ message: "Hello, world!" });
});

// Endpoint to count total words in a PDF
app.get("/count-words-pdf", async (req, res) => {
	const filePath = req.query.filePath as string; // Assuming filePath is passed as a query parameter
	const minLength = parseInt(req.query.minLength as string, 10) || 1;
	try {
		const wordCount = await countWordsInPdf(filePath, minLength);
		res.json({ wordCount });
	} catch (error) {
		res.status(500).json({ error: "Failed to count words in PDF" });
	}
});

// Endpoint to count words in an image
app.get("/count-words-img", async (req, res) => {
	const filePath = req.query.filePath as string;
	const minLength = parseInt(req.query.minLength as string, 10) || 1;
	try {
		const wordCount = await countWordsInImg(filePath, minLength);
		res.json({ wordCount });
	} catch (error) {
		res.status(500).json({ error: "Failed to count words in IMG" });
	}
});

// Endpoint to count words in a DOCX file
app.get("/count-words-docx", async (req, res) => {
	const filePath = req.query.filePath as string;
	const minLength = parseInt(req.query.minLength as string, 10) || 1;
	try {
		const wordCount = await countWordsInDocx(filePath, minLength);
		res.json({ wordCount });
	} catch (error) {
		res.status(500).json({ error: "Failed to count words in DOCX file" });
	}
});

// Fetch all documents route
app.get('/api/documents', async (req, res) => {
	try {
	  const documents = await Doc.find().select('title tags wordCount createdAt');
	  res.json(documents);
	} catch (error) {
	  res.status(500).json({ error: 'Failed to fetch documents' });
	}
  });

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "..")));

// Example of a simple API endpoint (order matters)
app.get("/api", (req, res) => {
	res.json({ message: "Hello, world!" });
});

// Fallback for SPA routing
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
