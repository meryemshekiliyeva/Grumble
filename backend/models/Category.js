const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Kateqoriya adı tələb olunur'],
    unique: true,
    trim: true,
    maxlength: [100, 'Kateqoriya adı 100 simvoldan çox ola bilməz']
  },
  nameEn: {
    type: String,
    trim: true,
    maxlength: [100, 'İngiliscə ad 100 simvoldan çox ola bilməz']
  },
  description: {
    type: String,
    maxlength: [500, 'Təsvir 500 simvoldan çox ola bilməz']
  },
  icon: {
    type: String,
    default: '📋'
  },
  color: {
    type: String,
    default: '#3B82F6',
    match: [/^#[0-9A-F]{6}$/i, 'Düzgün hex rəng kodu daxil edin']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  complaintCount: {
    type: Number,
    default: 0
  },
  companyCount: {
    type: Number,
    default: 0
  },
  averageResolutionTime: {
    type: Number, // in hours
    default: 0
  },
  metadata: {
    keywords: [String],
    tags: [String],
    seoTitle: String,
    seoDescription: String
  }
}, {
  timestamps: true
});

// Indexes
categorySchema.index({ name: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ complaintCount: -1 });

// Virtual for subcategory check
categorySchema.virtual('hasSubcategories').get(function() {
  return this.subcategories && this.subcategories.length > 0;
});

// Virtual for full path (for breadcrumbs)
categorySchema.virtual('fullPath').get(function() {
  // This would need to be populated with parent data
  return this.name;
});

// Method to update statistics
categorySchema.methods.updateStats = async function() {
  const Company = mongoose.model('Company');
  const Complaint = mongoose.model('Complaint');
  
  // Count companies in this category
  const companyCount = await Company.countDocuments({ 
    category: this._id, 
    isActive: true 
  });
  
  // Count complaints in this category
  const complaintStats = await Complaint.aggregate([
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'companyData'
      }
    },
    {
      $match: {
        'companyData.category': this._id
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        avgResolutionTime: {
          $avg: {
            $cond: [
              { $ne: ['$resolutionTime', null] },
              '$resolutionTime',
              null
            ]
          }
        }
      }
    }
  ]);

  this.companyCount = companyCount;
  this.complaintCount = complaintStats.length > 0 ? complaintStats[0].total : 0;
  this.averageResolutionTime = complaintStats.length > 0 ? 
    (complaintStats[0].avgResolutionTime || 0) : 0;
  
  await this.save();
};

// Static method to get category hierarchy
categorySchema.statics.getHierarchy = async function() {
  const categories = await this.find({ isActive: true })
    .populate('subcategories')
    .sort({ order: 1, name: 1 });
  
  const hierarchy = categories.filter(cat => !cat.parentCategory);
  return hierarchy;
};

// Static method to get popular categories
categorySchema.statics.getPopular = async function(limit = 10) {
  return await this.find({ isActive: true })
    .sort({ complaintCount: -1 })
    .limit(limit);
};

// Pre-save middleware to handle subcategory relationships
categorySchema.pre('save', async function(next) {
  if (this.isModified('parentCategory') && this.parentCategory) {
    // Add this category to parent's subcategories
    await this.constructor.findByIdAndUpdate(
      this.parentCategory,
      { $addToSet: { subcategories: this._id } }
    );
  }
  next();
});

// Transform output
categorySchema.methods.toJSON = function() {
  const category = this.toObject();
  category.hasSubcategories = this.hasSubcategories;
  return category;
};

module.exports = mongoose.model('Category', categorySchema);
