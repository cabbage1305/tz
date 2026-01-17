const express = require('express');

const router = express.Router();

// Все статьи(домашняя страница)
router.get('/', (req, res) => {
    Article.find()
      .then((result) => {
          res.render('index', { title: 'Все статьи', articles: result })
      })
      .catch((err) =>{
        console.log(err);
      })
})
// Добавление статьи
router.get('/create', (req,res) =>{
  res.render('create', { title: 'Добавить новую статью'});
})

router.post('/', (req,res) => {
  const article = new Article(req.body);

  article.save()
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
  Article.findById(id)
    .then(result => {
      res.render('details', {article: result, title: 'Содержание статьи'})
    })
    .catch(err => {
      console.log(err);
    });
})
// Удаление статьи
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Article.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/articles' })
    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router;