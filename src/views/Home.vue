<!--
 * @Author: your name
 * @Date: 2019-12-20 09:54:27
 * @LastEditTime : 2019-12-20 10:19:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\src\views\Home.vue
 -->
<template>
  <div>
    <h2 @click="testAxios">Home page</h2>
    <div class="container">
      <!-- <projects/> -->
      <router-link to="/projects">
        projects
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {

    }
  },
  methods: {
    testAxios() {
      this.$api.getUser()
        .then((res) => alert(JSON.stringify(res)))
        .catch((err) => alert(err))
    }
  }
}
</script>

<style scoped>
.container{
  margin: 100px auto 0 auto;
  max-width: 1200px;
}
</style>
