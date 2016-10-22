const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

//---GallerybyID
app.get('/:id', (req,res)=>{
  Picture.findAll({
     limit: 3,
     where:  {id: {$ne:req.params.id}},
     order: [['createdAt', 'DESC']],
   })
  .then((sidePictures)=>{
    Picture.findById(req.params.id)
    .then((mainPicture)=> {
      let isLoggedIn = false;
      if(typeof req.user !== 'undefined'){
        if(req.user.id === mainPicture.userID){
          isLoggedIn = true;
        }
      }
      console.log('sidePictures: ', sidePictures);
      console.log('isLoggedIn: ', isLoggedIn);
      res.render('gallery/gallery', {
        mainPicture: mainPicture,
        isLoggedIn: isLoggedIn,
        sidePictures: sidePictures
      });
    });
  });
});
app.get('/new',(req, res)=> {
    if(typeof req.user !== 'undefined'){
      res.render('gallery/new', {
        author:'',
        title:'',
        link:'',
        description:''
      });
    }else{
      res.redirect('/login');
    }

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

//-------BY ID/edit
app.get('/:id/edit',(req,res) =>{
  //if logged in cant go to edit
  if(typeof req.user !== 'undefined'){
    Picture.findById(req.params.id)
      .then((pictures) => {
        res.render('gallery/picture_id_edit', {
        pictures: pictures
        });
      });
    }else{
      res.redirect('/login');
    }
});
app.put('/:id/edit',(req,res)=> {
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