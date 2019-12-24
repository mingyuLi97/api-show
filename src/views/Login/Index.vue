<template>
  <div class="container">
    <ul>
      <li :class="signInActivate?'activate':''" @click="signInActivate = true"> sigin in </li>
      <li :class="signInActivate?'':'activate'" @click="signInActivate = false"> sign up </li>
    </ul>
    <div v-show="signInActivate" class="userContainer">
      <sign-in />
    </div>
    <div v-show="!signInActivate">
      <sign-up />
    </div>
  </div>
</template>

<script>
import signIn from './SignIn'
import signUp from './SignUp'
export default {
  name: 'Login',
  components: {
    signIn,
    signUp
  },
  data() {
    return {
      signInActivate: true,
      account: '',
      password: '',
      checked: false
    }
  }
}
</script>

<style scoped>
ul {
  width: 370px;
  height: 47px;
}
li {
  box-sizing: border-box;
  list-style: none;
  border-bottom: 2px solid lightgray;
  line-height: 37px;
  float: left;
  width: 50%;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  background-color: whitesmoke;
}
li:first-child{
  border-right: 2px solid lightgray;
}

.container{
  width: 370px;
  border: 1px solid lightgray;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.activate{
  border-bottom-color: purple;
  background-color: white;
}

.userContainer{
  margin-top: 10px;
  padding: 20px;
}
</style>
