'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    coverPhoto: DataTypes.STRING
  }, {});
  Articles.associate = function(models) {
    Articles.belongsTo(models.User, { foreignKey: 'userId'});
    Articles.hasMany(models.Comments, { foreignKey: 'articleId'})
  };
  return Articles;
};
