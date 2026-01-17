const Sequelize = require('sequelize');
const express = require('express');
const artRoutes = require('./routes/routesArt'); // CDUR for articles

// определение объекта 
const sequelize = new Sequelize("name", "пользователь", "пароль", {
  dialect: "postgres",
  host: "localhost"
});




// Метод определения зависимости моделей
//Article.hasMany(Comments);

// express app
const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) =>{
    res.redirect('/articles');
})
app.use('/articles', artRoutes);

app.use((req,res) => {
  res.status(404).render('404', {title: '404'});
});
