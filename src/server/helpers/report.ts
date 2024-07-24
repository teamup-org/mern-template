import fs from "fs";
import mammoth from "mammoth";
import pdf from "pdf-parse";
import Tesseract from "tesseract.js";

async function extractTextWithOCR(filePath: string): Promise<string> {
	const data = fs.readFileSync(filePath);
	const result = await Tesseract.recognize(data, "eng", {
		logger: (m) => console.log(m),
	});
	return result.data.text;
}

export async function countWordsInPdf(
	filePath: string,
	minLength: number = 1
): Promise<number> {
	const dataBuffer = fs.readFileSync(filePath);
	const data = await pdf(dataBuffer);
	const text = data.text;
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	const wordCount = filteredWords.length;
	return wordCount;
}

export async function countWordsInImg(
	filePath: string,
	minLength: number = 1
): Promise<number> {
	const text = await extractTextWithOCR(filePath);
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	const wordCount = filteredWords.length;
	return wordCount;
}

export async function countWordsInDocx(
	filePath: string,
	minLength: number = 1
): Promise<number> {
	const result = await mammoth.extractRawText({ path: filePath });
	const text = result.value;
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	const wordCount = filteredWords.length;
	return wordCount;
}

export async function contentInPdf(
	filePath: string,
	minLength: number = 1
): Promise<string[]> {
	const dataBuffer = fs.readFileSync(filePath);
	const data = await pdf(dataBuffer);
	const text = data.text;
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	return filteredWords;
}

export async function contentInImg(
	filePath: string,
	minLength: number = 1
): Promise<string[]> {
	const text = await extractTextWithOCR(filePath);
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	return filteredWords;
}

export async function contentInDocx(
	filePath: string,
	minLength: number = 1
): Promise<string[]> {
	const result = await mammoth.extractRawText({ path: filePath });
	const text = result.value;
	const words = text.split(/\s+/);
	const filteredWords = words.filter((word) => word.length >= minLength);
	return filteredWords;
}
