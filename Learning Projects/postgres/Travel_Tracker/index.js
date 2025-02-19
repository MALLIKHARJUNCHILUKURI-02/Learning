import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Cmkreddy@1432",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  const results = await db.query("SELECT country_code FROM visited_countries");
  results.rows.forEach((country) =>{
    countries.push(country.country_code);
  });

  console.log(results.rows);
  res.render("index.ejs", {countries:countries, total: countries.length})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
