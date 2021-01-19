import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userData: {},
        }
    },
    mutations: {
        userSave(state, data) {
            state.user.userData = data;
        }
    },
})