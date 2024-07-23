import mongoose, { Schema, model, Document } from 'mongoose';

interface IAssignment extends Document {
  title: string;
  description: string;
  subject: string;
  teacher: mongoose.Schema.Types.ObjectId; 
  creationDate: Date;
  dueDate: Date;
  progressAmounts: number[];
  progressDates: Date[];
  opens: Date[];
  closes: Date[];
  questions: mongoose.Schema.Types.ObjectId[]; 
  scores: number[];
  difficulty: number;
}

const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: String,
  subject: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  progressAmounts: [Number],
  progressDates: [Date],
  opens: [Date],
  closes: [Date],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  scores: [Number],
  difficulty: { type: Number, required: true }
});

const Assignment = model<IAssignment>('Assignment', assignmentSchema);
export default Assignment;
