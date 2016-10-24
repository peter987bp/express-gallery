const express = require('express');
const app = express();
const bp =  require('body-parser');
const methodOverride = require('method-override');
const gallery = require('./routes/gallery.js');
const login = require('./routes/login.js');
const registration = require('./routes/registration.js');
const userprofile = require('./routes/userprofile.js');
const router = require('./routes/router.js');
const errorPages = require('./routes/error.js');
const admin = require('./routes/admin.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require ('express-session');
const bcrypt = require('bcrypt');
const CONFIG = require('./config/config.json');
const db = require('./models');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const Picture = db.Picture;
const User = db.User;



const RedisStore = require('connect-redis')(session);
app.use(bp.urlencoded({extended : true}));

app.use(methodOverride(function(req, res){
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
app.use(methodOverride('_method'));

//-------Flash middleware
app.use(cookieParser('keyboard cat'));

//---------------LOGIN-------------------
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) =>{
  User.findOne( { where: { username: username } })
    .then((user) =>{

      if (user !== null) {
        bcrypt.compare(password, user.password, (err, matchingPasswords) => {
          console.log('result: ', matchingPasswords);
          console.log('user.password: ', user.password);
          const isAuthenticated = (username === user.dataValues.username && matchingPasswords === true);

          if(matchingPasswords){
            delete user.dataValues.password;
            return done(null, user, {message: "username or password not found"});
          } else {
            return done(null, false, {message: "username or password not found"});
          }
        });
      } else {
        return done(null, false, {message: "username or password not found"});
      }
    })
    .catch((error)=>{

      console.log('error: ', error);
      return done('quser not found', false);

    });
}));

passport.serializeUser((user,done) =>{
  return done(null, user);
});
passport.deserializeUser((user,done) =>{
  return done(null, user);
});

const isAuthenticated = (req, res, next) =>{
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
};

app.use('/gallery', gallery);
app.use('/login', login);
app.use('/registration', registration);
app.use('/error', errorPages);
app.use('/userprofile', userprofile);
app.use('/admin', admin);
app.use('/', router);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;