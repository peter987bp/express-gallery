var express = require('express');
var app = express.Router();

var db = require('../models');


var Picture = db.Picture;

const routeOf = 'pictures';
const userName = 'userName';
//works
app.get('/', function(req, res) {
  Picture.findAll({
    limit: 4
  })

    .then(function (pictures) {
      console.log('pictures.title: ', pictures[0].url);
      // console.log('pictures: ', pictures);
      res.render('index', {
        pictures: pictures,
        routeOf,
        headline: 'headline',
        listType: 'listType',
        userName
      });
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