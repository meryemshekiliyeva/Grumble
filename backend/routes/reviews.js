const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Company = require('../models/Company');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for review photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'review-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Yalnız şəkil faylları qəbul edilir'), false);
    }
  }
});

// @route   POST /api/reviews
// @desc    Create new review
// @access  Private
router.post('/', auth, upload.array('photos', 5), [
  body('company').isMongoId().withMessage('Düzgün şirkət ID daxil edin'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Reytinq 1-5 arasında olmalıdır'),
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Başlıq 5-200 simvol arasında olmalıdır'),
  body('content').trim().isLength({ min: 10, max: 2000 }).withMessage('Məzmun 10-2000 simvol arasında olmalıdır'),
  body('isAnonymous').optional().isBoolean()
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

    const { company, rating, title, content, isAnonymous } = req.body;

    // Verify company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: 'Şirkət tapılmadı'
      });
    }

    // Check if user already reviewed this company
    const existingReview = await Review.findOne({
      user: req.userId,
      company: company
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Siz artıq bu şirkət haqqında rəy yazmısınız'
      });
    }

    // Process uploaded photos
    const photos = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/reviews/${file.filename}`
    })) : [];

    // Create review
    const review = new Review({
      user: req.userId,
      company,
      rating: parseInt(rating),
      title,
      content,
      isAnonymous: isAnonymous || false,
      photos
    });

    await review.save();

    // Populate user and company data
    await review.populate('user', 'firstName lastName avatar');
    await review.populate('company', 'companyName logo');

    res.status(201).json({
      success: true,
      message: 'Rəy uğurla göndərildi',
      review
    });

  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/reviews/company/:companyId
// @desc    Get reviews for a company
// @access  Public
router.get('/company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const reviews = await Review.find({
      company: companyId,
      moderationStatus: 'approved',
      isActive: true
    })
    .populate('user', 'firstName lastName avatar')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

    const total = await Review.countDocuments({
      company: companyId,
      moderationStatus: 'approved',
      isActive: true
    });

    // Get rating distribution
    const ratingStats = await Review.aggregate([
      {
        $match: {
          company: mongoose.Types.ObjectId(companyId),
          moderationStatus: 'approved',
          isActive: true
        }
      },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]);

    res.json({
      success: true,
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      ratingStats
    });

  } catch (error) {
    console.error('Get company reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/reviews/user/:userId
// @desc    Get reviews by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const reviews = await Review.find({
      user: userId,
      isActive: true
    })
    .populate('company', 'companyName logo')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Review.countDocuments({
      user: userId,
      isActive: true
    });

    res.json({
      success: true,
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   PUT /api/reviews/:id/like
// @desc    Like/unlike a review
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Rəy tapılmadı'
      });
    }

    const likeIndex = review.likes.findIndex(
      like => like.user.toString() === req.userId
    );

    if (likeIndex > -1) {
      // Unlike
      review.likes.splice(likeIndex, 1);
    } else {
      // Like
      review.likes.push({ user: req.userId });
    }

    await review.save();

    res.json({
      success: true,
      message: likeIndex > -1 ? 'Bəyənmə geri alındı' : 'Rəy bəyənildi',
      likeCount: review.likes.length,
      isLiked: likeIndex === -1
    });

  } catch (error) {
    console.error('Review like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
