<template>
  <div class="logIn">
    <!--ヘッダー-->
    <header>
      <p>ログイン</p>
    </header>

    <!--内容-->
    <div class="content">
      <table>
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
      <button @click="logIn()">ログイン</button>
    </span>
    <br />
    <button @click="movePage('signUp')">新規登録はこちら</button>
  </div>
</template>

<script>
export default {
  name: 'logIn',
  data() {
    return {
      mailAddress: '',
      password: '',
    };
  },
  methods: {
    logIn() {
      //ログイン
      this.$store.dispatch('logIn', {
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
