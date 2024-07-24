const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    documentID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    wordCount: { type: Number, default: 0 },
    wordCount3Plus: { type: Number, default: 0 },
    wordCount4Plus: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Document', documentSchema);
