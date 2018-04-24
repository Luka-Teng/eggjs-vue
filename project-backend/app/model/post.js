module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define('post', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER
    },
    content: {
      type: STRING(65535),
      defaultValue: ''
    },
    title: {
      type: STRING(100),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    underscored: true
  })

  Post.associate = function() {
      app.model.Post.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id'})
  }

  //添加类方法, 不要用箭头函数，会改变this的指向
  //CLASSNAME.method = function () {}

  //添加实例方法
  //CLASSNAME.prototype.method = function () {}

  return Post;
};
