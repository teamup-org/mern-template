import mongoose from 'mongoose';
import connectDB from '../server/helpers/db';
import { User, Role } from '../models/user';
import Assignment from '../models/assignment';

const runTest = async () => {
    await connectDB();

    const testTeacherUser = new User({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: Role.Teacher,
    });

    const testParentUser = new User({
        firstName: 'David',
        lastName: 'Johnson',
        email: 'david.johnson@example.com',
        role: Role.Parent,
    });

    const testStudentUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: Role.Student,
        grade: 10,
    });

    const testAssignment = new Assignment({
        title: 'Math Assignment 1',
        description: 'Solve the following problems',
        subject: 'Math',
        teacher: testTeacherUser._id,
        dueDate: new Date('2022-01-01'),
        progressAmounts: [],
        progressDates: [],
        opens: [],
        closes: [],
        questions: [],
        scores: [],
        difficulty: 2,
    });

    Object.assign(testTeacherUser, {
        students: [testStudentUser._id],
        assignments: [testAssignment._id],
    });
    Object.assign(testParentUser, {
        children: [testStudentUser._id],
    });
    Object.assign(testStudentUser, {
        parents: [testParentUser._id],
        teachers: [testTeacherUser._id],
        assignments: [testAssignment._id],
    });

    try {
        const savedTeacherUser = await testTeacherUser.save();
        console.log('Teacher created:', savedTeacherUser);

        const savedParentUser = await testParentUser.save();
        console.log('Parent created:', savedParentUser);

        const savedStudentUser = await testStudentUser.save();
        console.log('Student User created:', savedStudentUser);

        const savedAssignment = await testAssignment.save();
        console.log('Assignment created:', savedAssignment);

        // Additional retrieval and verification if necessary
        const retrievedStudent = await User.findById(savedStudentUser._id);
        if (retrievedStudent) {
            console.log('Student retrieved:', retrievedStudent);
        } else {
            console.log('Student not found');
        }

        const savedStudentTeachers = await User.find({ students: savedStudentUser._id });
        console.log('Teachers of the saved student:', savedStudentTeachers);

        const savedStudentParent = await User.find({ children: savedStudentUser._id });
        console.log('Parents of the saved student', savedStudentParent);

        console.log('Test completed successfully');

        const allUsers = await User.find();
        console.log('All users:', allUsers);

        const allAssignments = await Assignment.find();
        console.log('All assignments:', allAssignments);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
};

runTest();
