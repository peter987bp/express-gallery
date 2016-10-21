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
        // associations can be defined here
        // Picture.belongsTo(models.User);
      }
    }
  });
  return Picture;
};