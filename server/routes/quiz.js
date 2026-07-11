const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { readDB, writeDB } = require('../utils/db');

router.post('/save', authMiddleware, async (req, res) => {
  const { primaryCategory, scores, topRecommendations, confidenceScores, quizAnswers } = req.body;
  try {
    const results = readDB('quiz.json');
    
    const newResult = {
      id: Date.now().toString(),
      userId: req.user.userId,
      primaryCategory,
      scores,
      topRecommendations,
      confidenceScores,
      quizAnswers,
      createdAt: new Date().toISOString()
    };
    
    results.push(newResult);
    writeDB('quiz.json', results);
    
    // Trigger Quiz Completion and Eligibility Match emails asynchronously
    const User = require('../models/User');
    const { sendQuizCompletionEmail, triggerEligibilityNotification } = require('../utils/notificationService');

    User.findById(req.user.userId)
      .then(user => {
        if (user) {
          sendQuizCompletionEmail(user.email, user.name, {
            primaryCategory,
            topRecommendations,
            confidenceScores
          }).catch(err => console.error('Error sending quiz completion email:', err));
          
          triggerEligibilityNotification(user, primaryCategory).catch(err => console.error('Error triggering eligibility notification:', err));
        }
      })
      .catch(err => console.error('Error finding user for quiz completion:', err));

    res.status(201).json(newResult);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving quiz' });
  }
});

router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const results = readDB('quiz.json');
    const userResults = results.filter(r => r.userId === req.user.userId);
    
    // Get the latest result
    if (userResults.length > 0) {
      // Sort in descending order of createdAt
      userResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(userResults[0]);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching quiz results' });
  }
});

module.exports = router;
