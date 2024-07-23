import mongoose, { Document, Schema, model } from "mongoose";

enum Role {
	Teacher = "teacher",
	Student = "student",
	Parent = "parent",
	None = "none",
}

interface IUser extends Document {
	userId: mongoose.Schema.Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	picture?: string;
	role: Role;
	students: mongoose.Schema.Types.ObjectId[];
	docs: mongoose.Schema.Types.ObjectId[];
	assignments: mongoose.Schema.Types.ObjectId[];
	grade?: number;
	parents: mongoose.Schema.Types.ObjectId[];
	teachers: mongoose.Schema.Types.ObjectId[];
	children: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	picture: String,
	role: {
		type: String,
		enum: Object.values(Role),
		required: true,
		default: Role.None,
	},
	// Teacher
	students: [{ type: Schema.Types.ObjectId, ref: "User" }],
	docs: [{ type: Schema.Types.ObjectId, ref: "Doc" }],
	assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
	// Student
	grade: Number,
	parents: [{ type: Schema.Types.ObjectId, ref: "User" }],
	teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
	// Parent
	children: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model<IUser>("User", userSchema);
export default User;
export { Role, User };
