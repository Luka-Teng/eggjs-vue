'use strict';

module.exports = {
  //开启sequelize插件，用于简历数据库模型
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  //开启egg-password插件，用于管理用户登录
  passport: {
    enable: true,
    package: 'egg-passport',
  },

  //egg-password的登录策略，本地登录
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },

  //对跨域的请求进行询问
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  //验证上传到controller的参数
  validate: {
    enable: true,
    package: 'egg-validate',
  }
}

// had enabled by egg
// exports.static = true;
