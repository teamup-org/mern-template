import express from "express";
import User from "../../models/user";

const router = express.Router();

// Route to get the parent of a student
router.get("/student/:studentId/parent", async (req, res) => {
	try {
		const { studentId } = req.params;
		const student = await User.findById(studentId).populate("parents");
		if (!student || student.role !== "student") {
			return res.status(404).send("Student not found or incorrect role");
		}
		res.status(200).json(student.parents);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

// Route to get the teacher of a student
router.get("/student/:studentId/teacher", async (req, res) => {
	try {
		const { studentId } = req.params;
		const student = await User.findById(studentId).populate("teachers");
		if (!student || student.role !== "student") {
			return res.status(404).send("Student not found or incorrect role");
		}
		res.status(200).json(student.teachers);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

// Route to check if a parent exists with a given email
router.get("/parent/:email", async (req, res) => {
	try {
		const { email } = req.params;
		const parent = await User.findOne({ email, role: "parent" });
		res.status(200).json({ exists: !!parent });
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

// Route to check if a teacher exists with a given email
router.get("/teacher/:email", async (req, res) => {
	try {
		const { email } = req.params;
		const teacher = await User.findOne({ email, role: "teacher" });
		res.status(200).json({ exists: !!teacher });
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

// Route to register a user
router.post("/register", async (req, res) => {
	try {
		console.log(req.body);
		const { name, email, password, role, parentEmail, teacherEmail } = req.body;

		const parent = parentEmail
			? await User.findOne({ email: parentEmail, role: "parent" })
			: null;
		const teacher = teacherEmail
			? await User.findOne({ email: teacherEmail, role: "teacher" })
			: null;

		const newUser = new User({
			name,
			email,
			password,
			role,
			parents: parent ? [parent._id] : [],
			teachers: teacher ? [teacher._id] : [],
		});

		await newUser.save();
		res.status(201).send("User created");
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

export default router;
