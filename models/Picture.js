module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Picture;
};