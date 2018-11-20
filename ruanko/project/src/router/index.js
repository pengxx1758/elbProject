import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import {getName} from "@/util/auth";
Vue.use(Router)
//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
//heiheiheiheihie 
const route = new Router({
  mode:"hash",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})

const whiteList = ['/login', '/regist'];
const test = true;
route.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  }else{
    if(test){
      next();
    }else{
      if(getName() === ""){
        next({path: '/login'});
      }else{
        next();
      }
    }
  }
})

export default route

