# Database Documentation

## Overview
Grumble uses MongoDB as its database system. The database contains collections for users, complaints, companies, categories, and reviews.

## Collections

### Users
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Hashed with bcrypt
  phone: String,
  role: String, // "user" or "admin"
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  company: ObjectId, // References companies collection
  category: ObjectId, // References categories collection
  author: ObjectId, // References users collection
  status: String, // "pending", "resolved", "in_progress"
  priority: String, // "low", "medium", "high"
  likes: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Companies
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  website: String,
  category: ObjectId, // References categories collection
  logo: String,
  isVerified: Boolean,
  createdAt: Date
}
```

### Categories
```javascript
{
  _id: ObjectId,
  name: String,
  nameEn: String,
  description: String,
  icon: String,
  color: String,
  order: Number
}
```

### Reviews
```javascript
{
  _id: ObjectId,
  text: String,
  complaint: ObjectId, // References complaints collection
  author: ObjectId, // References users collection
  createdAt: Date,
  updatedAt: Date
}
```

## Database Setup

1. Install MongoDB (v4.4 or newer)
2. Configure connection in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/grumble
```

3. Seed initial data:
```bash
npm run seed
```

## Viewing Data

### Using MongoDB Compass
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select the `grumble` database

### Using MongoDB Shell
```bash
mongosh
use grumble
show collections
```

## Common Queries

### Find User's Complaints
```javascript
db.complaints.find({ author: ObjectId("USER_ID") })
```

### Get Complaint Statistics
```javascript
db.complaints.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
```

## Security Notes
- Database credentials should be kept secure
- Production deployments should use MongoDB Atlas
- Regular backups are recommended
- Use strong passwords and proper authentication