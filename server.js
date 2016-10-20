const express = require('express');
const app = express();
const bp =  require('body-parser');

const methodOverride = require('method-override');
//update readme!!!!! delete cache

const pictures = require('./routes/pictures.js');
const listings = require('./routes/listing.js');
const login = require('./routes/login.js');
const secret = require('./routes/secret.js');

const db = require('./models');
const Picture = db.Picture;

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
app.use('/gallery', pictures);
app.use('/listing', listings);
app.use('/login', login);
app.use('/secret', secret);



//routes for main page
app.get('/', function(req,res){
  res.render('index',{
    pictures: pictures
  });
});

app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});
