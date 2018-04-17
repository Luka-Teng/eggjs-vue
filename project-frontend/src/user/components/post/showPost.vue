<template lang="jade">
  div.w3-card-4.w3-animate-right(v-if="post")
    header.w3-container.w3-blue-grey
      h2 {{post.title}}
    div.w3-container#post-content(data-luka="weimeidsg", v-html="post.content")
    footer.w3-container.w3-blue-grey
      h6(style="text-align:right") {{post.created_at | getDate}}
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      post: 'post'
    })
  },
  methods: {
    ...mapActions({
      getPost: 'getPost'
    })
  },
  created () {
    this.getPost(this.$route.params.id)
  },
  filters: {
    getDate: (value) => {
      if (!value) return ''
      return value.slice(0, 10)
    }
  }
}
</script>

<style lang="stylus">
#post-content
  h1
    font-size 25px
    margin-top 20px
    border-left 6px solid #ccc
    padding 0px 16px
  p
    margin 25px 0px
    color #555
    padding-left 24px
  code
    width 100%
    display block
    padding 10px
    background #555
    color #fff
    border-radius 3px
    font-family  Verdana,sans-serif
</style>
