const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('subcategories')
      .sort({ order: 1, name: 1 });

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/categories/hierarchy
// @desc    Get category hierarchy
// @access  Public
router.get('/hierarchy', async (req, res) => {
  try {
    const hierarchy = await Category.getHierarchy();

    res.json({
      success: true,
      data: hierarchy
    });

  } catch (error) {
    console.error('Get category hierarchy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/categories/popular
// @desc    Get popular categories
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const categories = await Category.getPopular(limit);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get popular categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('subcategories')
      .populate('parentCategory');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kateqoriya tapılmadı'
      });
    }

    if (!category.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Kateqoriya deaktiv edilib'
      });
    }

    res.json({
      success: true,
      data: category
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only)
router.post('/', adminAuth, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Kateqoriya adı 2-100 simvol arasında olmalıdır'),
  body('nameEn').optional().trim().isLength({ max: 100 }).withMessage('İngiliscə ad 100 simvoldan çox ola bilməz'),
  body('description').optional().isLength({ max: 500 }).withMessage('Təsvir 500 simvoldan çox ola bilməz'),
  body('icon').optional().isLength({ max: 10 }).withMessage('İkon 10 simvoldan çox ola bilməz'),
  body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Düzgün hex rəng kodu daxil edin'),
  body('parentCategory').optional().isMongoId().withMessage('Düzgün ana kateqoriya ID daxil edin')
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

    const { name, nameEn, description, icon, color, parentCategory, order } = req.body;

    // Check if category with same name exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Bu adda kateqoriya artıq mövcuddur'
      });
    }

    // Verify parent category exists if provided
    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return res.status(400).json({
          success: false,
          message: 'Ana kateqoriya tapılmadı'
        });
      }
    }

    // Create category
    const category = new Category({
      name,
      nameEn,
      description,
      icon: icon || '📋',
      color: color || '#3B82F6',
      parentCategory: parentCategory || null,
      order: order || 0
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Kateqoriya uğurla yaradıldı',
      data: category
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin only)
router.put('/:id', adminAuth, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Kateqoriya adı 2-100 simvol arasında olmalıdır'),
  body('nameEn').optional().trim().isLength({ max: 100 }).withMessage('İngiliscə ad 100 simvoldan çox ola bilməz'),
  body('description').optional().isLength({ max: 500 }).withMessage('Təsvir 500 simvoldan çox ola bilməz'),
  body('icon').optional().isLength({ max: 10 }).withMessage('İkon 10 simvoldan çox ola bilməz'),
  body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Düzgün hex rəng kodu daxil edin'),
  body('isActive').optional().isBoolean()
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

    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kateqoriya tapılmadı'
      });
    }

    // Update fields
    const allowedFields = ['name', 'nameEn', 'description', 'icon', 'color', 'isActive', 'order'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        category[field] = req.body[field];
      }
    });

    await category.save();

    res.json({
      success: true,
      message: 'Kateqoriya uğurla yeniləndi',
      data: category
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kateqoriya tapılmadı'
      });
    }

    // Check if category has companies or complaints
    const Company = require('../models/Company');
    const Complaint = require('../models/Complaint');
    
    const [companyCount, complaintCount] = await Promise.all([
      Company.countDocuments({ category: category._id }),
      Complaint.countDocuments({ category: category._id })
    ]);

    if (companyCount > 0 || complaintCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bu kateqoriyada şirkət və ya şikayət mövcuddur. Əvvəlcə onları silin və ya başqa kateqoriyaya köçürün.'
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Kateqoriya uğurla silindi'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   POST /api/categories/:id/update-stats
// @desc    Update category statistics
// @access  Private (Admin only)
router.post('/:id/update-stats', adminAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kateqoriya tapılmadı'
      });
    }

    await category.updateStats();

    res.json({
      success: true,
      message: 'Kateqoriya statistikası yeniləndi',
      data: category
    });

  } catch (error) {
    console.error('Update category stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
