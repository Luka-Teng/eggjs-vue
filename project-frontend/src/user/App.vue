<template lang="jade">
  #app(class="w3-margin-bottom")
    canvas
    // 头部导航栏
    div
      div#top-nav(class="w3-row w3-container w3-light-grey")
        div(class="w3-col s12 m3")
          div(class="w3-padding-12")
            i.iconfont.icon-optinmonster &nbsp;&nbsp;
            router-link(:to="{name: 'home'}") LUKA Personal site
            a#mobile-nav-btn.pull-right.mobile-show(title="toggle", href="javascript:void(0)" @click="mobile_nav = !mobile_nav", class="w3-hover-text-black")
              i.iconfont.icon-category
        div(class="w3-col m9 pc-show")
          ul(class="w3-navbar")
            li
              div.w3-dropdown-hover
                button.w3-btn.w3-light-grey(style="padding: 12px 16px;") PICTURE
                div.w3-dropdown-content(style="box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15);")
                 router-link(:to="{name: 'show_gallery'}", class="w3-padding-12 w3-hover-text-grey w3-hover-light-grey") Gallery
                 router-link(:to="{name: 'upload_picture'}", v-if="user_info", class="w3-padding-12 w3-hover-text-grey w3-hover-light-grey") Upload Picture
            li
              div.w3-dropdown-hover
               button.w3-btn.w3-light-grey(style="padding: 12px 16px;") POST
               div.w3-dropdown-content(style="box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15);")
                router-link(:to="{name: 'post_index'}", class="w3-padding-12 w3-hover-text-grey w3-hover-light-grey") Posts List
                router-link(:to="{name: 'upload_post'}", v-if="user_info", class="w3-padding-12 w3-hover-text-grey w3-hover-light-grey") Upload Post
            li.pull-right
              a(title="toggle", href="javascript:void(0)" @click="basic_data_show = !basic_data_show", class="w3-padding-12 w3-hover-text-purple")
                i.iconfont.icon-toggle-on
            li.pull-right
              router-link(title="login", :to="{name: 'user_login'}", v-if="!user_info", class="w3-padding-12 w3-hover-text-purple w3-hover-white")
                i.iconfont.icon-denglu
            li.pull-right
              router-link(title="sign up", :to="{name: 'user_signup'}", v-if="!user_info", class="w3-padding-12 w3-hover-text-purple w3-hover-white")
                i.iconfont.icon-iconzhucetouxiang
            li.pull-right
              a(title="logout", href="javascript:void(0)", @click="_logout", v-if="user_info", class="w3-padding-12 w3-hover-text-purple w3-hover-white")
                i.iconfont.icon-zhuxiao

      div#mobile-nav.w3-col.s12.w3-animate-left(v-if="mobile_nav")
        ul.w3-navbar.w3-dark-grey
          li
            router-link(:to="{name: 'show_gallery'}") Gallery
          li
            router-link(:to="{name: 'upload_picture'}", v-if="user_info") Upload Picture
          li
            router-link(:to="{name: 'post_index'}") Posts List
          li
            router-link(:to="{name: 'upload_post'}", v-if="user_info") Upload Post
          li
            router-link(title="login", :to="{name: 'user_login'}", v-if="!user_info") Login
          li
            router-link(title="sign up", :to="{name: 'user_signup'}", v-if="!user_info") Sign Up
          li
            a(title="logout", href="javascript:void(0)", @click="_logout", v-if="user_info") Logout

      // 显示csrftoken和用户登录信息
      transition(name="slide-fade")
        div(id="basic-data", class="w3-row", v-if="basic_data_show")
          div(class="w3-half")
            div(class="w3-container w3-dark-grey  w3-leftbar w3-border-grey", style="height:140px")
              h3 CSRF TOKEN
              p {{csrf_token_or_null}}
          div(class="w3-half")
            div(class="w3-container w3-dark-grey w3-leftbar w3-border-grey", style="height:140px")
              h3 USER Info
              p {{user_info_or_null}}

    // 显示用户头像和路由信息
    div(style="padding:0px 20px")
      div(class="w3-row w3-margin-top")
        div(class="w3-col s12 m3")
          div(class="w3-card-4")
            header(class="w3-light-grey w3-container")
              h1 PROFILE
            img(class="img-responsive w3-hover-opacity" src="./assets/luka.jpg")
            div(class="w3-container")
              h4
                b LUKA
                a(href="https://github.com/Luka-Teng", target="_blank", style="float:right")
                  img(src="./assets/github.png", style="width:25px")
              p Contact me: 15000900635
              p Maybe a front end engineer :)
        div(class="w3-col s12 m9 router-area")
          router-view

    // loading动画
    loading
    // flash组件
    flash
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      basic_data_show: false,
      mobile_nav: false
    }
  },
  computed: {
    ...mapGetters({
      csrf_token: 'csrf_token',
      user_info: 'user_info',
      from: 'from'
    }),
    csrf_token_or_null () {
      return this.csrf_token ? this.csrf_token : 'Failed to get it.'
    },
    user_info_or_null () {
      return this.user_info ? this.user_info : 'Failed to get it.'
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    _logout () {
      this.logout().then((data) => {
        if (data.status === 'success') {
          this.$router.push('/user/login')
        }
      })
    }
  },
  mounted () {
    document.addEventListener('click', () => {
        this.mobile_nav = false
    })
    document.getElementById("mobile-nav-btn").addEventListener('click', (e) => {
        e.stopPropagation()
    })
  // 来自evan you的点击特效 from: http://evanyou.me
	/*
    document.addEventListener('touchmove', function (e) {
        e.preventDefault()
    })
	*/
    var c = document.getElementsByTagName('canvas')[0],
        x = c.getContext('2d'),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI*2,
        v = m.cos,
        z = m.random
    c.width = w*pr
    c.height = h*pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i(){
        x.clearRect(0,0,w,h)
        q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
        while(q[1].x<w+f) d(q[0], q[1])
    }
    function d(i,j){
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z()*2-0.25)*f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r-=u/-50
        x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = {x:k,y:n}
    }
    function y(p){
        var t = p + (z()*2-1.1)*f
        return (t>h||t<0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
}
</script>

<style lang="stylus">
canvas {
    position: absolute;
    top: 200px;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.pc-show
  display block
.mobile-show
  display none
.router-area
  padding-left 16px
@media only screen and (max-width:601px)
  .router-area
    padding-left 0px
    padding-top 20px
  .pc-show
    display none
  .mobile-show
    display block
  #top-nav
    position fixed
    width 100%
    top 0px
    z-index 1000
  #mobile-nav
    position fixed
    top 49px
    z-index 1000
  body
    padding-top 55px
</style>
