import fs from "fs";
import pdf from "pdf-parse";
import Tesseract from 'tesseract.js';

async function extractTextWithOCR(filePath: string): Promise<string> {
  const data = fs.readFileSync(filePath);
  const result = await Tesseract.recognize(data, 'eng', {
    logger: m => console.log(m),
  });
  return result.data.text;
}

export async function countWordsInPdf(filePath: string): Promise<number> {
	const dataBuffer = fs.readFileSync(filePath);
	const data = await pdf(dataBuffer);
	const text = data.text;
	const wordCount = text.split(/\s+/).length;
	return wordCount;
}

export async function countWordsInPdf3char(filePath: string): Promise<number> {
	const dataBuffer = fs.readFileSync(filePath);
	const data = await pdf(dataBuffer);
	const text = data.text;
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length > 3);
	const wordCount = filteredWords.length;
	return wordCount;
}


export async function countWordsInImg(filePath: string): Promise<number> {
	const text = await extractTextWithOCR(filePath);
	const wordCount = text.split(/\s+/).length;
	return wordCount;
}