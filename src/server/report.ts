import fs from "fs";
import pdf from "pdf-parse";

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
