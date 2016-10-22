const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');

app.get('/', (req,res)=>{
  res.render('login/login');
});
app.post('/', passport.authenticate('local', {
  successRedirect: './',
  failureRedirect: '/registration',
}));

module.exports=app;