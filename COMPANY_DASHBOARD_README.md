# Company Dashboard - Grumble Platform

## Overview
This is a comprehensive company dashboard system that opens after successful registration from the companies section. The dashboard allows company representatives to manage customer reviews and complaints with a professional interface that matches the overall site design.

## Features

### 🏢 Company Profile Section
- **Company Logo/Avatar**: Automatically generated from company name initials
- **Company Information**: Displays company name and email
- **Statistics Dashboard**: Shows total reviews, pending reviews, and answered reviews
- **Profile Actions**: Edit profile functionality

### 📊 Reviews Management System
- **My Reviews Section**: Organized into two distinct categories
  - **Pending Reviews**: Reviews awaiting company response (33 sample reviews)
  - **Answered Reviews**: Reviews that have been responded to (156 sample reviews)
- **Customer Information**: Display of customer names, ratings, and review dates
- **Review Actions**: Reply and view details functionality
- **Company Replies**: Professional responses from company representatives

### 🎨 Design Consistency
- **Matches Main Site**: Uses same color scheme (#515bc3 primary color)
- **Professional Layout**: Clean cards, proper spacing, visual hierarchy
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions
- **Status Indicators**: Color-coded badges for pending/answered reviews

## Files Structure

```
├── page.html                      # Main page with registration form
├── company-dashboard.html          # Company dashboard page
└── COMPANY_DASHBOARD_README.md    # This documentation
```

## How to Use

### Method 1: Using Registration Form
1. **Open `page.html`** in your browser
2. **Scroll down** to the "Şirkəti əlavə etmək üçün formu doldurun" section
3. **Fill out the form** with company details:
   - Ad (First Name)
   - Soyad (Last Name)
   - Şirkət adı (Company Name)
   - Telefon (Phone)
   - Email
   - Şifrə (Password)
   - Şifrəni təsdiq edin (Confirm Password)
4. **Click "Göndər"** (Submit)
5. **Automatic redirect** to company dashboard

### Method 2: Using Test Registration Button
1. **Open `page.html`** in your browser
2. **Scroll down** to the login section
3. **Click the green "Test Company Registration" button**
4. **Automatic redirect** to company dashboard with test data

### Method 3: Direct Access
1. **Open `company-dashboard.html`** directly in your browser
2. **View the dashboard** with default test data

## Test Credentials

### For Testing Registration:
- **Sample Password**: `Test123!` (meets all requirements)
- **Password Requirements**:
  - ✓ Ən azı 8 simvol (At least 8 characters)
  - ✓ Böyük hərf (Uppercase letter)
  - ✓ Rəqəm (Number)
  - ✓ Xüsusi simvol (!@#$%^&*) (Special character)
- **Test Company**: Automatically created when using the test button
  - Company Name: Test Şirkəti
  - Email: test@company.az
  - Contact: Əli Məmmədov

### For Testing Login (Company System):
- **JPMorgan Chase**: `jpmorgan@bank.com` / `JPMorgan123!`
- **HSBC**: `hsbc@bank.com` / `HSBC123!`
- **Goldman Sachs**: `goldman@bank.com` / `Goldman123!`
- **Emirates**: `emirates@airline.com` / `Emirates123!`

## Dashboard Features

### 📈 Statistics Display
- **189 Total Reviews**: Complete review count
- **33 Pending Reviews**: Reviews awaiting response
- **156 Answered Reviews**: Reviews with company responses

### 📝 Sample Reviews

#### Pending Reviews (3 samples):
1. **Əli Məmmədov** (2.0 stars) - Card delivery delay complaint
2. **Leyla Həsənova** (1.0 star) - Mobile banking app issues
3. **Rəşad Quliyev** (3.0 stars) - Branch queue complaints

#### Answered Reviews (2 samples):
1. **Nigar Əliyeva** (5.0 stars) - Positive feedback with company response
2. **Elçin Məmmədov** (4.0 stars) - Credit application praise with response

### 🔧 Interactive Features
- **Tab Switching**: Between pending and answered reviews
- **Reply Functionality**: "Cavab Ver" buttons for responding to reviews
- **View Details**: "Ətraflı" buttons for detailed review information
- **Profile Editing**: "Profili Redaktə Et" button
- **Logout System**: Secure logout with confirmation

## Technical Implementation

### 🔄 Data Flow
1. **Registration**: Form data stored in localStorage
2. **Dashboard Load**: Data retrieved from localStorage
3. **Avatar Generation**: Automatic initials from company name
4. **Review Management**: Interactive tabs and action buttons

### 💾 Data Storage
- **localStorage**: Used for company data persistence
- **JSON Format**: Structured data storage
- **Fallback System**: Default test data if no registration data

### 🎯 Browser Compatibility
- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

## Testing Instructions

### 🧪 Complete Testing Flow:
1. **Start at main page** (`page.html`)
2. **Test registration** using either method above
3. **Verify dashboard** loads with correct company data
4. **Test tab switching** between pending and answered reviews
5. **Test interactive buttons** (Reply, View Details, Edit Profile)
6. **Test logout functionality**

### 🐛 Debugging:
- **Open browser console** (F12) for detailed logging
- **Check localStorage** for stored company data
- **Verify redirects** work correctly between pages

## Design Specifications

### 🎨 Color Scheme:
- **Primary**: #515bc3 (Grumble purple)
- **Success**: #28a745 (green for answered reviews)
- **Warning**: #ffc107 (yellow for pending reviews)
- **Background**: #f8f9fa (light gray)

### 📱 Responsive Breakpoints:
- **Desktop**: Full layout with side-by-side elements
- **Mobile**: Stacked layout with adjusted spacing

The company dashboard provides a complete solution for companies to manage their customer feedback and maintain their reputation on the Grumble platform!
