import mongoose, { Schema, model, Document } from 'mongoose';

interface IDoc extends Document {
  title: string;
  file: string; // link to the file
  content: string;
  questions: mongoose.Schema.Types.ObjectId[];
  tags: string[];
  words: number;
  createdBy: mongoose.Schema.Types.ObjectId;
  assignedTo: mongoose.Schema.Types.ObjectId[];
}

const docSchema = new Schema<IDoc>({
  title: { type: String, required: true },
  file: { type: String, required: true },
  content: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  tags: [String],
  words: { type: Number },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Doc = model<IDoc>('Doc', docSchema);
export default Doc;
