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
      link : 'http://dentalvisit.co.uk/admin_uploads/why_hungary/castle_district.jpg',
      description: 'look how happy he is',
      title : 'cute',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Ttutti Frutti',
      link : 'http://abouthungary.net/wp-content/uploads/2013/06/hungary.jpg',
      description: 'I am the boss around',
      title : 'serious',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Marta',
      link : 'http://s1.1zoom.net/big0/196/429632-Kycb.jpg',
      description: 'my favorite dog forever',
      title : 'strong',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Marta',
      link : 'http://s1.1zoom.net/big0/823/Hungary_Budapest_Castles_484265.jpg',
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
