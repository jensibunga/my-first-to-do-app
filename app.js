var express = require('express');
var todoController = require('./controllers/todoController');

var app= express();

app.set('view engine', 'ejs');//set up template engine

// http://127.0.0.1:3000/assets/styles.css -> project_direcotory/public/assets/styles.css
app.use('/assets', express.static('./public/assets'));//static files ('./public')=> means the current directory.

todoController(app);//fire controllers

app.listen(process.env.PORT || 5000);
console.log('You are listening to port 3000');