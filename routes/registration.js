const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = db.User;
const saltRounds= 10;

app.get('/', (req,res)=>{
  res.render('registration/registration');
});

//UPDATE DATABASE WITH ENTERED FIELDS.
//no two of the same users..
//ALSO AUTHENICATE
app.post('/', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt)=>{
   if (err) console.error(er);
  //use the salt to hash your password
    bcrypt.hash(req.body.password, salt, (err, hash)=>{
     if (err) console.error(er);
     //store your hash in your database
     console.log('hash: ', hash);
      User.create(
       {
         username: req.body.username,
         password: hash
       })
      .then((promise) => {
        console.log('promise: ', promise);
        //render them to the add photo page.
        res.redirect('/login');
      });
    });
  });
});


module.exports=app;