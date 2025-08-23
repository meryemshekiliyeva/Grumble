const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Ad tələb olunur'],
    trim: true,
    maxlength: [50, 'Ad 50 simvoldan çox ola bilməz']
  },
  lastName: {
    type: String,
    required: [true, 'Soyad tələb olunur'],
    trim: true,
    maxlength: [50, 'Soyad 50 simvoldan çox ola bilməz']
  },
  companyName: {
    type: String,
    required: [true, 'Şirkət adı tələb olunur'],
    trim: true,
    maxlength: [100, 'Şirkət adı 100 simvoldan çox ola bilməz']
  },
  email: {
    type: String,
    required: [true, 'Email tələb olunur'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Düzgün email daxil edin']
  },
  password: {
    type: String,
    required: [true, 'Şifrə tələb olunur'],
    minlength: [8, 'Şifrə ən azı 8 simvol olmalıdır'],
    validate: {
      validator: function(password) {
        // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password);
      },
      message: 'Şifrə ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol olmalıdır'
    }
  },
  phone: {
    type: String,
    required: [true, 'Telefon nömrəsi tələb olunur'],
    match: [/^\+994[0-9]{9}$/, 'Düzgün telefon nömrəsi daxil edin (+994XXXXXXXXX)']
  },
  taxNumber: {
    type: String,
    sparse: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'VÖEN 10 rəqəmdən ibarət olmalıdır']
  },
  address: {
    type: String,
    maxlength: [500, 'Ünvan 500 simvoldan çox ola bilməz']
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Düzgün website URL daxil edin']
  },
  logo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    maxlength: [1000, 'Təsvir 1000 simvoldan çox ola bilməz']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Kateqoriya tələb olunur']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalComplaints: {
    type: Number,
    default: 0
  },
  resolvedComplaints: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: Number, // in hours
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  workingHours: {
    monday: { start: String, end: String, closed: Boolean },
    tuesday: { start: String, end: String, closed: Boolean },
    wednesday: { start: String, end: String, closed: Boolean },
    thursday: { start: String, end: String, closed: Boolean },
    friday: { start: String, end: String, closed: Boolean },
    saturday: { start: String, end: String, closed: Boolean },
    sunday: { start: String, end: String, closed: Boolean }
  },
  contactPersons: [{
    name: String,
    position: String,
    email: String,
    phone: String,
    isPrimary: Boolean
  }],
  subscriptionPlan: {
    type: String,
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic'
  },
  subscriptionExpires: Date
}, {
  timestamps: true
});

// Indexes
companySchema.index({ email: 1 });
companySchema.index({ companyName: 1 });
companySchema.index({ category: 1 });
companySchema.index({ isVerified: 1 });
companySchema.index({ rating: -1 });
companySchema.index({ totalComplaints: -1 });
companySchema.index({ createdAt: -1 });

// Virtual for full name
companySchema.virtual('contactPersonFullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for resolution rate
companySchema.virtual('resolutionRate').get(function() {
  if (this.totalComplaints === 0) return 0;
  return Math.round((this.resolvedComplaints / this.totalComplaints) * 100);
});

// Method to update complaint statistics
companySchema.methods.updateComplaintStats = async function() {
  const Complaint = mongoose.model('Complaint');
  
  const stats = await Complaint.aggregate([
    { $match: { company: this._id } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        resolved: {
          $sum: {
            $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0]
          }
        },
        avgResponseTime: {
          $avg: {
            $cond: [
              { $ne: ['$responseTime', null] },
              '$responseTime',
              null
            ]
          }
        }
      }
    }
  ]);

  if (stats.length > 0) {
    this.totalComplaints = stats[0].total;
    this.resolvedComplaints = stats[0].resolved;
    this.averageResponseTime = stats[0].avgResponseTime || 0;
    await this.save();
  }
};

// Pre-save middleware to hash password
companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
companySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Transform output
companySchema.methods.toJSON = function() {
  const company = this.toObject();
  delete company.password; // Don't include password in JSON output
  company.resolutionRate = this.resolutionRate;
  return company;
};

module.exports = mongoose.model('Company', companySchema);
