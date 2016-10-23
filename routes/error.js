const express = require('express');
const app = express.Router();

app.get('/404', (req, res) =>{
  res.render('error/404');
});

app.get('/403', (req, res) =>{
  res.render('error/403');
});

module.exports= app;