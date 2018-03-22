module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Tag = app.model.define('tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: STRING(30),
      allowNull: false,
      unique: true,
      defaultValue: 'default',
      validate: {
        isIn: [['default']]
      }
    }
  }, {
    freezeTableName: true,
    underscored: true
  })

  Tag.associate = function() {
      app.model.Tag.hasMany(app.model.Picture, { as: 'picture', foreignKey: 'tag_name', targetKey: 'tag_name'})
  }

  //添加类方法, 不要用箭头函数，会改变this的指向
  //CLASSNAME.method = function () {}

  //添加实例方法
  //CLASSNAME.prototype.method = function () {}

  return Tag;
};
