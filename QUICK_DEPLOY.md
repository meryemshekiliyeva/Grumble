# 🚀 Quick Deploy Guide - Grumble (Free Tier)

## ✅ Step 1: MongoDB Atlas Setup (5 minutes)

1. **Go to**: https://cloud.mongodb.com/
2. **Create account** and new project "Grumble"
3. **Create M0 Cluster** (FREE) - name it "grumble-cluster"
4. **Create Database User**:
   - Username: `grumble-admin`
   - Password: Generate secure password (SAVE IT!)
5. **Network Access**: Allow 0.0.0.0/0 (all IPs)
6. **Get Connection String**: 
   ```
   mongodb+srv://grumble-admin:<password>@grumble-cluster.xxxxx.mongodb.net/grumble?retryWrites=true&w=majority
   ```

## ✅ Step 2: Deploy Backend to Render (10 minutes)

1. **Go to**: https://render.com/
2. **Create account** and connect GitHub
3. **New Web Service**:
   - Repository: Your Grumble repo
   - Name: `grumble-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables** (Add these in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=grumble-super-secure-jwt-secret-key-2024-production-make-it-very-long-and-random-for-security
   SESSION_SECRET=grumble-session-secret-key-2024-production-make-it-secure-and-random
   FRONTEND_URL=https://grumble-frontend.vercel.app
   CLIENT_URL=https://grumble-frontend.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=50
   ```

5. **Deploy** - Wait for build to complete
6. **Copy Backend URL** (e.g., `https://grumble-backend.onrender.com`)

## ✅ Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Go to**: https://vercel.com/
2. **Create account** and connect GitHub
3. **Import Project**: Select your Grumble repo
4. **Configure**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave empty)
   - Build Command: `npm run build:prod`
   - Output Directory: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

6. **Deploy** - Wait for build to complete
7. **Copy Frontend URL** (e.g., `https://grumble-frontend.vercel.app`)

## ✅ Step 4: Update CORS Settings

1. **Go back to Render** (backend)
2. **Update Environment Variables**:
   ```
   FRONTEND_URL=https://your-actual-frontend-url.vercel.app
   CLIENT_URL=https://your-actual-frontend-url.vercel.app
   ```
3. **Redeploy backend**

## ✅ Step 5: Seed Database (2 minutes)

1. **In Render dashboard**, go to your backend service
2. **Open Shell** (or use local terminal)
3. **Run seed command**:
   ```bash
   npm run seed
   ```

## ✅ Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test features**:
   - [ ] Homepage loads
   - [ ] User registration works
   - [ ] Login works
   - [ ] Complaint submission works
   - [ ] Company features work

## 🎉 You're Live!

Your Grumble platform is now live at:
- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.onrender.com
- **API Health**: https://your-backend-url.onrender.com/api/health

## 🔧 Optional: Custom Domain

To use grumble.az:
1. **Buy domain** from registrar
2. **In Vercel**: Add custom domain in project settings
3. **Update DNS**: Point domain to Vercel
4. **Update backend CORS**: Use new domain in environment variables

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboards
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Check MongoDB Atlas connection

**Total Time**: ~20 minutes
**Total Cost**: $0/month (Free tier)
