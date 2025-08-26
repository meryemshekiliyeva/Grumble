# Grumble - Complaint Management Platform

## Project Overview
Grumble is a comprehensive complaint management platform for Azerbaijan, allowing users to submit complaints about companies and enabling companies to respond to them. The platform includes user profiles, company dashboards, admin panels, and review systems.

## Technologies Used

### Frontend
- **React 19.1.0** - Main UI framework
- **React Router DOM 7.6.3** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Vite 7.1.3** - Build tool and development server
- **Chart.js 4.5.0** - Data visualization for dashboards

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - Database (to be implemented)
- **Mongoose** - MongoDB ODM (to be implemented)

### Authentication & Security
- **Passport.js 0.7.0** - Authentication middleware
- **Passport Google OAuth 2.0** - Google authentication
- **Express Session 1.18.2** - Session management
- **Arctic 3.7.0** - OAuth library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Project Structure

```
Grumble-5/
├── backend/                    # Backend server code
│   ├── config/                # Configuration files
│   ├── middleware/            # Express middleware
│   ├── models/               # Database models (to be implemented)
│   ├── routes/               # API routes
│   ├── scripts/              # Database scripts
│   ├── services/             # Business logic services
│   └── server.js             # Main server file
├── src/                      # Frontend React application
│   ├── admin/               # Admin panel components
│   │   ├── AdminLayout.jsx   # Admin layout wrapper
│   │   ├── CompanyList.jsx   # Company management
│   │   ├── CompanyView.jsx   # Individual company view
│   │   ├── ComplaintView.jsx # Individual complaint view
│   │   ├── ComplaintsList.jsx # Complaints management
│   │   ├── Dashboard.jsx     # Admin dashboard
│   │   ├── UserList.jsx      # User management
│   │   └── UserView.jsx      # Individual user view
│   ├── components/          # Reusable UI components
│   │   ├── ComplaintCard.jsx # Complaint display card
│   │   ├── ReviewForm.jsx    # Review submission form
│   │   └── StarRating.jsx    # Star rating component
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── NotificationContext.jsx # Notifications state
│   ├── pages/               # Main application pages
│   │   ├── CategoryPage.jsx  # Category listings
│   │   ├── Companies.jsx     # Companies directory
│   │   ├── CompanyDetailPage.jsx # Company details
│   │   ├── CompanyPage.jsx   # Company profile page
│   │   ├── CompanyProfile.jsx # Company dashboard
│   │   ├── ForgotPassword.jsx # Password reset
│   │   ├── Home.jsx          # Homepage
│   │   ├── Login.jsx         # Login page
│   │   ├── Profile.jsx       # User profile
│   │   ├── Register.jsx      # User registration
│   │   ├── ReviewPage.jsx    # Review submission
│   │   └── VerifyEmail.jsx   # Email verification
│   ├── services/            # API service layer
│   │   └── api.js           # API client
│   ├── utils/               # Utility functions
│   │   └── companyRating.js # Rating calculations
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── bank_pages/              # Bank-specific pages
├── registered-companies-reviews/ # Company review system
├── docs/                    # Documentation
├── node_modules/            # Dependencies
├── index.html               # Main HTML file
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md                # Project readme
```

## Key Features

### User Features
- User registration and authentication
- Complaint submission and tracking
- Company reviews and ratings
- Profile management with complaints, reviews, and likes
- Notification system
- Google OAuth integration

### Company Features
- Company registration and verification
- Complaint response system
- Company dashboard with analytics
- Review management
- Customer interaction tools

### Admin Features
- User management
- Company verification and management
- Complaint moderation
- System analytics and reporting
- Content management

## Database Schema (To Be Implemented)

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  userType: String, // 'user' or 'company'
  isVerified: Boolean,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Companies Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  category: String,
  description: String,
  website: String,
  phone: String,
  address: String,
  logo: String,
  isVerified: Boolean,
  rating: Number,
  totalReviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  company: ObjectId (ref: 'Company'),
  author: ObjectId (ref: 'User'),
  status: String, // 'pending', 'in_progress', 'resolved', 'rejected'
  priority: String,
  attachments: [String],
  likes: Number,
  comments: [{
    author: ObjectId (ref: 'User'),
    content: String,
    timestamp: Date,
    replies: [Object]
  }],
  companyResponse: {
    message: String,
    timestamp: Date,
    respondent: ObjectId (ref: 'User')
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: 'Company'),
  author: ObjectId (ref: 'User'),
  rating: Number (1-5),
  title: String,
  content: String,
  category: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Notifications Collection
```javascript
{
  _id: ObjectId,
  recipient: ObjectId (ref: 'User'),
  type: String, // 'reply', 'status', 'like', 'comment'
  title: String,
  message: String,
  relatedComplaint: ObjectId (ref: 'Complaint'),
  relatedCompany: ObjectId (ref: 'Company'),
  isRead: Boolean,
  createdAt: Date
}
```

## Current Issues & Solutions Needed

### 1. Frontend-Backend Disconnect
**Problem**: Frontend uses localStorage instead of real API calls
**Solution**: Implement proper API integration

### 2. No Database Integration
**Problem**: No MongoDB connection or models
**Solution**: Set up MongoDB with Mongoose ODM

### 3. Mock Data Usage
**Problem**: All data is hardcoded or stored in localStorage
**Solution**: Replace with database operations

### 4. Authentication Issues
**Problem**: Authentication is simulated
**Solution**: Implement JWT-based authentication

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6+ (Community Edition)
- npm or yarn

### MongoDB Installation (Windows)
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB with default settings
3. Add MongoDB to PATH: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Start MongoDB service:
   ```powershell
   # Start MongoDB service
   net start MongoDB

   # Or start manually
   mongod --dbpath "C:\data\db"
   ```

### Project Installation
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables (backend/.env is already configured)
5. Start MongoDB service (see above)
6. Seed the database with initial data:
   ```bash
   cd backend
   npm run seed
   ```
7. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```
8. Start frontend (in new terminal):
   ```bash
   npm run dev
   ```

### Environment Variables (backend/.env)
The .env file is already configured with default values:
```
MONGODB_URI=mongodb://localhost:27017/grumble
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your-session-secret-key-here-make-it-secure
```

### Accessing the Application
- **Frontend**: http://localhost:5174 (Vite dev server)
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## API Endpoints (To Be Implemented)

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Companies
- GET /api/companies
- POST /api/companies
- GET /api/companies/:id
- PUT /api/companies/:id
- DELETE /api/companies/:id

### Complaints
- GET /api/complaints
- POST /api/complaints
- GET /api/complaints/:id
- PUT /api/complaints/:id
- DELETE /api/complaints/:id

### Reviews
- GET /api/reviews
- POST /api/reviews
- GET /api/reviews/company/:companyId
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

### Notifications
- GET /api/notifications
- PUT /api/notifications/:id/read
- DELETE /api/notifications/:id

## Next Steps

1. **Set up MongoDB connection**
2. **Create database models with Mongoose**
3. **Implement API endpoints**
4. **Update frontend to use real APIs**
5. **Add proper authentication**
6. **Test all functionality**
7. **Deploy to production**

## Testing

### Test Accounts (Current - localStorage based)
- **User**: test@example.com / Test123!
- **Emirates Company**: support@emirates.com / Emirates123!
- **Other Companies**: Use Company123! password

### Database Test Data (To Be Added)
- Sample users, companies, complaints, and reviews
- Admin user account
- Company verification data
