const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = 3005;

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
  fs.writeFile("surveyData.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving survey data:", err);
      res.status(500).json({ error: "Error saving survey data" });
    } else {
      console.log("Survey data saved successfully");
      res.status(200).json({ message: "Survey data saved successfully" });
    }
  });

  
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
