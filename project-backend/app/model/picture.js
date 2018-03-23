module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Picture = app.model.define('picture', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false
    },
    url: {
      type: STRING(50),
      allowNull: false,
      defaultValue: '/',
      unique: true
    },
    user_id: {
      type: INTEGER
    },
    tag_name: {
      type: STRING(30),
      defaultValue: 'default'
    }
  }, {
    freezeTableName: true,
    underscored: true
  })

  Picture.associate = function() {
      app.model.Picture.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id'})
      app.model.Picture.belongsTo(app.model.Tag, { as: 'tag', foreignKey: 'tag_name', targetKey: 'tag_name'})
  }

  //添加类方法, 不要用箭头函数，会改变this的指向
  //CLASSNAME.method = function () {}

  //添加实例方法
  //CLASSNAME.prototype.method = function () {}

  return Picture;
};
