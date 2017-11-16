import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    continua: {
      title: '',
      values: '',
      min: 0,
      max: 0,
      fi: [],
      fia: [],
      fri: [],
      fria: [],
      amplitude: 0,
      indice: [],
      media: 0,
      mediana: 0,
      res: false
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
      mediana: 0,
      res: false
    }
  },
  actions: {
  },
  mutations: {
    SET_DISCRETA(state, response){
      state.discreta = response
    },
    SET_CONTINUA(state, response){
      state.continua = response
    }
  },
  getters: {
  },  
  modules: {
    
  }
})

export default store