import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCn-dqIMSHsAhyH3idbVBSB0tBX6-nDlU0",
  authDomain: "vue-kadai-4-6817c.firebaseapp.com",
  projectId: "vue-kadai-4-6817c",
  storageBucket: "vue-kadai-4-6817c.appspot.com",
  messagingSenderId: "287902422290",
  appId: "1:287902422290:web:d1719592435f91e3490fcb",
  measurementId: "G-VHDQMNLQTT"
}
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default firebase