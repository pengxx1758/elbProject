import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import home from '@/components/home'
import index from '@/components/index'
import index_content from '@/components/index_content'
import login from '@/components/login_regist/login'
import register from '@/components/login_regist/register'
import shopRegist from '@/components/login_regist/shop_regist'
import shop_show from '@/components/shop_show'

import profile from '@/components/customer/profile'
import user_info from '@/components/customer/user_info'
import order from '@/components/customer/order'
import address from '@/components/customer/address'
import favor from '@/components/customer/favor'

import manager from '@/components/manager/manager'
import manager_customer from '@/components/manager/manager_customer'
import manager_merchant from '@/components/manager/manager_merchant'
import manager_check from '@/components/manager/manager_check'

import product from '@/components/product'
import order_check from '@/components/order_check'

import merchant from '@/components/merchant/merchant'
import merchant_info from '@/components/merchant/merchant_info'
import merchant_product from '@/components/merchant/merchant_product'
import merchant_static from '@/components/merchant/merchant_static'
import merchant_order from '@/components/merchant/merchant_order'
 
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
        },
        {
          path: 'merchantCheck',
          component: manager_check
        }
      ],
    },
    {
      path: '/product',
      component: product,
    },
    {
      path: '/ordercheck',
      component: order_check
    },
    {
      path: '/merchant',
      component: merchant,
      children: [
        {
          path: 'merchant_info',
          component: merchant_info,
          alias: '/merchant'
        },
        {
          path: 'merchant_product',
          component: merchant_product,
        },
        {
          path: 'merchant_static',
          component: merchant_static
        },
        {
          path: 'merchant_order',
          component: merchant_order
        }
      ]
    }


  ]
})

const whiteList = ['/login', '/regist','/shopRegist'];
const test = false;

route.beforeEach((to, from, next) => {
  sessionStorage.getItem("isLogin")
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  }else{
    if(test){
      next();
    }else{
      if(sessionStorage.getItem("isLogin") == null){
        next({path: '/login'});
      }else{
        next();
      }
    }
  }
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
  // next();
})

export default route

