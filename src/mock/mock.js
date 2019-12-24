/*
 * @Author: your name
 * @Date: 2019-12-03 20:50:00
 * @LastEditTime: 2019-12-18 14:25:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \APIShow\APIShow\src\mock\mock.js
 */
import Mock from 'mockjs'

Mock.mock('http://localhost:8080/Login', 'post', function(option) {
  // console.log(JSON.parse(option.body).account)
  const data = JSON.parse(option.body)
  if (data.account === 'admin' && data.password === '123456') {
    return Mock.mock({
      code: 200,
      message: '登陆成功',
      token: '115226337448'
    })
  } else {
    return Mock.mock({
      code: 100,
      message: '账号或密码错误'
    })
  }
})

Mock.mock('http://localhost:8080/addUser', 'post', function(option) {
  // 打印相关参数
  console.log(option)

  return Mock.mock({
    status: 200,
    message: 'get userList success'
  })
})

Mock.mock('http://localhost:8080/getProjectList', 'get', {
  status: 200,
  message: 'get userList success',
  'data|2-6': [
    {
      projectId: '@increment(1)',
      name: '@cword(2,8)',
      imgURL: '@image()'
    }
  ]
})

Mock.mock('http://localhost:8080/postProject', 'post', {
  status: 200,
  message: 'Add project success'
})

const data = [
  {
    moduleName: 'model1',
    functionList: ['func1', '功能2', '功能3']
  }, {
    moduleName: '模块2',
    functionList: ['功能1', '功能2']
  }, {
    moduleName: '模块3',
    functionList: ['功能1', '功能2', '功能3']
  }
]

Mock.mock(RegExp('http://localhost:8080/getProjectDetail' + '.*'), 'get', function(option) {
  console.log(option)
  return Mock.mock({

    status: 200,
    message: 'get ProjectDetail success',
    data

  })
})

Mock.mock(RegExp('http://localhost:8080/addModule' + '.*'), 'post', function(option) {
  console.log(option.body)
  data.push(JSON.parse(option.body))
  return Mock.mock({
    status: 200,
    message: 'add module success'
  })
})

Mock.mock(/\/deleteModule/, 'delete', function(option) {
  // console.log(option.body)
  const id = /\/deleteModule\/(\d+)/.exec(option.url)[1]
  console.log(id)
  data.splice(id, 1)
  return Mock.mock({
    status: 200,
    message: 'add module success'
  })
})
