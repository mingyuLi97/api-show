<!--
 * @Author: your name
 * @Date: 2019-12-05 14:00:01
 * @LastEditTime : 2019-12-20 11:15:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\views\Login\SignUp.vue
 -->
<template>
  <div class="signUpContainer">
    <el-form ref="registerForm" :model="registerForm" :rules="rules">
      <el-form-item prop="account">
        <label for="Account">Account</label>
        <el-input id="Account" v-model="registerForm.account" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item prop="email">
        <label for="Email">Email</label>
        <el-input id="Email" v-model="registerForm.email" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item prop="password">
        <label for="Password1">Password</label>
        <el-input id="Password1" v-model="registerForm.password" type="password" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item prop="passwordConfirmation">
        <label for="PasswordConfirmation">Password confirmation</label>
        <el-input id="PasswordConfirmation" v-model="registerForm.passwordConfirmation" type="password" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <p>Minimum length is 6 characters</p>
    <el-button type="success" class="signUpBtn" @click="signUp">sign up</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        account: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      rules: {
        account: [
          { required: true, message: 'Account is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Account is required', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Account is required', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
        ],
        passwordConfirmation: [
          { required: true, message: 'Account is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    signUp() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (this.registerForm.password === this.registerForm.passwordConfirmation) {
            this.$api.login.register(this.registerForm)
              .then(res => {
                if (res.code === 200) {
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
          } else {
            this.$message.error('两次密码输入不同')
          }
        } else {
          return false
        }
      })
    }
  }

}
</script>

<style scoped>
.signUpContainer{
    box-sizing: border-box;
    margin-top: 10px;
    padding: 20px;
}
.el-form-item{
    margin-bottom: 5px;
}
label{
    font-size: 16px;
}
p {
    display: block;
    font-size: 12px;
    color: #707070;
}
.signUpBtn{
  margin-top: 20px;
  width: 100%;
}
</style>
