const { Article } = require("./models/artModel.js");
const express = require("express");
const cors = require("cors");
const artRoutes = require("./routes/routesArt.js"); // CDUR for articles
// const comRoutes = require("./routes/routesCom.js");
const myDB = require("./db.js");
myDB.authenticate();

// express app
const app = express();
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.listen(3000);

app.get("/articles", (req, res) => {
  Article.findAll()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.use("/article", artRoutes);

app.use((req, res) => {
  res.status(404).json();
});
