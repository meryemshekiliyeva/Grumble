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
