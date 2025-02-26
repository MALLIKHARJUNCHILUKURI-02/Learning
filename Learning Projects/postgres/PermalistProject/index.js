// Required Packages
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

// Database Connection Using Pooling
const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Express App Setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Route - Display To-Do Items
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    const items = result.rows;
    console.log("Fetched items from the database.");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items. Please try again.");
  }
});

// Add Item Route
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query(`INSERT INTO items (title) VALUES ($1)`, [item]);
    console.log(`Added To-Do Item: ${item}`);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).send("Error adding item. Please try again.");
  }
});

// Edit Item Route
app.post("/edit", async (req, res) => {
  const editedItem = req.body.updatedItemTitle;
  const editedId = req.body.updatedItemId;
  try {
    await db.query(`UPDATE items SET title = $1 WHERE id = $2`, [editedItem, editedId]);
    console.log(`Edited Item: ID - ${editedId}, Title - ${editedItem}`);
    res.redirect("/");
  } catch (error) {
    console.error("Error editing item:", error);
    res.status(500).send("Error editing item. Please try again.");
  }
});

// Delete Item Route
app.post("/delete", async (req, res) => {
  const deleteItem = req.body.deleteItemId;
  try {
    await db.query(`DELETE FROM items WHERE id = $1`, [deleteItem]);
    console.log(`Deleted Item ID: ${deleteItem}`);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Error deleting item. Please try again.");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
