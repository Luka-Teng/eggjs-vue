<template lang="jade">
  div.w3-padding-left
    div.w3-container.w3-padding-16
      div.header LUKA
    p.links.w3-margin-0
      a(href="https://github.com/Luka-Teng", target="_blank")
        img(src="../../assets/github.png")

    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-margin-top.w3-animate-right.w3-card-2
      p EDUCATION &nbsp;&nbsp;
        i.iconfont.icon-optinmonster.w3-large
    luka_block(:line_left="50")
      template(slot="header") 2011 ~ 2015
      template(slot="body") 华东理工大学
    luka_block(:line_left="50", :deg="115", :block_left="20", :line_top="40")
      template(slot="header") 2014 ~ 2015
      template(slot="body") 吕贝克应用科技大学

    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-margin-top.w3-animate-right.w3-card-2
      p ABILITY &nbsp;&nbsp;
        i.iconfont.icon-iconzhucetouxiang.w3-large

    div.w3-container.w3-leftbar.w3-light-grey.w3-large.w3-margin-top.w3-animate-right.w3-card-2
      p PROJECTS &nbsp;&nbsp;
        i.iconfont.icon-cry.w3-large
</template>

<script>
import luka_block from '@/common/lukaBlock'
export default {
  components: {
    luka_block
  }
}
</script>

<style lang="stylus" scoped>
.header {
  text-align: center;
  font-size: 16px;
  color: #555;
  letter-spacing: 4px;
}
.links {
  text-align: center;
}
.links img {
  width: 20px;
  height: 20px;
}
.w3-container
  background-color: rgba(0,0,0,0)
.w3-light-grey
  color #555 !important
</style>
