module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.User);
      }
    }
  });

  return Picture;
};