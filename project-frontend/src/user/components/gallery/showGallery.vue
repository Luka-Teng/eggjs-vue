<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 Show Gallery
    div(class="w3-container w3-card-4 w3-padding-bottom")
      div(class="w3-row")
        div(class="w3-col w3-padding")
          transition-group(name="fade")
            div(class="img-wrapper relative w3-col s3 w3-padding" v-for="image in gallery_shown" v-bind:key="image.id")
              img(v-bind:src="toUrl(image.url)" class=" w3-round img-responsive" @click="modal.show(toUrl(image.url))")

</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'
// 图片展示
import {ShowImage} from '@/utils/tools'
export default {
  data () {
    return {
      from: 0,
      limit: 20,
      modal: new ShowImage()

    }
  },
  computed: {
    ...mapGetters({
      gallery_shown: 'gallery_shown'
    })
  },
  methods: {
    ...mapActions({
      loadPictures: 'loadPictures'
    }),
    fromIncrement () {
      this.from = this.from + this.limit
    },
    toUrl (path) {
      // this.origin是全局的实例变量，存储服务器地址
      return this.origin + path.replace(/\\/g, '/')
    }
  },
  created () {
    this.loadPictures({from: this.from, limit: this.limit}).then((data) => {
      if (data.status === 'success') {
        this.fromIncrement()
      }
    })
  }
}
</script>

<style lang="stylus">
.fade-enter-active
.fade-leave-active
  transition: opacity .5s
  transition: all .5s

.fade-enter
.fade-leave-to
  opacity: 0
  transform: translateY(30px)
</style>
