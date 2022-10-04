
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
Vue.config.productionTip = false
uni.$http = $http
uni.$showMsg = function(title = '数据请求失败', duration = 1500 ){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
App.mpType = 'app'
$http.baseUrl='https://api-ugo-web.itheima.net'
$http.beforeRequest = function(){
  uni.showLoading({
    title:'正在请求'
  })
}
$http.afterRequest = function(){
  uni.hideLoading()
}

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif