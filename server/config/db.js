const mongoose = require('mongoose');
const User = require('../models/User');
const { readDB } = require('../utils/db');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    // Seed existing users from users.json to MongoDB Atlas if not already seeded
    try {
      const users = readDB('users.json');
      if (users && users.length > 0) {
        for (const u of users) {
          const exists = await User.findOne({ email: u.email });
          if (!exists) {
            console.log(`Seeding user: ${u.email}`);
            const newUser = new User({
              _id: u.id,
              name: u.name,
              email: u.email,
              password: u.password,
              role: u.role || 'user',
              createdAt: u.createdAt || new Date().toISOString(),
              career: u.career,
              quizCompleted: u.quizCompleted || false,
              quizDate: u.quizDate,
              topRecommendations: u.topRecommendations || [],
              confidenceScores: u.confidenceScores || {},
              quizScores: u.quizScores || {},
              isVerified: true // existing users seeded from JSON are verified by default
            });
            await newUser.save();
          }
        }
      }
    } catch (err) {
      console.error('Error seeding users to MongoDB:', err);
    }

    // Migrate any existing database users who do not have isVerified field set to true
    try {
      const updateResult = await User.updateMany(
        { isVerified: { $exists: false } },
        { $set: { isVerified: true } }
      );
      if (updateResult.modifiedCount > 0) {
        console.log(`Migrated ${updateResult.modifiedCount} existing users to verified status.`);
      }
    } catch (migrateErr) {
      console.error('Error migrating existing users to verified status:', migrateErr);
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;