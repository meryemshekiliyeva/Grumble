const express = require('express');
const { body, validationResult, query } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
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

// @route   GET /api/complaints/company/:companyId
// @desc    Get complaints for a specific company (for company dashboard)
// @access  Private (Company only)
router.get('/company/:companyId', auth, async (req, res) => {
  try {
    // Only companies can access this endpoint
    if (req.userType !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız şirkətlər bu məlumatlara daxil ola bilər'
      });
    }

    // Check if the company is accessing their own complaints
    if (req.userId !== req.params.companyId) {
      return res.status(403).json({
        success: false,
        message: 'Yalnız öz şikayətlərinizi görə bilərsiniz'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = { company: req.params.companyId };
    if (status && ['pending', 'in_progress', 'resolved', 'rejected', 'closed'].includes(status)) {
      filter.status = status;
    }

    // Get complaints
    const complaints = await Complaint.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('category', 'name icon color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Complaint.countDocuments(filter);

    // Get statistics
    const stats = await Complaint.aggregate([
      { $match: { company: new mongoose.Types.ObjectId(req.params.companyId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = {
      pending: 0,
      in_progress: 0,
      resolved: 0,
      rejected: 0,
      closed: 0
    };

    stats.forEach(stat => {
      statusStats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: {
        complaints,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        stats: statusStats
      }
    });

  } catch (error) {
    console.error('Get company complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/complaints/:id/respond
// @desc    Add response to complaint (company response)
// @access  Private (Company only)
router.post('/:id/respond', auth, upload.array('attachments', 3), [
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Cavab 10-1000 simvol arasında olmalıdır'),
  body('isPublic').optional().isBoolean()
], async (req, res) => {
  try {
    // Only companies can respond to complaints
    if (req.userType !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Yalnız şirkətlər şikayətlərə cavab verə bilər'
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

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Şikayət tapılmadı'
      });
    }

    // Check if company owns this complaint
    if (complaint.company.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Bu şikayətə cavab vermək icazəniz yoxdur'
      });
    }

    const { message, isPublic } = req.body;

    // Process attachments
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/complaints/${file.filename}`
    })) : [];

    // Add response using the model method
    complaint.addResponse(req.userId, 'Company', message, attachments, isPublic !== false);

    // Update status to in_progress if it was pending
    if (complaint.status === 'pending') {
      complaint.status = 'in_progress';
    }

    await complaint.save();

    // Populate the response for return
    await complaint.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'company', select: 'companyName logo' },
      { path: 'category', select: 'name icon color' },
      { path: 'responses.author' }
    ]);

    res.json({
      success: true,
      message: 'Cavab uğurla əlavə edildi',
      data: complaint
    });

  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
