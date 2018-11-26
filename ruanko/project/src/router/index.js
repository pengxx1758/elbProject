import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'
import shopRegist from '@/components/shop_regist'
import shop_show from '@/components/shop_show'
import order from '@/components/order'
import {getName} from "@/util/auth";
Vue.use(Router)

const route = new Router({
  mode:"history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: register,
    },
    {
      path: '/shopRegist',
      name: 'shopRegist',
      component: shopRegist
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/mainIndex/',
      name: 'index',
      component: index,
      childrens: [
        {
          path: '/shop/:typeName',
          component: shop_show,
        }
      ]
    },
    
  ]
})

const whiteList = ['/login', '/regist'];
const test = true;

// route.beforeEach((to, from, next) => {
//   if (whiteList.indexOf(to.path) !== -1) {
//     next();
//   }else{
//     if(test){
//       next();
//     }else{
//       if(getName() === ""){
//         next({path: '/login'});
//       }else{
//         next();
//       }
//     }
//   }
// })

export default route

