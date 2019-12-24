/*
 * @Author: your name
 * @Date: 2019-12-20 09:54:27
 * @LastEditTime : 2019-12-23 14:57:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/Projects')
    },
    {
      path: '/project/:id',
      component: () => import('@/views/Document/Project')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('@/views/404')
    },
    {
      path: '/*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user')
  if (to.path === '/login') {
    user ? next({ path: '/' }) : next()
  } else {
    !user ? next({ path: '/login' }) : next()
  }
})

export default router
