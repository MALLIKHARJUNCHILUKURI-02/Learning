import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const db = new pg.Client({
  user: process.env.DATABASE_USERNAME, // Database username
  host: process.env.DATABASE_HOST, // Host address (local server)
  database: process.env.DATABASE_NAME, // Database name
  password: process.env.DATABASE_PASSWORD , // Database password (consider storing securely in environment variables)
  port: process.env.DATABASE_PORT, // Default port for PostgreSQL
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkvisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) =>{
    countries.push(country.country_code)
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkvisted();
  console.log(countries);
  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.post("/add", async (req, res) => {
  // try {
  //   const country = req.body.country;
    
  //   // Use ILIKE for case-insensitive matching
  //   const result = await db.query("SELECT country_code FROM countries WHERE country_name ILIKE $1", [country]);

  //   if (result.rows.length !== 0) {
  //     const countryCode = result.rows[0].country_code;

  //     // Check if the country is already in visited_countries
  //     const checkExisting = await db.query("SELECT * FROM visited_countries WHERE country_code = $1", [countryCode]);

  //     if (checkExisting.rows.length === 0) {
  //       // Insert only if not already visited
  //       await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
  //     }
  //   }
  //   res.redirect("/");
  // } catch (error) {
  //   console.error("Error adding country:", error);
  //   res.status(500).send("Internal Server Error");
  // }

  const country = req.body.country;

  try{
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1",[`%${country.toLowerCase()}%`]);
    const data = result.rows[0];

    const country_code = data.country_code;

    try{
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",[country_code]);
      res.redirect("/");
    }catch(err){
      console.log(err);
      const countries = await checkvisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again."
      });
    }
  }catch(err){
    console.log(err);
      const countries = await checkvisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country name does not exist, try again."
      });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
