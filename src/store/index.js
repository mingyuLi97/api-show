/*
 * @Author: your name
 * @Date: 2019-12-20 13:29:26
 * @LastEditTime : 2019-12-20 13:44:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: undefined
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
      console.log(state)
    }
  }
}

)

export default store
