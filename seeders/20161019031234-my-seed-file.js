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
    return queryInterface.bulkInsert('Users', [{
      first_name : 'Bryan',
      last_name : 'Peters',
      email : 'bb@test.com',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      first_name : 'Marta',
      last_name : 'Eden',
      email : 'me@test.com',
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
