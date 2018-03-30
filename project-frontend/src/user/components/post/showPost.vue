<template lang="jade">
  div.w3-card-4.w3-animate-right
    header.w3-container.w3-teal
      h2 {{post.title}}
    div.w3-container#post-content(v-html="post.content")
    footer.w3-container.w3-teal
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
    font-size 22px
    margin-top 20px
  p
    margin 25px 0px
    color #555
  code
    width 100%
    display block
    padding 10px
    background #555
    color #fff
    border-radius 3px
    font-family  Verdana,sans-serif
</style>
