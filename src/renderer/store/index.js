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
      fi: [],
      fia: [],
      fri: [],
      fria: [],
      media: 0,
      moda: 0,
      desvio_padrao: 0,
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