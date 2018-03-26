'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;
    // 创建tag表
    await queryInterface.createTable('tag',  {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_name: {
        type: STRING(30),
        allowNull: false,
        unique: true,
        defaultValue: 'default'
      },
      created_at: {
        type: DATE
      },
      updated_at: {
        type: DATE
      }
    })
    // 添加列给picture
    await queryInterface.addColumn('picture', 'tag_name', {
      type: STRING(30),
      defaultValue: 'default'
    })
    // 添加外键
    await queryInterface.addConstraint('picture', ['tag_name'], {
      type: 'foreign key',
      name: 'picture_ref_tag',
      references: {
        // This is a reference to another model
        table: "tag",
        // This is the column name of the referenced model
        field: 'tag_name',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
    // tag表添加列 default
    await queryInterface.bulkInsert('tag', [{
      tag_name: 'default',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tag', {
        tag_name: 'default'
    })
    await queryInterface.removeConstraint('picture', 'picture_ref_tag')
    await queryInterface.removeColumn('picture', 'tag_name')
    await queryInterface.dropTable('tag')
  }
};
