const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Şikayət başlığı tələb olunur'],
    trim: true,
    maxlength: [200, 'Başlıq 200 simvoldan çox ola bilməz']
  },
  description: {
    type: String,
    required: [true, 'Şikayət təsviri tələb olunur'],
    maxlength: [2000, 'Təsvir 2000 simvoldan çox ola bilməz']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected', 'closed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  location: {
    city: String,
    district: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  incidentDate: {
    type: Date,
    required: true
  },
  responses: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'responses.authorType'
    },
    authorType: {
      type: String,
      enum: ['User', 'Company'],
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Cavab 1000 simvoldan çox ola bilməz']
    },
    attachments: [{
      filename: String,
      originalName: String,
      url: String
    }],
    isPublic: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolution: {
    message: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    resolvedAt: Date,
    resolutionTime: Number, // in hours
    userSatisfaction: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      feedback: String,
      ratedAt: Date
    }
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    responseTime: Number, // in hours
    firstResponseAt: Date
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  rejectionReason: String,
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
complaintSchema.index({ user: 1 });
complaintSchema.index({ company: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ priority: 1 });
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ isPublic: 1 });
complaintSchema.index({ moderationStatus: 1 });
complaintSchema.index({ 'metrics.views': -1 });
complaintSchema.index({ incidentDate: -1 });

// Compound indexes
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ company: 1, status: 1 });
complaintSchema.index({ category: 1, status: 1 });

// Virtual for complaint age
complaintSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for response count
complaintSchema.virtual('responseCount').get(function() {
  return this.responses ? this.responses.length : 0;
});

// Method to add response
complaintSchema.methods.addResponse = function(authorId, authorType, message, attachments = [], isPublic = true) {
  this.responses.push({
    author: authorId,
    authorType: authorType,
    message: message,
    attachments: attachments,
    isPublic: isPublic
  });
  
  this.lastActivity = new Date();
  
  // Set first response time if this is the first response from company
  if (authorType === 'Company' && !this.metrics.firstResponseAt) {
    this.metrics.firstResponseAt = new Date();
    this.metrics.responseTime = (Date.now() - this.createdAt) / (1000 * 60 * 60); // in hours
  }
  
  return this.save();
};

// Method to resolve complaint
complaintSchema.methods.resolve = function(resolvedBy, message) {
  this.status = 'resolved';
  this.resolution = {
    message: message,
    resolvedBy: resolvedBy,
    resolvedAt: new Date(),
    resolutionTime: (Date.now() - this.createdAt) / (1000 * 60 * 60) // in hours
  };
  this.lastActivity = new Date();
  
  return this.save();
};

// Method to increment views
complaintSchema.methods.incrementViews = function() {
  this.metrics.views += 1;
  return this.save();
};

// Static method to get trending complaints
complaintSchema.statics.getTrending = function(limit = 10) {
  return this.find({ 
    isPublic: true, 
    moderationStatus: 'approved' 
  })
  .sort({ 'metrics.views': -1, createdAt: -1 })
  .limit(limit)
  .populate('user', 'firstName lastName')
  .populate('company', 'companyName logo')
  .populate('category', 'name icon color');
};

// Static method to get recent complaints
complaintSchema.statics.getRecent = function(limit = 10) {
  return this.find({ 
    isPublic: true, 
    moderationStatus: 'approved' 
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('user', 'firstName lastName')
  .populate('company', 'companyName logo')
  .populate('category', 'name icon color');
};

// Transform output
complaintSchema.methods.toJSON = function() {
  const complaint = this.toObject();
  complaint.ageInDays = this.ageInDays;
  complaint.responseCount = this.responseCount;
  
  // Hide sensitive info for anonymous complaints
  if (this.isAnonymous && complaint.user) {
    complaint.user = {
      firstName: 'Anonim',
      lastName: 'İstifadəçi'
    };
  }
  
  return complaint;
};

module.exports = mongoose.model('Complaint', complaintSchema);
