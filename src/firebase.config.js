import firebase from 'firebase'
import store from "./store"

const firebaseConfig = {
  apiKey: "AIzaSyCn-dqIMSHsAhyH3idbVBSB0tBX6-nDlU0",
  authDomain: "vue-kadai-4-6817c.firebaseapp.com",
  projectId: "vue-kadai-4-6817c",
  storageBucket: "vue-kadai-4-6817c.appspot.com",
  messagingSenderId: "287902422290",
  appId: "1:287902422290:web:d1719592435f91e3490fcb",
  measurementId: "G-VHDQMNLQTT"
}

export default {
  init() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  async signup(data) {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.mailAddress, data.password);
      await res.user.updateProfile({ displayName: data.userName });
      store.commit('userSave', res);
    } catch (e) {
      console.log(e);
    }
  },
  async login(data) {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(data.mailAddress, data.password);
      store.commit('userSave', res);
    } catch (e) {
      console.log(e);
    }
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('userSave', user);
    });
  }
}