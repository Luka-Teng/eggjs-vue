'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const { TEXT } = Sequelize
    await queryInterface.changeColumn('post', 'content', {
        type: TEXT,
        defaultValue: ''
    })
  },

  down: async function (queryInterface, Sequelize) {
    const { STRING } = Sequelize
    await queryInterface.changeColumn('post', 'content', {
        type: STRING(1000),
        defaultValue: ''
    })
  }
};
