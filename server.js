var express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

var app = express();

app.set('view engine', 'pug');
app.set('views', './templates');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

var db = require('./models');
const User = db.User;
const Picture = db.Picture;
const Task = db.Task;
//console.log("db:", db);

//these are going to gallery.js with server methods
const routeOf = 'pictures';
const userName = 'Marta';

app.post('/users', (req, res) =>{
  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  })
  .then((data) =>{
    res.json({data});
  });
});

app.get('/users', (req,res) =>{
  User.findAll()
  .then((data) =>{
    res.json({data});
  });
});

app.post('/tasks', (req,res) =>{
  Task.create({
    title: req.body.title,
    priority: req.body.priority
  })
  .then((data) =>{
    res.json({data});
  });
});

app.get('/tasks', (req,res) =>{
  Task.findAll()
  .then((data) =>{
    res.json({data});
  });
});

// result can be more {}, means a list, this like a search
app.get('/picture/:id/edit', (req,res) =>{
  Picture.findById(req.body.title)
  .then((data) =>{
    res.json({data});
  });
});
app.post('/picture/:/id/edit', (req,res) =>{
  Picture.create({
    name: req.body.name,
    title: req.body.title,
    url: req.body.url
  })
  .then((data) =>{
      res.render('index', {
      routeOf,
      listType: `List of all pictures you've posted`,
      username,
      headline: 'Photo Gallery',
      collection: Picture.findAll()

  //   res.json({data});
  // });
      }); //eof res.render
    });
}); //eof then

app.get('/pictures', (req,res) =>{
  Picture.findAll()
  .then((data) =>{
    console.log('dataValues', data[0].dataValues);
    let collection = data;
    console.log('collection', collection.keys);
    res.render('index', {
      routeOf,
      listType: `List of all pictures you've posted`,
      userName,
      headline: 'Photo Gallery',
      collection: collection
    }); //eof res.render
    //res.json((data)); // result: [{},...{}]
  }); // eof then
});

app.post('/picture/new', (req,res) =>{
  Picture.create({
    name: req.body.name,
    title: req.body.title,
    url: req.body.url
  })
  .then((data) =>{
      res.render('new', {
      routeOf,
      listType: `Add a new picture to your gallery`,
      username,
      headline: 'Photo Gallery',
      collection: Picture.findAll()

  //   res.json({data});
  // });
      });
    });
}); //eof res.render




app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});  // ez azt csinalja hogy meghija a sequeile