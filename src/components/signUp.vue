<template>
  <div class="signUp">
    <!--ヘッダー-->
    <header>
      <p>新規登録画面</p>
    </header>

    <!--内容-->
    <div class="content">
      <table>
        <tr>
          <td>
            <label class="title">ユーザ名</label>
          </td>
          <td>
            <input type="text" placeholder="UserName" v-model="userName" />
          </td>
        </tr>
        <tr>
          <td>
            <label class="title">メールアドレス</label>
          </td>
          <td>
            <input type="text" placeholder="E-mail" v-model="mailAddress" />
          </td>
        </tr>
        <tr>
          <td>
            <label class="title">パスワード</label>
          </td>
          <td>
            <input type="text" placeholder="Password" v-model="password" />
          </td>
        </tr>
      </table>
    </div>

    <!--ページ移動-->
    <span class="buttons">
      <button @click="signup()">新規登録</button>
    </span>
    <br />
    <button @click="movePage('/')">ログインはこちら</button>
  </div>
</template>

<script>
import firebase from '../firebase.config';

export default {
  name: 'signUp',
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: '',
    };
  },
  created() {
    firebase.onAuth();
  },
  methods: {
    signup() {
      //サインアップ
      firebase.signup({
        userName: this.userName,
        mailAddress: this.mailAddress,
        password: this.password,
      });
    },
    //ページ遷移
    movePage(pageName) {
      //指定のパスへ移動
      this.$router.push(pageName);
    },
  },
};
</script>
