const express = require('express');
const app = express();
const bp =  require('body-parser');
const methodOverride = require('method-override');
const gallery = require('./routes/gallery.js');
const login = require('./routes/login.js');
const registration = require('./routes/registration.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require ('express-session');
const bcrypt = require('bcrypt');
const CONFIG = require('./config/config.json');
const db = require('./models');
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
//---------------LOGIN-------------------
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) =>{
  User.findOne( {where: { username: username} })
  .then((user) =>{
    bcrypt.compare(password, user.password, (err, res)=>{
      console.log('result: ', res);
      const isAuthenticated = (username === user.dataValues.username && res === true);
      if(isAuthenticated){
        return done(null, user);
      }else{
        return done(null, false);
      }
    });
  })
  .catch((error)=>{
    return done('user not found', false);
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
    return res.redirect('login');
  }
  return next();
};

app.use('/gallery', gallery);
app.use('/login', login);
app.use('/registration', registration);

app.get('/', function(req,res){
  Picture.findAll({
    limit: 5
  })
  .then((pictures)=> {
    let mainPicture = pictures.splice(0,1);
    let sidePictures = pictures;
    res.render('index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures
    });
  });

});
app.get('/logout', (req, res) =>{
  req.logout('/');
  res.redirect('/');
});
app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});
