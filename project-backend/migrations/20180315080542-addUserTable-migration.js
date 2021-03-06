'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('user',  {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(30),
        allowNull: false
      },
      age: {
        type: INTEGER,
        allowNull: false
      },
      email: {
        type: STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING(50),
        allowNull: false
      },
      created_at: {
        type: DATE
      },
      updated_at: {
        type: DATE
      }
    })
  },

  down: async function (queryInterface, Sequelize) {
      await queryInterface.dropTable('user')
  }
};
