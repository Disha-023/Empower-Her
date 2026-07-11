const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/db');
const { getActiveUsersCount } = require('../utils/activeSession');
const authMiddleware = require('../middleware/authMiddleware');
const Scheme = require('../models/Scheme');
const User = require('../models/User');

// Check admin helper
const isAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Existing: Get admin dashboard metrics (enhanced with available schemes stats)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.userId))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const allUsersDocs = await User.find({});
    const allUsers = allUsersDocs.map(u => {
      const uObj = u.toObject({ flattenMaps: true });
      const { _id, ...rest } = uObj;
      return {
        id: _id,
        ...rest
      };
    });
    // Hide all admin accounts from user tables, counts, listings, and search results
    const users = allUsers.filter(u => u.role !== 'admin');
    const savedSchemes = readDB('schemes.json');
    const availableSchemes = await Scheme.find({});
    const views = readDB('scheme_views.json') || {};

    const totalUsers = users.length;
    const activeUsersCount = getActiveUsersCount();
    const totalSchemes = availableSchemes.length;

    // Find the most viewed scheme
    let mostViewedSchemeName = 'None';
    let maxViews = -1;
    Object.entries(views).forEach(([schemeId, count]) => {
      if (count > maxViews) {
        const found = availableSchemes.find(s => s.id === schemeId);
        if (found) {
          mostViewedSchemeName = typeof found.title === 'string' ? found.title : found.title.en;
          maxViews = count;
        }
      }
    });

    const userList = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role || 'user' }));

    const applications = savedSchemes.map(s => {
      const u = allUsers.find(user => user.id === s.userId);
      return {
        id: s.id,
        userName: u ? u.name : 'Unknown User',
        schemeName: typeof s.title === 'string' ? s.title : (s.title?.en || 'Unknown Scheme'),
        date: s.savedAt
      };
    });

    res.json({
      totalUsers,
      activeUsersCount,
      totalSchemes,
      mostViewedScheme: mostViewedSchemeName + (maxViews > 0 ? ` (${maxViews} views)` : ''),
      users: userList,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error loading admin dashboard' });
  }
});

// New: Admin CRUD - Add Scheme
router.post('/schemes', authMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.userId))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newScheme = new Scheme({
      id: 's' + Date.now().toString(),
      ...req.body
    });

    await newScheme.save();

    // Trigger Scheme Announcement Email (asynchronous, non-blocking)
    const { triggerSchemeAnnouncement } = require('../utils/notificationService');
    triggerSchemeAnnouncement(newScheme).catch(err => console.error('Error triggering scheme announcement:', err));

    res.status(201).json(newScheme);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating scheme' });
  }
});

// New: Admin CRUD - Edit Scheme
router.put('/schemes/:id', authMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.userId))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await Scheme.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, id: req.params.id },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating scheme' });
  }
});

// New: Admin CRUD - Delete Scheme
router.delete('/schemes/:id', authMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.userId))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const deleted = await Scheme.findOneAndDelete({ id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting scheme' });
  }
});

module.exports = router;
