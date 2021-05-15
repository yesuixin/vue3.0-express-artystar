/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 16:46:53
 * @,@LastEditTime: ,: 2020-11-20 21:22:27
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \client\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(MuseUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
