<template>
  <div class="logIn">
    <header>
      <p>ログイン</p>
    </header>

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
            <input type="password" placeholder="Password" v-model="password" />
          </td>
        </tr>
      </table>
    </div>

    <span class="buttons">
      <button @click="login('dashBoard')">ログイン</button>
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
  created() {
    this.$store.dispatch('onAuth');
  },
  methods: {
    async login(pageName) {
      await this.$store.dispatch('login', {
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
