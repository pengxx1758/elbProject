// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs';
Vue.config.productionTip = false

let bus = new Vue()
Vue.prototype.$bus= bus
Vue.prototype.$http = axios
Vue.prototype.HOST = '/idea'
Vue.prototype.$isLogin = true;
Vue.use(ElementUI);

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 使用qs对参数进行处理
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.data = qs.stringify(config.data) 
  return config
}, function (error) {
  // 对请求错误做些什么
  // console.log("error");
  return Promise.reject(error)
})


new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})
