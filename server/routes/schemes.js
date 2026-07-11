const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { readDB, writeDB } = require('../utils/db');
const Scheme = require('../models/Scheme');

// Existing: Get saved schemes for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const schemes = readDB('schemes.json');
    const userSchemes = schemes.filter(s => s.userId === req.user.userId);
    
    // Map id to _id for frontend compatibility
    const formattedSchemes = userSchemes.map(s => ({ ...s, _id: s.id }));
    
    res.json(formattedSchemes);
  } catch (error) {
    res.status(500).json({ message: 'Server error reading schemes' });
  }
});

// New: Get all available schemes (no authentication strictly required, or authenticated)
router.get('/available', async (req, res) => {
  try {
    const available = await Scheme.find({});
    res.json(available);
  } catch (error) {
    res.status(500).json({ message: 'Server error reading available schemes' });
  }
});

// New: Get single available scheme details (public or private)
router.get('/available/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ id: req.params.id });
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    
    // Track views
    try {
      const views = readDB('scheme_views.json') || {};
      views[scheme.id] = (views[scheme.id] || 0) + 1;
      writeDB('scheme_views.json', views);
    } catch (e) {
      console.error('Error updating scheme views:', e);
    }
    
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error reading scheme details' });
  }
});

// New: Record view explicitly (fallback/extra utility)
router.post('/view/:id', async (req, res) => {
  try {
    const views = readDB('scheme_views.json') || {};
    views[req.params.id] = (views[req.params.id] || 0) + 1;
    writeDB('scheme_views.json', views);
    res.json({ success: true, views: views[req.params.id] });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating views' });
  }
});

// Existing: Save a scheme to user's saved list
router.post('/save', authMiddleware, async (req, res) => {
  const { schemeId, title, description } = req.body;
  try {
    const schemes = readDB('schemes.json');
    
    let existingScheme = schemes.find(s => s.userId === req.user.userId && s.schemeId === schemeId);
    if (existingScheme) {
      return res.status(400).json({ message: 'Scheme already saved' });
    }

    const newScheme = {
      id: Date.now().toString(),
      userId: req.user.userId,
      schemeId,
      title,
      description,
      savedAt: new Date().toISOString()
    };
    
    schemes.push(newScheme);
    writeDB('schemes.json', schemes);
    
    // Keep frontend compatibility by returning _id properly formatted
    res.status(201).json({ ...newScheme, _id: newScheme.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving scheme' });
  }
});

// Existing: Delete a saved scheme from user's saved list
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let schemes = readDB('schemes.json');
    const index = schemes.findIndex(s => s.id === req.params.id);
    
    if (index === -1) return res.status(404).json({ message: 'Scheme not found' });
    
    if (schemes[index].userId !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Remove the scheme
    schemes.splice(index, 1);
    writeDB('schemes.json', schemes);
    
    res.json({ message: 'Scheme removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error removing scheme' });
  }
});

module.exports = router;
