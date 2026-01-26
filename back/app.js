const { Article, Comments } = require("./models/artModel.js");
const { Op } = require("sequelize");
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

app.get("/analytic/comments/", (req, res) => {
  const date1 = req.query.dateFrom;
  const date2 = req.query.dateTo;
  if (!date1 || typeof date1 != "string") {
    res.status(400).json({ message: "invalid datefrom format" });
    return;
  }
  if (!date2 || typeof date2 != "string") {
    res.status(400).json({ message: "invalid dateto format" });
    return;
  }
  Article.findAll({
    include: [
      {
        model: Comments,
        where: { createdAt: { [Op.between]: [date1, date2] } },
        required: true,
      },
    ],
  })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.use((req, res) => {
  res.status(404).json();
});
