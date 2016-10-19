var express = require('express');
var app = express();
var bp =  require('body-parser');
//const pug = require('pug');
const methodOverride = require('method-override');

const pictures = require('./routes/pictures.js');
var db = require('./models');

app.use(bp.urlencoded({extended : true}));

app.use(methodOverride(function(req, res){
  console.log('req.body_method: ', req.body._method);
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

var Picture = db.Picture;

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static('./public'));

app.use('/gallery', pictures);

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
