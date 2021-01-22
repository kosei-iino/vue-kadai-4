import Vue from 'vue'
import Router from 'vue-router'

import logIn from './components/logIn'
import signUp from './components/signUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: logIn,
      name: 'logIn'
    },
    {
      path: '/signUp',
      component: signUp,
      name: 'signUp'
    },
  ]
})