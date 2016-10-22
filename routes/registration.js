const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');
const User = db.User;

app.get('/', (req,res)=>{
  res.render('registration/registration');
});

//UPDATE DATABASE WITH ENTERED FIELDS.
//no two of the same users..
//ALSO AUTHENICATE
app.post('/', (req, res) => {
  User.create(
   {
     username: req.body.username,
     password: req.body.password
   })
  .then(() => {
    //render them to the add photo page.
    res.redirect('/login');
  });
});

module.exports=app;