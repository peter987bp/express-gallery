var express = require('express');
var app = express.Router();

var db = require('../models');


var Picture = db.Picture;

const routeOf = 'pictures';
const userName = 'userName';
//---HOMEPAGE
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
//-------BY ID
app.get('/:id', function(req,res){
  Picture.findById(req.params.id)
    .then(function (pictures) {
    console.log('pictures: ', pictures);
    res.render('picture_id', {
      pictures: pictures,
      routeOf,
      headline: 'headline',
      listType: 'listType',
      userName
    });
  });

});

//-------BY ID/edit
app.get('/:id/edit',(req,res) =>{
  Picture.findById(req.params.id)
    .then(function (pictures) {
    res.render('picture_id_edit', {
      pictures: pictures,
      routeOf,
      headline: 'headline',
      listType: 'listType',
      userName
    });
  });
});
app.put('/:id/edit',(req,res)=> {
  console.log('req.body: ', req.body);
  console.log('req.body.id: ', req.body.id);
  Picture.update({title: req.body.title, url:req.body.url, rating: req.body.rating},{where: { id: req.params.id}})
  .then((pictures)=>{
    res.redirect(`/gallery/${req.params.id}/edit`);
  });
});


//Make to delete by id
app.delete('/:id/edit', function(req, res) {
  Picture.destroy({where: {title: req.body.title} })
    .then(function (users) {
      res.redirect(`/gallery`);
    });

});

module.exports= app;