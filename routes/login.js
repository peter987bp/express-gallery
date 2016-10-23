const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');

// console.log(req.flash('error'));
  //this message is firing on every page load
  //no username/password at all => { error: [ 'Missing credentials' ] }

  //BAD username but no password enter => @|##### { error: [ 'Missing credentials', 'Missing credentials' ] }

  //but if you enter a BAD username and BAD password => null

  //if you a enter a real user but no password =>
   // @|##### { error:
   // [ 'Missing credentials',
   //   'Missing credentials',
   //   'Missing credentials' ] }

  //if you enter a real user and BAD password
  //Redirct fire and console log =>
  //result:  false
  //password didnt match

app.get('/', (req,res)=>{
  console.log('@|#####', req.session.flash);
  console.log('@|poodles', req.flash('error')[0]);
  res.render('login/login');
});

app.post('/', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = app