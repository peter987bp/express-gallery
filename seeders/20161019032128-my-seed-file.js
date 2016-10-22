'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Pictures', [{
      author : 'Ttutti Frutti',
      link : 'https://s-media-cache-ak0.pinimg.com/originals/e3/fa/1e/e3fa1eed9395e0ad991d36fb41e0bda5.jpg',
      description: 'look how happy he is',
      title : 'cute',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '1'
    }, {
      author : 'Ttutti Frutti',
      link : 'http://gotohungary.com/documents/13008/2158114/esztergom8+600x400+distant.jpg/bb7c0873-43c7-4e7d-8981-b7dc26d48303?t=1427461477742',
      description: 'I am the boss around',
      title : 'serious',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '1'
    }, {
      author : 'Marta',
      link : 'https://progressiveproductions.hu/file/pproductions/image/thumbloc1-film-location-hungary-castles-26.jpg',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '2'
    }, {
      author : 'Marta',
      link : 'http://getasword.com/blog/wp-content/uploads/2015/02/bran-castle-romania.jpg',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '2'
    },
    {
      author : 'Marta',
      link : 'http://alynedewinter.com/wp-content/uploads/2012/08/Castle_Hill_in_Budapest_Hungary.png',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '1'
    },
    {
      author : 'Marta',
      link : 'https://cdn.european-traveler.com/wp-content/uploads/2012/06/Schloss-Oberhofen-Castle-on-Lake-Thun19-e1466417487264.jpg',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date(),
      userID: '1'
    }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pictures', null, {});
  }
};
