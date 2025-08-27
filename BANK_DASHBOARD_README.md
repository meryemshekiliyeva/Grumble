# Bank Dashboard - Grumble Platform

## Overview
This is a comprehensive bank dashboard system integrated into the main Grumble platform. It allows bank representatives to manage customer reviews and complaints through the existing company login system. The dashboard provides a professional interface for banks to respond to customer feedback and maintain their reputation.

## Features

### 🏦 Bank Dashboard
- **Bank Information Display**: Shows bank logo, name, and key statistics
- **Review Management**: Organized into "Pending" and "Answered" categories
- **Professional Interface**: Consistent with the main Grumble website design
- **Real-time Statistics**: Total reviews, pending reviews, and answered reviews count
- **Star Rating Display**: Visual representation of bank ratings

### 📊 My Reviews Section
- **Pending Reviews**: Reviews awaiting bank response
- **Answered Reviews**: Reviews that have been responded to by the bank
- **Customer Information**: Display of customer names and ratings
- **Review Actions**: Reply and view details functionality
- **Bank Replies**: Professional responses from bank representatives

### 🔐 Integrated Authentication System
- **Existing Login Form**: Uses the main page's company login form
- **Bank Credentials**: Specific email/password combinations for banks
- **Session Management**: Integrated with existing user management
- **Multiple Bank Support**: Support for different bank accounts
- **Logout Functionality**: Uses existing logout system

## Files Structure

```
├── page.html                   # Main page with integrated bank dashboard
├── simple-login.html           # Simple demo login (separate)
├── welcome.html               # Simple demo welcome page (separate)
└── BANK_DASHBOARD_README.md   # This documentation
```

## Test Bank Accounts

### JPMorgan Chase
- **Email**: `jpmorgan@bank.com`
- **Password**: `JPMorgan123!`
- **Features**: Full dashboard with sample reviews

### HSBC
- **Email**: `hsbc@bank.com`
- **Password**: `HSBC123!`
- **Features**: Full dashboard with sample reviews

### Goldman Sachs
- **Email**: `goldman@bank.com`
- **Password**: `Goldman123!`
- **Features**: Full dashboard with sample reviews

### Emirates
- **Email**: `emirates@airline.com`
- **Password**: `Emirates123!`
- **Features**: Full dashboard with sample reviews

## How to Use

### 1. Access the Main Page
- Open `page.html` in your browser
- Scroll down to the "Şirkət Girişi" (Company Login) section
- Use any of the test bank accounts listed above
- Click "Daxil ol" (Login) to access the dashboard

### 2. Navigate the Dashboard
- After successful login, the page will automatically switch to dashboard mode
- **Bank Info Card**: View your bank's statistics and rating
- **My Reviews Tabs**: Switch between "Gözləyən" (Pending) and "Cavablanmış" (Answered)
- **Review Actions**: Use "Cavab Ver" (Reply) and "Ətraflı" (Details) buttons

### 3. Manage Reviews
- **Reply to Reviews**: Click "Cavab Ver" to respond to customer feedback
- **View Details**: Click "Ətraflı" for more information about a review
- **Track Status**: Monitor which reviews need attention

### 4. Logout
- Click the user profile dropdown in the header
- Select "Çıxış" (Logout) to end your session

## Testing with Live Server

### Using VS Code Live Server:
1. Install the Live Server extension in VS Code
2. Right-click on `page.html`
3. Select "Open with Live Server"
4. Scroll to the company login section
5. Use the test credentials to login
6. Navigate through the dashboard features

### Direct Browser Access:
1. Open `page.html` in Chrome or any modern browser
2. Scroll to the company login form
3. Login with test credentials
4. Explore the dashboard functionality

## Sample Data

### Pending Reviews (33 total)
- Customer complaints about card delivery delays
- Mobile banking app performance issues
- Branch queue management concerns

### Answered Reviews (156 total)
- Positive customer feedback with bank responses
- Credit application experiences
- Customer service interactions

## Technical Features

### Responsive Design
- Mobile-friendly interface
- Bootstrap 5.3.3 integration
- Professional styling consistent with main site

### JavaScript Functionality
- Tab switching for review categories
- Dynamic content loading
- Form validation and error handling
- Local storage for session management

### Security Features
- Client-side authentication (demo purposes)
- Session timeout handling
- Secure logout functionality
- Input validation and sanitization

## Customization

### Adding New Banks
1. Update `BANK_CREDENTIALS` object in `bank-login.html`
2. Add bank logo URL and credentials
3. Update the demo credentials display

### Modifying Review Data
1. Edit the HTML content in `bank_pages/page.html`
2. Update review statistics in the bank info card
3. Add or modify sample reviews in both tabs

### Styling Changes
1. Modify CSS in the `<style>` sections
2. Update colors, fonts, or layout as needed
3. Maintain consistency with the main Grumble design

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Notes
- This is a demo implementation for testing purposes
- In production, authentication would be server-side
- Review data would come from a database
- All interactions would be properly secured

## Support
For questions or issues with the bank dashboard, please refer to the main Grumble platform documentation or contact the development team.
