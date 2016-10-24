const express = require('express');
const app = express.Router();
const db = require('../models');
const passport = require('passport');

app.get('/', (req,res)=>{
  //save to variable
  let flashMessage = req.flash('error')[0];
  console.log('flashmessage: ', flashMessage);
  let errorMessage = false;
  if(typeof flashmessage === 'undefined'){
    errorMessage = false;
  }else{
    errorMessage = true;
  }
  console.log('errorMessage: ', errorMessage);
    res.render('login/login', {
      flashMessage: flashMessage,
      errorMessage: errorMessage
    });
});



module.exports = app;