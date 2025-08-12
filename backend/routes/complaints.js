const express = require('express');
const { body, validationResult, query } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Complaint = require('../models/Complaint');
const Company = require('../models/Company');
const Category = require('../models/Category');
const { auth, optionalAuth, companyAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/complaints';
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
    files: 5
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Yalnız şəkil və sənəd faylları qəbul edilir'));
    }
  }
});

// @route   GET /api/complaints
// @desc    Get all complaints with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Səhifə nömrəsi müsbət tam ədəd olmalıdır'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit 1-50 arasında olmalıdır'),
  query('status').optional().isIn(['pending', 'in_progress', 'resolved', 'rejected', 'closed']),
  query('category').optional().isMongoId().withMessage('Düzgün kateqoriya ID daxil edin'),
  query('company').optional().isMongoId().withMessage('Düzgün şirkət ID daxil edin'),
  query('search').optional().isLength({ max: 100 }).withMessage('Axtarış sorğusu 100 simvoldan çox ola bilməz')
], optionalAuth, async (req, res) => {
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
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {
      isPublic: true,
      moderationStatus: 'approved'
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.company) {
      filter.company = req.query.company;
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Get complaints with pagination
    const complaints = await Complaint.find(filter)
      .populate('user', 'firstName lastName')
      .populate('company', 'companyName logo')
      .populate('category', 'name icon color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
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
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/complaints/trending
// @desc    Get trending complaints
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const complaints = await Complaint.getTrending(limit);

    res.json({
      success: true,
      data: complaints
    });

  } catch (error) {
    console.error('Get trending complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/complaints/recent
// @desc    Get recent complaints
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const complaints = await Complaint.getRecent(limit);

    res.json({
      success: true,
      data: complaints
    });

  } catch (error) {
    console.error('Get recent complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/complaints/:id
// @desc    Get single complaint
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('user', 'firstName lastName avatar')
      .populate('company', 'companyName logo email phone')
      .populate('category', 'name icon color')
      .populate('responses.author');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Şikayət tapılmadı'
      });
    }

    // Check if complaint is public or user has access
    if (!complaint.isPublic && complaint.moderationStatus !== 'approved') {
      if (!req.userId || (req.userType === 'user' && req.userId.toString() !== complaint.user._id.toString()) ||
          (req.userType === 'company' && req.userId.toString() !== complaint.company._id.toString())) {
        return res.status(403).json({
          success: false,
          message: 'Bu şikayətə giriş icazəniz yoxdur'
        });
      }
    }

    // Increment view count
    await complaint.incrementViews();

    res.json({
      success: true,
      data: complaint
    });

  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/complaints
// @desc    Create new complaint
// @access  Private (User only)
router.post('/', auth, upload.array('attachments', 5), [
  body('title').trim().isLength({ min: 10, max: 200 }).withMessage('Başlıq 10-200 simvol arasında olmalıdır'),
  body('description').trim().isLength({ min: 50, max: 2000 }).withMessage('Təsvir 50-2000 simvol arasında olmalıdır'),
  body('company').isMongoId().withMessage('Düzgün şirkət ID daxil edin'),
  body('category').isMongoId().withMessage('Düzgün kateqoriya ID daxil edin'),
  body('incidentDate').isISO8601().withMessage('Düzgün tarix formatı daxil edin'),
  body('isAnonymous').optional().isBoolean(),
  body('isPublic').optional().isBoolean()
], async (req, res) => {
  try {
    // Only users can create complaints
    if (req.userType !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız istifadəçilər şikayət yarada bilər'
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

    const { title, description, company, category, incidentDate, isAnonymous, isPublic, contactInfo, location } = req.body;

    // Verify company and category exist
    const [companyExists, categoryExists] = await Promise.all([
      Company.findById(company),
      Category.findById(category)
    ]);

    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: 'Şirkət tapılmadı'
      });
    }

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Kateqoriya tapılmadı'
      });
    }

    // Process attachments
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/complaints/${file.filename}`
    })) : [];

    // Create complaint
    const complaint = new Complaint({
      title,
      description,
      user: req.userId,
      company,
      category,
      incidentDate: new Date(incidentDate),
      isAnonymous: isAnonymous || false,
      isPublic: isPublic !== false, // Default to true
      attachments,
      contactInfo: contactInfo ? JSON.parse(contactInfo) : undefined,
      location: location ? JSON.parse(location) : undefined
    });

    await complaint.save();

    // Update company complaint count
    await companyExists.updateComplaintStats();

    // Populate the response
    await complaint.populate([
      { path: 'user', select: 'firstName lastName' },
      { path: 'company', select: 'companyName logo' },
      { path: 'category', select: 'name icon color' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Şikayət uğurla yaradıldı',
      data: complaint
    });

  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
