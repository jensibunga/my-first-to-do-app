var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to the database
mongoose.connect("mongodb://78438952427:JT4wGRYz2WjQu2W9rKjq6cw2Wt6Q@ds113098.mlab.com:13098/todolist");
//create a schema - this is like a blueprint

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne =Todo({item: 'buy flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// })





//var data = [{item: 'milk'}, {item:'walk dog'}, {item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function (app) {

  app.get('/todo', function (req, res) {//get data from mongodb and pass it to the view

    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });//view name
    });//specify which model you want to use
   
  });



  app.post('/todo', urlencodedParser, function (req, res) {// we need to get data from the view and add it to the mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
    
  });

  app.delete('/todo/:item', function (req, res) {//we need to delete the requested item from the mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
   
    
  });
  // data = data.filter(function (todo) {
    //   console.log(todo);
    //   console.log(req.params.item);

    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // console.log(data);
    // res.json(data);


};