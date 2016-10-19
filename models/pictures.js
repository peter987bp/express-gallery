'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pictures = sequelize.define('Pictures', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pictures;
};