const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

app.get('/', function(req,res){
  console.log('req.user: ', req.user);
  Picture.findAll({
    limit: 5
  })
  .then((pictures)=> {

    let mainPicture = pictures.splice(0,1);
    let sidePictures = pictures;
    let isLoggedIn = false;
      if(typeof req.user !== 'undefined'){
          isLoggedIn = true;
      }
    console.log('isLoggedIn: ', isLoggedIn);
    res.render('index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures,
      isLoggedIn: isLoggedIn
    });
  });

});
app.get('/logout', (req, res) =>{
  req.logout('/');
  res.redirect('/');
});

app.get('/*', (req, res) =>{
  res.redirect('/error/404');
});

module.exports= app;