<template lang="jade">
  div.w3-round
    div(class="w3-container w3-blue-grey top-round")
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
            div(class="img-wrapper relative w3-round w3-border w3-margin-bottom", v-for="image in images", :key="image.id", style="text-align: center")
              img(:src="image.src", class="img-responsive", @click="modal.show(image.src)")
              a(class="w3-btn w3-tiny w3-blue drag-edit", @click="onCropper(image.id)") CROPPER
              a(class="w3-btn w3-tiny w3-red drag-delete", @click="onDelete(image.id)") DELETE
      cropperModal(
        :img="cropper.img",
        :show="cropper.show",
        :id="cropper.id",
        @hideCropper="cropper.show = false",
        @onCropped = "getCropData"
      )
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
// 图片裁剪组件
import cropperModal from '@/common/cropperModal'
export default {
  data () {
    return {
      // 图片的64进制码
      images: [],
      cropper: {
        img: '',
        show: false,
        id: null
      },
      drag_area_class: '',
      selected_tag: 'default',
      modal: new ShowImage(),
      percentage: '0%'
    }
  },
  components: {
    progress_bar,
    cropperModal
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
    // convett base64 to array buffer
    convertDataURIToBinary (dataURI) {
      let BASE64_MARKER = ';base64,'
      let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
      let base64 = dataURI.substring(base64Index)
      let raw = window.atob(base64)
      let rawLength = raw.length
      let array = new Uint8Array(new ArrayBuffer(rawLength))
      for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    },
    auto_increment_id: (() => {
      let id = 0
      return () => {
        return id++
      }
    })(),
    getCropData (data, id) {
      let image = this.images.findOne((image) => { return image.id === id })
      if (image) {
        image.src = data
      }
      this.cropper.show = false
    },
    onDelete (id) {
      this.images.forEach((image, index) => {
        if (image.id === id) {
          this.images.splice(index, 1)
        }
      })
    },
    onCropper (id) {
      this.cropper.show = true
      let image = this.images.findOne((image) => { return image.id === id})
      if (image) {
        this.cropper.img = image.src
        this.cropper.id = image.id
      }
    },
    upload () {
      const formData = new FormData()
      formData.append('tag_name', this.selected_tag)
      this.images.forEach((image) => {
        formData.append(image.name, new File([this.convertDataURIToBinary(image.src)], image.name, {type: image.type}))
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
          let id = this.auto_increment_id()
          // 将数据存储为base64
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.images.push({
              src: fileReader.result,
              id: id,
              name: file.name,
              type: file.type
            })
          })
          fileReader.readAsDataURL(file.file)
        })
      }
    })
  },
  beforeDestroy () {
    this.modal.remove()
  }
}
</script>

<style lang="stylus"  scoped>
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
  .drag-edit
    position absolute
    right 0px
    bottom 30px
    display none
  &:hover
    .drag-delete
      display block
    .drag-edit
      display block
</style>
