# Grumble Database Setup and Viewing Guide

## 🚀 Quick Setup

### 1. Install MongoDB
**Windows:**
- Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- Install with default settings
- MongoDB will start automatically as a Windows service

**Alternative - MongoDB Atlas (Cloud):**
- Go to https://www.mongodb.com/atlas
- Create free account and cluster
- Get connection string

### 2. Setup Backend Environment

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
copy .env.example .env
```

4. Edit `.env` file with your settings:
```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/grumble

# For MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grumble

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Backend

1. Seed the database with sample data:
```bash
npm run seed
```

2. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### 4. Start the Frontend

1. In the main project folder:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## 📊 How to View Your Database

### Option 1: MongoDB Compass (Recommended - GUI)

1. Download MongoDB Compass from https://www.mongodb.com/products/compass
2. Install and open it
3. Connect using: `mongodb://localhost:27017`
4. You'll see the `grumble` database with collections:
   - `users` - All registered users
   - `companies` - Company accounts
   - `complaints` - All complaints/şikayətlər
   - `categories` - Complaint categories
   - `reviews` - Comments and reviews

### Option 2: MongoDB Shell (Command Line)

1. Open Command Prompt/Terminal
2. Connect to MongoDB:
```bash
mongosh
```

3. Switch to grumble database:
```bash
use grumble
```

4. View collections:
```bash
show collections
```

5. View data examples:
```bash
# View all users
db.users.find().pretty()

# View all complaints
db.complaints.find().pretty()

# View specific user by email
db.users.findOne({email: "test@example.com"})

# Count total complaints
db.complaints.countDocuments()
```

### Option 3: Web-based MongoDB Admin (Optional)

1. Install mongo-express:
```bash
npm install -g mongo-express
```

2. Start it:
```bash
mongo-express
```

3. Open http://localhost:8081 in browser

## 🔍 Understanding the Data Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: "Ali",
  lastName: "Məmmədov", 
  email: "ali@example.com",
  password: "hashed_password",
  phone: "+994501234567",
  avatar: "path/to/avatar.jpg",
  isEmailVerified: true,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  title: "İnternet Bağlantı Problemləri",
  description: "Detailed complaint text...",
  company: ObjectId, // Reference to companies collection
  category: ObjectId, // Reference to categories collection
  author: ObjectId, // Reference to users collection
  status: "pending", // pending, resolved, in_progress
  priority: "medium", // low, medium, high
  likes: 5,
  views: 100,
  createdAt: Date,
  updatedAt: Date
}
```

### Companies Collection
```javascript
{
  _id: ObjectId,
  name: "CityNet",
  email: "info@citynet.az",
  phone: "+994123456789",
  website: "https://citynet.az",
  category: ObjectId,
  logo: "path/to/logo.jpg",
  isVerified: true,
  createdAt: Date
}
```

## 🛠️ Common Database Operations

### View Recent Complaints
```bash
db.complaints.find().sort({createdAt: -1}).limit(10).pretty()
```

### Find User's Complaints
```bash
# First find user ID
db.users.findOne({email: "user@example.com"}, {_id: 1})

# Then find their complaints
db.complaints.find({author: ObjectId("USER_ID_HERE")}).pretty()
```

### View Complaint Statistics
```bash
# Count by status
db.complaints.aggregate([
  {$group: {_id: "$status", count: {$sum: 1}}}
])

# Count by category
db.complaints.aggregate([
  {$group: {_id: "$category", count: {$sum: 1}}}
])
```

### Update Complaint Status
```bash
db.complaints.updateOne(
  {_id: ObjectId("COMPLAINT_ID")}, 
  {$set: {status: "resolved"}}
)
```

## 🔧 Troubleshooting

### MongoDB Not Starting
1. Check if MongoDB service is running:
   - Windows: Services → MongoDB Server
   - Mac/Linux: `sudo systemctl status mongod`

2. Start MongoDB manually:
   - Windows: `net start MongoDB`
   - Mac/Linux: `sudo systemctl start mongod`

### Connection Issues
1. Check if port 27017 is available
2. Verify MONGODB_URI in .env file
3. Check firewall settings

### Backend Not Starting
1. Ensure MongoDB is running first
2. Check if port 5000 is available
3. Verify all environment variables in .env

## 📱 Real-time Data Updates

When users interact with the frontend:
- New registrations → `users` collection
- New complaints → `complaints` collection  
- Comments → `reviews` collection
- Likes → Updates `complaints.likes` field
- Profile changes → Updates `users` collection

All changes are immediately saved to MongoDB and will be visible in your database viewer.

## 🔐 Security Notes

- Never share your JWT_SECRET
- Use strong passwords for production
- Consider MongoDB Atlas for production deployment
- Regularly backup your database

## 📞 Need Help?

If you encounter issues:
1. Check the backend console for error messages
2. Verify MongoDB is running
3. Check network connectivity
4. Review the .env configuration
