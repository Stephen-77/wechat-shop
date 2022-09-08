
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
	   title: '数据加载中...'
  })
  if(options.url.indexOf('/my/')!=-1){
	  options.header={
		   // 字段的值可以直接从 vuex 中进行获取
		        Authorization: store.state.m_user.token,
	  }
  }
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'error',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,store
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