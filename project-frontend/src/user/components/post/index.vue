<template lang="jade">
  div
    div(class="w3-container w3-blue-grey")
      h2 Posts List
    div(class="w3-container w3-card-4 w3-padding-0")
      ul(class="w3-ul w3-card-2")
        li.w3-row.w3-hover-pale-green.w3-animate-right.w3-padding-16(v-if="posts.length>0", v-for="post in posts")
          router-link.w3-col.s10(:to="`/post/${post.id}`", style="text-decoration:none;")
            img(src="../../assets/post.png", class="w3-left w3-circle w3-margin-right", style="width:60px;")
            span.w3-xlarge {{post.title}}
            br
            span {{post.created_at | getDate}}
          div.w3-col.s2(style="padding-top:10px; text-align:center" v-if="user_info")
            a.w3-round-xxlarge.w3-btn.w3-red(href="javascript:void(0)", @click="onRemove(post.id)")
              i.icon-delete.iconfont
      pagination(:curr_page="curr_page", :max_page="max_page", @paginationEvent="toPage")
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'
import pagination from '@/common/pagination'
export default {
  data () {
    return {
      curr_page: 1,
      limit: 5,
      max_page: 0
    }
  },
  computed: {
    ...mapGetters({
      posts: 'posts',
      user_info: 'user_info'
    }),
    from () {
      return parseInt((this.curr_page - 1) * this.limit)
    }
  },
  components: {
    pagination
  },
  methods: {
    ...mapActions({
      getPosts: 'getPosts',
      postsLength: 'postsLength',
      removePost: 'removePost'
    }),
    toPage (page) {
      this.curr_page = page
      this.getPosts({from: this.from, limit: this.limit})
    },
    onRemove (id) {
      const r = confirm('Are you sure')
      if (r === true) {
        this.removePost({id}).then((data) => {
          if (data.status === 'success') {
            return this.postsLength()
          }
          return {status: 'failed'}
        }).then((data) => {
          if (data.status === 'success') {
            this.max_page = Math.ceil(parseFloat(data.msg / this.limit))
            if (this.curr_page > this.max_page) {
              this.curr_page = this.max_page
            }
            this.getPosts({from: this.from, limit: this.limit})
          }
        })
      }
    }
  },
  created () {
    // 获取前五篇文章
    this.getPosts({form: this.from, limit: this.limit})
    this.postsLength().then((data) => {
      if (data.status === 'success') {
        this.max_page = Math.ceil(parseFloat(data.msg / this.limit))
      }
    })
  },
  filters: {
    getDate: (value) => {
      if (!value) return ''
      return value.slice(0, 10)
    }
  }
}
</script>

<style lang="stylus"  scoped>

</style>
