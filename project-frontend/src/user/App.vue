<template lang="jade">
  #app(class="w3-margin-bottom")
    // 头部导航栏
    div(class="w3-container w3-blue")
      div(class="w3-row")
        div(class="w3-col s3")
          div(class="w3-padding-12") LUKA Personal site
        div(class="w3-col s9")
          ul(class="w3-navbar")
            li
              router-link(:to="{name: 'show_gallery'}" v-if="user_info" class="w3-padding-12 w3-hover-text-purple w3-hover-white") Show Gallery
            li
              router-link(:to="{name: 'upload_picture'}" v-if="user_info" class="w3-padding-12 w3-hover-text-purple w3-hover-white") Upload Picture
            li
              router-link(:to="{name: 'user_login'}" v-if="!user_info" class="w3-padding-12 w3-hover-text-purple w3-hover-white") login
            li
              router-link(:to="{name: 'user_signup'}" v-if="!user_info" class="w3-padding-12 w3-hover-text-purple w3-hover-white") signup
            li
              a(href="javascript:void(0)" @click="_logout" v-if="user_info" class="w3-padding-12 w3-hover-text-purple w3-hover-white") logout

    // 显示csrftoken和用户登录信息
    div(class="w3-row w3-margin-top")
      div(class="w3-half")
        div(class="w3-container w3-pale-blue w3-leftbar w3-border-green" style="height:140px")
          h3 CSRF TOKEN
          p {{csrf_token_or_null}}
      div(class="w3-half")
        div(class="w3-container w3-pale-blue w3-leftbar w3-border-green" style="height:140px")
          h3 USER Info
          p {{user_info_or_null}}

    // 显示用户头像和路由信息
    div(class="w3-container")
      div(class="w3-row w3-margin-top")
        div(class="w3-col s3")
          div(class="w3-card-4")
            header(class="w3-blue w3-container")
              h1 PROFILE
            img(class="img-responsive w3-hover-opacity" src="http://cdn.w3schools.wang/img_avatar3.png")
            div(class="w3-container")
              h4
                b LUKA
              p A bad guy!
        div(class="w3-col s9 w3-padding-left")
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
  }
}
</script>

<style lang="stylus">

</style>
