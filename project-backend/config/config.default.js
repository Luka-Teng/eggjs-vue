'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521080756887_3804';

  // add your config here
  config.middleware = [];

  //插件sequelize的配置，数据库的基本信息
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'project',
    host: 'localhost',
    port: '3306',
    username: 'luka',
    password: 'tengweimjj',
  };

  //登录策略--本地策略配置
  config.passportLocal = {
    usernameField: 'email',
    passwordField: 'password'
  }

  //开启csrf，跨域白名单
  exports.security = {
    csrf: {
      enable: true
    },
    domainWhiteList: ['http://39.106.120.26:8080']
  }

  //允许不同域的请求携带cookies
  exports.cors = {
    credentials: true
  }

  exports.multipart = {
    files: 30
  };

  return config;
};
