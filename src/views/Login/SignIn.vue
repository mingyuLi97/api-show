<!--
 * @Author: your name
 * @Date: 2019-12-05 13:59:49
 * @LastEditTime : 2019-12-20 15:45:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\views\Login\SignIn.vue
 -->
<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules">
      <el-form-item prop="account">
        <label for="account">Username or email</label>
        <el-input id="account" v-model="loginForm.account" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item prop="password">
        <label for="Password">Password</label>
        <el-input id="Password" v-model="loginForm.password" type="password" placeholder="请输入内容" />
      </el-form-item>
    </el-form>

    <div class="rememberMe">
      <el-checkbox v-model="checked">Remember me</el-checkbox>
      <a href="#">Forgot your password?</a>
    </div>
    <el-button type="success" class="signInBtn" @click="login">sign in</el-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      checked: true,
      rules: {

      }
    }
  },
  methods: {
    login() {
      this.$api.login.login(this.loginForm)
        .then((res) => {
          if (res.code === 200) {
            Cookies.set('token', res.token)
            sessionStorage.setItem('user', this.loginForm.account) // 保存用户到本地会话
            sessionStorage.setItem('userId', res.id) // 保存用户到本地会话
            this.$store.commit('setUserId', res.id)
            this.$router.push('/')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
.rememberMe {
  margin-top: 15px;
}
.rememberMe a{
  color: black!important;
  text-decoration: none;
  float: right;
  font-size: 14px;
}
.rememberMe a:hover{
  text-decoration: underline;
}
.signInBtn{
  margin-top: 20px;
  width: 100%;
}
</style>
