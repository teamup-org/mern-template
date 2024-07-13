import mongoose, { Schema, Document } from 'mongoose';

enum UserRole {
    Student = 'student',
    Teacher = 'teacher',
    Parent = 'parent',
}

interface IUser extends Document {
    userID: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
    teacherID?: mongoose.Types.ObjectId;
    parentID?: mongoose.Types.ObjectId[];
    documentIDs?: mongoose.Types.ObjectId[];
    studentIDs?: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === UserRole.Student; } },
    parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === UserRole.Student; } }],
    documentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: function() { return this.role === UserRole.Teacher; } }],
    studentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === UserRole.Parent; } }],
});

export default mongoose.model<IUser>('User', userSchema);