const mongoose = require('mongoose');

const aiResponseSchema = new mongoose.Schema({
  user: { type: String, required: true },
  originalMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  tone: { type: String, required: true },
  temperature: { type: Number, required: true },
  maxWords: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AIResponse = mongoose.model('AIResponse', aiResponseSchema);