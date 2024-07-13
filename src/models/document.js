import { Schema, model, Document, Types } from 'mongoose';

const documentSchema = new Schema<IDocument>({
    documentID: { type: Types.ObjectId, auto: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    wordCount: { type: Number, default: 0 },
    wordCount3Plus: { type: Number, default: 0 },
    wordCount4Plus: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    assignedTo: [{ type: Types.ObjectId, ref: 'User' }]
});

export default model<IDocument>('Document', documentSchema);
