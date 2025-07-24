const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static('uploads'));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'complaint_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, PDF, and DOC files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: fileFilter
});

async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        summary TEXT NOT NULL,
        status ENUM('pending', 'in_progress', 'resolved', 'closed') DEFAULT 'pending',
        attachment_path VARCHAR(500),
        attachment_original_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_company (company),
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        name_az VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        website VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        complaint_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const categories = [
      ['E-commerce', 'E-ticarət', 'Online shopping and retail'],
      ['Food Delivery', 'Yemək Çatdırılması', 'Food delivery services'],
      ['Transportation', 'Nəqliyyat', 'Transportation and logistics'],
      ['Banking', 'Bank Xidmətləri', 'Banking and financial services'],
      ['Telecommunications', 'Telekom', 'Phone, internet, TV services'],
      ['Government Services', 'Dövlət Xidmətləri', 'Government and public services'],
      ['Insurance', 'Sığorta', 'Insurance services'],
      ['Education', 'Təhsil', 'Educational services'],
      ['Healthcare', 'Səhiyyə', 'Healthcare and medical services'],
      ['Utilities', 'Kommunal', 'Utilities and municipal services'],
      ['Retail', 'Pərakəndə', 'Retail and shopping'],
      ['Airlines', 'Havayolu', 'Airline services'],
      ['Tourism', 'Turizm', 'Tourism and travel services'],
      ['Technology', 'Texnologiya', 'Technology and IT services']
    ];

    for (const [name, nameAz, description] of categories) {
      await connection.execute(
        'INSERT IGNORE INTO categories (name, name_az, description) VALUES (?, ?, ?)',
        [name, nameAz, description]
      );
    }

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}


app.get('/api/complaints', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const company = req.query.company;
    const status = req.query.status;
    const search = req.query.search;

    let query = `
      SELECT c.*, cat.name_az as category_display_name 
      FROM complaints c 
      LEFT JOIN categories cat ON c.category = cat.name_az 
      WHERE 1=1
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM complaints WHERE 1=1';
    const params = [];
    const countParams = [];

    if (category) {
      query += ' AND c.category = ?';
      countQuery += ' AND category = ?';
      params.push(category);
      countParams.push(category);
    }

    if (company) {
      query += ' AND c.company LIKE ?';
      countQuery += ' AND company LIKE ?';
      params.push(`%${company}%`);
      countParams.push(`%${company}%`);
    }

    if (status) {
      query += ' AND c.status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
      countParams.push(status);
    }

    if (search) {
      query += ' AND (c.title LIKE ? OR c.summary LIKE ? OR c.company LIKE ?)';
      countQuery += ' AND (title LIKE ? OR summary LIKE ? OR company LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [complaints] = await pool.execute(query, params);
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      complaints,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [complaints] = await pool.execute(
      `SELECT c.*, cat.name_az as category_display_name 
       FROM complaints c 
       LEFT JOIN categories cat ON c.category = cat.name_az 
       WHERE c.id = ?`,
      [id]
    );

    if (complaints.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaints[0]);
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/complaints', upload.single('attachments'), async (req, res) => {
  try {
    const { title, company, category, summary } = req.body;

    if (!title || !company || !category || !summary) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, company, category, summary' 
      });
    }

    if (summary.length < 50) {
      return res.status(400).json({ 
        error: 'Summary must be at least 50 characters long' 
      });
    }

    const attachmentPath = req.file ? req.file.path : null;
    const attachmentOriginalName = req.file ? req.file.originalname : null;

    const [result] = await pool.execute(
      `INSERT INTO complaints (title, company, category, summary, attachment_path, attachment_original_name) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, company, category, summary, attachmentPath, attachmentOriginalName]
    );

    await pool.execute(
      `INSERT INTO companies (name, complaint_count) 
       VALUES (?, 1) 
       ON DUPLICATE KEY UPDATE complaint_count = complaint_count + 1`,
      [company]
    );

    const [newComplaint] = await pool.execute(
      'SELECT * FROM complaints WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Complaint created successfully',
      complaint: newComplaint[0]
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/complaints/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in_progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [result] = await pool.execute(
      'UPDATE complaints SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE is_active = TRUE ORDER BY name_az'
    );
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const [companies] = await pool.execute(
      'SELECT * FROM companies WHERE is_active = TRUE ORDER BY complaint_count DESC, name'
    );
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM complaints');
    const totalComplaints = totalResult[0].total;

    const [statusResult] = await pool.execute(
      'SELECT status, COUNT(*) as count FROM complaints GROUP BY status'
    );

    const [recentResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM complaints WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );
    const recentComplaints = recentResult[0].count;

        const [categoriesResult] = await pool.execute(
      `SELECT c.category, cat.name_az, COUNT(*) as count 
       FROM complaints c 
       LEFT JOIN categories cat ON c.category = cat.name_az 
       GROUP BY c.category 
       ORDER BY count DESC 
       LIMIT 5`
    );

      const [companiesResult] = await pool.execute(
      'SELECT company, COUNT(*) as count FROM complaints GROUP BY company ORDER BY count DESC LIMIT 5'
    );

    res.json({
      totalComplaints,
      recentComplaints,
      statusBreakdown: statusResult,
      topCategories: categoriesResult,
      topCompanies: companiesResult
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'UPDATE complaints SET status = "closed" WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Complaint closed successfully' });
  } catch (error) {
    console.error('Error closing complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  if (error.message === 'Only images, PDF, and DOC files are allowed!') {
    return res.status(400).json({ error: error.message });
  }

  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();