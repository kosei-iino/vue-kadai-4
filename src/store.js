import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userData: {},
        }
    },
    mutations: {
        async signup(state, data) {
            try {
                const res = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(data.mailAddress, data.password);

                await res.user.updateProfile({
                    displayName: data.userName,
                });
                state.user.userData = res;
            } catch (e) {
                console.log(e);
            }
        },
    }
})