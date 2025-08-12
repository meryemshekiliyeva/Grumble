const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tapılmadı, giriş tələb olunur'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type === 'user') {
      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'İstifadəçi tapılmadı və ya deaktiv edilib'
        });
      }
      req.userId = decoded.id;
      req.userType = 'user';
      req.user = user;
    } else if (decoded.type === 'company') {
      const company = await Company.findById(decoded.id);
      if (!company || !company.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Şirkət tapılmadı və ya deaktiv edilib'
        });
      }
      req.userId = decoded.id;
      req.userType = 'company';
      req.company = company;
    } else {
      return res.status(401).json({
        success: false,
        message: 'Yanlış token növü'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token yanlışdır'
    });
  }
};

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (req.userType !== 'user' || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin icazəsi tələb olunur'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Yetki yoxlanılarkən xəta baş verdi'
    });
  }
};

// Middleware to check if user is company
const companyAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (req.userType !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Şirkət icazəsi tələb olunur'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Yetki yoxlanılarkən xəta baş verdi'
    });
  }
};

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type === 'user') {
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.userId = decoded.id;
        req.userType = 'user';
        req.user = user;
      }
    } else if (decoded.type === 'company') {
      const company = await Company.findById(decoded.id);
      if (company && company.isActive) {
        req.userId = decoded.id;
        req.userType = 'company';
        req.company = company;
      }
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without auth
    next();
  }
};

module.exports = {
  auth,
  adminAuth,
  companyAuth,
  optionalAuth
};
