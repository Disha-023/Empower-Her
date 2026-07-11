const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readDB, writeDB } = require('../utils/db');
const User = require('../models/User');
const { saveOTPForUser, isOTPExpired, generateOTP, OTP_EXPIRY_MINUTES } = require('../utils/otpService');
const { sendEmail, checkEmailStatus } = require('../utils/emailService');

const { addActiveUser, removeActiveUser } = require('../utils/activeSession');

// Helper specific to users (kept for reference and compatibility)
const readUsers = () => readDB('users.json');
const writeUsers = (data) => writeDB('users.json', data);

const verifyCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
  if (!token) return false;
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

router.get('/recaptcha-site-key', (req, res) => {
  res.json({ siteKey: process.env.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' });
});

router.post('/register', async (req, res) => {
  console.log("Incoming register request body:", req.body);
  const { name, email, password, role, captchaToken } = req.body;
  try {
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }

    // Check email using MongoDB
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create user in MongoDB. Note: pre('save') middleware handles hashing.
    const newUser = new User({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'user', // secure default
      createdAt: new Date().toISOString()
    });

    await newUser.save();

    // Generate and send verification OTP
    try {
      const otp = await saveOTPForUser(newUser.id);
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px;">EmpowerHer</h2>
          <p>Hello,</p>
          <p>Your verification code is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #6d28d9; letter-spacing: 2px; margin: 20px 0; background-color: #f3e8ff; padding: 10px; text-align: center; border-radius: 4px;">${otp}</p>
          <p>This code is valid for ${OTP_EXPIRY_MINUTES} minutes.</p>
          <br>
          <p style="margin-bottom: 0;">Regards,</p>
          <strong style="color: #6d28d9;">EmpowerHer Team</strong>
        </div>
      `;
      await sendEmail({
        to: email,
        subject: 'EmpowerHer Verification Code',
        html: emailHtml
      });
    } catch (otpErr) {
      console.error('Failed to generate/send first OTP on register:', otpErr);
    }

    const payload = { userId: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });

    addActiveUser(newUser.id); // Add on register as they are logged in

    res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, captchaToken } = req.body;
  try {
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Validate password correctly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Check login protection: email verification
    if (user.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your email before login'
      });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });

    const userRole = user.role || 'user';
    addActiveUser(user.id);

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: userRole } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  const { userId } = req.body;
  if (userId) removeActiveUser(userId);
  res.json({ message: 'Logged out' });
});

const authMiddleware = require('../middleware/authMiddleware');

router.put('/update-profile', authMiddleware, async (req, res) => {
  try {
    // Read and update user data in MongoDB
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const oldCareer = user.career;
    
    // Update user profile fields
    user.career = req.body.career;
    user.quizCompleted = req.body.quizCompleted;
    user.quizDate = req.body.quizDate;
    user.topRecommendations = req.body.topRecommendations;
    user.confidenceScores = req.body.confidenceScores;
    user.quizScores = req.body.quizScores;
    
    await user.save();

    // Trigger Career Update and Eligibility Match emails if career changed
    if (req.body.career && oldCareer !== req.body.career) {
      const { sendCareerUpdateEmail, triggerEligibilityNotification } = require('../utils/notificationService');
      sendCareerUpdateEmail(user.email, user.name, user.career).catch(err => console.error('Error sending career update email:', err));
      triggerEligibilityNotification(user, user.career).catch(err => console.error('Error triggering eligibility notification:', err));
    }
    
    // Return updated user (excluding password)
    const userObj = user.toObject({ flattenMaps: true });
    const { password, _id, ...rest } = userObj;
    const safeUser = {
      id: _id,
      ...rest
    };
    res.json({ user: safeUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

router.post('/generate-otp', async (req, res) => {
  console.log('Generate OTP request received');
  const { email } = req.body;
  if (!email) {
    console.log('Generate OTP request failed: Email address is required');
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    console.log('User lookup started');
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User lookup completed: User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found');

    // 2. Generate and store OTP in MongoDB
    const otp = await saveOTPForUser(user.id);

    // Immediately read the updated user document and log status
    const updatedUser = await User.findById(user.id);
    console.log('VERIFY_MDB: User ID:', updatedUser ? updatedUser.id : 'null');
    console.log('VERIFY_MDB: Email:', updatedUser ? updatedUser.email : 'null');
    console.log('VERIFY_MDB: Whether otp field exists:', updatedUser && updatedUser.otp !== undefined && updatedUser.otp !== null);
    console.log('VERIFY_MDB: Whether otpExpiry field exists:', updatedUser && updatedUser.otpExpiry !== undefined && updatedUser.otpExpiry !== null);

    // 3. Send OTP using existing email service
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px;">EmpowerHer</h2>
        <p>Hello,</p>
        <p>Your verification code is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #6d28d9; letter-spacing: 2px; margin: 20px 0; background-color: #f3e8ff; padding: 10px; text-align: center; border-radius: 4px;">${otp}</p>
        <p>This code is valid for 10 minutes.</p>
        <br>
        <p style="margin-bottom: 0;">Regards,</p>
        <strong style="color: #6d28d9;">EmpowerHer Team</strong>
      </div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: 'EmpowerHer Verification Code',
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      console.error('Error Stack Trace:', emailError.stack);
      return res.status(500).json({ message: 'Failed to send OTP verification email', error: emailError.message });
    }

    // 4. Return success response
    console.log('Response sent');
    return res.status(200).json({ message: 'Verification code generated and sent successfully' });

  } catch (error) {
    console.error('Error generating OTP:', error);
    console.error('Error Stack Trace:', error.stack);
    return res.status(500).json({ message: 'Server error generating verification code' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if OTP was generated
    if (!user.otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Check expiration
    if (isOTPExpired(user)) {
      return res.status(400).json({ success: false, message: 'Verification code expired' });
    }

    // Verify OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Update user: verification success
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Trigger Welcome Email (asynchronous, non-blocking)
    const { sendWelcomeEmail } = require('../utils/notificationService');
    sendWelcomeEmail(user.email, user.name).catch(err => console.error('Error in sendWelcomeEmail async call:', err));

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error verifying code' });
  }
});

router.post('/check-verification', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Treat undefined isVerified as true for backward compatibility
    const isVerified = user.isVerified !== false;

    return res.status(200).json({ isVerified });

  } catch (error) {
    console.error('Check verification error:', error);
    return res.status(500).json({ message: 'Server error checking verification status' });
  }
});

router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if account already verified
    if (user.isVerified === true) {
      return res.status(400).json({
        success: false,
        message: 'Account already verified'
      });
    }

    // Rate Limiting (30 seconds cooldown)
    if (user.otpLastSentAt) {
      const timePassed = Date.now() - new Date(user.otpLastSentAt).getTime();
      const cooldownMs = 30 * 1000;
      if (timePassed < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - timePassed) / 1000);
        return res.status(400).json({
          success: false,
          message: 'Please wait before requesting another code',
          remainingSeconds
        });
      }
    }

    // Generate completely new OTP and update user model
    const { otp, otpExpiry } = generateOTP();
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.otpLastSentAt = new Date();
    await user.save();

    // Send the new OTP
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px;">EmpowerHer</h2>
        <p>Hello,</p>
        <p>Your new verification code is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #6d28d9; letter-spacing: 2px; margin: 20px 0; background-color: #f3e8ff; padding: 10px; text-align: center; border-radius: 4px;">${otp}</p>
        <p>This code is valid for 10 minutes.</p>
        <br>
        <p style="margin-bottom: 0;">Regards,</p>
        <strong style="color: #6d28d9;">EmpowerHer Team</strong>
      </div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: 'EmpowerHer Verification Code',
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Failed to send resend-otp email:', emailError);
      return res.status(500).json({ success: false, message: 'Failed to send OTP verification email', error: emailError.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Verification code resent successfully'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return res.status(500).json({ success: false, message: 'Server error resending verification code' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email, captchaToken } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required' });
  }

  try {
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate and store OTP
    const otp = await saveOTPForUser(user.id);

    // Send OTP email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px;">EmpowerHer</h2>
        <p>Hello,</p>
        <p>Your password reset code is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #6d28d9; letter-spacing: 2px; margin: 20px 0; background-color: #f3e8ff; padding: 10px; text-align: center; border-radius: 4px;">${otp}</p>
        <p>This code is valid for 10 minutes.</p>
        <br>
        <p style="margin-bottom: 0;">Regards,</p>
        <strong style="color: #6d28d9;">EmpowerHer Team</strong>
      </div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: 'EmpowerHer Password Reset Code',
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Failed to send forgot-password email:', emailError);
      return res.status(500).json({ success: false, message: 'Failed to send reset code email', error: emailError.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Reset code generated and sent successfully'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Server error generating password reset code' });
  }
});

router.post('/verify-reset-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (isOTPExpired(user)) {
      return res.status(400).json({ success: false, message: 'Verification code expired' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP verified'
    });

  } catch (error) {
    console.error('Verify reset OTP error:', error);
    return res.status(500).json({ success: false, message: 'Server error verifying reset code' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (isOTPExpired(user)) {
      return res.status(400).json({ success: false, message: 'Verification code expired' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Set new password (pre('save') hook will hash it automatically)
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Server error resetting password' });
  }
});

router.get('/otp-config', (req, res) => {
  res.json({ otpExpiryMinutes: OTP_EXPIRY_MINUTES });
});

router.get('/email-status', async (req, res) => {
  try {
    const status = await checkEmailStatus();
    return res.status(200).json(status);
  } catch (error) {
    console.error('Error in /email-status route:', error);
    return res.status(500).json({ emailConfigured: false, smtpReady: false });
  }
});

module.exports = router;
