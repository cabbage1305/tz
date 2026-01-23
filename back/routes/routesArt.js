const express = require("express");
const router = express.Router();
const { Article } = require("../models/artModel.js");

// Добавление статьи
router.post("/", (req, res) => {
  const artname = req.body.name;
  const artcontent = req.body.content;
  if (!artname) {
    res.status(400).json({ message: "name can not be empty" });
    return;
  }
  if (!artcontent) {
    res.status(400).json({ message: "content can not be empty" });
    return;
  }
  Article.create({
    name: artname,
    content: artcontent,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json({ id: result.dataValues.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

// Просмотр статьи
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Article.findByPk(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});
//обновление статьи
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const artname = req.body.name;
  const artcontent = req.body.content;
  if (!artname) {
    res.status(400).json({ message: "name can not be empty" });
    return;
  }
  if (!artcontent) {
    res.status(400).json({ message: "content can not be empty" });
    return;
  }
  Article.update(
    {
      name: artname,
      content: artcontent,
    },
    {
      where: {
        id,
      },
    },
  )
    .then((result) => {
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

// Удаление статьи
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id },
  })
    .then((result) => {
      res.status(204).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

module.exports = router;
