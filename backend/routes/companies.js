const express = require('express');
const { body, validationResult, query } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Company = require('../models/Company');
const Category = require('../models/Category');
const Complaint = require('../models/Complaint');
const { auth, companyAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/companies';
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

// @route   GET /api/companies
// @desc    Get all companies with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Səhifə nömrəsi müsbət tam ədəd olmalıdır'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit 1-50 arasında olmalıdır'),
  query('category').optional().isMongoId().withMessage('Düzgün kateqoriya ID daxil edin'),
  query('search').optional().isLength({ max: 100 }).withMessage('Axtarış sorğusu 100 simvoldan çox ola bilməz'),
  query('verified').optional().isBoolean(),
  query('sort').optional().isIn(['name', 'rating', 'complaints', 'recent']).withMessage('Düzgün sıralama parametri daxil edin')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.verified !== undefined) {
      filter.isVerified = req.query.verified === 'true';
    }

    if (req.query.search) {
      filter.$or = [
        { companyName: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sort = { createdAt: -1 };
    switch (req.query.sort) {
      case 'name':
        sort = { companyName: 1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'complaints':
        sort = { totalComplaints: -1 };
        break;
      case 'recent':
        sort = { lastActivity: -1 };
        break;
    }

    // Get companies with pagination
    const companies = await Company.find(filter)
      .populate('category', 'name icon color')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Company.countDocuments(filter);

    res.json({
      success: true,
      data: {
        companies,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/companies/featured
// @desc    Get featured companies
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    
    const companies = await Company.find({
      isActive: true,
      isVerified: true,
      rating: { $gte: 4 }
    })
    .populate('category', 'name icon color')
    .sort({ rating: -1, totalComplaints: -1 })
    .limit(limit);

    res.json({
      success: true,
      data: companies
    });

  } catch (error) {
    console.error('Get featured companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/companies/:id
// @desc    Get single company
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('category', 'name icon color');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Şirkət tapılmadı'
      });
    }

    if (!company.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Şirkət deaktiv edilib'
      });
    }

    // Get recent complaints for this company
    const recentComplaints = await Complaint.find({
      company: company._id,
      isPublic: true,
      moderationStatus: 'approved'
    })
    .populate('user', 'firstName lastName')
    .populate('category', 'name icon color')
    .sort({ createdAt: -1 })
    .limit(5);

    res.json({
      success: true,
      data: {
        company,
        recentComplaints
      }
    });

  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   PUT /api/companies/profile
// @desc    Update company profile
// @access  Private (Company only)
router.put('/profile', companyAuth, upload.single('logo'), [
  body('companyName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Şirkət adı 2-100 simvol arasında olmalıdır'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Təsvir 1000 simvoldan çox ola bilməz'),
  body('website').optional().isURL().withMessage('Düzgün website URL daxil edin'),
  body('address').optional().isLength({ max: 500 }).withMessage('Ünvan 500 simvoldan çox ola bilməz'),
  body('phone').optional().matches(/^\+994[0-9]{9}$/).withMessage('Düzgün telefon nömrəsi daxil edin')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const company = await Company.findById(req.userId);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Şirkət tapılmadı'
      });
    }

    // Update fields
    const allowedFields = ['companyName', 'description', 'website', 'address', 'phone'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        company[field] = req.body[field];
      }
    });

    // Handle logo upload
    if (req.file) {
      company.logo = `/uploads/companies/${req.file.filename}`;
    }

    // Handle social media and working hours if provided
    if (req.body.socialMedia) {
      company.socialMedia = JSON.parse(req.body.socialMedia);
    }

    if (req.body.workingHours) {
      company.workingHours = JSON.parse(req.body.workingHours);
    }

    company.lastActivity = new Date();
    await company.save();

    await company.populate('category', 'name icon color');

    res.json({
      success: true,
      message: 'Profil uğurla yeniləndi',
      data: company
    });

  } catch (error) {
    console.error('Update company profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/companies/dashboard/stats
// @desc    Get company dashboard statistics
// @access  Private (Company only)
router.get('/dashboard/stats', companyAuth, async (req, res) => {
  try {
    const company = await Company.findById(req.userId);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Şirkət tapılmadı'
      });
    }

    // Get complaint statistics
    const complaintStats = await Complaint.aggregate([
      { $match: { company: company._id } },
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
          company: company._id,
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

    res.json({
      success: true,
      data: {
        company: {
          totalComplaints: company.totalComplaints,
          resolvedComplaints: company.resolvedComplaints,
          resolutionRate: company.resolutionRate,
          averageResponseTime: company.averageResponseTime,
          rating: company.rating
        },
        complaintStats,
        monthlyTrend
      }
    });

  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
