<template>
  <div class="dashBoard">
    <header>
      <button @click="logout()">ログアウト</button>
      <p>{{ userData.displayName }}さん、ようこそ！！</p>
      <p>残高：{{ userData.wallet }}</p>
    </header>

    <div class="content">
      <div>ユーザ一覧</div>
      <table>
        <tr>
          <td>
            <label class="title">ユーザ名</label>
          </td>
          <td></td>
        </tr>
        <tr v-for="(users, key) in usersData" :key="key">
          <td>{{ users.displayName }}</td>
          <td>
            <button @click="displayWallet(users.wallet)">walletを見る</button>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashBoard',
  created() {
    this.$store.dispatch('onAuth');
  },
  computed: {
    userData() {
      return this.$store.getters.getUser;
    },
    usersData() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    displayWallet(wallet) {
      alert(wallet);
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
