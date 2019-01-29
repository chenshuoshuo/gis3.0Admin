import Vue from 'vue'

import axios from 'axios'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon

import './permission' // permission control

import * as filters from './filters' // global filters

import './assets/icon-font/iconfont.css'

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

axios.get(window.g.BASE_CCR + '/center/store/v1/configuration/runtimeConfig').then(res => {
  if (res.data.code === 0) {
    var data = JSON.parse(res.data.data)
    window.g.MAP_URL = data.mapAPI
  } else {
    Message({
      type: 'error',
      message: '地图加载失败'
    })
  }
}).finally(() => {
  new Vue({
    el: '#app',
    provide: {
      baseUrl: window.g.BASE_IPS
    },
    router,
    store,
    i18n,
    template: '<App/>',
    components: { App }
  })
})
