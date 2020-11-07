import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = "toutiao-user"

export default new Vuex.Store({
  state: {
    user:getItem(USER_KEY)
    // user:JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser(state,data){
      state.user = data
      // window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
