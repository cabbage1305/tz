const Sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");
const artRoutes = require("./routes/routesArt.js"); // CDUR for articles
// const comRoutes = require("./routes/routesCom.js");
const myDB = require("./db.js");
myDB.authenticate()

// express app
const app = express();
app.use(cors());

app.use(express.urlencoded());

app.listen(3000);

app.get("/", (req, res) => {
  res.redirect("/articles");
});
app.use("/articles", artRoutes);

app.get("/article/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  setTimeout(
    () =>
      res.status(200).json({
        id: articleId,
        title: `Article${articleId}fromserver`,
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat nemo eveniet odit laborum, illum reprehenderit officia a et corporis esse commodi sapiente veritatis aliquid ipsum sint nihil eius quam veniam.",
      }),
    3000,
  );
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
