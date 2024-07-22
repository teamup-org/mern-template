import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { uploadFile } from "../upload";
const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// Upload file route
router.post("/upload", upload.single("file"), uploadFile);

// View files route
router.get("/files", (req: Request, res: Response) => {
	const directory = "/uploads";

	fs.readdir(directory, (err, files) => {
		if (err) {
			res.status(500).json({ error: "Failed to retrieve files" });
		} else {
			res.status(200).json({ files });
		}
	});
});

// View classes route
router.get("/classes", (req: Request, res: Response) => {
	// Handle class retrieval logic here
	res.status(200).json({ classes: ["Math", "Science", "History"] });
});

// View

export default router;
