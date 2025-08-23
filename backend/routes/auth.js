const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Company = require('../models/Company');
const { auth } = require('../middleware/auth');
const passport = require('../config/passport');
const {
  generateVerificationCode,
  sendVerificationEmail,
  sendPasswordResetEmail
} = require('../services/emailService');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Yalnız şəkil faylları qəbul edilir'), false);
    }
  }
});

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
  body('password')
    .isLength({ min: 8 }).withMessage('Şifrə ən azı 8 simvol olmalıdır')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Şifrə ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol olmalıdır'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Şifrələr uyğun gəlmir');
    }
    return true;
  }),
  body('phone').optional().matches(/^\+994[0-9]{9}$/).withMessage('Düzgün telefon nömrəsi daxil edin (+994XXXXXXXXX)')
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

    const { firstName, lastName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Bu email artıq istifadə olunur'
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      emailVerificationToken: verificationCode
    });

    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, firstName, verificationCode);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue with registration even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Qeydiyyat uğurla tamamlandı. E-poçt ünvanınıza doğrulama kodu göndərildi.',
      requiresVerification: true,
      email: email
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify user email with code
// @access  Public
router.post('/verify-email', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('code').isLength({ min: 6, max: 6 }).withMessage('Doğrulama kodu 6 rəqəm olmalıdır')
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

    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      emailVerificationToken: code
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Yanlış doğrulama kodu və ya email'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id, 'user');

    res.json({
      success: true,
      message: 'Email uğurla doğrulandı',
      token,
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/resend-verification
// @desc    Resend email verification code
// @access  Public
router.post('/resend-verification', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin')
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

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Bu email ilə istifadəçi tapılmadı'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email artıq doğrulanıb'
      });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    user.emailVerificationToken = verificationCode;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, user.firstName, verificationCode);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Email göndərilmədi. Yenidən cəhd edin.'
      });
    }

    res.json({
      success: true,
      message: 'Yeni doğrulama kodu email ünvanınıza göndərildi'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin')
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

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Bu email ilə istifadəçi tapılmadı'
      });
    }

    // Generate reset code
    const resetCode = generateVerificationCode();
    user.passwordResetToken = resetCode;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    try {
      await sendPasswordResetEmail(email, user.firstName, resetCode);
    } catch (emailError) {
      console.error('Password reset email error:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Email göndərilmədi. Yenidən cəhd edin.'
      });
    }

    res.json({
      success: true,
      message: 'Şifrə yenileme kodu email ünvanınıza göndərildi'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with code
// @access  Public
router.post('/reset-password', [
  body('email').isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('code').isLength({ min: 6, max: 6 }).withMessage('Yenileme kodu 6 rəqəm olmalıdır'),
  body('password')
    .isLength({ min: 8 }).withMessage('Şifrə ən azı 8 simvol olmalıdır')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Şifrə ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol olmalıdır')
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

    const { email, code, password } = req.body;

    const user = await User.findOne({
      email,
      passwordResetToken: code,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Yanlış və ya vaxtı keçmiş yenileme kodu'
      });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Şifrə uğurla yeniləndi'
    });

  } catch (error) {
    console.error('Reset password error:', error);
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
  body('password')
    .isLength({ min: 8 }).withMessage('Şifrə ən azı 8 simvol olmalıdır')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Şifrə ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol olmalıdır'),
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

    const { firstName, lastName, companyName, email, password, phone } = req.body;

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
      password,
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

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(401).json({
        success: false,
        message: 'Email ünvanınız doğrulanmayıb. Zəhmət olmasa email-də olan doğrulama linkini klikləyin.',
        requiresVerification: true,
        email: user.email
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
    const company = await Company.findOne({ email }).select('+password').populate('category');
    if (!company) {
      return res.status(401).json({
        success: false,
        message: 'Email və ya şifrə yanlışdır'
      });
    }

    // Check password
    const isMatch = await company.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email və ya şifrə yanlışdır'
      });
    }

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

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Get user error:', error);
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

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id, 'user');
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id, 'user');
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, upload.single('avatar'), [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Ad 2-50 simvol arasında olmalıdır'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Soyad 2-50 simvol arasında olmalıdır'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Düzgün email daxil edin'),
  body('phone').optional().custom((value) => {
    if (value && !value.match(/^\+994[0-9]{9}$/)) {
      throw new Error('Düzgün telefon nömrəsi daxil edin (+994XXXXXXXXX)');
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

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    const { firstName, lastName, email, phone } = req.body;

    // Check if email is being changed and if it's already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Bu email artıq istifadə olunur'
        });
      }
      user.email = email;
      user.isEmailVerified = false; // Require re-verification for new email
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;

    // Handle avatar upload
    if (req.file) {
      user.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profil uğurla yeniləndi',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   DELETE /api/auth/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    await User.findByIdAndDelete(req.userId);

    res.json({
      success: true,
      message: 'Hesab uğurla silindi'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
