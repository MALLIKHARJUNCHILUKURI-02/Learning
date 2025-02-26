import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Cmkreddy@1432",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 0;

let users = [];

async function checkVisisted() {
  try {
    const result = await db.query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1;",
      [currentUserId]
    );
    const countries = result.rows.map((row) => row.country_code);
    console.log("Visited countries:", countries); // Debugging info
    return countries;
  } catch (err) {
    console.log("Error fetching visited countries:", err);
    return [];
  }
}



async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.error("No current user found.");
    return res.redirect("/user"); // Redirect to user selection if no user is set
  }

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color || "#b9b9b9", // Provide a default color if undefined
  });
});
app.get("/user", async (req, res) => {
  res.render("new.ejs", { users: users });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1;",
      [`%${input.toLowerCase()}%`]
    );

    if (result.rows.length === 0) {
      console.log(`No country found for input: ${input}`);
      return res.send("Country not found. Please try again.");
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log("Error inserting visited country:", err);
      res.send("Failed to add the country to the visited list.");
    }
  } catch (err) {
    console.log("Error querying country code:", err);
    res.send("Error while searching for the country.");
  }
});


app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
