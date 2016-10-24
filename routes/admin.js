const express = require('express');
const app = express.Router();
const passport = require('passport');
const db = require('../models');
const Picture = db.Picture;

app.get('/', (req,res)=>{
  Picture.findAll()
  .then((pictures) =>{
    if(typeof req.user !== 'undefined'){
      res.render('admin/admin', {
        pictures: pictures
      });
    }else{
      res.redirect('/error/403');
    }
  });


});



module.exports=app;

