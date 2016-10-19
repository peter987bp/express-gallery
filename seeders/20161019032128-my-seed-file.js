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
      title : 'cute',
      url : 'http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg',
      rating : '10',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      title : 'serious',
      url : 'https://en.wikipedia.org/wiki/Bulldog#/media/File:Ozbulldog.jpg',
      rating : '10',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      title : 'elegant',
      url : 'http://honeyandbeauty.com/wp-content/uploads/2015/09/Manuka-Honey-Benefits-For-Dogs-.jpg',
      rating : '10',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      title : 'funny',
      url : 'https://www.rover.com/blog/wp-content/uploads/2016/01/dangerous-foods-grapes.png',
      rating : '10',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      title : 'strong',
      url : 'https://en.wikipedia.org/wiki/Bulldog#/media/File:White-red_English_bulldog.jpg',
      rating : '10',
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
