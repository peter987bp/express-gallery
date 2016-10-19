var express = require('express');
var app = express();
var bp =  require('body-parser');
const pug = require('pug');

const pictures = require('./routes/pictures.js');
var db = require('./models');

app.use(bp.urlencoded({extended : true}));

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
