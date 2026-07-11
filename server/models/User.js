const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  _id: { type: String, default: () => Date.now().toString() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: String, default: () => new Date().toISOString() },
  career: { type: String },
  quizCompleted: { type: Boolean, default: false },
  quizDate: { type: String },
  topRecommendations: { type: [String], default: [] },
  confidenceScores: { type: Map, of: Number },
  quizScores: { type: Map, of: Number },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  otpLastSentAt: { type: Date }
});

// Middleware to hash the password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  // Check if password already looks like a bcrypt hash to avoid double-hashing (important during seeding)
  if (this.password && this.password.startsWith('$2') && this.password.length === 60) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
