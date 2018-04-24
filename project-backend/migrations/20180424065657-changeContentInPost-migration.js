'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize
    await queryInterface.changeColumn('post', 'content', {
        type: STRING(65535),
        defaultValue: ''
    })
  },

  down: async function (queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize
    await queryInterface.changeColumn('post', 'content', {
        type: STRING(1000),
        defaultValue: ''
    })
  }
};
