'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const fs = require('fs')

const config = {
  base: {
    entry: {}, // 项目入口配置，对应 webpack 中的 entry.
    htmlWebpackPluginConfig: {} // 对应 webpack 中的 htmlWebpackPlugin 配置
  },
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

// 黑名单中的模块不会被获取, 一般为公用组件库
let blacklist = ['common']
let srcPath = path.resolve(__dirname, '../src')
let modules = fs.readdirSync(srcPath)

//定义文件存在方法
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

modules.forEach(moduleName => {
  if (blacklist.indexOf(moduleName) > -1) {
    return
  }
  //该模块所在的路劲
  let modulePath = `${srcPath}/${moduleName}`
  //判断是否是文件夹并且有module.json文件，不是就跳过
  if (!fs.lstatSync(modulePath).isDirectory() || !fsExistsSync(`${modulePath}/module.json`)) {
    return
  }
  let module = require(`${modulePath}/module.json`)
	//定义入口
  config.base.entry[module.name] = `${modulePath}/${module.entry}`
	//配置各个入口的htmlwebpackplugin配置
  config.base.htmlWebpackPluginConfig[module.name] = {
    title: module.title,
    filename: module.filename,
    template: `${modulePath}/${module.template}`,
    inject: true,
    author: module.author
  }
})

//如果没有符合规范的模块项目， 抛出异常
const keys = require('babel-runtime/core-js/object/keys').default
if (!keys(config.base.entry)) {
  throw new Error('no modules', 500)
}

module.exports = config
