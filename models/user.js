const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: false },
    role: { type: String, enum: ['none', 'student', 'teacher', 'parent'], required: true },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === 'student'; } },
    parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === 'student'; } }],
    documentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: function() { return this.role === 'teacher'; } }],
    studentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: function() { return this.role === 'parent'; } }]
});

module.exports = mongoose.model('User', userSchema);