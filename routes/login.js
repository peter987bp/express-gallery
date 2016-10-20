var express = require('express');
var app = express.Router();

var db = require('../models');

const CONFIG = require('../config/config.json');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require ('express-session');

var USER = db.User;

//---------------LOGIN-------------------
//Attach expression session as middleware and initialize handshake
app.use(session({
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Attach passport as middle and initialize
app.use(passport.initialize());
//Our app uses persistant login sessions
//so we need to tell express and passot to this use session midddleware
app.use(passport.session());

//LOGIN Use local strategy- this checks out DB in order to
//LOGIN authenticate our users.

//Data would but hookedup to a database in the real world.

//hitting a databse to look for database

passport.use(new LocalStrategy((username, password, done) =>{
  USER.findOne( {username: username})
    .then((user) =>{
      var userpassword = user.dataValues.PASSWORD;
      if(password === userpassword){
        //returing the user logging in.
  //We're authenicated!
  return done(null, user.dataValues);
      }
    })
    .catch((error)=>{
      console.log('error: ', error);
    });

  if(!isAuthenticated){//not authenticated
    return done(null, false); //NO error, credentials do not match

  }
  //We're authenicated


}));

//In order for persitant session to work - you must serialzie the user ot the request and then deserialize subsequent requests.

passport.serializeUser((user,done) =>{
  //user is passed in from local strategy
  //user is attached to the req.user
  return done(null, user);
});

passport.deserializeUser((user,done) =>{
  return done(null, user);
});

const isAuthenticated = (req, res, next) =>{
  //if user is NOT authenticated
  if(!req.isAuthenticated()){
    return res.redirect('login');
  }
  //if user is uathenticated - call next
  return next();
};


//---HOMEPAGE

app.get('/', (req,res)=>{
  res.render('login/index');
});

app.post('/', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login',
}));

app.get('/logout', (req, res) =>{
  req.logout(); //logs the user out - removes session form server and client
  res.redirect('/login'); //redirect user to the login page
});


module.exports= app;