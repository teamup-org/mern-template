import express from 'express';
import mongoose from 'mongoose';
import { User, Role } from '../../models/user';

const router = express.Router();

// Route to get the parent of a student
router.get('/student/:studentId/parent', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await User.findById(studentId).populate('parents');
        if (!student || student.role !== 'student') {
            return res.status(404).send('Student not found or incorrect role');
        }
        res.status(200).json(student.parents);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Route to get the teacher of a student
router.get('/student/:studentId/teacher', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await User.findById(studentId).populate('teachers');
        if (!student || student.role !== 'student') {
            return res.status(404).send('Student not found or incorrect role');
        }
        res.status(200).json(student.teachers);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Route to check if a parent exists with a given email
router.get('/parent/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const parent = await User.findOne({ email, role: 'parent' });
        res.status(200).json({ exists: !!parent });
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Route to check if a teacher exists with a given email
router.get('/teacher/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const teacher = await User.findOne({ email, role: 'teacher' });
        res.status(200).json({ exists: !!teacher });
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
});


// Route to register a user
router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role, parentEmail, teacherEmail } : 
        { name: string, email: string, password: string, role: Role, parentEmail?: string, teacherEmail?: string } = req.body;

        // Validate role
        if (!Object.values(Role).includes(role)) {
            return res.status(400).json({ message: 'Invalid role.' });
        }
        
        const parent = parentEmail ? await User.findOne({ email: parentEmail, role: Role.Parent }) : null;
        const teacher = teacherEmail ? await User.findOne({ email: teacherEmail, role: Role.Teacher }) : null;

        const newUser = new User({
            name,
            email,
            password,
            role,
            parents: parent ? [parent._id] : [],
            teachers: teacher ? [teacher._id] : []
        });

        await newUser.save();
        res.status(201).send('User created');
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});


// Beeber's code

// Route to update user profile description
router.put('/profiledescription', async (req, res) => {
    try {
        const { email, profileDescription } = req.body;
        const result = await User.updateOne(
            { email },
            { $set: { description: profileDescription } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Profile description updated successfully');
        res.json({ message: 'Profile description updated successfully' });
    } catch (error) {
        console.error('Error updating profile description:', error);
        res.status(500).json({ error: 'Error updating profile description' });
    }
});

// Route to get user profile description
router.get('/profiledescription', async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ description: user.description });
    } catch (error) {
        console.error('Error fetching profile description:', error);
        res.status(500).json({ error: 'Error fetching profile description' });
    }
});


// Route to update user role
router.put('/update/role', async (req, res) => {
    try {
        const { email, role } : { email: string, role: Role } = req.body;

        // Validate role
        if (!Object.values(Role).includes(role)) {
            return res.status(400).json({ message: 'Invalid role.' });
        }

        const updateResult = await User.updateOne({ email }, { $set: { role } });

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (updateResult.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made.' });
        }

        console.log(`Role updated for user: ${email}`);
        res.status(200).json({ message: 'Role updated successfully.' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role.' });
    }
});

export default router;
