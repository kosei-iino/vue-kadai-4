import Vue from 'vue'
import Router from 'vue-router'
import firebase from './firebase.config'

import logIn from './components/logIn'
import signUp from './components/signUp'
import dashBoard from './components/dashBoard'

Vue.use(Router)

const router = new Router({
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
    {
      path: '/dashBoard',
      component: dashBoard,
      name: 'dashBoard',
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    });
  } else {
    next()
  }
})

export default router