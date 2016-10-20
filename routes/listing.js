const express = require('express');
const app = express.Router();

const db = require('../models');


const Picture = db.Picture;

//---HOMEPAGE
app.get('/', function(req, res) {
  Picture.findAll({
    limit: 4
  })
  .then(function (pictures) {
    let mainPicture = pictures.splice(2,1);
    let sidePictures = pictures;
    res.render('listing/index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures
    });
  });
});

module.exports= app;