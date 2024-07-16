const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    documentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
