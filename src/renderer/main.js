import Vue from 'vue'
import VueMaterial from 'vue-material'

import App from './App'
import router from './router'
import store from './store'

import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'blue-grey',
  accent: 'green',
  warn: 'red',
  success: 'green'
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
