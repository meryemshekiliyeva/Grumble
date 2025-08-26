# MongoDB Setup Guide for Grumble Project

## 1. Install MongoDB Community Edition

### Windows Installation
1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select "Windows" platform
   - Choose "msi" package
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Install MongoDB as a Service (recommended)
   - Install MongoDB Compass (GUI tool) - optional but helpful

3. **Verify Installation**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   
   # Or check with net command
   net start | findstr MongoDB
   ```

### Alternative: MongoDB Atlas (Cloud)
If you prefer cloud database:
1. Go to: https://www.mongodb.com/atlas
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `MONGODB_URI` in backend/.env

## 2. Start MongoDB Service

### Windows Service (Recommended)
```powershell
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Check service status
sc query MongoDB
```

### Manual Start (Alternative)
```powershell
# Create data directory if it doesn't exist
mkdir C:\data\db

# Start MongoDB manually
mongod --dbpath "C:\data\db"
```

## 3. Verify MongoDB Connection

### Using MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# Or if using older version
mongo

# Show databases
show dbs

# Use grumble database
use grumble

# Show collections
show collections
```

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see the connection established

## 4. Seed Database with Initial Data

Once MongoDB is running, seed the database:

```bash
# Navigate to backend directory
cd backend

# Run seed script
npm run seed
```

This will create:
- **Categories**: Telekommunikasiya, Bank və Maliyyə, E-ticarət, etc.
- **Test Users**: Including admin and regular users
- **Test Companies**: Emirates, Kapital Bank, etc.
- **Sample Complaints**: For testing purposes
- **Sample Reviews**: For testing the review system

## 5. Test Database Connection

### Check Backend Connection
1. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. You should see: "MongoDB connected successfully"
3. Test API health: http://localhost:5000/api/health

### Check Data in Database
```bash
# Connect to MongoDB
mongosh

# Use grumble database
use grumble

# Check collections
show collections

# Check users
db.users.find().pretty()

# Check companies
db.companies.find().pretty()

# Check complaints
db.complaints.find().pretty()
```

## 6. Default Test Accounts

After seeding, you can use these accounts:

### Regular Users
- **Email**: test@example.com
- **Password**: Test123!

### Companies
- **Emirates**: support@emirates.com / Emirates123!
- **Kapital Bank**: info@kapitalbank.az / Kapital123!

### Admin
- **Email**: admin@grumble.az
- **Password**: Admin123!

## 7. Troubleshooting

### MongoDB Service Won't Start
```powershell
# Check if port 27017 is in use
netstat -an | findstr 27017

# Kill process using port (if needed)
taskkill /F /PID <process_id>

# Restart MongoDB service
net stop MongoDB
net start MongoDB
```

### Connection Refused Error
1. Ensure MongoDB service is running
2. Check firewall settings
3. Verify port 27017 is not blocked
4. Check MongoDB logs: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`

### Database Not Found
1. Run the seed script: `npm run seed`
2. Check if database was created: `show dbs` in mongosh
3. Verify connection string in backend/.env

### Permission Issues
1. Run command prompt as Administrator
2. Ensure MongoDB has write permissions to data directory
3. Check Windows User Account Control settings

## 8. MongoDB Compass Usage (Optional)

MongoDB Compass provides a GUI for database management:

1. **Connect**: mongodb://localhost:27017
2. **Browse Data**: Navigate through databases and collections
3. **Query Data**: Use the query bar to filter documents
4. **Create Indexes**: Improve query performance
5. **Monitor Performance**: View real-time metrics

## 9. Production Considerations

For production deployment:

1. **Security**
   - Enable authentication
   - Use SSL/TLS
   - Configure firewall rules

2. **Performance**
   - Create appropriate indexes
   - Monitor query performance
   - Set up replica sets

3. **Backup**
   - Regular database backups
   - Point-in-time recovery
   - Test restore procedures

## 10. Next Steps

After MongoDB is set up:

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `npm run dev`
3. **Test Login**: Use test accounts above
4. **Submit Complaints**: Test the complaint system
5. **Admin Panel**: Access with admin credentials

## Support

If you encounter issues:
1. Check MongoDB documentation: https://docs.mongodb.com/
2. MongoDB Community Forums: https://community.mongodb.com/
3. Stack Overflow: Search for MongoDB-related questions
