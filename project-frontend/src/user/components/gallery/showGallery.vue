<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 Show Gallery
    div(class="w3-container w3-card-4 w3-padding-bottom")
      div(class="w3-row w3-padding w3-margin")
        ul(class="w3-ul w3-card-2 w3-margin-top")
          li(class="w3-padding-16")
            img(src="http://cdn.w3schools.wang/img_avatar3.png" class="w3-left w3-circle w3-margin-right" style="width:39px")
            a(class="w3-round w3-btn w3-large w3-orange w3-text-white w3-margin-right" @click="checkAll")
              i(class="iconfont icon-quanxuan" style="font-size:18px") &nbsp;&nbsp;
              span CHECK ALL
            a(class="w3-round w3-btn w3-large w3-red" @click="onDelete")
              i(class="iconfont icon-cry" style="font-size:18px") &nbsp;&nbsp;
              span DELETE
      div(class="w3-row")
        div(class="w3-col w3-padding" style="column-count:3")
          transition-group(name="fade")
            div(class="img-wrapper relative w3-padding"
              v-for="image in gallery_shown"
              v-bind:key="image.id"
              v-bind:class="{selected: isSelected(image.url)}")
              img(v-bind:src="toUrl(image.url)" class="w3-round img-responsive" @click="modal.show(toUrl(image.url))")
              template(v-if="isSelected(image.url)")
                a(class="w3-btn w3-medium pic-select w3-round w3-red" @click="onSelected(image.url)") UNSELECT
              template(v-else)
                a(class="w3-btn w3-medium pic-select w3-round w3-blue" @click="onSelected(image.url)") SELECT

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
      limit: 12,
      modal: new ShowImage(),
      selected_pics: [],
      global_var: null
    }
  },
  computed: {
    ...mapGetters({
      gallery_shown: 'gallery_shown'
    })
  },
  methods: {
    ...mapActions({
      loadPictures: 'loadPictures',
      deletePictures: 'deletePictures'
    }),
    toUrl (path) {
      // this.origin是全局的实例变量，存储服务器地址
      return this.origin + '/public/' + path
    },
    isSelected (url) {
      return this.selected_pics.indexOf(url) >= 0
    },
    onSelected (url) {
      const index = this.selected_pics.indexOf(url)
      if (index >= 0) {
        this.selected_pics.splice(index, 1)
      } else {
        this.selected_pics.push(url)
      }
    },
    checkAll () {
      if (this.selected_pics.length === this.gallery_shown.length) {
        this.selected_pics = []
      } else {
        this.selected_pics = this.gallery_shown.map((pic) => {
          return pic.url
        })
      }
    },
    onDelete () {
      this.deletePictures(this.selected_pics).then((data) => {
        if (data.status === 'success') {
          this.from = 0
          return this.loadPictures({from: this.from, limit: data.limit})
        }
        return {status: 'failed'}
      }).then((data) => {
        if (data.status === 'success') {
          this.from = this.from + data.limit
        }
      })
    }
  },
  created () {
    this.loadPictures({from: this.from, limit: this.limit}).then((data) => {
      if (data.status === 'success') {
        this.from = this.from + this.limit
      }
    })
  }
}
</script>

<style lang="stylus">
.img-wrapper
  .pic-select
    position absolute
    right 16px
    bottom 8px
    display none
  &:hover
    .pic-select
      display block
  &.selected
    >img
      box-shadow 0 0px 4px 3px rgba(0,0,0,0.6)
</style>
