/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 16:46:53
 * @,@LastEditTime: ,: 2020-11-20 18:00:23
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \client\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/wchart'
        },
        {
          path: '/wchart',
          name: 'wchart',
          component: () => import('./views/Wchart.vue')
        },
        {
          path: '/abook',
          name: 'abook',
          component: () => import('./views/AddressBook.vue')
        },
        {
          path: '/find',
          name: 'find',
          component: () => import('./views/Find.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('./views/Mine.vue')
        }
      ]

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { 
      path: '/login',
      name: 'login', 
      component: () => import('./views/Login.vue') },//懒加载适用于页面较多的app
      { 
      path: '/publish', 
      name: 'publish', 
      component: () => import('./views/Publish.vue') },
    { 
      path: '/register', 
      name: 'register', 
      component: () => import('./views/Register.vue') },
  ]
})


// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
