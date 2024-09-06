// const express = require("express");
// const mysql = require("mysql2/promise");
// const fs = require("fs");
// const session = require('express-session');
// const path = require("path");
// const ejsMate = require('ejs-mate');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const app = express();

// // Initialize the connection pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "mkdir@31",
//   database: "terranexus_database",
//   multipleStatements: true
// });

// // Middleware setup
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(session({
//   secret: 'your-secret-key',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Read and execute schema.sql to set up the database schema
// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     const sql = fs.readFileSync("models/schema.sql", "utf8");
//     await connection.query(sql);
//     connection.release();

//     app.listen(3000, () => {
//       console.log("Server is listening on port 3000");
//     });
//   } catch (err) {
//     console.error("Error setting up database:", err);
//   }
// })();














// // Routes
// app.get("/listings", async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM vendor_demands');
//     res.render('index', { allListings: results });
//   } catch (err) {
//     console.error('Error fetching listings:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/listings/new', (req, res) => {
//   res.render('new', { vendor_id: '' });
// });

// app.post('/listings', async (req, res) => {
//   const { vendor_id, crop_name, crop_type, required_quantity, price_range_min, price_range_max, quality_required, location_preference, deadline, image_url } = req.body;
//   const query = `INSERT INTO vendor_demands (vendor_id, crop_name, crop_type, required_quantity, price_range_min, price_range_max, quality_required, location_preference, deadline, image_url)
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   try {
//     const [results] = await pool.query(query, [vendor_id, crop_name, crop_type, required_quantity, price_range_min, price_range_max, quality_required, location_preference, deadline, image_url]);

//     if (results.affectedRows === 0) {
//       return res.status(400).send('Failed to create new listing');
//     }

//     res.redirect('/listings');
//   } catch (error) {
//     console.error('Error inserting new listing:', error);
//     res.status(500).send('Error inserting new listing.');
//   }
// });



// // app.get('/listings/farmlogin', (req, res) => {
// //   res.render('farmer_login');
// // });

// // app.post('/listings/farmlogin', async (req, res) => {
// //   const { name, email, phone_number, location, farm_size, farming_type, password } = req.body;
// //   const query = 'INSERT INTO farmers (name, email, phone_number, location, farm_size, farming_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)';

// //   try {
// //     await pool.query(query, [name, email, phone_number, location, farm_size, farming_type, password]);
// //     res.send('Farmer registered successfully!');
// //   } catch (err) {
// //     console.error('Error inserting data into MySQL:', err);
// //     res.send('Error occurred while saving data.');
// //   }
// // });

// // app.get('/listings/vendorregister', (req, res) => {
// //   res.render('vendor_registration');
// // });

// // app.post('/listings/vendorregister', async (req, res) => {
// //   const { company_name, contact_person, email, phone_number, location, business_type, password } = req.body;
// //   const query = 'INSERT INTO vendors (company_name, contact_person, email, phone_number, location, business_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)';

// //   try {
// //     await pool.query(query, [company_name, contact_person, email, phone_number, location, business_type, password]);
// //     res.send('Vendor registered successfully!');
// //   } catch (err) {
// //     console.error('Error inserting data into MySQL:', err);
// //     res.send('Error occurred while saving data.');
// //   }
// // });

// app.delete('/listings/:vendor_id', async (req, res) => {
//   const vendorId = req.params.vendor_id;
//   const query = 'DELETE FROM vendor_demands WHERE vendor_id = ?';

//   try {
//     const [results] = await pool.query(query, [vendorId]);

//     if (results.affectedRows === 0) {
//       return res.status(404).send('Listing not found');
//     }

//     res.redirect('/listings');
//   } catch (err) {
//     console.error('Error deleting listing:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/listings/:id', async (req, res) => {
//   const vendorId = req.params.id;

//   try {
//     const [listingResults] = await pool.query('SELECT * FROM vendor_demands WHERE vendor_id = ?', [vendorId]);

//     if (listingResults.length === 0) {
//       return res.status(404).send('Listing not found');
//     }

//     const listing = listingResults[0];

//     const [vendorResults] = await pool.query('SELECT * FROM vendors WHERE vendor_id = ?', [listing.vendor_id]);

//     if (vendorResults.length === 0) {
//       return res.status(404).send('Vendor not found');
//     }

//     const vendor = vendorResults[0];
//     res.render('show', { listing, vendor });
//   } catch (err) {
//     console.error('Error fetching listing details:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.get('/about', (req, res) => {
//   res.render('homepage'); // Render the 'mainpage.ejs' template
// });




// // login


// app.use(express.static('public'));

// // Route to display login page
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Route to handle login form submission
// app.post('/login', async (req, res) => {
//     const { email, phone, password } = req.body;

//     try {
//         // Query to get user data from the database
//         const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND phone = ?', [email, phone]);
        
//         if (rows.length === 0) {
//             return res.status(401).send('Invalid email or phone number');
//         }

//         // Compare the provided password with the hashed password from the database
//         const user = rows[0];
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).send('Invalid password');
//         }

//         // Login successful
//         req.session.user = user; // Store user in session
//         res.redirect('/'); // Redirect to the home page or any other page
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // register


// app.get('/register', (req, res) => {
//   res.render('register'); // Ensure you have a register.ejs file
// });

// // Route to handle registration form submission
// app.post('/register', async (req, res) => {
//   const { userType, name, company_name, contact_person, email, phone_number, location, farm_size, farming_type, business_type, password } = req.body;

//   try {
//       // Hash the password before storing it in the database
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Insert new user into the database based on userType
//       if (userType === 'farmer') {
//           await pool.query('INSERT INTO farmers (name, email, phone_number, location, farm_size, farming_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//               [name, email, phone_number, location, farm_size, farming_type, hashedPassword]);
//       } else if (userType === 'vendor') {
//           await pool.query('INSERT INTO vendors (company_name, contact_person, email, phone_number, location, business_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//               [company_name, contact_person, email, phone_number, location, business_type, hashedPassword]);
//       }

//       res.redirect('/login');
//   } catch (err) {
//       console.error('Error during registration:', err);
//       res.status(500).send('Internal Server Error');
//   }
// });
// module.exports = app;


const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs");
const session = require("express-session");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const app = express();

// Initialize the connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mkdir@31",
  database: "terranexus_database",
  multipleStatements: true,
});

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }, // Set true if using HTTPS
  })
);

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up the database schema (runs only once at startup)
(async () => {
  try {
    const connection = await pool.getConnection();
    const sql = fs.readFileSync("models/schema.sql", "utf8");
    await connection.query(sql);
    connection.release();

    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (err) {
    console.error("Error setting up database:", err);
  }
})();

// Routes
app.get("/listings", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM vendor_demands");
    res.render("listings", { allListings: results });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/listings/new", (req, res) => {
  res.render("new", { vendor_id: "" });
});

app.post("/listings", async (req, res) => {
  const {
    vendor_id,
    crop_name,
    crop_type,
    required_quantity,
    price_range_min,
    price_range_max,
    quality_required,
    location_preference,
    deadline,
    image_url,
  } = req.body;

  const query = `INSERT INTO vendor_demands (vendor_id, crop_name, crop_type, required_quantity, price_range_min, price_range_max, quality_required, location_preference, deadline, image_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [results] = await pool.query(query, [
      vendor_id,
      crop_name,
      crop_type,
      required_quantity,
      price_range_min,
      price_range_max,
      quality_required,
      location_preference,
      deadline,
      image_url,
    ]);

    if (results.affectedRows === 0) {
      return res.status(400).send("Failed to create new listing");
    }

    res.redirect("/listings");
  } catch (error) {
    console.error("Error inserting new listing:", error);
    res.status(500).send("Error inserting new listing.");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM farmers WHERE email = ? AND phone_number = ? UNION SELECT * FROM vendors WHERE email = ? AND phone_number = ?",
      [email, phone, email, phone]
    );

    if (rows.length === 0) {
      return res.status(401).send("Invalid email or phone number");
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    req.session.user = user; // Store user in session
    res.redirect("/about"); // Redirect to the home page or any other page
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/register_farmer", (req, res) => {
  res.render("register_farmer");
});

app.post("/register_farmer", async (req, res) => {
  const { name, email, phone_number, location, farm_size, farming_type, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO farmers (name, email, phone_number, location, farm_size, farming_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, phone_number, location, farm_size, farming_type, hashedPassword]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error during farmer registration:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/register_vendor", (req, res) => {
  res.render("register_vendor");
});

app.post("/register_vendor", async (req, res) => {
  const {
    company_name,
    contact_person,
    email,
    phone_number,
    location,
    business_type,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO vendors (company_name, contact_person, email, phone_number, location, business_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [company_name, contact_person, email, phone_number, location, business_type, hashedPassword]
    );

    res.redirect("/listings");
  } catch (err) {
    console.error("Error during vendor registration:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/listings/:vendor_id", async (req, res) => {
  const vendorId = req.params.vendor_id;

  try {
    // Fetch listing details based on vendor_id
    const [listingResults] = await pool.query("SELECT * FROM vendor_demands WHERE vendor_id = ?", [vendorId]);
    const [vendorResults] = await pool.query("SELECT * FROM vendors WHERE vendor_id = ?", [vendorId]);

    if (listingResults.length === 0 || vendorResults.length === 0) {
      return res.status(404).send("Listing or vendor not found");
    }

    const listing = listingResults[0];
    const vendor = vendorResults[0];

    res.render("show", { listing, vendor });
  } catch (err) {
    console.error("Error fetching listing details:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.delete("/listings/:vendor_id", async (req, res) => {
  const vendorId = req.params.vendor_id;
  const query = "DELETE FROM vendor_demands WHERE vendor_id = ?";

  try {
    const [results] = await pool.query(query, [vendorId]);

    if (results.affectedRows === 0) {
      return res.status(404).send("Listing not found");
    }

    res.redirect("/listings");
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/admin", (req, res) => {
  res.render("admin"); // Render admin.ejs
});

// Handle the admin form submission
app.post("/adminsee", (req, res) => {
  const { username, password } = req.body;

  // Simple admin password check
  if (password === "terra") {
    res.redirect("/adminsee"); // Redirect if password is correct
  } else {
    res.status(401).send("Incorrect password. Access denied.");
  }
});

app.get("/adminsee", async (req, res) => {
  try {
    const [farmers] = await pool.query("SELECT * FROM farmers");
    const [vendors] = await pool.query("SELECT * FROM vendors");
    const [vendorDemands] = await pool.query("SELECT * FROM vendor_demands");

    res.render("adminsee", { farmers, vendors, vendorDemands });
  } catch (err) {
    console.error("Error fetching admin data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/faq", (req, res) =>{
  res.render("faq")

});

app.get("/about", (req, res) =>{
  res.render("about")

});

app.get("/contactform", (req, res) =>{
  res.render("contactform")

});

app.get("/signUp", (req, res) =>{
  res.render("signUp")

});






// Export the app module
module.exports = app;

