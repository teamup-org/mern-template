import mongoose from 'mongoose';
import connectDB from '../server/helpers/db';
import Doc from '../models/doc';
import User from '../models/user';

const runTest = async () => {
    await connectDB();

    const testUser = new User({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janey@gmail.com',
        role: 'teacher',
    });

    const testDoc = new Doc({
        title: 'Test Doc',
        file: 'https://example.com/test.doc',
        content: 'This is a test document',
        questions: [],
        tags: ['test', 'doc'],
        words: 5,
        createdBy: testUser._id,
        assignedTo: [],
    });

    try {
        const savedDoc = await testDoc.save();
        console.log(savedDoc);
    } catch (error: any) {
        console.error(error.message);
    }
};