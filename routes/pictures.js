var express = require('express');
var app = express.Router();
var bp =  require('body-parser');

var db = require('../models');

app.use(bp.urlencoded({extended : true}));

var Picture = db.Picture;

//works
app.get('/', function(req, res) {
  Picture.findAll()
    .then(function (users) {
      res.json(users);
    });
});
//works
app.post('/', function (req, res) {
  Picture.create({ title: req.body.title, url: req.body.url, rating: req.body.rating})
    .then(function (user) {
      res.json(user);
    });
});


app.put('/:id', function(req,res) {
      Picture.update({title: req.body.title, url:req.body.url, rating: req.body.rating},{where: { id: req.params.id}});
});


//Make to delete by id
app.delete('/:id', function(req, res) {
  Picture.destroy({where: {title: req.body.title} })
    .then(function (users) {
      res.json(users);
    });

});

module.exports= app;