import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import customer from './modules/customer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    customer,
    cart,
    user
  }
})