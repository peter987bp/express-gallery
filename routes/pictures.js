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
  Picture.create({ author: req.body.author, link: req.body.link, description: req.body.description, title: req.body.title})
    .then(function (user) {
      res.json(user);
    });
});
// ------ NEW
app.get('/new', function(req, res) {
  //Picture.findById(req.params.id)
  res.render('new', {
    routeOf,
    headline: 'Adding a picture to the gallery',
    userName,
    author:'',
    title:'',
    link:'',
    description:''
  }); // eof res.render
});
app.post('/new', function (req, res) {
  Picture.create({
                                author: req.body.author,
                                link: req.body.link,
                                description: req.body.description,
                                title: req.body.title
                              })
  .then((data) => {
    //console.log("data", data.dataValues.id);
    res.redirect(`/gallery/${data.dataValues.id}`);
  });
});
//-------BY ID
app.get('/:id', function(req,res){
  Picture.findById(req.params.id)
    .then(function (pictures) {
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
  Picture.update({author: req.body.author, link:req.body.link, description: req.body.description, title: req.body.title},{where: { id: req.params.id}})
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