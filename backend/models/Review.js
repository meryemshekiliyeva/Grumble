const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'İstifadəçi tələb olunur']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Şirkət tələb olunur']
  },
  rating: {
    type: Number,
    required: [true, 'Reytinq tələb olunur'],
    min: [1, 'Reytinq ən azı 1 olmalıdır'],
    max: [5, 'Reytinq ən çox 5 olmalıdır']
  },
  title: {
    type: String,
    required: [true, 'Başlıq tələb olunur'],
    trim: true,
    maxlength: [200, 'Başlıq 200 simvoldan çox ola bilməz']
  },
  content: {
    type: String,
    required: [true, 'Məzmun tələb olunur'],
    trim: true,
    minlength: [10, 'Məzmun ən azı 10 simvol olmalıdır'],
    maxlength: [2000, 'Məzmun 2000 simvoldan çox ola bilməz']
  },
  photos: [{
    filename: String,
    originalName: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  moderationNote: String,
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  responses: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    isCompanyResponse: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  helpfulVotes: {
    helpful: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    notHelpful: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ user: 1, company: 1 }, { unique: true }); // One review per user per company
reviewSchema.index({ company: 1, rating: -1 });
reviewSchema.index({ company: 1, createdAt: -1 });
reviewSchema.index({ moderationStatus: 1 });
reviewSchema.index({ isPublic: 1, isActive: 1 });

// Virtual for like count
reviewSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for helpful vote counts
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpfulVotes.helpful.length;
});

reviewSchema.virtual('notHelpfulCount').get(function() {
  return this.helpfulVotes.notHelpful.length;
});

// Ensure virtuals are included in JSON
reviewSchema.set('toJSON', { virtuals: true });

// Update company rating when review is saved
reviewSchema.post('save', async function() {
  if (this.moderationStatus === 'approved' && this.isActive) {
    await this.constructor.updateCompanyRating(this.company);
  }
});

// Update company rating when review is removed
reviewSchema.post('remove', async function() {
  await this.constructor.updateCompanyRating(this.company);
});

// Static method to update company rating
reviewSchema.statics.updateCompanyRating = async function(companyId) {
  const Company = mongoose.model('Company');
  
  const stats = await this.aggregate([
    {
      $match: {
        company: companyId,
        moderationStatus: 'approved',
        isActive: true
      }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  const rating = stats.length > 0 ? Math.round(stats[0].averageRating * 10) / 10 : 0;
  const totalReviews = stats.length > 0 ? stats[0].totalReviews : 0;

  await Company.findByIdAndUpdate(companyId, {
    rating: rating,
    totalReviews: totalReviews
  });
};

module.exports = mongoose.model('Review', reviewSchema);
