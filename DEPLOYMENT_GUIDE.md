# 🚀 Grumble Deployment Guide

This guide will help you deploy Grumble to production with recommended hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] MongoDB Atlas account (for production database)
- [ ] Domain name (grumble.az)
- [ ] Email service (Gmail/SendGrid for notifications)
- [ ] Google OAuth credentials (production)
- [ ] Facebook OAuth credentials (production)

## 🏗️ Recommended Architecture

```
Frontend (Vercel/Netlify) → Backend (Railway/Render) → Database (MongoDB Atlas)
```

## 📊 Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new project: "Grumble Production"
3. Create a cluster (M0 Sandbox for free tier)
4. Create database user with read/write permissions
5. Add IP addresses to whitelist (0.0.0.0/0 for all IPs)
6. Get connection string

### 2. Seed Production Database

```bash
# Update backend/.env with Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grumble

# Seed the database
cd backend
npm run seed:prod
```

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**: [railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy Backend**:
   ```bash
   # Railway will auto-detect Node.js and use railway.toml
   # Set environment variables in Railway dashboard
   ```
4. **Environment Variables**:
   - Copy from `backend/.env.production`
   - Update MONGODB_URI with Atlas connection
   - Generate secure JWT_SECRET and SESSION_SECRET
   - Set FRONTEND_URL to your domain

### Option 2: Render

1. **Create Render Account**: [render.com](https://render.com)
2. **Connect GitHub**: Link your repository
3. **Create Web Service**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables**: Same as Railway

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create grumble-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_atlas_connection_string
# ... add all other env vars

# Deploy
git subtree push --prefix backend heroku main
```

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Vercel Account**: [vercel.com](https://vercel.com)
2. **Import Project**: Connect GitHub repository
3. **Configure Build**:
   - Framework Preset: Vite
   - Build Command: `npm run build:prod`
   - Output Directory: `dist`
4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
5. **Custom Domain**: Add grumble.az in domain settings

### Option 2: Netlify

1. **Create Netlify Account**: [netlify.com](https://netlify.com)
2. **Connect Repository**: Link GitHub
3. **Build Settings**:
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
4. **Environment Variables**: Same as Vercel
5. **Custom Domain**: Add grumble.az in domain settings

## 🔐 Security Configuration

### 1. Generate Secure Secrets

```bash
# Generate JWT secret (64 characters)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate session secret (32 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://api.grumble.az/api/auth/google/callback`
6. Update environment variables

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app
3. Add Facebook Login product
4. Set Valid OAuth Redirect URIs:
   - `https://api.grumble.az/api/auth/google/callback`
5. Update environment variables

### 3. Email Configuration

#### Gmail (Development/Small Scale)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@grumble.az
SMTP_PASS=your_app_password
```

#### SendGrid (Production Recommended)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

## 🌍 Domain Configuration

### 1. DNS Setup

Point your domain to hosting providers:

**For Vercel:**
```
A record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
CNAME: api → your-backend-url.railway.app
```

**For Netlify:**
```
A record: @ → 75.2.60.5
CNAME: www → your-site-name.netlify.app
CNAME: api → your-backend-url.railway.app
```

### 2. SSL Certificates

Both Vercel and Netlify provide automatic SSL certificates for custom domains.

## ✅ Post-Deployment Checklist

- [ ] Frontend loads correctly at https://grumble.az
- [ ] Backend API responds at https://api.grumble.az/api/health
- [ ] Database connection working
- [ ] User registration/login working
- [ ] Company registration working
- [ ] Complaint submission working
- [ ] Email notifications working
- [ ] OAuth login working (Google/Facebook)
- [ ] Admin panel accessible
- [ ] All environment variables set correctly

## 🔍 Testing Production

### 1. API Health Check
```bash
curl https://api.grumble.az/api/health
```

### 2. Test User Registration
```bash
curl -X POST https://api.grumble.az/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!"}'
```

### 3. Frontend Functionality
- Visit https://grumble.az
- Test user registration
- Test complaint submission
- Test company features

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure FRONTEND_URL is set correctly in backend
2. **Database Connection**: Check MongoDB Atlas IP whitelist
3. **Environment Variables**: Verify all required vars are set
4. **Build Failures**: Check Node.js version compatibility
5. **OAuth Issues**: Verify redirect URIs match exactly

### Logs

**Railway**: View logs in Railway dashboard
**Render**: View logs in Render dashboard
**Vercel**: View function logs in Vercel dashboard
**Netlify**: View deploy logs in Netlify dashboard

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify environment variables
4. Test API endpoints individually

Your Grumble platform should now be live at https://grumble.az! 🎉
