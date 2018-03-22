'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('picture',  {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '/'
      },
      user_id: {
        type: INTEGER,
        references: {
          // This is a reference to another model
          model: "user",
          // This is the column name of the referenced model
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('picture')
  }
};
