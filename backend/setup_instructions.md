# Complaint System Backend

A robust Express.js backend API for managing customer complaints with MySQL database integration.

## Features

- ✅ Complete CRUD operations for complaints
- ✅ File upload support for attachments (images, PDFs, documents)
- ✅ Category and company management
- ✅ Status tracking (pending, in_progress, resolved, closed)
- ✅ Search and filtering capabilities
- ✅ Pagination support
- ✅ Dashboard statistics
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Database Setup

Create a MySQL database and run the SQL schema:

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE complaint_system;

# Import the schema (use the provided SQL file)
# Or the app will auto-create tables on first run
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=complaint_system
```

### 4. Create Uploads Directory

```bash
mkdir uploads
```

### 5. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Complaints

- `GET /api/complaints` - Get all complaints with pagination and filtering
  - Query params: `page`, `limit`, `category`, `company`, `status`, `search`
- `GET /api/complaints/:id` - Get single complaint by ID
- `POST /api/complaints` - Create new complaint (supports file upload)
- `PUT /api/complaints/:id/status` - Update complaint status
- `DELETE /api/complaints/:id` - Close complaint (soft delete)

### Categories

- `GET /api/categories` - Get all active categories

### Companies

- `GET /api/companies` - Get all companies with complaint counts

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

### Main Tables

1. **complaints** - Stores complaint data
2. **categories** - Predefined complaint categories
3. **companies** - Company information and statistics
4. **complaint_responses** - Company/admin responses (optional)
5. **complaint_history** - Status change tracking (optional)

### Key Fields

**Complaints Table:**
- `id` - Primary key
- `title` - Complaint title
- `company` - Company name
- `category` - Selected category
- `summary` - Detailed description
- `status` - Current status (pending/in_progress/resolved/closed)
- `attachment_path` - File path for uploads
- `created_at` / `updated_at` - Timestamps

## File Upload

- Supported formats: JPG, PNG, GIF, PDF, DOC, DOCX
- Maximum file size: 10MB
- Files stored in `/uploads` directory
- Accessible via `/uploads/<filename>` endpoint

## Frontend Integration

### Example React API calls:

```javascript
// Submit new complaint
const submitComplaint = async (formData) => {
  const response = await fetch('http://localhost:3001/api/complaints', {
    method: 'POST',
    body: formData // FormData object with file
  });
  return response.json();
};

// Get complaints
const getComplaints = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page,
    ...filters
  });
  
  const response = await fetch(`http://localhost:3001/api/complaints?${params}`);
  return response.json();
};
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- File type validation for uploads
- File size limits
- SQL injection prevention with prepared statements
- Input validation and sanitization
- CORS configuration

## Performance Optimizations

- Database indexes on frequently queried columns
- Connection pooling for MySQL
- Pagination for large datasets
- Efficient query structures

## Future Enhancements

- User authentication and authorization
- Email notifications
- Real-time updates with WebSockets
- Advanced analytics and reporting
- Company response system
- Automated status updates

## Development

### Adding New Features

1. Define new routes in `server.js`
2. Add database migrations if needed
3. Update API documentation
4. Test thoroughly

### Database Migrations

When adding new tables or columns, update the `initializeDatabase()` function or create separate migration scripts.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **File Upload Issues**
   - Check `uploads` directory exists and is writable
   - Verify file size and type restrictions

3. **CORS Issues**
   - Update CORS configuration for your frontend domain

## License

MIT License - feel free to use for personal or commercial projects.