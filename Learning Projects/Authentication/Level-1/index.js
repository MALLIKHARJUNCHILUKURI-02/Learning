//LEVEL - 1 Authentication

import express from "express"; // Import Express
import bodyParser from "body-parser"; // Import body-parser
import pg from "pg"; //Import Postgres
import bcrypt from "bcrypt";
import env from "dotenv";

//Connecting To Our PostgreSql Database
const db = new pg.Client({
  user: process.env.DATABASE_USERNAME, // Database username
  host: process.env.DATABASE_HOST, // Host address (local server)
  database: process.env.DATABASE_NAME, // Database name
  password: process.env.DATABASE_PASSWORD , // Database password (consider storing securely in environment variables)
  port: process.env.DATABASE_PORT, // Default port for PostgreSQL
});
db.connect()
  .then(() => console.log("Connected to the database."))
  .catch((err) => console.error("Database connection error:", err));


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Homr Route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

//Login Route
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//Register Route
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

//Register values updated to database
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query(`SELECT * FROM users WHERE email = ($1)`, [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing Password", err);
        } else {
          const result = await db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [email, hash]);
        }
      });
      res.render("login.ejs");
    }
  } catch (error) {
    console.log(error);
    res.render("secrets.ejs");
  }
  // console.log(` Register User Name : ${username}`);
  // console.log(`Register  Password : ${password}`);
});


// Login using username in database to access secrets page
app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const checkResult = await db.query(`SELECT * FROM users WHERE email = ($1)`, [email]);

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      const storedHashedPassword = user.password;
      console.log(`Stored Password : ${storedHashedPassword}`);
      bcrypt.compare(loginPassword, storedHashedPassword , async (err, result) =>{
        if(err){
          console.log("Error hashing Password", err);
        }else{
          // res.send("Incorrect Password");
          console.log(`Login Hash Compared Result :  ${result}`);
          if(result){
            res.render("secrets.ejs");
          }else{
            res.send("Incorrect password")
          }
        }
      });
    } else {
      res.send("User not found. Please register to continue.");
    }
  } catch (error) {
    console.log(error);
  }

  // console.log(`Login User Name : ${username}`);
  // console.log(`Login  Password : ${password}`);
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
