<template>
  <div>
    <el-upload
      :on-success="handleUploadSuccess"
      :on-change="()=>hideUpload=true"
      :on-remove="handleUploadRemove"
      :class="{hide: hideUpload}"
      action="/apis/upload/"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideUpload: false,
      imgURL: ''
    }
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
    //   console.log(response, file, fileList)
      if (response.code === 200) {
        // console.log(response.urls[0].url)
        this.$emit('child', response.urls[0].url)
      }
    },
    beforeUpload() {
    },
    handleUploadRemove() {
      this.hideUpload = false
      this.$emit('child', '')
    }
  }
}
</script>

<style scoped>
>>>.hide .el-upload--picture-card {
    display: none;
}
</style>
