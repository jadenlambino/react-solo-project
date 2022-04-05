'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Comments.associate = function(models) {
    Comments.belongsTo(models.User, {foreignKey: 'userId'});
    Comments.belongsTo(models.Comments, {foreignKey: 'articleId'})
  };
  return Comments;
};
