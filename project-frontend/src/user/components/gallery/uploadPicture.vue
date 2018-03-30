<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 Upload Pictures
    div(class="w3-container w3-card-4 w3-padding-bottom")
      div(class="w3-row w3-padding w3-margin")
        ul(class="w3-ul w3-card-2 w3-margin-top")
          li(class="w3-padding-16")
            img(src="http://cdn.w3schools.wang/img_avatar3.png", class="w3-left w3-circle w3-margin-right", style="width:39px")
            a(class="w3-round w3-btn w3-large w3-orange w3-text-white w3-margin-right", @click="upload")
              i(class="iconfont icon-quanxuan", style="font-size:18px") &nbsp;&nbsp;
              span UPLOAD
          div(class="w3-row w3-padding")
            div(class="w3-col s2 w3-padding-medium", v-for="tag in tags")
              input(class="w3-radio", type="radio", :id="tag", name="tag", :value="tag", v-model="selected_tag")
              label(class="w3-validate", :for="tag") {{tag}}
      div(class="w3-row w3-section-12 w3-padding w3-margin")
        div(id="drag-content", :class="[drag_area_class]")
          div(class="drag-icon") +
      div(class="w3-row w3-section-12 w3-padding w3-margin")
        progress_bar(:percentage="percentage")
      div(class="w3-row")
        div(class="w3-col w3-padding", style="column-count:3")
          transition-group(name="fade")
            div(class="img-wrapper relative w3-round w3-border w3-margin-bottom", v-for="image in images", :key="image.id")
              img(:src="image.src", class="img-responsive", @click="modal.show(image.src)")
              a(class="w3-btn w3-tiny w3-red drag-delete", @click="onDelete(image.id)") DELETE
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'
// 文件拖拽包
import DragFiles from '@/utils/dragFiles'
// 图片展示
import {ShowImage} from '@/utils/tools'
// progressbar组件
import progress_bar from '@/common/progressBar'
export default {
  data () {
    return {
      // 图片的64进制码
      images: [],
      // 需要上传的formData
      files: [],
      drag_area_class: '',
      selected_tag: 'default',
      modal: new ShowImage(),
      percentage: '0%'
    }
  },
  components: {
    progress_bar
  },
  computed: {
    ...mapGetters({
      tags: 'tags'
    })
  },
  methods: {
    ...mapActions({
      uploadPictures: 'uploadPictures',
      getTags: 'getTags',
      setLoading: 'setLoading',
      setFlash: 'setFlash'
    }),
    onDelete (id) {
      this.images.forEach((image, index) => {
        if (image.id === id) {
          this.images.splice(index, 1)
        }
      })
      this.files.forEach((file, index) => {
        if (file.id === id) {
          this.files.splice(index, 1)
        }
      })
    },
    upload () {
      const formData = new FormData()
      formData.append('tag_name', this.selected_tag)
      this.files.forEach((file) => {
        formData.append(file.name, file.file)
      })
      this.uploadPictures({
        data: formData,
        cb: (percentage) => {
          this.percentage = parseInt(percentage * 100).toString() + '%'
          percentage === 1 ? this.percentage = '0%' : ''
        }
      }).then((data) => {
        if (data.status === 'success') {
          this.files = []
          this.images = []
        }
      })
    }
  },
  created () {
    this.getTags()
  },
  mounted () {
    const dragField = new DragFiles({
      id: 'drag-content',
      max_files: 30
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
          const id = this.files.length
          this.files.push({
            id: id,
            name: file.name,
            file: file.file
          })
          // 将数据存储为base64
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.images.push({
              src: fileReader.result,
              id: id
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
  width 100%
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
