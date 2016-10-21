const express = require('express');
const app = express.Router();
const db = require('../models');
const Picture = db.Picture;

//---GallerybyID
app.get('/:id', (req,res)=>{
  Picture.findAll({
     limit: 3,
     order: [['createdAt', 'DESC']]
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
  //if user is logged in they can delete
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
  Picture.findById(req.params.id)
    .then((pictures) => {
    res.render('gallery/picture_id_edit', {
      pictures: pictures
    });
  });
});
app.put('/:id/edit',(req,res)=> {
  //Check if user belongs to the id being updated
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