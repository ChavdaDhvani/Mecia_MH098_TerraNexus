-- -- Create the database if it doesn't exist
-- CREATE DATABASE IF NOT EXISTS terranexus_database;

-- -- Select the database to ensure all subsequent commands are executed in it
-- USE terranexus_database;

-- -- Create the farmers table
-- CREATE TABLE IF NOT EXISTS farmers (
--     farmer_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     phone_number VARCHAR(15),
--     location VARCHAR(255),
--     farm_size DECIMAL(10, 2),  -- Size in acres/hectares
--     farming_type ENUM('Organic', 'Conventional', 'Both'),
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create the vendors table
-- CREATE TABLE IF NOT EXISTS vendors (
--     vendor_id INT AUTO_INCREMENT PRIMARY KEY,
--     company_name VARCHAR(100) NOT NULL,
--     contact_person VARCHAR(100),
--     email VARCHAR(100) UNIQUE NOT NULL,
--     phone_number VARCHAR(15),
--     location VARCHAR(255),
--     business_type ENUM('Retailer', 'Wholesaler', 'Processor', 'Distributor'),
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create the vendor demands table
-- CREATE TABLE IF NOT EXISTS vendor_demands (

--     vendor_id INT AUTO_INCREMENT PRIMARY KEY,
--     crop_name VARCHAR(100) NOT NULL,
--     crop_type ENUM('Grains', 'Vegetables', 'Fruits', 'Legumes', 'Nuts', 'Other'),
--     required_quantity DECIMAL(10, 2),  -- Quantity in tons or kilograms
--     price_range_min DECIMAL(10, 2),  -- Minimum acceptable price per unit
--     price_range_max DECIMAL(10, 2),  -- Maximum acceptable price per unit
--     quality_required VARCHAR(100),  -- Quality grade or certification
--     location_preference VARCHAR(255),
--     deadline DATE,
--     image_url VARCHAR(255),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   
-- );



