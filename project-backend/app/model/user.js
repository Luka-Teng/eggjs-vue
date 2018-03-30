module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
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
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: STRING(50),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    underscored: true
  })

  User.associate = function() {
      app.model.User.hasMany(app.model.Picture, { as: 'picture', foreignKey: 'user_id', targetKey: 'id'})
      app.model.User.hasMany(app.model.Post, { as: 'post', foreignKey: 'user_id', targetKey: 'id'})
  }

  //添加类方法, 不要用箭头函数，会改变this的指向
  //CLASSNAME.method = function () {}

  //添加实例方法
  //CLASSNAME.prototype.method = function () {}

  return User;
};
