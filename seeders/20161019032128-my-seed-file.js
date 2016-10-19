'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Pictures', [{
      author : 'Ttutti Frutti',
      link : 'http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg',
      description: 'look how happy he is',
      title : 'cute',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Ttutti Frutti',
      link : 'https://en.wikipedia.org/wiki/Bulldog#/media/File:Ozbulldog.jpg',
      description: 'I am the boss around',
      title : 'serious',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'GoodMan',
      link : 'http://honeyandbeauty.com/wp-content/uploads/2015/09/Manuka-Honey-Benefits-For-Dogs-.jpg',
      description: 'my friends are humans',
      title : 'elegant',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'GoodMan',
      link : 'https://www.rover.com/blog/wp-content/uploads/2016/01/dangerous-foods-grapes.png',
      description: 'i do not remember',
      title : 'funny',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Marta',
      link : 'https://en.wikipedia.org/wiki/Bulldog#/media/File:White-red_English_bulldog.jpg',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date()
    }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
