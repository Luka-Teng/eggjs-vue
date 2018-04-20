<template lang="jade">
  div.home-area
    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-animate-right.w3-card-2
      p EDUCATION & JOBS &nbsp;&nbsp;
        i.iconfont.icon-optinmonster.w3-large
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") 2011 ~ 2015
      template(slot="body") 华东理工大学
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") 2014 ~ 2015
      template(slot="body") 吕贝克应用科技大学(交换生)
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") 2015 ~ 至今
      template(slot="body") 诗禹（上海）信息技术有限公司

    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-animate-right.w3-card-2(style="margin-top:25px")
      p ABILITY &nbsp;&nbsp;
        i.iconfont.icon-iconzhucetouxiang.w3-large
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") Javacript
      template(slot="body")
        div 1. 熟练掌握Javascript的基本语法，熟练应用Promise，Generator，Async等异步特性。
        div 2. 了解ES6的新语法，能利用类，解构，箭头函数的等特性，优化代码。懂得使用装饰器，代理等新语法重构代码
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") HTML / CSS
      template(slot="body")
        div 1. 熟练掌握HTML5和CSS3。
        div 2. 能熟练使用div + float或div + flex来编辑页面。
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") VUE / WEBPACK
      template(slot="body")
        div 1. 熟练掌握MVVM框架Vue，并能有效的使用Vuex，Vue-router，axios等全家桶，创建前端应用。
        div 2. 掌握Webpack的基本使用方法，能结合Vue开发单页或者多页应用。
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") NODE
      template(slot="body")
        div 1. 熟悉Node环境，以及其命令行的使用。
        div 2. 了解并使用过Express，Koa2，Eggjs等后台框架，能个人搭建简易后台。

    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-animate-right.w3-card-2(style="margin-top:25px")
      p PROJECTS (Source code -> github)&nbsp;&nbsp;
        i.iconfont.icon-cry.w3-large
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") Personal Site
      template(slot="body")
        div 1. 此个人网站是一个前后端分离的web应用，主要有图片栏，文章栏等基本功能。
        div 2. 前端技术栈：Vue + Vuex + Vue-router为主要框架的单页面应用，Webpack负责打包编译，同时使用Jade，Stylus代替HTML，CSS。Ajax请求主要使用了Axois包，CSS框架主要使用了W3.css
        div 3. 后端技术栈：Eggjs为核心框架，Sequelizejs负责后台模型的建立，Passportjs负责用户权限认证，数据库使用Mysql。
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") Pyramid
      template(slot="body")
        div 1. 尝试Vue项目的初体验，主要功能为模拟传销。
        div 2. 前端技术栈：同样是Vue + Vuex + Vue-router + webpack为核心的单页面应用，css使用vuetify框架，数据请求为firebase包。
        div 3. 后端技术栈：使用的是谷歌的firebase的云后台，使用firebase的API能很方便的进行数据的插入和文件的存储，懒前端必备。
    luka_block(:line_left="get_line_left()", :deg="get_deg()", :block_left="get_block_left()", :line_top="get_line_top()")
      template(slot="header") Mypost4u
      template(slot="body")
        div 1. 公司一个物流平台的项目，主要使用的框架为Ruby On Rails。
        div 2. 主要任务：负责日常的前端，主要使用的js的框架为jQuery，能编写自己的Jquery插件，熟悉嵌入式页面的开发（如erb等）。
        div 3. 次要任务：负责后台的一些小接口的编写。
        div 4. 该项目虽然过时，但是是我的web入门，感激感激。
</template>

<script>
import luka_block from '@/common/lukaBlock'
export default {
  components: {
    luka_block
  },
  methods: {
    get_line_top () {
      return 20
    },
    get_line_left () {
      return 20
    },
    get_deg () {
      return 45
    },
    get_block_left () {
      return 20
    }
  }
}
</script>

<style lang="stylus" scoped>
.w3-container
  background-color: rgba(0,0,0,0)
.w3-light-grey
  color #555 !important
.home-area
  padding-left 16px
@media only screen and (max-width:601px)
  .home-area
    padding-left 0px
</style>
