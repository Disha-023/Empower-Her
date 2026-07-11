const crypto = require('crypto');
const User = require('../models/User');

const OTP_EXPIRY_MINUTES = 10;

/**
 * Generates a secure random 6-digit OTP and sets its expiry to 10 minutes from now.
 * @returns {Object} { otp: string, otpExpiry: Date }
 */
const generateOTP = () => {
  const otp = crypto.randomInt(100000, 1000000).toString(); // Generates 100000 to 999999
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000); // 10 minutes from now
  return { otp, otpExpiry };
};

/**
 * Generates and saves a new OTP for a specific user in MongoDB.
 * @param {string} userId - The string ID of the user
 * @returns {Promise<string>} The generated OTP code
 */
const saveOTPForUser = async (userId) => {
  const { otp, otpExpiry } = generateOTP();
  console.log('OTP generated');
  console.log('OTP expiry generated');

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  console.log('Saving OTP to MongoDB');
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  user.otpLastSentAt = new Date();
  
  try {
    await user.save();
    console.log('MongoDB update successful');
  } catch (dbErr) {
    console.error('Failed to save OTP to MongoDB:', dbErr);
    console.error('Error Stack Trace:', dbErr.stack);
    throw dbErr;
  }
  return otp;
};

/**
 * Checks if a user's stored OTP is expired.
 * @param {Object} user - The user document from MongoDB
 * @returns {boolean} True if expired or invalid, false otherwise
 */
const isOTPExpired = (user) => {
  if (!user || !user.otpExpiry) {
    return true;
  }
  return new Date() > new Date(user.otpExpiry);
};

module.exports = {
  generateOTP,
  saveOTPForUser,
  isOTPExpired,
  OTP_EXPIRY_MINUTES
};
