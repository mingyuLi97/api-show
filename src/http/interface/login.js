/*
 * @Author: your name
 * @Date: 2019-12-13 15:13:10
 * @LastEditTime : 2019-12-20 11:10:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\http\interface\login.js
 */
import axios from '../axios'

const login = data => {
  return axios({
    url: 'apiShow/login',
    method: 'post',
    data
  })
}

const register = data => {
  return axios({
    url: 'apiShow/register',
    method: 'post',
    data
  })
}

export default {
  login,
  register
}
