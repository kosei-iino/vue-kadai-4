<template>
  <div class="signUp">
    <header>
      <p>新規登録画面</p>
    </header>

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

    <span class="buttons">
      <button @click="signup('dashBoard')">新規登録</button>
    </span>
    <br />
    <button @click="movePage('/')">ログインはこちら</button>
  </div>
</template>

<script>
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
    this.$store.dispatch('onAuth');
  },
  methods: {
    async signup(pageName) {
      await this.$store.dispatch('signup', {
        userName: this.userName,
        mailAddress: this.mailAddress,
        password: this.password,
      });
      this.$router.push(pageName);
    },
    movePage(pageName) {
      this.$router.push(pageName);
    },
  },
};
</script>
