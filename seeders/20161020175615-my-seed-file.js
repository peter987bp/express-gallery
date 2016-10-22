'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'test',
      password : 'password',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'test2',
      password : 'password',
      createdAt : new Date(),
      updatedAt : new Date()
    }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
