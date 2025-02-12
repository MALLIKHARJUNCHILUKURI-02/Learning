import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "Mallikharjun";
const yourPassword = "Cmkreddy@1432";
const yourAPIKey = "e85906af-dd1d-47b4-b571-2736937bc810";
const yourBearerToken = "70c57f2b-e646-4603-9695-27c83f2f2cb4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL+"/random");
    res.render("index.ejs", {content:JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth:{
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", {content:JSON.stringify(result.data)});
  } catch (error) {
      res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
     const result = await axios.get(API_URL + "/filter", {
    params:{
      score: 5,
      apiKey : yourAPIKey,
    },
  });
  res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {

  try {
      const result = await axios.get(API_URL + "/secrets/2", {
        headers: { 
          Authorization: `Bearer ${yourBearerToken}`, 
        },
      });
      res.render("index.ejs", {content: JSON.stringify(result.data)});  
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
