const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    parentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    studentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Parent', parentSchema);
