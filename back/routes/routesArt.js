const express = require('express');
const router = express.Router();
const Article = require('../models/artModel.js');


// Все статьи(домашняя страница)
router.get('/', (req, res) => {
    Article.findAll()
      .then((result) => {
          res.status(200).json({ title: 'Все статьи', articles: result })
      })
      .catch((err) =>{
        console.log(err);
      })
})
// Добавление статьи
router.get('/create', (req,res) =>{
  res.status(200).json({ title: 'Добавить новую статью'});
})

router.post('/', (req,res) => {
  const artname = req.body.name;
  const artcontent = req.body.content;
  Article.create({
    name: artname,
    content: artcontent
  })
    .then((result) => {
      res.redirect('/articles');
    })
    .catch((err) => {
      console.log(err);
    })
})
// Просмотр статьи
router.get('/:id', (req,res) =>{
  const id =req.params.id;
  Article.findByPK(id)
    .then(result => {
      res.status(200).json( {article: result, title: 'Содержание статьи'})
    })
    .catch(err => {
      console.log(err);
    });
})
//обновление статьи
router.put('/', (req,res) =>{
  const id = req.params.id;
  const artname = req.body.name;
  const artcontent = req.body.content;

  Article.update({
    name: artname,
    content: artcontent
  },{ where: {
    article_id: id
  }
  })
  .then(result => {
    res.json({redirect: '/articles'})
  })
  .catch(err => {
    console.log(err);
  })
})

// Удаление статьи
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where:{ article_id: id}
  })
    .then(result => {
      res.json({ redirect: '/articles' })
    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router;