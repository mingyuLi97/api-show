/*
 * @Author: your name
 * @Date: 2019-12-18 13:23:34
 * @LastEditTime : 2019-12-24 10:46:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\http\interface\project.js
 */
import axios from '../axios'

const getProjectDetail = id => {
  return axios({
    url: '/apiShow/getDataList/' + id
  })
}
const addModule = data => {
  return axios({
    url: 'apiShow/module',
    method: 'post',
    data
  })
}
const deleteModule = id => {
  return axios({
    url: '/apiShow/module/' + id,
    method: 'delete'
  })
}

const putModule = data => {
  return axios({
    url: '/apiShow/module',
    method: 'put',
    data
  })
}

const addFunction = data => {
  return axios({
    url: '/apiShow/function',
    method: 'post',
    data
  })
}

const deleteFunction = id => {
  return axios({
    url: '/apiShow/function/' + id,
    method: 'delete'
  })
}

const putFunction = data => {
  return axios({
    url: '/apiShow/function',
    method: 'put',
    data
  })
}

export default {
  getProjectDetail,
  addModule,
  deleteModule,
  putModule,
  addFunction,
  deleteFunction,
  putFunction
}
