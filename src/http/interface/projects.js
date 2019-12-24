/*
 * @Author: your name
 * @Date: 2019-12-20 09:54:27
 * @LastEditTime : 2019-12-20 15:25:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\src\http\interface\projects.js
 */
import axios from '../axios'

const getProjectList = () => {
  return axios({
    url: 'apiShow/project'
  })
}

const postProject = data => {
  return axios({
    url: 'apiShow/project',
    method: 'post',
    data
  })
}

const deleteProject = id => {
  return axios({
    url: 'apiShow/project/' + id,
    method: 'delete'
  })
}

const putProject = data => {
  return axios({
    url: 'apiShow/project',
    method: 'put',
    data
  })
}

export default {
  getProjectList,
  putProject,
  postProject,
  deleteProject
}
