import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userData: {}
        }
    },
    mutations: {
        userSave(state, userData) {
            state.user.userData = userData;
        },
    },
    getters: {
        getUser: state => state.user.userData,
    },
    actions: {
        async signup(context, data) {
            try {
                const userData = await firebase.auth().createUserWithEmailAndPassword(data.mailAddress, data.password);
                const uid = userData.user.uid;
                const displayName = data.userName;
                await userData.user.updateProfile({ displayName });
                const userContent = { uid, displayName, wallet: 1000 };
                firebase.database().ref('users/' + uid).set(userContent);
                context.commit('userSave', userContent);
            } catch (e) {
                console.log(e);
            }
        },
        async login(context, data) {
            try {
                const userData = await firebase.auth().signInWithEmailAndPassword(data.mailAddress, data.password);
                const uid = userData.user.uid;
                firebase.database().ref('users/' + uid).on("value", (data) => {
                    if (data.val() !== null) {
                        const databaseData = data.val();
                        const userContent = { uid, displayName: userData.user.displayName, wallet: databaseData.wallet };
                        context.commit('userSave', userContent);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        async onAuth(context) {
            try {
                await firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        const uid = user.uid;
                        firebase.database().ref('users/' + uid).on("value", (data) => {
                            if (data.val() !== null) {
                                const databaseData = data.val();
                                const userContent = ({ uid, displayName: user.displayName, wallet: databaseData.wallet });
                                context.commit('userSave', userContent);
                            }
                        });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
    }
})