import { Request, Response } from "express";
import Doc from "../../models/doc";
import {
	contentInDocx,
	contentInImg,
	contentInPdf,
	countWordsInDocx,
	countWordsInImg,
	countWordsInPdf,
} from "./report"; // Adjust the import based on your actual file structure
export const uploadFile = async (
	req: Request,
	res: Response
): Promise<void> => {
	if (!req.file) {
		res.status(400).json({ message: "No file selected!" });
		return;
	}
	const filePath = `uploads/${req.file.filename}`;
	const fileExtension = req.file.filename.split(".").pop()?.toLowerCase();

	let wordCount = 0;
	let wordCount3Plus = 0;
	let wordCount4Plus = 0;
	let content: string[] = [""];

	try {
		if (fileExtension === "pdf") {
			content = await contentInPdf(filePath, 1);
			wordCount = await countWordsInPdf(filePath, 1);
			wordCount3Plus = await countWordsInPdf(filePath, 3);
			wordCount4Plus = await countWordsInPdf(filePath, 4);
		} else if (["jpeg", "jpg", "png"].includes(fileExtension!)) {
			content = await contentInImg(filePath, 1);
			wordCount = await countWordsInImg(filePath, 1);
			wordCount3Plus = await countWordsInImg(filePath, 3);
			wordCount4Plus = await countWordsInImg(filePath, 4);
		} else if (fileExtension === "docx") {
			content = await contentInDocx(filePath, 1);
			wordCount = await countWordsInDocx(filePath, 1);
			wordCount3Plus = await countWordsInDocx(filePath, 3);
			wordCount4Plus = await countWordsInDocx(filePath, 4);
		} else {
			throw new Error("Unsupported file type");
		}

		const document = new Doc({
			title: req.file.filename,
			content,
			wordCount,
			wordCount3Plus,
			wordCount4Plus,
		});

		await document.save();

		res.status(200).json({
			message: "File uploaded and processed successfully!",
			file: filePath,
			document,
		});
	} catch (err) {
		res.status(500).json({ message: "Failed to process file" });
	}
};
