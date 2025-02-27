// Importing required modules
import express from "express";
import bodyParser from "body-parser";
import pg from "pg"; // PostgreSQL client
import bcrypt from "bcrypt"; // For password hashing
import session from "express-session"; // Session management
import passport from "passport"; // Authentication middleware
import { Strategy } from "passport-local"; // Local strategy for passport
import env from "dotenv";

// Initializing the Express app
const app = express();
const port = 3000; // Server will run on port 3000
const saltRounds = 10; // Number of salt rounds for bcrypt hashing
env.config();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true })); // Parsing form data
app.use(express.static("public")); // Serving static files (e.g., CSS, JS, images)

// Session setup
app.use(session({
  secret: process.env.SECCION_SECRET, // Secret key for session encryption
  resave: false, // Prevents session from being saved back to the store unless modified
  saveUninitialized: true, // Allows saving uninitialized sessions
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session expiration time (24 hours)
  },
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// PostgreSQL database connection setup
const db = new pg.Client({
  user: process.env.DATABASE_USERNAME, // Database username
  host: process.env.DATABASE_HOST, // Host address (local server)
  database: process.env.DATABASE_NAME, // Database name
  password: process.env.DATABASE_PASSWORD , // Database password (consider storing securely in environment variables)
  port: process.env.DATABASE_PORT, // Default port for PostgreSQL
});
db.connect(); // Establishing the connection to the database

// Route to render the 'secrets' page if authenticated, else redirects to 'home'
app.get("/secrets", (req, res) => {
  console.log(req.user); // Logging the current authenticated user
  if (req.isAuthenticated()) {
    res.render("secrets.ejs"); // If authenticated, show the secrets page
  } else {
    res.render("home.ejs"); // Otherwise, show the home page
  }
});

// Render the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Render the login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Render the registration page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Handle user registration
app.post("/register", async (req, res) => {
  const email = req.body.username; // User-provided email
  const password = req.body.password; // User-provided password

  try {
    // Check if the email already exists in the database
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in."); // Inform the user if email exists
    } else {
      // Hash the password before saving to the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          // Insert the new user into the database with hashed password
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          // Automatically log in the user after registration
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets"); // Redirect to the secrets page
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Handle user login with Passport authentication
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets", // On success, redirect to secrets page
  failureRedirect: "/login" // On failure, redirect to login page
}));

// Configuring Passport's local strategy for authentication
passport.use(new Strategy(async function verify(username, password, cb) {
  console.log(username);
  try {
    // Fetch user from the database using the provided username (email)
    const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      
      // Compare the entered password with the hashed password in the database
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err); // Return error if password comparison fails
        } else {
          if (result) {
            return cb(null, user); // Successful authentication
          } else {
            return cb(null, false); // Incorrect password
          }
        }
      });
    } else {
      return cb("User not found"); // If user is not found in the database
    }
  } catch (err) {
    return cb(err); // Return error if query fails
  }
}));

// Serialize user instance to store in session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Deserialize user instance from session
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
