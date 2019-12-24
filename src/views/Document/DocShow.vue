<!--
 * @Author: your name
 * @Date: 2019-12-06 17:11:51
 * @LastEditTime : 2019-12-23 15:15:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\views\Document\DocShow.vue
 -->
<template>
  <div>
    <div class="markdown">
      <Markdown
        v-model="exportFileName"
        :min-width="1500"
        :export-file-name="exportFileName"
      />
    </div>
  </div>
</template>

<script>
import Markdown from 'vue-meditor'
export default {
  components: {
    Markdown
  },
  props: {
    modelPath: {
      type: String,
      default: undefined
    },
    functionPath: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      projectId: undefined
      // aaa: ''

    }
  },
  computed: {
    exportFileName: {
      get() {
        return this.modelPath + '_' + this.functionPath
      },
      set(val) {}
    }
  },
  created() {
    console.log('项目ID:', this.$route.params.id)
    this.projectId = this.$route.params.id
    this.aaa = this.modelPath + '_' + this.functionPath
  }
}
</script>

<style scoped>
.markdown{
  min-width: 1200px;
}
</style>
