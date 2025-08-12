const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Company = require('../models/Company');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (id, type = 'user') => {
  return jwt.sign(
    { id, type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @route   POST /api/auth/register/user
// @desc    Register a new user
// @access  Public
router.post('/register/user', [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 simvol arasında olmalıdır'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 simvol arasında olmalıdır'),
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('password').isLength({ min: 6 }).withMessage('Şifrə ən azı 6 simvol olmalıdır'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Şifrələr uyğun gəlmir');
    }
    return true;
  })
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

    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Bu email artıq istifadə olunur'
      });
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, 'user');

    res.status(201).json({
      success: true,
      message: 'İstifadəçi uğurla qeydiyyatdan keçdi',
      token,
      user: user.toJSON()
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/register/company
// @desc    Register a new company
// @access  Public
router.post('/register/company', [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 simvol arasında olmalıdır'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 simvol arasında olmalıdır'),
  body('companyName').trim().isLength({ min: 2, max: 100 }).withMessage('Şirkət adı 2-100 simvol arasında olmalıdır'),
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('phone').matches(/^\+994[0-9]{9}$/).withMessage('Düzgün telefon nömrəsi daxil edin (+994XXXXXXXXX)')
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

    const { firstName, lastName, companyName, email, phone } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Bu email artıq istifadə olunur'
      });
    }

    // For now, assign to a default category (you can modify this)
    const Category = require('../models/Category');
    let defaultCategory = await Category.findOne({ name: 'Ümumi' });
    if (!defaultCategory) {
      defaultCategory = new Category({
        name: 'Ümumi',
        description: 'Ümumi kateqoriya',
        icon: '📋'
      });
      await defaultCategory.save();
    }

    // Create company
    const company = new Company({
      firstName,
      lastName,
      companyName,
      email,
      phone,
      category: defaultCategory._id
    });

    await company.save();

    // Generate token
    const token = generateToken(company._id, 'company');

    res.status(201).json({
      success: true,
      message: 'Şirkət uğurla qeydiyyatdan keçdi',
      token,
      company: company.toJSON()
    });

  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/login/user
// @desc    Login user
// @access  Public
router.post('/login/user', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('password').exists().withMessage('Şifrə tələb olunur')
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

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email və ya şifrə yanlışdır'
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Hesab müvəqqəti olaraq bloklanıb. Daha sonra cəhd edin.'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({
        success: false,
        message: 'Email və ya şifrə yanlışdır'
      });
    }

    // Reset login attempts and update last login
    await user.resetLoginAttempts();
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, 'user');

    res.json({
      success: true,
      message: 'Uğurla daxil oldunuz',
      token,
      user: user.toJSON()
    });

  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/login/company
// @desc    Login company
// @access  Public
router.post('/login/company', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('password').exists().withMessage('Şifrə tələb olunur')
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

    const { email, password } = req.body;

    // Find company
    const company = await Company.findOne({ email }).populate('category');
    if (!company) {
      return res.status(401).json({
        success: false,
        message: 'Email və ya şifrə yanlışdır'
      });
    }

    // For now, companies don't have passwords in the current model
    // You might want to add password field to Company model if needed
    // This is a simplified login for companies

    // Update last activity
    company.lastActivity = new Date();
    await company.save();

    // Generate token
    const token = generateToken(company._id, 'company');

    res.json({
      success: true,
      message: 'Uğurla daxil oldunuz',
      token,
      company: company.toJSON()
    });

  } catch (error) {
    console.error('Company login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user/company
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    if (req.userType === 'user') {
      const user = await User.findById(req.userId);
      res.json({
        success: true,
        user: user.toJSON(),
        type: 'user'
      });
    } else if (req.userType === 'company') {
      const company = await Company.findById(req.userId).populate('category');
      res.json({
        success: true,
        company: company.toJSON(),
        type: 'company'
      });
    }
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, (req, res) => {
  // In a real application, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Uğurla çıxış etdiniz'
  });
});

module.exports = router;
