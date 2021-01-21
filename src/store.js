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
        userSave(state, userData) {
            state.user.userData = userData;
        }
    },
    actions: {
        async signup(context, data) {
            try {
                const userData = await firebase.auth().createUserWithEmailAndPassword(data.mailAddress, data.password);
                await userData.user.updateProfile({ displayName: data.userName });
                context.commit('userSave', userData);
            } catch (e) {
                console.log(e);
            }
        },
        async login(context, data) {
            try {
                const userData = await firebase.auth().signInWithEmailAndPassword(data.mailAddress, data.password);
                context.commit('userSave', userData);
            } catch (e) {
                console.log(e);
            }
        },
        onAuth(context) {
            firebase.auth().onAuthStateChanged(user => {
                const userData = user ? user : {};
                context.commit('userSave', userData);
                console.log(user);
            });
        }
    }
})