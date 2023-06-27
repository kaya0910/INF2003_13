require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const mysql = require("mysql");
const app = express();

//Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "joe",
  password: "password",
  database: "happiness_index",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

const jwt = require("jsonwebtoken");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const port = 3005;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Get users
app.get("/users", (req, res) => {
  fs.readFile("data/users.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// Get update user
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log({ id, ...req.body });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);
});

// Get survey questions
app.get("/survey_questions", (req, res) => {
  fs.readFile("data/surveyQuestions.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(data);
  });
});

app.delete("/survey_questions/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
});

app.put("/survey_questions/:id", (req, res) => {
  const id = req.params.id;
  console.log("received data to update from" + id);
});

// Get Happiness Level By GDP
app.get("/byGDP", (req, res) => {
  fs.readFile("data/HS_vs_GDP.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // Rearrange GDP ascending order
    const sortedData = jsonData.sort(
      (a, b) => a["Economy (GDP per Capita)"] - b["Economy (GDP per Capita)"]
    );

    res.json(sortedData);
  });
});

// Get Happines Level By Region
app.get("/byRegion", (req, res) => {
  fs.readFile("data/HPLvlByRegion.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get("/", (req, res) => {
  fs.readFile("data/2015.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.post("/survey", (req, res) => {
  const data = req.body;

  console.log(data);

  // Save data to a JSON file
  fs.writeFile("./surveyData.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving survey data:", err);
      res.status(500).json({ error: "Error saving survey data" });
    } else {
      console.log("Survey data saved successfully");
      res.status(200).json({ message: "Survey data saved successfully" });
    }
  });
});

app.post("/register", (req, res) => {
  const data = req.body;

  console.log(data);
});

app.post("/editsurvey", (req, res) => {
  const data = req.body;
});

// app.get("/testing", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.username));
// });

// app.post("/login", (req, res) => {
//   // to serialise user object
//   const user = { username: username };

//   // requires user object and secret key
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userObj) => {
//     if (err) return res.sendStatus(403);
//     req.user = userObj;
//     next();
//   });
// }

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
