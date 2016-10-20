const express = require('express');
const app = express();
const bp =  require('body-parser');
const methodOverride = require('method-override');
const pictures = require('./routes/pictures.js');
const login = require('./routes/login.js');
const secret = require('./routes/secret.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require ('express-session');
const CONFIG = require('./config/config.json');
const db = require('./models');
const Picture = db.Picture;
const User = db.User;

app.use(bp.urlencoded({extended : true}));
app.use(methodOverride(function(req, res){
  //console.log('req.body_method: ', req.body._method);
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('view engine', 'pug');
app.set('views', './templates');
app.use(express.static('./public'));
app.use(methodOverride('_method'));  // must before the route
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
  User.findOne( { username: username})
  .then((user) =>{
    const isAuthenticated = (username === user.dataValues.username && password === user.dataValues.password);
    if(isAuthenticated){
      return done(null, user);
    }else{
      return done(null, flase);
    }
  })
  .catch((error)=>{
    return done('user not found', false);
  });
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
app.use('/gallery', pictures);
app.use('/login', login);
app.use('/secret', secret);
//routes for main page
app.get('/', function(req,res){
  Picture.findAll({
    limit: 4
  })
  .then((pictures)=> {
    let mainPicture = pictures.splice(0,1);
    let sidePictures = pictures;
    console.log('req.user: ', req.user);
    res.render('listing/index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures
    });
  });
});
app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});
