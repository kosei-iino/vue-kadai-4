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
        //自身のユーザーの内容を保存
        userSave(state, userData) {
            state.user.userData = userData;
        },
    },
    getters: {
        getUser: state => state.user.userData,
    },
    actions: {
        //サインアップ処理
        async signup(context, data) {
            try {
                //ユーザ作成
                const userData = await firebase.auth().createUserWithEmailAndPassword(data.mailAddress, data.password);

                //uidを保持
                const uid = userData.user.uid;

                //ユーザのプロフィールにユーザIDを追加
                await userData.user.updateProfile({ displayName: data.userName });

                //Vuex保存用+データベース保存用データ作成
                const userContent = { uid: uid, displayName: data.userName, wallet: 1000 };

                //データベースにデータを登録
                firebase.database().ref('users/' + uid).set(userContent);

                //Vuexに保存
                context.commit('userSave', userContent);

            } catch (e) {
                console.log(e);
            }
        },
        //ログイン処理
        async login(context, data) {
            try {
                //ユーザ情報でログイン
                const userData = await firebase.auth().signInWithEmailAndPassword(data.mailAddress, data.password);

                //uidを保持
                const uid = userData.user.uid;

                //uidを基にデータベースへ接続
                firebase.database().ref('users/' + uid).on("value", (data) => {
                    if (data.val() !== null) {

                        //データベースのデータ取得
                        const databaseData = data.val();

                        //Vuex保存用データ作成
                        const userContent = { uid: uid, displayName: userData.user.displayName, wallet: databaseData.wallet };

                        //Vuexに保存
                        context.commit('userSave', userContent);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        //ページ更新等したら再度ログイン
        async onAuth(context) {
            try {
                //ユーザーが切り替わっていないか確認
                await firebase.auth().onAuthStateChanged(user => {
                    if (user) {

                        //uidを保持
                        const uid = user.uid;

                        //uidを基にデータベースへ接続
                        firebase.database().ref('users/' + uid).on("value", (data) => {
                            if (data.val() !== null) {

                                //データベースのデータ取得
                                const databaseData = data.val();

                                //Vuex保存用データ作成
                                const userContent = ({ uid: uid, displayName: user.displayName, wallet: databaseData.wallet });

                                //Vuexに保存
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