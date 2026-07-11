const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  primaryCategory: { type: String, required: true },
  scores: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
