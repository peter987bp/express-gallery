const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

const isAuthenticated = (req, res, next) =>{
  if(!req.isAuthenticated()){
    return res.redirect('login');
  }
  return next();
};
//---HOMEPAGE
app.get('/secret', isAuthenticated, (req, res) =>{
  res.render('secret');
});

module.exports= app;