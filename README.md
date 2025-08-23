<<<<<<< HEAD
# Grumble - Şikayət Platforması

Grumble, müştərilərin şirkətlərə qarşı şikayətlərini bildirə biləcəkləri və şirkətlərin bu şikayətləri idarə edə biləcəkləri bir platformadır.

## 🚀 Xüsusiyyətlər

- **İstifadəçi Qeydiyyatı və Girişi**: Müştərilər hesab yarada və giriş edə bilərlər
- **Şirkət Qeydiyyatı və Bank Dashboard**: Şirkətlər qeydiyyatdan keçə və şikayətləri idarə edə bilərlər
- **Şikayət Sistemi**: Müştərilər şikayətlərini bildirib izləyə bilərlər
- **Kateqoriya Sistemi**: Şikayətlər kateqoriyalara ayrılır
- **AI Chat Köməkçisi**: Müştərilərə kömək üçün AI köməkçisi

## 🏦 Bank Dashboard Sistemi

### Test Hesabları (Bank Girişi):
- **Kapital Bank**: `kapital@bank.az` / `Kapital123!`
- **Pasha Bank**: `pasha@bank.az` / `Pasha123!`
- **BirBank**: `bir@bank.az` / `BirBank123!`

### Şirkət Qeydiyyatı:
1. `/register` səhifəsində "Şirkət Qeydiyyatı" tabını seçin
2. Şirkət məlumatlarını doldurun
3. Qeydiyyatdan sonra giriş şifrəsi: `Company123!`
4. `/login` səhifəsində "Şirkət Girişi" tabı ilə daxil olun

### Bank Dashboard Xüsusiyyətləri:
- **Şikayət İdarəetməsi**: Bütün şikayətləri görün və statusunu dəyişin
- **Statistikalar**: Ümumi, gözləyən, həll edilmiş şikayətlər
- **Cavab Nisbəti**: Şirkətin performans göstəricisi
- **Real-time Yenilənmə**: Statuslar dərhal yenilənir
- **Rəy Cavablandırma**: Müştəri rəylərinə cavab verin
- **Avtomatik Status Dəyişikliyi**: Cavab verildikdə status avtomatik "cavablandırıldı"ya çevrilir

### Şirkət Profil Sistemi:
- **Şirkət Profil Dropdown**: Giriş edən şirkətlər üçün xüsusi profil menyusu
- **Şirkət Profil Səhifəsi**: Tam funksional şirkət profil idarəetməsi
- **Rəy İdarəetməsi**: Gözləyən, cavablandırılmış rəyləri görün və idarə edin
- **Statistika Dashboard**: Rəy statistikaları və performans göstəriciləri
- **Müştəri Rəylərinə Cavab**: Rəylərə cavab verib müştəri məmnuniyyətini artırın

## 🛠️ Quraşdırma

```bash
# Layihəni klonlayın
git clone <repository-url>

# Asılılıqları quraşdırın
npm install

# Development serveri başladın
npm run dev

# Production build
npm run build
```

## 📱 İstifadə

1. **Ana səhifə**: http://localhost:5177/
2. **İstifadəçi qeydiyyatı**: http://localhost:5177/register
3. **Şirkət qeydiyyatı**: http://localhost:5177/register?type=company
4. **Giriş**: http://localhost:5177/login
5. **Bank Dashboard**: http://localhost:5177/bank-dashboard (giriş sonrası)
6. **Şirkət Profili**: http://localhost:5177/company-profile (şirkət girişi sonrası)
7. **Şirkət Səhifəsi**: http://localhost:5177/companies/kapital-bank (rəy və cavab sistemi)

## 🔧 Texnologiyalar

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **Icons**: Heroicons, Font Awesome
- **Styling**: Tailwind CSS

## 📝 Qeydlər

- Bu demo versiyasıdır və məlumatlar localStorage-də saxlanılır
- Production üçün backend API inteqrasiyası lazımdır
- Bütün şifrələr demo məqsədləri üçündür

## 🆕 Yeni Xüsusiyyətlər

### Şirkət Giriş Sistemi:
- Şirkət kimi giriş edəndə header-də "Profilim" yerinə şirkət profili görünür
- Şirkət dropdown menyusunda xüsusi seçimlər: Şirkət Profili, Şikayətlər, Rəylər, Statistikalar
- "Yeni Şikayət" düyməsi yerinə "Dashboard" düyməsi görünür

### Rəy və Cavab Sistemi:
- Müştərilər şirkət səhifələrində rəy yaza bilərlər
- Şirkətlər bank dashboard-dan rəylərə cavab verə bilərlər
- Cavab verildikdə rəyin statusu avtomatik "gözləyir"dən "cavablandırıldı"ya çevrilir
- Şirkət profil səhifəsində rəyləri kateqoriyalara ayıraraq görə bilərlər

### Avtomatik Status İdarəetməsi:
- Şirkət rəyə cavab verdikdə həm dashboard-da həm də şirkət səhifəsində status yenilənir
- Real-time statistika hesablamaları
- Müştəri məmnuniyyəti izləmə sistemi

## 🔧 Həll Edilmiş Problemlər

### Logout/Login Problemləri:
- **Problem**: Şirkət hesabından çıxış edəndə ikinci dəfə giriş zamanı fərqli səhifə açılırdı
- **Həll**: AuthContext-də düzgün logout idarəetməsi əlavə edildi
- **Nəticə**: İndi şirkət logout/login dövrü düzgün işləyir

### Authentication State Problemləri:
- **Problem**: Logout sonrası authentication state düzgün təmizlənmirdi
- **Həll**: Bütün localStorage məlumatları və state düzgün təmizlənir
- **Nəticə**: Logout sonrası təmiz giriş təcrübəsi

### Navigation Problemləri:
- **Problem**: Şirkət girişi sonrası yanlış səhifəyə yönləndirmə
- **Həll**: Login.jsx-də düzgün yönləndirmə məntiqı əlavə edildi
- **Nəticə**: Şirkətlər avtomatik bank dashboard-a yönləndirilir

### Loading State Problemləri:
- **Problem**: Authentication yüklənməsi zamanı vaxtından əvvəl yönləndirmə
- **Həll**: Loading state-lər düzgün idarə edilir
- **Nəticə**: Səhifələr düzgün yüklənir və yönləndirmə edilir
=======
# Grumble - Complaint Management System

Grumble is a comprehensive complaint management platform that allows users to submit complaints about companies and enables companies to respond to and resolve customer issues.

## Features

### User Authentication
- **Individual User Registration**: Email verification required
- **Company Registration**: Separate registration flow for businesses
- **OAuth Integration**: Google and Facebook login support
- **Password Recovery**: Secure password reset via email
- **Role-Based Access**: Users, companies, and admin roles
- **Security**: Rate limiting, CSRF protection, password hashing

### Core Functionality
- **Complaint Submission**: Users can file complaints with ratings and attachments
- **Company Responses**: Companies can respond to complaints
- **Real-time Notifications**: Email notifications for updates
- **Comment System**: Public discussion on complaints
- **Rating System**: Star-based company ratings
- **Search & Filter**: Advanced complaint filtering

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport.js** for OAuth (Google/Facebook)
- **Nodemailer** for email services
- **Helmet** for security headers
- **Rate limiting** for API protection

### Frontend
- **React** with React Router
- **Tailwind CSS** for styling
- **Context API** for state management
- **Responsive design** for all devices

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Gmail account or SMTP service for emails

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd grumble/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/grumble

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

4. **Start MongoDB**
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. **Run the backend**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../src
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## OAuth Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
6. Copy Client ID and Client Secret to your `.env` file

### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Set Valid OAuth Redirect URIs:
   - `http://localhost:5000/api/auth/facebook/callback` (development)
   - `https://yourdomain.com/api/auth/facebook/callback` (production)
5. Copy App ID and App Secret to your `.env` file

## Email Configuration

### Gmail Setup (Recommended for development)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use your Gmail address as `SMTP_USER` and the app password as `SMTP_PASS`

### SendGrid Setup (Recommended for production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Update your `.env`:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing with Postman

Import the Postman collection from `docs/postman-collection.json` to test all API endpoints.

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents brute force attacks
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: MongoDB with Mongoose
- **XSS Protection**: Input sanitization

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register/user` - User registration
- `POST /api/auth/register/company` - Company registration
- `POST /api/auth/login/user` - User login
- `POST /api/auth/login/company` - Company login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth

### Complaint Endpoints

- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `GET /api/complaints/:id` - Get single complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@grumble.az or create an issue in the repository.
>>>>>>> 8eb8c6f1099cb78da5c5230ba820f2fdc011a065
