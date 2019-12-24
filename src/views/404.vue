<template>
  <div class="container">
    <img src="../assets/404page.jpg" alt="">
    <div class="btnContainer">
      <el-button class="btn-left" @click="previousPage">返回上页</el-button>
      <el-button type="primary" @click="goHomePage">回到首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    previousPage() {
      this.$router.go(-1)
    },
    goHomePage() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.container{
    height: calc(100vh);
    text-align: center;
    margin-top: 200px;
}
.btnContainer{
    text-align: center;
}
.btn-left{
    margin-right: 30px;
}
</style>
