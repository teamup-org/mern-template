// addData.js

const connectDB = require("./src/db"); // Import the database connection function
const Document = require("./src/models/document"); // Import the Document model
const mongoose = require("mongoose");
const addData = async () => {
	try {
		// Connect to the database
		await connectDB();

		// Example document data
		const exampleDocument = new Document({
			title: "123",
			content: ["123", "123", "234"],
			wordCount: 30,
			wordCount3Plus: 13,
			wordCount4Plus: 14,
		});
		await exampleDocument.save();
		console.log("Test Document added successfully");
	} catch (error) {
		console.error("Error adding data:", error);
	} finally {
		// Close the database connection
		await mongoose.disconnect();
		console.log("Database connection closed");
	}
};

addData();
