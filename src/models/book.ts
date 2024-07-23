import mongoose, { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  file: string; // link to the file
  content: string;
  questions: mongoose.Schema.Types.ObjectId[];
  tags: string[];
  words: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  file: { type: String, required: true },
  content: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  tags: [String],
  words: { type: Number }
});

const Book = model<IBook>('Book', bookSchema);
export default Book;
