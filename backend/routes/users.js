const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/users';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Yalnız şəkil faylları qəbul edilir'));
    }
  }
});

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private (User only)
router.get('/profile', auth, async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər bu əməliyyatı həyata keçirə bilər'
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private (User only)
router.put('/profile', auth, upload.single('avatar'), [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 simvol arasında olmalıdır'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 simvol arasında olmalıdır'),
  body('phone').optional().matches(/^\+994[0-9]{9}$/).withMessage('Düzgün telefon nömrəsi daxil edin')
], async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər bu əməliyyatı həyata keçirə bilər'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    // Update fields
    const allowedFields = ['firstName', 'lastName', 'phone'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Handle avatar upload
    if (req.file) {
      user.avatar = `/uploads/users/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profil uğurla yeniləndi',
      data: user
    });

  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/users/complaints
// @desc    Get user's complaints
// @access  Private (User only)
router.get('/complaints', auth, async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər bu əməliyyatı həyata keçirə bilər'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user: req.userId };
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const complaints = await Complaint.find(filter)
      .populate('company', 'companyName logo')
      .populate('category', 'name icon color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Complaint.countDocuments(filter);

    res.json({
      success: true,
      data: {
        complaints,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get user complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/users/dashboard/stats
// @desc    Get user dashboard statistics
// @access  Private (User only)
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər bu əməliyyatı həyata keçirə bilər'
      });
    }

    // Get complaint statistics
    const complaintStats = await Complaint.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get monthly complaint trend
    const monthlyTrend = await Complaint.aggregate([
      { 
        $match: { 
          user: req.user._id,
          createdAt: { $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get total counts
    const totalComplaints = await Complaint.countDocuments({ user: req.user._id });
    const resolvedComplaints = await Complaint.countDocuments({ 
      user: req.user._id, 
      status: 'resolved' 
    });

    res.json({
      success: true,
      data: {
        totalComplaints,
        resolvedComplaints,
        pendingComplaints: totalComplaints - resolvedComplaints,
        resolutionRate: totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0,
        complaintStats,
        monthlyTrend
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/users/change-password
// @desc    Change user password
// @access  Private (User only)
router.post('/change-password', auth, [
  body('currentPassword').exists().withMessage('Cari şifrə tələb olunur'),
  body('newPassword').isLength({ min: 6 }).withMessage('Yeni şifrə ən azı 6 simvol olmalıdır'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Şifrələr uyğun gəlmir');
    }
    return true;
  })
], async (req, res) => {
  try {
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər bu əməliyyatı həyata keçirə bilər'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select('+password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Cari şifrə yanlışdır'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Şifrə uğurla dəyişdirildi'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
