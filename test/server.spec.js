const request = require('supertest');
const Chai = require('chai');
const Dom =  require('jsdom');
const Server = require('../server.js');

const Expect = Chai.expect;

console.log('server', Server);

describe('Home route', function(){
  it('GET/ home page', (done) =>{
    request(Server)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        //console.log('RESPONSE', res.res.headers);
        if (err) {
          return done(err);
        } else {
          done();
        }
      })
    ;
  });  //eof it

  it('GET/* home page', (done) =>{
    request(Server)
      .get('/*')
      .expect(404)
      .end(function(err, res) {
        //console.log('RES STATUS', res.status);
        if (err) {
          return done(err);
        } else {
          done();
        }
      })
    ;
  });  //eof it

  it('GET/gallery/id clicked on a picture in home page', (done) =>{
    request(Server)
      .get('/gallery/1')
      .expect((res) => {
        //console.log('location', res.header.location);
        //console.log('RESPONS text', res.text); // the html
      })
      .expect(200)
      .end(function(err, res) {
        //console.log('RESPONSE', res);
        if (err) {
          return done(err);
        } else {
          done();
        }
      })
    ;
  });  //eof it

  it('GET/login', (done) =>{
    request(Server)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      })
    ;
  });  //eof it

  it('POST/login good', (done) =>{
      request(Server)
        .post('/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('username=test&password=password')
        .expect(302)
        .expect('location', '/')
        .end(function(err, res) {
          //console.log('RESPONSE header ', res.header);
          if (err) {
            return done(err);
          } else {
            done();
          }
        })
      ;
    });  //eof it

  it('POST/login wrong', (done) =>{
      request(Server)
        .post('/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('username=test&password=hoppa')
        .expect(302)
        .expect('location', '/registration')
        .end(function(err, res) {
          //console.log('RESPONSE res.header', res.header);
          if (err) {
            return done(err);
          } else {
            done();
          }
        })
      ;
    });  //eof it

  it('PUT/gallery/id/edit', (done) =>{
    let editAuthor = 'Mamma+Mia';
    let editTitle = 'lovely';
      request(Server)
        .put('/gallery/1/edit')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(`author=${editAuthor}&link=http%3A%2F%2Fwww.chateau-amboise.com%2FoktThemes%2Fp-c094-01%2Fimages%2Fchateau_amboise_accueil.jpg&description=look+how+happy+he+is&title=lovely`)
        .expect('location', '/gallery/1/edit')
        .expect(302);
      request(Server)
        .get('/gallery/1')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          let htmlBody = res.text;
          //console.log('RESPONSE GET back header ', res.header);
          //console.log('RESPONSE GET back res.text', res.text);
          Dom.env(res.text, (err, window)=>{
            let findElement = window.document.querySelectorAll('.galleryMarginMainPicture');
            Expect(window.document.querySelector('#galleryTitleName').innerHTML).to.be.equal(editTitle);
            done();
          })// eof jsdom.env
      }); //eof nested request
    });  //eof it

});

