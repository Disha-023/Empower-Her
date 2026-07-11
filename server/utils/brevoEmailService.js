const { BrevoClient } = require('@getbrevo/brevo');

const apiKey = process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.trim() : '';
const senderEmail = process.env.BREVO_SENDER_EMAIL ? process.env.BREVO_SENDER_EMAIL.trim() : '';
const senderName = process.env.BREVO_SENDER_NAME ? process.env.BREVO_SENDER_NAME.trim() : 'EmpowerHer';

let brevoClient = null;
if (apiKey) {
  try {
    brevoClient = new BrevoClient({ apiKey });
  } catch (error) {
    console.error('Failed to initialize Brevo client:', error.message || error);
  }
}

/**
 * Sends a transactional email using the Brevo Node.js SDK.
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body in HTML format
 * @returns {Promise<Object>} - Resolves to Brevo API result
 */
const sendEmail = async ({ to, subject, html }) => {
  console.log('Brevo email service initialized');
  
  if (!apiKey) {
    console.error('Brevo API key is missing from environment.');
    throw new Error('Missing BREVO_API_KEY');
  }
  if (!senderEmail) {
    console.error('Brevo sender email is missing from environment.');
    throw new Error('Missing BREVO_SENDER_EMAIL');
  }

  if (!brevoClient) {
    try {
      brevoClient = new BrevoClient({ apiKey });
    } catch (error) {
      console.error('Failed to initialize Brevo client on demand:', error.message || error);
      throw new Error('Brevo client initialization failed');
    }
  }

  console.log('Recipient email received:', to);
  console.log('Sending email via Brevo');

  try {
    const result = await brevoClient.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: html,
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
    });

    console.log('Email sent successfully via Brevo. Message ID:', result.messageId || (result[0] && result[0].messageId));
    return result;
  } catch (error) {
    console.error('Email sending failed via Brevo:', error.message || error);
    if (error.stack) {
      console.error('Error Stack Trace:', error.stack);
    }
    throw error;
  }
};

/**
 * Checks the status of the Brevo configuration by fetching account info.
 * @returns {Promise<Object>} { emailConfigured: boolean, smtpReady: boolean }
 */
const checkEmailStatus = async () => {
  const isConfigured = !!(apiKey && senderEmail);
  console.log(`BREVO_API_KEY loaded: ${!!apiKey}`);
  console.log(`BREVO_SENDER_EMAIL loaded: ${!!senderEmail}`);
  console.log(`BREVO_SENDER_NAME loaded: ${!!senderName}`);

  if (!isConfigured) {
    console.log('Brevo authentication status: false (credentials missing)');
    return { emailConfigured: false, smtpReady: false };
  }

  if (!brevoClient) {
    try {
      brevoClient = new BrevoClient({ apiKey });
    } catch (error) {
      console.log('Brevo authentication status: false (client initialization failed)');
      return { emailConfigured: true, smtpReady: false };
    }
  }

  try {
    // Verify API key is valid using account check
    const accountDetails = await brevoClient.account.getAccount();
    console.log('Brevo authentication status: true. Registered email:', accountDetails.email);
    return { emailConfigured: true, smtpReady: true };
  } catch (error) {
    console.error('Brevo API key verification failed:', error.message || error);
    console.log('Brevo authentication status: false');
    return { emailConfigured: true, smtpReady: false };
  }
};

module.exports = {
  sendEmail,
  checkEmailStatus
};
