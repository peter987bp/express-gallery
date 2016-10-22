const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

app.get('/', function(req,res){
  Picture.findAll({
    limit: 5
  })
  .then((pictures)=> {
    let mainPicture = pictures.splice(0,1);
    let sidePictures = pictures;
    res.render('index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures
    });
  });

});
app.get('/logout', (req, res) =>{
  req.logout('/');
  res.redirect('/');
});

module.exports= app;