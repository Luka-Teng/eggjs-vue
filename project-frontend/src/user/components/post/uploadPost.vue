<template lang="jade">
  div
    div(class="w3-container w3-blue-grey w3-round")
      h2 UPLOAD POST
    div(class="w3-container w3-card-4")
      br
      p
        label(class="w3-text-grey") Title
        input(class="w3-input", v-model="title")
      p
        label(class="w3-text-grey") Content
        p.margin
        editor(:editorToolbar="customToolbar", v-model="content", :useCustomImageHandler="true", @imageAdded="handleImageAdded")
      p
        a(class="w3-btn w3-padding w3-blue-grey", @click="onUpload") Submit
</template>

<script>
import { VueEditor } from 'vue2-editor'
// 引入vuex
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: '',
      customToolbar: [
        [{ header: [] }],
        ['code', 'bold', 'italic', 'underline'],
        ['image']
      ]
    }
  },
  methods: {
    ...mapActions({
      uploadPosts: 'uploadPosts',
      uploadPostImage: 'uploadPostImage'
    }),
    onUpload () {
      const payload = {
        title: this.title,
        content: this.content
      }
      this.uploadPosts(payload).then((data) => {
        if (data.status === 'success') {
          this.$router.push(`/post/${data.data.id}`)
        }
      })
    },
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('image', file)
      this.uploadPostImage(formData).then((data) => {
        if (data.status === 'success') {
          Editor.insertEmbed(cursorLocation, 'image', this.origin + '/public/postImages/' + data.data)
          resetUploader()
        }
      })
    }
  },
  components: {
    editor: VueEditor
  }
}
</script>

<style lang="stylus"  scoped>
</style>
