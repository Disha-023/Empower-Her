const nodemailer = require('nodemailer');
const brevoEmailService = require('./brevoEmailService');

// Pre-initialize transporter if credentials exist.
// This implements Task 4: "Ensure transporter is created only when credentials exist."
const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';

  if (!emailUser || !emailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

// Cached transporter instance
let transporter = getTransporter();

/**
 * Sends an email trying Brevo first if configured, falling back to Nodemailer.
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body in HTML format
 * @returns {Promise<Object>} - Resolves to transport send info
 */
const sendEmail = async ({ to, subject, html }) => {
  const useBrevo = !!(process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.trim());

  if (useBrevo) {
    console.log('Attempting to send email via Brevo...');
    try {
      return await brevoEmailService.sendEmail({ to, subject, html });
    } catch (brevoErr) {
      console.warn('Brevo email sending failed. Falling back to Nodemailer...', brevoErr.message || brevoErr);
    }
  }

  console.log('Using Nodemailer fallback for email sending...');
  console.log('Email service initialized');
  const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';

  if (!emailUser) {
    console.error('Email sending failed: Missing EMAIL_USER in environment configuration.');
    throw new Error('Missing EMAIL_USER');
  }

  if (!emailPass) {
    console.error('Email sending failed: Missing EMAIL_PASS in environment configuration.');
    throw new Error('Missing EMAIL_PASS');
  }

  // Refresh/Get transporter if it hasn't been initialized yet
  if (!transporter) {
    transporter = getTransporter();
  }

  if (!transporter) {
    console.error('Email sending failed: Failed to create Nodemailer transporter due to missing credentials.');
    throw new Error('Transporter initialization failed');
  }

  // Verify transporter connection health
  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
    console.log('Transporter verified');
  } catch (verifyError) {
    console.error('Transporter verification failed:', verifyError.message || verifyError);
    console.error('Error Stack Trace:', verifyError.stack);
    throw verifyError;
  }

  console.log('Recipient email received:', to);
  console.log('Sending email');

  const mailOptions = {
    from: `"EmpowerHer Team" <${emailUser}>`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return info;
  } catch (error) {
    const errMessage = error.message || '';
    
    // Check for Gmail App Password / login credentials authentication failures
    if (errMessage.includes('Invalid login') || 
        errMessage.includes('Username and Password not accepted') || 
        errMessage.includes('535 5.7.8')) {
      console.error('Email sending failed: Gmail authentication failed. Verify EMAIL_USER and EMAIL_PASS (Gmail App Password).');
      console.error('Error Stack Trace:', error.stack);
      throw new Error('Gmail authentication failed');
    }
    
    // Check for SMTP connection or DNS lookup failures
    if (errMessage.includes('ENOTFOUND') || 
        errMessage.includes('ETIMEDOUT') || 
        errMessage.includes('ECONNREFUSED')) {
      console.error('Email sending failed: SMTP connection failed. Check your internet connection or SMTP settings.');
      console.error('Error Stack Trace:', error.stack);
      throw new Error('SMTP connection failed');
    }

    console.error('Email sending failed due to an unexpected SMTP error:', error);
    console.error('Error Stack Trace:', error.stack);
    throw error;
  }
};

/**
 * Checks the status of the email configuration, trying Brevo first, then Nodemailer.
 * @returns {Promise<Object>} { emailConfigured: boolean, smtpReady: boolean }
 */
const checkEmailStatus = async () => {
  const useBrevo = !!(process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.trim());

  if (useBrevo) {
    console.log('Checking Brevo service status...');
    try {
      const status = await brevoEmailService.checkEmailStatus();
      if (status.emailConfigured && status.smtpReady) {
        return status;
      }
      console.warn('Brevo service status check failed or was not ready. Falling back to checking Nodemailer configuration...');
    } catch (brevoErr) {
      console.warn('Error checking Brevo status, falling back to Nodemailer check:', brevoErr.message || brevoErr);
    }
  }

  const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';
  const emailConfigured = !!(emailUser && emailPass);

  console.log(`EMAIL_USER loaded: ${!!emailUser}`);
  console.log(`EMAIL_PASS loaded: ${!!emailPass}`);

  const activeTransporter = transporter || getTransporter();
  if (activeTransporter) {
    const host = activeTransporter.options.host || 'smtp.gmail.com';
    const port = activeTransporter.options.port || 465;
    const secure = activeTransporter.options.secure !== false;
    console.log(`SMTP host: ${host}`);
    console.log(`SMTP port: ${port}`);
    console.log(`Secure setting: ${secure}`);
  } else {
    console.log(`SMTP host: smtp.gmail.com`);
    console.log(`SMTP port: 465`);
    console.log(`Secure setting: true`);
  }

  if (!emailConfigured) {
    console.log('Gmail authentication status: false (credentials missing)');
    return { emailConfigured: false, smtpReady: false };
  }

  if (!activeTransporter) {
    console.log('Gmail authentication status: false (transporter not initialized)');
    return { emailConfigured: true, smtpReady: false };
  }

  try {
    const smtpReady = await new Promise((resolve) => {
      activeTransporter.verify((error) => {
        if (error) {
          console.error('SMTP connection health check failed:', error.message || error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    console.log(`Gmail authentication status: ${smtpReady}`);
    return { emailConfigured, smtpReady };
  } catch (err) {
    console.error('SMTP verify command encountered a crash:', err);
    console.log('Gmail authentication status: false');
    return { emailConfigured: true, smtpReady: false };
  }
};

module.exports = {
  sendEmail,
  checkEmailStatus
};
