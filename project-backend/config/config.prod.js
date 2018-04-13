'use strict';

module.exports = appInfo => {
  const config = exports = {};

  //插件sequelize的配置，数据库的基本信息
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'project',
    host: 'localhost',
    port: '3306',
    username: 'luka',
    password: 'tengweimjj',
  };

  //开启csrf，跨域白名单
  exports.security = {
    csrf: {
      enable: true
    },
    domainWhiteList: ['http://39.106.120.26:8080']
  }

  return config;
};
