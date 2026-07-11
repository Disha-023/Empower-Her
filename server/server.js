const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { sendEmail } = require('./utils/emailService');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/admin', require('./routes/admin'));

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <p>Hello,</p>
      <p>This is a test email from the EmpowerHer application.</p>
      <p>If you received this email, the email service is working correctly.</p>
      <br>
      <p style="margin-bottom: 0;">Regards,<br>EmpowerHer Team</p>
    </div>
  `;

  try {
    await sendEmail({
      to: email,
      subject: 'EmpowerHer Email Service Test',
      html: htmlContent
    });
    return res.status(200).json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Test email sending failed:', error);
    return res.status(500).json({ success: false, message: 'Failed to send test email', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

mongoose.connection.once('open', async () => {
  // Task 2: Verify Required Environment Variables
  console.log(`PORT loaded: ${!!process.env.PORT}`);
  console.log(`JWT_SECRET loaded: ${!!process.env.JWT_SECRET}`);
  console.log(`MONGO_URI loaded: ${!!process.env.MONGO_URI}`);
  console.log(`EMAIL_USER loaded: ${!!process.env.EMAIL_USER}`);
  console.log(`EMAIL_PASS loaded: ${!!process.env.EMAIL_PASS}`);
  
  // Task 3: Validate EMAIL_USER
  const emailUser = process.env.EMAIL_USER;
  const isGmail = emailUser && emailUser.trim().toLowerCase().endsWith('@gmail.com');
  console.log(`EMAIL_USER is valid Gmail: ${!!isGmail}`);
  
  // Task 4: Validate EMAIL_PASS
  console.log(`EMAIL_PASS detected: ${!!process.env.EMAIL_PASS && process.env.EMAIL_PASS.trim().length > 0}`);

  // Task 6: Improve Startup Diagnostics
  console.log('\nEnvironment Status\n');
  
  const vars = ['PORT', 'JWT_SECRET', 'MONGO_URI', 'EMAIL_USER', 'EMAIL_PASS'];
  vars.forEach(v => {
    const val = process.env[v];
    if (val && val.trim().length > 0) {
      console.log(`${v} ✓\n`);
    } else {
      console.log(`${v} ✗\n`);
    }
  });

  try {
    const { checkEmailStatus } = require('./utils/emailService');
    const emailStatus = await checkEmailStatus();
    if (emailStatus.emailConfigured && emailStatus.smtpReady) {
      console.log('Email Service Ready ✓\n');
    } else {
      console.log('Email Service Ready ✗\n');
    }
  } catch (err) {
    console.log('Email Service Ready ✗\n');
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Running locally with JSON file storage (No MongoDB required).');
});
