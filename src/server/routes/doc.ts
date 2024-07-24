import express from 'express';
import { countWordsInDocx, countWordsInImg, countWordsInPdf } from "../helpers/report"; // Adjust the import path as needed

const router = express.Router();

// Endpoint to count total words in a PDF
router.get("/count-words-pdf", async (req, res) => {
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
router.get("/count-words-img", async (req, res) => {
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
router.get("/count-words-docx", async (req, res) => {
    const filePath = req.query.filePath as string;
    const minLength = parseInt(req.query.minLength as string, 10) || 1;
    try {
        const wordCount = await countWordsInDocx(filePath, minLength);
        res.json({ wordCount });
    } catch (error) {
        res.status(500).json({ error: "Failed to count words in DOCX file" });
    }
});

export default router;
