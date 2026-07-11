const { sendEmail } = require('./emailService');

/**
 * Helper to map career paths (from profile/quiz) to scheme categories.
 */
const mapCareerToSchemeCategory = (career) => {
  if (!career) return null;
  const c = career.toLowerCase();
  if (c.includes('tech') || c.includes('dev') || c.includes('software') || c.includes('program') || c.includes('it')) return 'Education';
  if (c.includes('medic') || c.includes('health') || c.includes('doctor')) return 'Health';
  if (c.includes('teach') || c.includes('educat') || c.includes('school') || c.includes('professor')) return 'Education';
  if (c.includes('govern') || c.includes('civil') || c.includes('public')) return 'Employment';
  if (c.includes('sport') || c.includes('fit') || c.includes('athlet')) return 'Skill Development';
  if (c.includes('art') || c.includes('creat') || c.includes('design')) return 'Skill Development';
  if (c.includes('busin') || c.includes('entrepreneur') || c.includes('start')) return 'Business';
  if (c.includes('finance') || c.includes('commerce') || c.includes('account')) return 'Business';
  if (c.includes('law') || c.includes('legal')) return 'Employment';
  if (c.includes('agri') || c.includes('rural') || c.includes('farm')) return 'Business';
  if (c.includes('beauty') || c.includes('well') || c.includes('salon')) return 'Skill Development';
  if (c.includes('home') || c.includes('tailor') || c.includes('bake')) return 'Business';
  if (c.includes('media') || c.includes('commun') || c.includes('journal')) return 'Skill Development';
  if (c.includes('defen') || c.includes('secur') || c.includes('polic') || c.includes('army')) return 'Employment';
  if (c.includes('social') || c.includes('ngo') || c.includes('welfar')) return 'Employment';
  if (c.includes('hospit') || c.includes('tour') || c.includes('hotel')) return 'Skill Development';
  if (c.includes('research') || c.includes('scien')) return 'Education';
  if (c.includes('trade') || c.includes('vocat')) return 'Skill Development';
  return null;
};

/**
 * Helper to get localized text for title/description/etc.
 */
const getLocalizedText = (field, lang = 'en') => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || Object.values(field)[0] || "";
};

/**
 * Helper to format eligibility object into a readable string summary.
 */
const getEligibilitySummary = (eligibility) => {
  if (!eligibility) return "N/A";
  if (typeof eligibility === "string") return eligibility;
  const parts = [];
  if (eligibility.gender) parts.push(`Gender: ${eligibility.gender}`);
  if (eligibility.minAge && eligibility.maxAge) parts.push(`Age: ${eligibility.minAge}-${eligibility.maxAge} years`);
  if (eligibility.state) parts.push(`State: ${eligibility.state === 'all' ? 'All States' : eligibility.state}`);
  if (eligibility.incomeLimit) parts.push(`Income Limit: ${eligibility.incomeLimit}`);
  return parts.join(', ') || JSON.stringify(eligibility);
};

/**
 * Shared HTML wrapper to style all outgoing system emails.
 */
const emailLayout = (title, contentHtml) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 24px; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #6d28d9; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #6d28d9; margin: 0; font-size: 26px;">EmpowerHer</h2>
        <p style="color: #db2777; margin: 4px 0 0 0; font-size: 14px; font-weight: 600;">Igniting Dreams, Transforming Futures</p>
      </div>
      <div style="font-size: 15px; color: #374151;">
        ${contentHtml}
      </div>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; text-align: center; color: #777; font-size: 12px;">
        <p style="margin: 0;">&copy; 2026 EmpowerHer Team. All rights reserved.</p>
        <p style="margin: 4px 0 0 0;">Empowering women through career guidance, schemes, and learning resources.</p>
      </div>
    </div>
  `;
};

/**
 * Trigger: After successful account verification.
 */
const sendWelcomeEmail = async (email, name) => {
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>Welcome to EmpowerHer!</p>
    <p>Your account has been successfully verified.</p>
    <p>You can now explore schemes, career guidance, eligibility checking, and learning resources.</p>
    <br>
    <p style="margin-bottom: 0;">Regards,</p>
    <strong style="color: #6d28d9;">EmpowerHer Team</strong>
  `;
  try {
    await sendEmail({
      to: email,
      subject: 'Welcome to EmpowerHer',
      html: emailLayout('Welcome to EmpowerHer', content)
    });
  } catch (error) {
    console.error('Failed to send welcome email (swallowed):', error);
  }
};

/**
 * Trigger: When user completes Career Assessment Quiz.
 */
const sendQuizCompletionEmail = async (email, name, quizData) => {
  const { primaryCategory, topRecommendations, confidenceScores } = quizData;
  const confidence = (confidenceScores && confidenceScores[primaryCategory]) || 100;
  
  const recommendationsList = Array.isArray(topRecommendations) 
    ? topRecommendations.map(rec => `<li style="margin-bottom: 6px;">${rec}</li>`).join('')
    : `<li style="margin-bottom: 6px;">${primaryCategory}</li>`;
    
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>Congratulations on completing your Career Assessment Quiz!</p>
    <p>Here are your results:</p>
    <div style="background-color: #f3e8ff; border-left: 4px solid #6d28d9; padding: 12px; margin: 16px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #5b21b6;"><strong>Selected Career Domain:</strong> ${primaryCategory}</p>
      <p style="margin: 0; font-size: 14px; color: #5b21b6;"><strong>Confidence Score:</strong> ${confidence}%</p>
    </div>
    <p><strong>Top 3 Recommended Domains:</strong></p>
    <ul style="padding-left: 20px;">
      ${recommendationsList}
    </ul>
    <div style="text-align: center; margin: 24px 0;">
      <a href="http://localhost:5173/career-roadmap" style="background-color: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">View Personalized Roadmap</a>
    </div>
    <br>
    <p style="margin-bottom: 0;">Regards,</p>
    <strong style="color: #6d28d9;">EmpowerHer Team</strong>
  `;
  try {
    await sendEmail({
      to: email,
      subject: 'Your Career Assessment Results',
      html: emailLayout('Your Career Assessment Results', content)
    });
  } catch (error) {
    console.error('Failed to send quiz completion email (swallowed):', error);
  }
};

/**
 * Trigger: When user changes career path from profile.
 */
const sendCareerUpdateEmail = async (email, name, newCareer) => {
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>Your career roadmap and recommendations have been updated successfully.</p>
    <p style="font-size: 14px;">Your new active career path is: <strong>${newCareer}</strong></p>
    <br>
    <p style="margin-bottom: 0;">Regards,</p>
    <strong style="color: #6d28d9;">EmpowerHer Team</strong>
  `;
  try {
    await sendEmail({
      to: email,
      subject: 'Career Path Updated',
      html: emailLayout('Career Path Updated', content)
    });
  } catch (error) {
    console.error('Failed to send career update email (swallowed):', error);
  }
};

/**
 * Trigger: When a user becomes eligible for a scheme.
 */
const sendEligibilityEmail = async (email, name, schemeName, schemeDesc, eligibilitySummary) => {
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>Congratulations!</p>
    <p>A scheme matching your profile has been identified.</p>
    <div style="border: 1px solid #fbcfe8; background-color: #fdf2f8; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <h3 style="color: #db2777; margin: 0 0 8px 0; font-size: 18px;">${schemeName}</h3>
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">${schemeDesc}</p>
      <p style="margin: 0; font-size: 12px; color: #6b7280;"><strong>Eligibility:</strong> ${eligibilitySummary}</p>
    </div>
    <br>
    <p style="margin-bottom: 0;">Regards,</p>
    <strong style="color: #6d28d9;">EmpowerHer Team</strong>
  `;
  try {
    await sendEmail({
      to: email,
      subject: 'New Scheme Match Found',
      html: emailLayout('New Scheme Match Found', content)
    });
  } catch (error) {
    console.error('Failed to send eligibility email (swallowed):', error);
  }
};

/**
 * Trigger: When admin creates a new scheme.
 */
const sendSchemeAnnouncementEmail = async (email, name, schemeName, schemeDesc, category) => {
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>A new scheme relevant to your interests has been added.</p>
    <div style="border: 1px solid #e9d5ff; background-color: #faf5ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <h3 style="color: #6d28d9; margin: 0 0 8px 0; font-size: 18px;">${schemeName}</h3>
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">${schemeDesc}</p>
      <p style="margin: 0; font-size: 12px; color: #6b7280;"><strong>Category:</strong> ${category}</p>
    </div>
    <br>
    <p style="margin-bottom: 0;">Regards,</p>
    <strong style="color: #6d28d9;">EmpowerHer Team</strong>
  `;
  try {
    await sendEmail({
      to: email,
      subject: 'New Opportunity Available',
      html: emailLayout('New Opportunity Available', content)
    });
  } catch (error) {
    console.error('Failed to send scheme announcement email (swallowed):', error);
  }
};

/**
 * Helper to identify matching schemes and send eligibility notification
 */
const triggerEligibilityNotification = async (user, careerOrCategory) => {
  try {
    const Scheme = require('../models/Scheme');
    const targetCategory = mapCareerToSchemeCategory(careerOrCategory) || careerOrCategory;
    
    // Find all schemes matching category
    const matchingSchemes = await Scheme.find({ category: targetCategory });
    if (matchingSchemes && matchingSchemes.length > 0) {
      const scheme = matchingSchemes[0];
      const schemeName = getLocalizedText(scheme.title);
      const schemeDesc = getLocalizedText(scheme.description);
      const eligibilitySummary = getEligibilitySummary(scheme.eligibility);
      
      await sendEligibilityEmail(user.email, user.name, schemeName, schemeDesc, eligibilitySummary);
    }
  } catch (error) {
    console.error('Error triggering eligibility notification (swallowed):', error);
  }
};

/**
 * Helper to identify users matching newly created scheme's category and announce it
 */
const triggerSchemeAnnouncement = async (newScheme) => {
  try {
    const User = require('../models/User');
    
    // Find all users
    const users = await User.find({ role: { $ne: 'admin' } });
    
    const schemeName = getLocalizedText(newScheme.title);
    const schemeDesc = getLocalizedText(newScheme.description);
    
    for (const user of users) {
      let matches = false;
      if (user.career && mapCareerToSchemeCategory(user.career) === newScheme.category) {
        matches = true;
      } else if (user.topRecommendations && Array.isArray(user.topRecommendations)) {
        for (const rec of user.topRecommendations) {
          if (mapCareerToSchemeCategory(rec) === newScheme.category) {
            matches = true;
            break;
          }
        }
      }
      
      if (matches) {
        await sendSchemeAnnouncementEmail(user.email, user.name, schemeName, schemeDesc, newScheme.category);
      }
    }
  } catch (error) {
    console.error('Error triggering scheme announcement (swallowed):', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendQuizCompletionEmail,
  sendCareerUpdateEmail,
  sendEligibilityEmail,
  sendSchemeAnnouncementEmail,
  triggerEligibilityNotification,
  triggerSchemeAnnouncement,
  mapCareerToSchemeCategory
};
