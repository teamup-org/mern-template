import mongoose, { Document, Schema } from "mongoose";

export interface IDoc extends Document {
	title: string;
	file: string;
	content: string[];
	questions: mongoose.Schema.Types.ObjectId[];
	tags: string[];
	wordCount: number;
	wordCount3Plus: number;
	wordCount4Plus: number;
	createdAt: Date;
}

const DocSchema: Schema = new Schema({
	title: { type: String, required: true },
	content: { type: [String], required: true },
	questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
	tags: [String],
	wordCount: { type: Number, required: true },
	wordCount3Plus: { type: Number, required: true },
	wordCount4Plus: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDoc>("Doc", DocSchema);
