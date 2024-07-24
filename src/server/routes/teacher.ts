import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { uploadFile } from "../upload";
const router = express.Router();
const uploadFolder = "./uploads/";
// Set up multer storage for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdir(uploadFolder, { recursive: true }, function (err) {
			if (err) {
				console.error("Error creating upload folder:", err);
			}
			cb(null, uploadFolder);
		});
	},
	filename: function (req, file, cb) {
		const originalName = path.parse(file.originalname).name; // Get the name without the extension
		const extension = path.extname(file.originalname);
		cb(null, `${originalName}-${Date.now()}${extension}`);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 100000000 }, // 100MB limit
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("file");

// Upload file route
router.post("/upload", upload, uploadFile);

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
function checkFileType(
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) {
	// Include docx in the allowed file types
	const filetypes = /jpeg|jpg|png|gif|pdf|docx/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	// Check for multiple possible MIME types
	const mimetype =
		filetypes.test(file.mimetype) ||
		file.mimetype ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document";

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Error: Unsupported file upload type"));
	}
}
export default router;
