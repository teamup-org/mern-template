import mongoose, { Schema, model, Document } from 'mongoose';
enum Type {
  FreeResponse = 'free response',
  TrueFalse = 'true/false',
  MultipleChoice = 'multiple choice'
}

interface IQuestion extends Document {
  content: string;
  answers: [AnswerOption];
  difficulty?: number;
  chapters?: number[];
  pages?: number[];
  type?: Type;
  choices?: string[];
}

interface AnswerOption {
  id: number;
  content: string;
  answer: boolean; 
}


const questionSchema = new Schema<IQuestion>({
  content: { type: String, required: true },
  answers: [{ id: Number, content: String, answer: Boolean }],
  difficulty: { type: Number },
  chapters: [Number],
  pages: [Number],
  type: { type: String, enum: Object.values(Type) },
  choices: [String]
});

const Question = model<IQuestion>('Question', questionSchema);
export default Question;
