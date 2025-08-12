const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');
const Complaint = require('../models/Complaint');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grumble');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Category.deleteMany({}),
      Complaint.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Telekommunikasiya',
        nameEn: 'Telecommunications',
        description: 'İnternet, telefon və mobil xidmətlər',
        icon: '📱',
        color: '#3B82F6',
        order: 1
      },
      {
        name: 'Bank və Maliyyə',
        nameEn: 'Banking & Finance',
        description: 'Bank xidmətləri və maliyyə məsələləri',
        icon: '🏦',
        color: '#10B981',
        order: 2
      },
      {
        name: 'E-ticarət',
        nameEn: 'E-commerce',
        description: 'Onlayn alış-veriş və çatdırılma',
        icon: '🛒',
        color: '#F59E0B',
        order: 3
      },
      {
        name: 'Nəqliyyat',
        nameEn: 'Transportation',
        description: 'Taksi, avtobus və digər nəqliyyat xidmətləri',
        icon: '🚗',
        color: '#EF4444',
        order: 4
      },
      {
        name: 'Kommunal Xidmətlər',
        nameEn: 'Utilities',
        description: 'Su, qaz, elektrik və digər kommunal xidmətlər',
        icon: '⚡',
        color: '#8B5CF6',
        order: 5
      },
      {
        name: 'Sağlamlıq',
        nameEn: 'Healthcare',
        description: 'Tibbi xidmətlər və sağlamlıq məsələləri',
        icon: '🏥',
        color: '#06B6D4',
        order: 6
      },
      {
        name: 'Təhsil',
        nameEn: 'Education',
        description: 'Təhsil müəssisələri və kurslar',
        icon: '📚',
        color: '#84CC16',
        order: 7
      },
      {
        name: 'Ümumi',
        nameEn: 'General',
        description: 'Digər xidmətlər',
        icon: '📋',
        color: '#6B7280',
        order: 8
      }
    ]);
    console.log('Created categories');

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'İstifadəçi',
      email: 'admin@grumble.az',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true
    });
    console.log('Created admin user');

    // Create sample users
    const users = await User.insertMany([
      {
        firstName: 'Əli',
        lastName: 'Məmmədov',
        email: 'ali@example.com',
        password: 'password123',
        phone: '+994501234567',
        isEmailVerified: true
      },
      {
        firstName: 'Leyla',
        lastName: 'Həsənova',
        email: 'leyla@example.com',
        password: 'password123',
        phone: '+994551234567',
        isEmailVerified: true
      },
      {
        firstName: 'Rəşad',
        lastName: 'Əliyev',
        email: 'reshad@example.com',
        password: 'password123',
        phone: '+994701234567',
        isEmailVerified: true
      }
    ]);
    console.log('Created sample users');

    // Create sample companies
    const companies = await Company.insertMany([
      {
        firstName: 'Müdir',
        lastName: 'Əliyev',
        companyName: 'Azercell',
        email: 'info@azercell.com',
        phone: '+994125551234',
        category: categories.find(c => c.name === 'Telekommunikasiya')._id,
        description: 'Azərbaycanın aparıcı mobil operator şirkəti',
        website: 'https://azercell.com',
        isVerified: true,
        rating: 4.2,
        totalComplaints: 45,
        resolvedComplaints: 38
      },
      {
        firstName: 'Məsul',
        lastName: 'Şəxs',
        companyName: 'Kapital Bank',
        email: 'info@kapitalbank.az',
        phone: '+994125551235',
        category: categories.find(c => c.name === 'Bank və Maliyyə')._id,
        description: 'Müasir bank xidmətləri',
        website: 'https://kapitalbank.az',
        isVerified: true,
        rating: 4.5,
        totalComplaints: 32,
        resolvedComplaints: 29
      },
      {
        firstName: 'Koordinator',
        lastName: 'Məmmədov',
        companyName: 'Bolt Food',
        email: 'support@bolt.eu',
        phone: '+994125551236',
        category: categories.find(c => c.name === 'E-ticarət')._id,
        description: 'Yemək çatdırılma xidməti',
        website: 'https://bolt.eu',
        isVerified: true,
        rating: 3.8,
        totalComplaints: 67,
        resolvedComplaints: 52
      },
      {
        firstName: 'Dəstək',
        lastName: 'Komandası',
        companyName: 'BiP',
        email: 'info@bip.az',
        phone: '+994125551237',
        category: categories.find(c => c.name === 'Nəqliyyat')._id,
        description: 'Taksi və çatdırılma xidməti',
        website: 'https://bip.az',
        isVerified: true,
        rating: 4.0,
        totalComplaints: 28,
        resolvedComplaints: 24
      },
      {
        firstName: 'Müştəri',
        lastName: 'Xidmətləri',
        companyName: 'Azersu',
        email: 'info@azersu.az',
        phone: '+994125551238',
        category: categories.find(c => c.name === 'Kommunal Xidmətlər')._id,
        description: 'Su təchizatı və kanalizasiya xidmətləri',
        website: 'https://azersu.az',
        isVerified: true,
        rating: 3.5,
        totalComplaints: 89,
        resolvedComplaints: 71
      }
    ]);
    console.log('Created sample companies');

    // Create sample complaints
    const complaints = [
      {
        title: 'İnternet Sürəti Problemləri',
        description: 'Evdə internet sürəti çox zəifdir. Müqaviləyə görə 100 Mbps olmalıdır, amma faktiki olaraq 10-15 Mbps alıram. Bu problem artıq 2 həftədir davam edir və heç bir həll yolu tapılmır.',
        user: users[0]._id,
        company: companies[0]._id,
        category: categories.find(c => c.name === 'Telekommunikasiya')._id,
        status: 'pending',
        priority: 'high',
        incidentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isPublic: true,
        moderationStatus: 'approved'
      },
      {
        title: 'Kartdan Pul Çıxarılması',
        description: 'ATM-dən pul çıxarmaq istədim, amma kart bloklandı. Səbəb məlum deyil və müştəri xidmətləri cavab vermir.',
        user: users[1]._id,
        company: companies[1]._id,
        category: categories.find(c => c.name === 'Bank və Maliyyə')._id,
        status: 'in_progress',
        priority: 'urgent',
        incidentDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isPublic: true,
        moderationStatus: 'approved'
      },
      {
        title: 'Sifariş Gecikməsi',
        description: 'Yemək sifarişim 2 saatdır gəlmir. Tətbiqdə "yolda" göstərir, amma heç bir əlaqə yoxdur.',
        user: users[2]._id,
        company: companies[2]._id,
        category: categories.find(c => c.name === 'E-ticarət')._id,
        status: 'resolved',
        priority: 'medium',
        incidentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isPublic: true,
        moderationStatus: 'approved',
        resolution: {
          message: 'Sifarişiniz çatdırıldı və kompensasiya edildi.',
          resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          resolutionTime: 12
        }
      },
      {
        title: 'Sürücü Davranışı',
        description: 'Taksi sürücüsü çox kobud davrandı və əlavə pul tələb etdi.',
        user: users[0]._id,
        company: companies[3]._id,
        category: categories.find(c => c.name === 'Nəqliyyat')._id,
        status: 'resolved',
        priority: 'medium',
        incidentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isPublic: true,
        moderationStatus: 'approved',
        resolution: {
          message: 'Sürücü ilə söhbət aparıldı və xəbərdarlıq edildi.',
          resolvedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          resolutionTime: 24
        }
      },
      {
        title: 'Su Kəsilməsi',
        description: 'Artıq 3 gündür ki, rayonumuzda su yoxdur. Heç bir məlumat verilmir.',
        user: users[1]._id,
        company: companies[4]._id,
        category: categories.find(c => c.name === 'Kommunal Xidmətlər')._id,
        status: 'in_progress',
        priority: 'urgent',
        incidentDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isPublic: true,
        moderationStatus: 'approved'
      }
    ];

    await Complaint.insertMany(complaints);
    console.log('Created sample complaints');

    // Update company statistics
    for (const company of companies) {
      await company.updateComplaintStats();
    }
    console.log('Updated company statistics');

    // Update category statistics
    for (const category of categories) {
      await category.updateStats();
    }
    console.log('Updated category statistics');

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Users: ${users.length + 1} (including admin)`);
    console.log(`- Companies: ${companies.length}`);
    console.log(`- Complaints: ${complaints.length}`);
    console.log('\n🔐 Admin Login:');
    console.log('Email: admin@grumble.az');
    console.log('Password: admin123');

    process.exit(0);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
