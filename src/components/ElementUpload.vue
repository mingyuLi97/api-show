<!--
 * @Author: your name
 * @Date: 2019-12-20 09:54:27
 * @LastEditTime : 2019-12-24 14:08:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\src\components\ElementUpload.vue
 -->
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
      <img v-if="imgURL" :src="imgURL" alt="">
      <i v-else class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    imgURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hideUpload: false
      // imgURL: 'http://127.0.0.1:8000/static/images/20191220132209576.jpg'
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
img{
  width: 145px;
  height: 145px;
}
</style>
