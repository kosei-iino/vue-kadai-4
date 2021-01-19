import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from './firebase.config'

Vue.config.productionTip = false
firebase.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')