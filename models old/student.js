const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }]
});

module.exports = mongoose.model('Student', studentSchema);
