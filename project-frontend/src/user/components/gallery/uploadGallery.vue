<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 Upload Gallery
    div(class="w3-container w3-card-4 w3-padding-bottom")
      div(class="w3-row")
        div(class="w3-col s3 w3-padding-medium" v-for="tag in tags")
          <input class="w3-radio" type="radio" name="tags" :value="tag" checked>
          <label class="w3-validate">{{tag}}</label>
      div(class="w3-row w3-section-12 w3-padding-left")
        div(id="drag-content" v-bind:class="[drag_area_class]")
          div(class="drag-icon") +
        div(style="float: left;width: calc(100% - 550px);text-align: center;margin-top: 65px;")
          <a class="w3-btn w3-xxlarge w3-teal">UPLOAD</a>
      div(class="w3-row")
        div(class="w3-col s3 w3-padding")
          div(class="img-wrapper relative w3-col w3-round w3-border w3-margin-bottom" v-for="image in images_col_1" v-bind:key="image.id")
            img(v-bind:src="image.src" class="img-responsive")
            <a class="w3-btn w3-tiny w3-red drag-delete" @click="onDelete(image.id)">DELETE</a>
        div(class="w3-col s3 w3-padding")
          div(class="img-wrapper relative w3-col w3-round w3-border w3-margin-bottom" v-for="image in images_col_2" v-bind:key="image.id")
            img(v-bind:src="image.src" class="img-responsive")
            <a class="w3-btn w3-tiny w3-red drag-delete" @click="onDelete(image.id)">DELETE</a>
        div(class="w3-col s3 w3-padding")
          div(class="img-wrapper relative w3-col w3-round w3-border w3-margin-bottom" v-for="image in images_col_3" v-bind:key="image.id")
            img(v-bind:src="image.src" class="img-responsive")
            <a class="w3-btn w3-tiny w3-red drag-delete" @click="onDelete(image.id)">DELETE</a>
        div(class="w3-col s3 w3-padding")
          div(class="img-wrapper relative w3-col w3-round w3-border w3-margin-bottom" v-for="image in images_col_4" v-bind:key="image.id")
            img(v-bind:src="image.src" class="img-responsive")
            <a class="w3-btn w3-tiny w3-red drag-delete" @click="onDelete(image.id)">DELETE</a>
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'
// 文件拖拽包
import DragFiles from '@/utils/dragFiles'

export default {
  data () {
    return {
      // 图片的64进制码
      images: [],
      // 需要上传的formData
      files: [],
      drag_area_class: ''
    }
  },
  computed: {
    ...mapGetters({
      tags: 'tags'
    }),
    images_col_1 () {
      return this.images.filter((image, index) => {
        return index % 4 === 0
      })
    },
    images_col_2 () {
      return this.images.filter((image, index) => {
        return index % 4 === 1
      })
    },
    images_col_3 () {
      return this.images.filter((image, index) => {
        return index % 4 === 2
      })
    },
    images_col_4 () {
      return this.images.filter((image, index) => {
        return index % 4 === 3
      })
    }
  },
  methods: {
    ...mapActions({
      uploadPictures: 'uploadPictures',
      getTags: 'getTags',
      setLoading: 'setLoading',
      setFlash: 'setFlash'
    }),
    onDelete (id) {
      this.images.splice(this.images.indexOf(id), 1)
      this.files.forEach((file, index) => {
        if (file.id === id) {
          this.files.splice(index, 1)
        }
      })
    },
    onFilePicked (event) {
      const files = event.target.files
      this.image = files[0]
      let param = new FormData()
      param.append('file[]', files[0])
      this.uploadPictures(param)
    }
  },
  created () {
    this.getTags()
  },
  mounted () {
    const dragField = new DragFiles({
      id: 'drag-content'
    })
    dragField.onDragOver((target) => {
      this.drag_area_class = 'in'
    })
    dragField.onDragLeave((target) => {
      this.drag_area_class = 'out'
    })
    dragField.onDrop((target, data) => {
      // target指向的#drag-content
      this.drag_area_class = 'out'
      if (data.status === 'failed') {
        this.setFlash(data.msg)
      } else {
        data.data.forEach((file) => {
          // 把拖拽的文件加入总文件
          this.files.push({
            id: this.files.length,
            name: file.name,
            file: file.file
          })
          // 将数据存储为base64
          console.log(1111)
          console.log(file.file)
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.images.push({
              src: fileReader.result,
              id: this.files.length
            })
          })
          fileReader.readAsDataURL(file.file)
        })
      }
    })
  }
}
</script>

<style lang="stylus">
#drag-content
  width 550px
  height 225px
  border-radius 5px
  border 1px solid #aaa
  background #eee
  color #888
  float left

#drag-content.in
  box-shadow 0px 0px 5px 3px rgba(0,0,0,0.2)
  background-color #ddd
  color #eee

#drag-content > .drag-icon
  font-size 116px
  text-align center

.img-wrapper
  .drag-delete
    position absolute
    right 0px
    bottom 0px
    display none
  &:hover
    .drag-delete
      display block
</style>
