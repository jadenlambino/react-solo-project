'use strict';
const data = require('../json/articleData.json');
const articles = [];

const stringCutter = (text) => {
  const count = 500
  let res = text.slice(0, count) + (text.length > count ? '' : '');
  return res
}

data.forEach(element => {
  articles.push({
    userId: element.userId,
    title: element.title,
    body: stringCutter(element.body),
    coverPhoto: element.coverPhoto,
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Articles', articles, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Articles', null, {});
  }
};
