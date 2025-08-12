const express = require('express');
const Complaint = require('../models/Complaint');
const Company = require('../models/Company');
const User = require('../models/User');
const Category = require('../models/Category');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/stats/overview
// @desc    Get general platform statistics
// @access  Public
router.get('/overview', async (req, res) => {
  try {
    const [
      totalComplaints,
      totalCompanies,
      totalUsers,
      totalCategories,
      resolvedComplaints,
      pendingComplaints
    ] = await Promise.all([
      Complaint.countDocuments({ isPublic: true, moderationStatus: 'approved' }),
      Company.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
      Complaint.countDocuments({ 
        status: 'resolved', 
        isPublic: true, 
        moderationStatus: 'approved' 
      }),
      Complaint.countDocuments({ 
        status: 'pending', 
        isPublic: true, 
        moderationStatus: 'approved' 
      })
    ]);

    const resolutionRate = totalComplaints > 0 ? 
      Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

    res.json({
      success: true,
      data: {
        totalComplaints,
        totalCompanies,
        totalUsers,
        totalCategories,
        resolvedComplaints,
        pendingComplaints,
        resolutionRate
      }
    });

  } catch (error) {
    console.error('Get overview stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/complaints/monthly
// @desc    Get monthly complaint statistics
// @access  Public
router.get('/complaints/monthly', async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const monthlyStats = await Complaint.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          isPublic: true,
          moderationStatus: 'approved'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          resolved: {
            $sum: {
              $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      success: true,
      data: monthlyStats
    });

  } catch (error) {
    console.error('Get monthly complaint stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/categories/popular
// @desc    Get popular categories with complaint counts
// @access  Public
router.get('/categories/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const categoryStats = await Complaint.aggregate([
      {
        $match: {
          isPublic: true,
          moderationStatus: 'approved'
        }
      },
      {
        $group: {
          _id: '$category',
          complaintCount: { $sum: 1 },
          resolvedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $match: {
          'category.isActive': true
        }
      },
      {
        $project: {
          _id: '$category._id',
          name: '$category.name',
          icon: '$category.icon',
          color: '$category.color',
          complaintCount: 1,
          resolvedCount: 1,
          resolutionRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ['$resolvedCount', '$complaintCount'] },
                  100
                ]
              },
              1
            ]
          }
        }
      },
      {
        $sort: { complaintCount: -1 }
      },
      {
        $limit: limit
      }
    ]);

    res.json({
      success: true,
      data: categoryStats
    });

  } catch (error) {
    console.error('Get popular category stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/companies/top
// @desc    Get top companies by various metrics
// @access  Public
router.get('/companies/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const metric = req.query.metric || 'resolution_rate'; // resolution_rate, response_time, rating

    let sortField;
    switch (metric) {
      case 'response_time':
        sortField = { averageResponseTime: 1 }; // Ascending for response time (lower is better)
        break;
      case 'rating':
        sortField = { rating: -1 };
        break;
      case 'complaints':
        sortField = { totalComplaints: -1 };
        break;
      default:
        sortField = { resolutionRate: -1 };
    }

    const companies = await Company.find({
      isActive: true,
      totalComplaints: { $gte: 5 } // Only companies with at least 5 complaints
    })
    .populate('category', 'name icon color')
    .sort(sortField)
    .limit(limit)
    .select('companyName logo rating totalComplaints resolvedComplaints averageResponseTime category');

    // Add calculated fields
    const companiesWithStats = companies.map(company => ({
      ...company.toJSON(),
      resolutionRate: company.resolutionRate
    }));

    res.json({
      success: true,
      data: companiesWithStats
    });

  } catch (error) {
    console.error('Get top companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/complaints/status-distribution
// @desc    Get complaint status distribution
// @access  Public
router.get('/complaints/status-distribution', async (req, res) => {
  try {
    const statusStats = await Complaint.aggregate([
      {
        $match: {
          isPublic: true,
          moderationStatus: 'approved'
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Calculate percentages
    const total = statusStats.reduce((sum, stat) => sum + stat.count, 0);
    const statusWithPercentages = statusStats.map(stat => ({
      status: stat._id,
      count: stat.count,
      percentage: total > 0 ? Math.round((stat.count / total) * 100) : 0
    }));

    res.json({
      success: true,
      data: {
        total,
        distribution: statusWithPercentages
      }
    });

  } catch (error) {
    console.error('Get status distribution error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/activity/recent
// @desc    Get recent platform activity
// @access  Public
router.get('/activity/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get recent complaints
    const recentComplaints = await Complaint.find({
      createdAt: { $gte: startDate },
      isPublic: true,
      moderationStatus: 'approved'
    })
    .populate('user', 'firstName lastName')
    .populate('company', 'companyName logo')
    .populate('category', 'name icon color')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('title status createdAt user company category');

    // Get recent resolutions
    const recentResolutions = await Complaint.find({
      'resolution.resolvedAt': { $gte: startDate },
      isPublic: true,
      moderationStatus: 'approved'
    })
    .populate('user', 'firstName lastName')
    .populate('company', 'companyName logo')
    .populate('category', 'name icon color')
    .sort({ 'resolution.resolvedAt': -1 })
    .limit(limit)
    .select('title resolution user company category');

    res.json({
      success: true,
      data: {
        recentComplaints,
        recentResolutions
      }
    });

  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

// @route   GET /api/stats/search/trending
// @desc    Get trending search terms (mock data for now)
// @access  Public
router.get('/search/trending', async (req, res) => {
  try {
    // This would typically come from search logs
    // For now, return mock trending terms based on popular categories and companies
    const trendingTerms = [
      { term: 'internet', count: 156 },
      { term: 'bank', count: 134 },
      { term: 'telefon', count: 98 },
      { term: 'sifariş', count: 87 },
      { term: 'xidmət', count: 76 },
      { term: 'ödəniş', count: 65 },
      { term: 'çatdırılma', count: 54 },
      { term: 'keyfiyyət', count: 43 },
      { term: 'dəstək', count: 32 },
      { term: 'gecikme', count: 28 }
    ];

    res.json({
      success: true,
      data: trendingTerms
    });

  } catch (error) {
    console.error('Get trending search terms error:', error);
    res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

module.exports = router;
