'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'test',
      password : '$2a$10$6U6ntBEe0hWholjVyaluhuT7giwoy7LgTW5DvJz.yPF0AN8awmtX6',
      user_role: 'admin',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      username : 'test2',
      password : '$2a$10$6U6ntBEe0hWholjVyaluhuT7giwoy7LgTW5DvJz.yPF0AN8awmtX6',
      user_role: 'user',
      createdAt : new Date(),
      updatedAt : new Date()
    }

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
