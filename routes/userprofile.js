const express = require('express');
const app = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.User;
const Picture = db.Picture;

app.get('/', (req,res)=>{
  console.log('req.user: ', req.user);
  if(typeof req.user !== 'undefined'){
    Picture.findAll({where: {userID: req.user.id} })
      .then((pictures) => {
        res.render('userprofile/userprofile', {
        sidePictures: pictures
        });
      });
    }else{
      res.redirect('/error/403');
    }
});




module.exports=app;