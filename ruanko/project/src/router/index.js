import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import index from '@/components/index'
import index_content from '@/components/index_content'
import login from '@/components/login'
import register from '@/components/register'
import shopRegist from '@/components/shop_regist'
import shop_show from '@/components/shop_show'

import profile from '@/components/profile'
import user_info from '@/components/user_info'
import order from '@/components/order'
import address from '@/components/address'
import favor from '@/components/favor'

import manager from '@/components/manager'
import manager_customer from '@/components/manager_customer'
import manager_merchant from '@/components/manager_merchant'

import { getName } from "@/util/auth"
import store from "../store"
Vue.use(Router)

const route = new Router({
  mode: "history",
  routes: [

    {
      path: '/login',
      name: 'login',
      component: login,
      alias: '/'
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
      path: '/profile',
      name: 'profile',
      meta: {
        login_required: true
      },
      component: profile,
      children: [
        {
          path: 'info',
          component: user_info,
          alias: '/profile'
        },
        {
          path: 'order',
          component: order
        },
        {
          path: 'address',
          component: address,
        },
        {
          path: 'favor',
          component: favor
        },
      ],
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
      path: '/mainIndex',
      name: 'index',
      component: index,
      children: [
        {
          path: 'index_content',
          component: index_content,
          alias: '/mainIndex'
        },
        {
          path: 'shop/:typeName',
          name: 'shop',
          component: shop_show,
        }
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager,
      children: [
        {
          path: 'customer',
          component: manager_customer,
          alias: '/manager'
        },
        {
          path: 'merchant',
          component: manager_merchant,
        }
      ],
    },

  ]
})

const whiteList = ['/login', '/regist'];
const test = true;

route.beforeEach((to, from, next) => {
  // if (whiteList.indexOf(to.path) !== -1) {
  //   next();
  // }else{
  //   if(test){
  //     next();
  //   }else{
  //     if(getName() === ""){
  //       next({path: '/login'});
  //     }else{
  //       next();
  //     }
  //   }
  // }
  // console.log(store.state.customer.isLogin);
  // console.log(to.matched);
  // if (
  //   !(store.state.customer.isLogin) &&
  //   to.matched.some(function (item) {
  //     return item.meta.login_required;
  //   })
  // ){
  //   next('/login');
  // } else {
  //   next();
  // }
  next();
})

export default route

