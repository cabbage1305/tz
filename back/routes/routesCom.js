const express = require('express');
const router = express.Router();

const Comments = require('./models/artModel.js');

// router.get('/create', (req,res) =>{
//   res.status(200).json({ title: 'Добавить новый комментарий'});
// })

router.post('/', (req,res) => {
 
  Comments.create({
    text: "Контент пкомментария"
  })
    .then((result) => {
      //res.redirect('/Commentss');
    })
    .catch((err) => {
      console.log(err);
    })
})
// Просмотр комментария
router.get('/:id', (req,res) =>{
  const id =req.params.id;
  Comments.findByPK(id)
    .then(result => {
      res.status(200).json( {Comments: result, title: 'Содержание статьи'})
    })
    .catch(err => {
      console.log(err);
    });
})
//обновление комментария
router.patch('/', (req,res) =>{
  const id = req.params.id;
  const comscontent = req.body.text;

  Comments.update({
    text: comscontent
  },{ where: {
    Comments_id: id
  }
  })
  .then(result => {
    res.json({redirect: '/Commentss'})
  })
  .catch(err => {
    console.log(err);
  })
})

// Удаление комментария
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Comments.destroy({
    where: { Comments_id: id}
  })
    .then(result => {
      res.json({ redirect: '/Commentss' })
    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router;