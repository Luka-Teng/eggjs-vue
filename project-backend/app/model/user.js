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
    freezeTableName: true
  });

  //添加类方法, 不要用箭头函数，会改变this的指向
  //User.method = function () {}

  //添加实例方法
  //User.prototype.method = function () {}

  return User;
};
