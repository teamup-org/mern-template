import mongoose, { Schema, model, Document } from 'mongoose';

interface IDoc extends Document {
  title: string;
  file: string; // link to the file
  content: string;
  questions: mongoose.Schema.Types.ObjectId[];
  tags: string[];
  wordCount: number;
  wordCount3Plus: number;
  wordCount4Plus: number;
  createdBy: mongoose.Schema.Types.ObjectId;
  assignedTo: mongoose.Schema.Types.ObjectId[];
}

const docSchema = new Schema<IDoc>({
  title: { type: String, required: true },
  file: { type: String, required: true },
  content: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  tags: [String],
  wordCount: { type: Number, required: true },
  wordCount3Plus: { type: Number, required: true },
  wordCount4Plus: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Doc = model<IDoc>('Doc', docSchema);
export default Doc;
