var express = require('express');
var app = express.Router();

var db = require('../models');


var Picture = db.Picture;

//---HOMEPAGE
app.get('/', function(req, res) {
  console.log('req.body: ', req.body);
  Picture.findAll({
    limit: 4
  })
    .then(function (pictures) {
      var mainPicture = pictures.splice(2,1);
      var sidePictures = pictures;
      res.render('listing/index', {
        mainPicture: mainPicture[0].dataValues,
        sidePictures: sidePictures
      });
    });
});


module.exports= app;