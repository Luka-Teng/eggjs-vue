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
        editor(v-model="content", :useCustomImageHandler="true", @imageAdded="handleImageAdded")
      p
        a(class="w3-btn w3-padding w3-blue-grey", @click="onEdit") Submit
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {mapGetters, mapActions} from 'vuex'
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
      getPost: 'getPost',
      editPost: 'editPost',
      uploadPostImage: 'uploadPostImage'
    }),
    onEdit () {
      const payload = {
        id: parseInt(this.$route.params.id),
        title: this.title,
        content: this.content
      }
      this.editPost(payload).then((data) => {
        if (data.status === 'success') {
          this.$router.push(`/post/${this.$route.params.id}`)
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
  computed: {
    ...mapGetters({
      post: 'post'
    })
  },
  components: {
    editor: VueEditor
  },
  created () {
    this.getPost(this.$route.params.id).then((data) => {
      if (data.status === 'success') {
        this.title = this.post.title
        this.content = this.post.content
      }
    })
  }
}
</script>

<style lang="stylus"  scoped>
</style>
