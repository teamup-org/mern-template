import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  title: string;
  wordCount: number;
  wordCount3Plus: number;
  wordCount4Plus: number;
  createdAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true },
  wordCount: { type: Number, required: true },
  wordCount3Plus: { type: Number, required: true },
  wordCount4Plus: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDocument>("Document", DocumentSchema);
