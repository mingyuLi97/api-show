<!--
 * @Author: your name
 * @Date: 2019-12-01 21:23:05
 * @LastEditTime: 2019-12-18 10:23:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\App.vue
 -->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
