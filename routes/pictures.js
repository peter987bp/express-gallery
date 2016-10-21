const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

//---HOMEPAGE
app.get('/', (req, res)=> {
  Picture.findAll({
    limit: 4
  })
  .then((pictures)=> {
    let mainPicture = pictures.splice(0,1);
    let sidePictures = pictures;
    res.render('gallery/index', {
      mainPicture: mainPicture[0].dataValues,
      sidePictures: sidePictures
    });
  });
});
app.get('/new',(req, res)=> {
  //Picture.findById(req.params.id)
  res.render('gallery/new', {
    author:'',
    title:'',
    link:'',
    description:''
  });
});
app.post('/new', (req, res) => {
  Picture.create(
   {
     author: req.body.author,
     link: req.body.link,
     description: req.body.description,
     title: req.body.title
   })
  .then((picture) => {
    res.render('gallery/new', {
      pictures: picture

    });
  });
});
//-------BY ID
app.get('/:id', (req,res)=> {
  let loggedInUser = req.user.id;
  //if user id matches photo id show edit/del.
  Picture.findById(req.params.id)
  .then(function (picture) {
    console.log('picture.id: ', picture.userID);
    let isLoggedIn = false;
    if(loggedInUser === picture.id){
      isLoggedIn = true;
    }
  console.log('isLoggedIn: ', isLoggedIn);
  //link a user to a photo
  //if a user should be allowed to edit

    res.render('gallery/picture_id', {
      picture: picture,
      isLoggedIn: isLoggedIn
    });
  });
});
//-------BY ID/edit
app.get('/:id/edit',(req,res) =>{
  Picture.findById(req.params.id)
    .then((pictures) => {
    res.render('gallery/picture_id_edit', {
      pictures: pictures
    });
  });
});
app.put('/:id/edit',(req,res)=> {
  //Check if user belongs to the id being updated
  // console.log('req.: ', req.);
  // console.log('req.body.userid: ', req.body.userid);
  Picture.update({author: req.body.author, link:req.body.link, description: req.body.description, title: req.body.title},{where: { id: req.params.id}})
  .then((pictures)=>{
    res.redirect(`/gallery/${req.params.id}/edit`);
  });
});
//Make to delete by id
app.delete('/:id/delete', (req, res) => {
  Picture.destroy({where: {id: req.params.id} })
  .then(() => {
    res.redirect(`/gallery`);
  });
});
module.exports= app;