<!--
 * @Author: your name
 * @Date: 2019-12-06 17:11:51
 * @LastEditTime : 2019-12-26 11:17:54
 * @LastEditors  : Please set LastEditors
 * @Description: markdwon 界面显示
 * @FilePath: \APIShow\APIShow\src\views\Document\DocShow.vue
 -->
<template>
  <div>
    <div class="markdown">
      <Markdown
        v-model="value"
        :min-width="1500"
        :export-file-name="exportFileName"
        @on-save="save"
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
      default: ''
    },
    functionPath: {
      type: String,
      default: ''
    },
    mdText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      projectId: undefined,
      value: ''
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
    this.value = this.mdText
    // this.aaa = this.modelPath + '_' + this.functionPath
  },
  methods: {
    save(data) {
      this.$emit('on-save', data.value)
    }
  }

}
</script>

<style scoped>
.markdown{
  min-width: 1200px;
}
</style>
