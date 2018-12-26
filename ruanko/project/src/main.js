// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import storage from 'good-storage'
import qs from 'qs';
// Vue.config.productionTip = false;

// axios.interceptors.response.use(res=>{
//   console.log(res)
//   if(res.status == '400'){
        
//   }
//   return res;
// })

let bus = new Vue()
Vue.prototype.$bus= bus
Vue.prototype.$store = store
Vue.prototype.$session = storage.session
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios
Vue.prototype.HOST = '/idea'
Vue.prototype.$isLogin = false;
Vue.use(ElementUI);



new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})
