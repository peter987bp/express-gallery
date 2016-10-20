const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');
const USER = db.User;
//---HOMEPAGE

app.get('/', (req,res)=>{
  res.render('login/index');
});

app.post('/', passport.authenticate('local', {
  successRedirect: './',
  failureRedirect: '/login',
}));

app.get('/logout', (req, res) =>{
  req.logout(); //logs the user out - removes session form server and client
  res.redirect('/login'); //redirect user to the login page
});

module.exports=app;