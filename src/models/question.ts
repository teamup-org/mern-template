import mongoose, { Schema, model, Document } from 'mongoose';

interface IQuestion extends Document {
  content: string;
  answer: string; 
  difficulty?: number;
  chapters?: number[];
  pages?: number[];
}

const questionSchema = new Schema<IQuestion>({
  content: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: Number },
  chapters: [Number],
  pages: [Number]
});

const Question = model<IQuestion>('Question', questionSchema);
export default Question;
