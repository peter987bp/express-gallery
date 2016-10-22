'use strict';
module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define('Picture', {
    author: DataTypes.STRING,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // Picture.belongsTo(models.User);
        // Please refer to migration
      }
    }
  });
  return Picture;
};