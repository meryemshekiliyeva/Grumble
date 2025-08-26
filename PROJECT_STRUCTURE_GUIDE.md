# Grumble Project Structure Guide

## Overview
Grumble is a complaint management system built with React (frontend) and Node.js/Express (backend). This guide explains the structure and purpose of all files and folders in the project.

## Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Authentication**: JWT tokens
- **State Management**: React Context API
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom components

## Root Directory Structure

```
Grumble-5/
├── backend/                 # Node.js/Express backend server
├── src/                     # React frontend source code
├── public/                  # Static assets for frontend
├── bank_pages/              # Static HTML pages for bank integration
├── registered-companies-reviews/ # Company review system
├── node_modules/            # Frontend dependencies
├── package.json             # Frontend dependencies and scripts
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── index.html              # Main HTML template
└── README.md               # Project documentation
```

## Frontend Structure (`src/`)

### Core Application Files
- `src/App.jsx` - Main application component with routing
- `src/main.jsx` - Application entry point
- `src/index.css` - Global styles and Tailwind imports

### Pages (`src/pages/`)
- `Home.jsx` - Landing page with featured complaints
- `Login.jsx` - User/company authentication
- `Register.jsx` - User/company registration
- `Profile.jsx` - User profile with tabs (complaints, reviews, likes)
- `CompanyProfile.jsx` - Company profile management
- `Complaints.jsx` - Public complaints listing
- `ComplaintDetail.jsx` - Individual complaint view with comments
- `NewComplaint.jsx` - Complaint submission form
- `MyComplaints.jsx` - User's personal complaints
- `Companies.jsx` - Company directory
- `CompanyPage.jsx` - Individual company page
- `CompanyDetailPage.jsx` - Detailed company view with reviews
- `ReviewPage.jsx` - Review submission form
- `CategoryPage.jsx` - Complaints by category
- `About.jsx` - About page
- `ForgotPassword.jsx` - Password reset
- `VerifyEmail.jsx` - Email verification

### Components (`src/components/`)
- `Header.jsx` - Navigation header with auth state
- `Footer.jsx` - Site footer
- `ComplaintCard.jsx` - Complaint display component
- `StarRating.jsx` - Interactive star rating component
- `ReviewForm.jsx` - Review submission form
- `NotificationDropdown.jsx` - User notifications
- `UserProfileDropdown.jsx` - User menu dropdown
- `CompanyProfileDropdown.jsx` - Company menu dropdown
- `AiChatAssistant.jsx` - AI chat support widget

### Context (`src/contexts/`)
- `AuthContext.jsx` - Authentication state management
- `NotificationContext.jsx` - Notification system

### Services (`src/services/`)
- `api.js` - API service for backend communication

### Admin Panel (`src/admin/`)
- `AdminLayout.jsx` - Admin panel layout wrapper
- `Dashboard.jsx` - Admin dashboard with statistics
- `ComplaintsList.jsx` - Admin complaints management
- `ComplaintView.jsx` - Individual complaint admin view
- `UserList.jsx` - User management
- `UserView.jsx` - Individual user admin view
- `CompanyList.jsx` - Company management
- `CompanyView.jsx` - Individual company admin view

### Utilities (`src/utils/`)
- `statusConfig.js` - Complaint status configuration
- `emailTemplates.js` - Email template functions

## Backend Structure (`backend/`)

### Core Files
- `server.js` - Express server setup and configuration
- `package.json` - Backend dependencies and scripts

### Models (`backend/models/`)
- `User.js` - User schema and methods
- `Company.js` - Company schema and methods
- `Complaint.js` - Complaint schema and methods
- `Review.js` - Review schema and methods
- `Category.js` - Category schema and methods

### Routes (`backend/routes/`)
- `auth.js` - Authentication endpoints
- `users.js` - User management endpoints
- `companies.js` - Company management endpoints
- `complaints.js` - Complaint CRUD endpoints
- `reviews.js` - Review management endpoints
- `categories.js` - Category endpoints
- `stats.js` - Statistics and analytics endpoints

### Middleware (`backend/middleware/`)
- `auth.js` - JWT authentication middleware
- `upload.js` - File upload handling
- `validation.js` - Request validation middleware

### Configuration (`backend/config/`)
- `database.js` - MongoDB connection setup
- `cloudinary.js` - Image upload configuration

### Utilities (`backend/utils/`)
- `emailService.js` - Email sending functionality
- `generateToken.js` - JWT token generation

## Static Pages

### Bank Pages (`bank_pages/`)
- HTML pages for bank integration and company registration

### Company Reviews (`registered-companies-reviews/`)
- Standalone review system for registered companies

## Configuration Files

### Build & Development
- `vite.config.js` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS customization
- `package.json` - Dependencies and scripts

### Documentation
- `README.md` - Project setup and usage
- `DATABASE_SETUP_GUIDE.md` - Database configuration guide
- `PROJECT_DOCUMENTATION.md` - Detailed technical documentation

## Data Storage

### LocalStorage (Frontend)
- `userComplaints` - User's submitted complaints
- `userComments` - User's comments on complaints
- `userLikes` - User's liked complaints
- `companyReviews` - Company reviews by company ID
- `registeredUsers` - Registered user accounts
- `registeredCompanies` - Registered company accounts
- `notifications_[email]` - User-specific notifications

### MongoDB Collections (Backend)
- `users` - User accounts and profiles
- `companies` - Company accounts and information
- `complaints` - All complaints with metadata
- `reviews` - Company reviews and ratings
- `categories` - Complaint categories

## Key Features

### Authentication System
- JWT-based authentication for users and companies
- Role-based access control (user, company, admin)
- Email verification and password reset

### Complaint Management
- Public complaint submission and viewing
- Status tracking (pending, in-progress, resolved)
- Comment system with replies
- Like/dislike functionality

### Company System
- Company registration and profiles
- Review and rating system
- Company response to complaints
- Admin moderation tools

### Admin Panel
- User and company management
- Complaint moderation
- Statistics and analytics
- Content management

### Notification System
- Real-time notifications for users
- Email notifications for important events
- In-app notification dropdown

This structure provides a scalable foundation for a complaint management platform with separate user and company interfaces, comprehensive admin tools, and real-time features.
