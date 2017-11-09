import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    continua: {
      title: '',
      values: ''
    },
    discreta: {
      title: '',
      values: '',
      indice: [],
      frequence: [],
      res: false
    }
  },
  actions: {
  },
  mutations: {
    SET_DISCRETA(state, response){
      state.discreta = response
      console.log(state.discreta)
    }
  },
  getters: {
  },  
  modules: {
    
  }
})

export default store