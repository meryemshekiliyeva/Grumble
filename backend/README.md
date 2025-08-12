# Grumble Backend API

Bu Grumble şikayət platformasının backend API-sidir. Node.js, Express və MongoDB istifadə edərək hazırlanmışdır.

## 🚀 Quraşdırma

### Tələblər
- Node.js (v16 və ya daha yeni)
- MongoDB (v4.4 və ya daha yeni)
- npm və ya yarn

### 1. Asılılıqları quraşdırın
```bash
cd backend
npm install
```

### 2. Mühit dəyişənlərini konfiqurasiya edin
```bash
cp .env.example .env
```

`.env` faylını redaktə edin və öz dəyərlərinizi daxil edin:
```env
MONGODB_URI=mongodb://localhost:27017/grumble
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. MongoDB-ni işə salın
MongoDB-nin quraşdırıldığından və işlədiyindən əmin olun:
```bash
# MongoDB servisini başladın (Linux/Mac)
sudo systemctl start mongod

# və ya MongoDB Compass istifadə edin
```

### 4. Verilənlər bazasını seed edin
```bash
npm run seed
```

Bu əmr:
- Kateqoriyalar yaradacaq
- Nümunə istifadəçilər yaradacaq
- Nümunə şirkətlər yaradacaq
- Nümunə şikayətlər yaradacaq

### 5. Serveri işə salın
```bash
# Development rejimi
npm run dev

# Production rejimi
npm start
```

Server `http://localhost:5000` ünvanında işləyəcək.

## 📚 API Endpoints

### Autentifikasiya
- `POST /api/auth/register/user` - İstifadəçi qeydiyyatı
- `POST /api/auth/register/company` - Şirkət qeydiyyatı
- `POST /api/auth/login/user` - İstifadəçi girişi
- `POST /api/auth/login/company` - Şirkət girişi
- `GET /api/auth/me` - Cari istifadəçi məlumatları
- `POST /api/auth/logout` - Çıxış

### Şikayətlər
- `GET /api/complaints` - Bütün şikayətlər (filtrlənmiş)
- `GET /api/complaints/trending` - Populyar şikayətlər
- `GET /api/complaints/recent` - Son şikayətlər
- `GET /api/complaints/:id` - Tək şikayət
- `POST /api/complaints` - Yeni şikayət yarat

### Şirkətlər
- `GET /api/companies` - Bütün şirkətlər
- `GET /api/companies/featured` - Seçilmiş şirkətlər
- `GET /api/companies/:id` - Tək şirkət
- `PUT /api/companies/profile` - Şirkət profilini yenilə
- `GET /api/companies/dashboard/stats` - Şirkət statistikaları

### Kateqoriyalar
- `GET /api/categories` - Bütün kateqoriyalar
- `GET /api/categories/hierarchy` - Kateqoriya iyerarxiyası
- `GET /api/categories/popular` - Populyar kateqoriyalar
- `GET /api/categories/:id` - Tək kateqoriya

### İstifadəçilər
- `GET /api/users/profile` - İstifadəçi profili
- `PUT /api/users/profile` - Profili yenilə
- `GET /api/users/complaints` - İstifadəçinin şikayətləri
- `GET /api/users/dashboard/stats` - İstifadəçi statistikaları
- `POST /api/users/change-password` - Şifrəni dəyiş

### Statistikalar
- `GET /api/stats/overview` - Ümumi statistikalar
- `GET /api/stats/complaints/monthly` - Aylıq şikayət statistikaları
- `GET /api/stats/categories/popular` - Populyar kateqoriya statistikaları
- `GET /api/stats/companies/top` - Top şirkətlər
- `GET /api/stats/complaints/status-distribution` - Status paylanması

## 🔐 Autentifikasiya

API JWT (JSON Web Token) istifadə edir. Token-i `Authorization` header-ində göndərin:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📁 Fayl Strukturu

```
backend/
├── models/          # MongoDB modelleri
├── routes/          # API route-ları
├── middleware/      # Middleware funksiyaları
├── scripts/         # Utility skriptlər
├── uploads/         # Yüklənmiş fayllar
├── server.js        # Ana server faylı
└── package.json     # Asılılıqlar
```

## 🛠️ Development

### Test məlumatları
Seed skripti aşağıdakı test məlumatlarını yaradır:

**Admin İstifadəçi:**
- Email: admin@grumble.az
- Şifrə: admin123

**Test İstifadəçiləri:**
- ali@example.com / password123
- leyla@example.com / password123
- reshad@example.com / password123

### Faydalı əmrlər
```bash
# Verilənlər bazasını təmizlə və yenidən seed et
npm run seed

# Development rejimində işə sal (auto-restart)
npm run dev

# Testləri işə sal
npm test
```

## 🔧 Konfiqurasiya

### Mühit Dəyişənləri
- `MONGODB_URI` - MongoDB bağlantı stringi
- `JWT_SECRET` - JWT token üçün gizli açar
- `JWT_EXPIRE` - Token-in bitmə müddəti (default: 7d)
- `PORT` - Server portu (default: 5000)
- `NODE_ENV` - Mühit (development/production)
- `FRONTEND_URL` - Frontend URL (CORS üçün)
- `MAX_FILE_SIZE` - Maksimum fayl ölçüsü (default: 5MB)

### CORS
Frontend URL-i `.env` faylında `FRONTEND_URL` dəyişənində təyin edin.

## 📊 Verilənlər Bazası

### Modellər
- **User** - İstifadəçilər
- **Company** - Şirkətlər
- **Category** - Kateqoriyalar
- **Complaint** - Şikayətlər

### İndekslər
Performans üçün lazımi indekslər avtomatik yaradılır.

## 🚨 Xəta İdarəetməsi

API standart HTTP status kodları istifadə edir:
- `200` - Uğurlu
- `201` - Yaradıldı
- `400` - Yanlış sorğu
- `401` - Autentifikasiya tələb olunur
- `403` - İcazə yoxdur
- `404` - Tapılmadı
- `500` - Server xətası

## 📝 Loglar

Development rejimində bütün sorğular və xətalar konsola yazılır.

## 🔒 Təhlükəsizlik

- JWT autentifikasiyası
- Şifrələrin hash-lənməsi (bcrypt)
- Rate limiting
- CORS qorunması
- Helmet.js təhlükəsizlik header-ləri
- Fayl yükləmə məhdudiyyətləri
