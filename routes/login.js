const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');
const USER = db.User;

app.get('/', (req,res)=>{
  res.render('login/login');
});

app.post('/', passport.authenticate('local', {
  successRedirect: './',
  failureRedirect: '/login',
}));

module.exports=app;