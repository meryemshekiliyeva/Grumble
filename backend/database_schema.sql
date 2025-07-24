-- Create database
CREATE DATABASE IF NOT EXISTS complaint_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE complaint_system;

-- Complaints table - main table for storing complaints
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    summary TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'resolved', 'closed') DEFAULT 'pending',
    attachment_path VARCHAR(500),
    attachment_original_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_company (company),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Categories table - predefined categories for complaints
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    name_az VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table - track companies and their complaint statistics
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    complaint_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, name_az, description) VALUES
('E-commerce', 'E-ticarət', 'Online shopping and retail'),
('Food Delivery', 'Yemək Çatdırılması', 'Food delivery services'),
('Transportation', 'Nəqliyyat', 'Transportation and logistics'),
('Banking', 'Bank Xidmətləri', 'Banking and financial services'),
('Telecommunications', 'Telekom', 'Phone, internet, TV services'),
('Government Services', 'Dövlət Xidmətləri', 'Government and public services'),
('Insurance', 'Sığorta', 'Insurance services'),
('Education', 'Təhsil', 'Educational services'),
('Healthcare', 'Səhiyyə', 'Healthcare and medical services'),
('Utilities', 'Kommunal', 'Utilities and municipal services'),
('Retail', 'Pərakəndə', 'Retail and shopping'),
('Airlines', 'Havayolu', 'Airline services'),
('Tourism', 'Turizm', 'Tourism and travel services'),
('Technology', 'Texnologiya', 'Technology and IT services');

-- Optional: Create a user table for future authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Link complaints to users (add this column to complaints table if you implement user authentication)
-- ALTER TABLE complaints ADD COLUMN user_id INT,
-- ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- Optional: Create complaint_responses table for tracking company responses
CREATE TABLE complaint_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    response_text TEXT NOT NULL,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responder_type ENUM('company', 'admin', 'system') DEFAULT 'company',
    responder_name VARCHAR(255),
    responder_email VARCHAR(255),
    
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    INDEX idx_complaint_id (complaint_id)
);

-- Optional: Create complaint_history table for tracking status changes
CREATE TABLE complaint_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    changed_by VARCHAR(255),
    change_reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    INDEX idx_complaint_id (complaint_id)
);