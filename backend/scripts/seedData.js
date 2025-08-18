const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');
const Complaint = require('../models/Complaint');
const Review = require('../models/Review');

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
      Complaint.deleteMany({}),
      Review.deleteMany({})
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
        firstName: 'Aysel',
        lastName: 'Əliyeva',
        email: 'aysel.aliyeva@example.com',
        password: 'password123',
        phone: '+994501234567',
        isEmailVerified: true
      },
      {
        firstName: 'Əli',
        lastName: 'Məmmədov',
        email: 'ali@example.com',
        password: 'password123',
        phone: '+994501234568',
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
        resolvedComplaints: 67
      },
      {
        firstName: 'Satış',
        lastName: 'Meneceri',
        companyName: 'Bakcell',
        email: 'info@bakcell.com',
        phone: '+994125551239',
        category: categories.find(c => c.name === 'Telekommunikasiya')._id,
        description: 'Mobil rabitə və internet xidmətləri',
        website: 'https://bakcell.com',
        isVerified: true,
        rating: 4.1,
        totalComplaints: 52,
        resolvedComplaints: 44
      },
      {
        firstName: 'Dəstək',
        lastName: 'Mütəxəssisi',
        companyName: 'Nar Mobile',
        email: 'info@nar.az',
        phone: '+994125551240',
        category: categories.find(c => c.name === 'Telekommunikasiya')._id,
        description: 'Mobil rabitə operatoru',
        website: 'https://nar.az',
        isVerified: true,
        rating: 3.9,
        totalComplaints: 41,
        resolvedComplaints: 35
      },
      {
        firstName: 'Bank',
        lastName: 'Nümayəndəsi',
        companyName: 'Pasha Bank',
        email: 'info@pashabank.az',
        phone: '+994125551241',
        category: categories.find(c => c.name === 'Bank və Maliyyə')._id,
        description: 'Müasir bank və maliyyə xidmətləri',
        website: 'https://pashabank.az',
        isVerified: true,
        rating: 4.3,
        totalComplaints: 23,
        resolvedComplaints: 21
      },
      {
        firstName: 'Müştəri',
        lastName: 'Məsləhətçisi',
        companyName: 'Rabitabank',
        email: 'info@rabitabank.az',
        phone: '+994125551242',
        category: categories.find(c => c.name === 'Bank və Maliyyə')._id,
        description: 'Bank və maliyyə həlləri',
        website: 'https://rabitabank.az',
        isVerified: true,
        rating: 4.0,
        totalComplaints: 18,
        resolvedComplaints: 16
      },
      {
        firstName: 'Satış',
        lastName: 'Koordinatoru',
        companyName: 'Bravo Supermarket',
        email: 'info@bravo.az',
        phone: '+994125551243',
        category: categories.find(c => c.name === 'Pərakəndə Satış')._id,
        description: 'Supermarket zənciri',
        website: 'https://bravo.az',
        isVerified: true,
        rating: 4.2,
        totalComplaints: 34,
        resolvedComplaints: 30
      },
      {
        firstName: 'Texniki',
        lastName: 'Dəstək',
        companyName: 'Azərişıq',
        email: 'info@azerishiq.az',
        phone: '+994125551244',
        category: categories.find(c => c.name === 'Kommunal Xidmətlər')._id,
        description: 'Elektrik enerjisi təchizatı',
        website: 'https://azerishiq.az',
        isVerified: true,
        rating: 3.7,
        totalComplaints: 76,
        resolvedComplaints: 58
      },
      {
        firstName: 'Müştəri',
        lastName: 'Məsləhətçisi',
        companyName: 'Azəriqaz',
        email: 'info@azerigaz.az',
        phone: '+994125551245',
        category: categories.find(c => c.name === 'Kommunal Xidmətlər')._id,
        description: 'Təbii qaz təchizatı',
        website: 'https://azerigaz.az',
        isVerified: true,
        rating: 3.8,
        totalComplaints: 63,
        resolvedComplaints: 51
      },
      {
        firstName: 'Satış',
        lastName: 'Meneceri',
        companyName: 'Wolt',
        email: 'support@wolt.com',
        phone: '+994125551246',
        category: categories.find(c => c.name === 'E-ticarət')._id,
        description: 'Yemək çatdırılma platforması',
        website: 'https://wolt.com',
        isVerified: true,
        rating: 4.1,
        totalComplaints: 29,
        resolvedComplaints: 26
      },
      {
        firstName: 'Dəstək',
        lastName: 'Komandası',
        companyName: 'Uber',
        email: 'support@uber.com',
        phone: '+994125551247',
        category: categories.find(c => c.name === 'Nəqliyyat')._id,
        description: 'Taksi və çatdırılma xidməti',
        website: 'https://uber.com',
        isVerified: true,
        rating: 3.9,
        totalComplaints: 45,
        resolvedComplaints: 38
      },
      {
        firstName: 'Müştəri',
        lastName: 'Xidmətləri',
        companyName: 'Trendyol',
        email: 'support@trendyol.com',
        phone: '+994125551248',
        category: categories.find(c => c.name === 'E-ticarət')._id,
        description: 'Onlayn alış-veriş platforması',
        website: 'https://trendyol.com',
        isVerified: true,
        rating: 4.0,
        totalComplaints: 38,
        resolvedComplaints: 32
      },
      {
        firstName: 'Satış',
        lastName: 'Nümayəndəsi',
        companyName: 'Kontakt Home',
        email: 'info@kontakt.az',
        phone: '+994125551249',
        category: categories.find(c => c.name === 'Pərakəndə Satış')._id,
        description: 'Elektron məhsullar mağazası',
        website: 'https://kontakt.az',
        isVerified: true,
        rating: 4.2,
        totalComplaints: 25,
        resolvedComplaints: 22
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

    // Create sample reviews
    const reviews = await Review.insertMany([
      {
        user: users[0]._id, // Aysel Əliyeva
        company: companies[0]._id, // Azercell
        rating: 4,
        title: 'Yaxşı xidmət',
        content: 'Ümumiyyətlə xidmətdən razıyam. İnternet sürəti yaxşıdır, amma bəzən kəsilmələr olur.',
        isAnonymous: false,
        isPublic: true,
        moderationStatus: 'approved'
      },
      {
        user: users[0]._id, // Aysel Əliyeva
        company: companies[1]._id, // Kapital Bank
        rating: 5,
        title: 'Əla bank xidməti',
        content: 'Çox peşəkar komanda. Müştəri xidmətləri həmişə kömək edir və problemlər tez həll olunur.',
        isAnonymous: false,
        isPublic: true,
        moderationStatus: 'approved'
      },
      {
        user: users[1]._id, // Əli Məmmədov
        company: companies[2]._id, // Wolt
        rating: 3,
        title: 'Orta səviyyə',
        content: 'Yemək keyfiyyəti yaxşıdır, amma çatdırılma vaxtı uzundur.',
        isAnonymous: false,
        isPublic: true,
        moderationStatus: 'approved'
      }
    ]);
    console.log('Created sample reviews');

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Users: ${users.length + 1} (including admin)`);
    console.log(`- Companies: ${companies.length}`);
    console.log(`- Complaints: ${complaints.length}`);
    console.log(`- Reviews: ${reviews.length}`);
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
