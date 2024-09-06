const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mkdir@31", // Replace with your actual password
  database: "terranexus_database",
  multipleStatements: true // Allow executing multiple statements
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL");

  // Read and execute schema.sql file
  fs.readFile("models/schema.sql", "utf8", (err, sql) => {
    if (err) {
      console.error("Error reading schema.sql file:", err);
      return;
    }

    // Execute the SQL script to create tables if they don't exist
    db.query(sql, (err) => {
      if (err) {
        console.error("Error executing SQL script:", err);
        return;
      }

      console.log("Schema ensured");

      // Insert random data
      insertRandomData();

      // Now you can start your server
      app.listen(3000, () => {
        console.log("Server is listening on port 3000");
      });
    });
  });
});

// Function to insert random data into the database
function insertRandomData() {
  // Function to generate random farmers data
  function getRandomFarmer() {
    return [
      `Farmer ${Math.floor(Math.random() * 1000)}`,
      `farmer${Math.floor(Math.random() * 1000)}@example.com`,
      `123-456-${Math.floor(Math.random() * 10000)}`,
      `Location ${Math.floor(Math.random() * 100)}`,
      (Math.random() * 100).toFixed(2),
      ['Organic', 'Conventional', 'Both'][Math.floor(Math.random() * 3)],
      `password${Math.floor(Math.random() * 1000)}`
    ];
  }

  // Function to generate random vendors data
  function getRandomVendor() {
    return [
      `Company ${Math.floor(Math.random() * 1000)}`,
      `Contact ${Math.floor(Math.random() * 1000)}`,
      `vendor${Math.floor(Math.random() * 1000)}@example.com`,
      `123-456-${Math.floor(Math.random() * 10000)}`,
      `Location ${Math.floor(Math.random() * 100)}`,
      ['Retailer', 'Wholesaler', 'Processor', 'Distributor'][Math.floor(Math.random() * 4)],
      `password${Math.floor(Math.random() * 1000)}`
    ];
  }

  // Function to generate random vendor demands data with image URL
  function getRandomVendorDemand(vendor_id) {
    return [
      vendor_id,
      `Crop ${Math.floor(Math.random() * 1000)}`,
      ['Grains', 'Vegetables', 'Fruits', 'Legumes', 'Nuts', 'Other'][Math.floor(Math.random() * 6)],
      (Math.random() * 100).toFixed(2),
      (Math.random() * 50).toFixed(2),
      (Math.random() * 50).toFixed(2),
      `Quality ${Math.floor(Math.random() * 10)}`,
      `Location ${Math.floor(Math.random() * 100)}`,
      new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
      `http://example.com/image${Math.floor(Math.random() * 5) + 1}.jpg` // Adding 5 different images
    ];
  }

  // Insert random data into the farmers table
  let farmersData = [];
  for (let i = 1; i <= 5; i++) {  // Changed to 5 entries
    farmersData.push(getRandomFarmer());
  }
  const farmerQuery = "INSERT INTO farmers (name, email, phone_number, location, farm_size, farming_type, password) VALUES ?";
  db.query(farmerQuery, [farmersData], (err) => {
    if (err) throw err;
    console.log('Farmers data inserted');

    // After inserting farmers, generate vendor data
    let vendorsData = [];
    for (let i = 1; i <= 5; i++) {  // Changed to 5 entries
      vendorsData.push(getRandomVendor());
    }
    const vendorQuery = "INSERT INTO vendors (company_name, contact_person, email, phone_number, location, business_type, password) VALUES ?";
    db.query(vendorQuery, [vendorsData], (err) => {
      if (err) throw err;
      console.log('Vendors data inserted');

      // After inserting vendors, generate vendor demands data
      db.query('SELECT vendor_id FROM vendors', (err, vendors) => {
        if (err) throw err;
        let vendorDemandsData = [];
        vendors.forEach(vendor => {
          for (let i = 1; i <= 1; i++) {  // Insert 1 vendor demand per vendor
            vendorDemandsData.push(getRandomVendorDemand(vendor.vendor_id));
          }
        });

        const vendorDemandQuery = "INSERT INTO vendor_demands (vendor_id, crop_name, crop_type, required_quantity, price_range_min, price_range_max, quality_required, location_preference, deadline, image_url) VALUES ?";
        db.query(vendorDemandQuery, [vendorDemandsData], (err) => {
          if (err) throw err;
          console.log('Vendor demands data inserted');
          db.end();
        });
      });
    });
  });
}
