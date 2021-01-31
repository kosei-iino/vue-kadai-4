<template>
  <div class="dashBoard">
    <header>
      <button click="logout()">ログアウト</button>
    </header>
    <br />

    <div class="modal-content" v-show="showDialog">
      <p>{{ this.watchName }}さんの残高</p>
      <p>{{ this.watchWallet }}</p>
      <p class="dialog-button"><button @click="hiddenWallet">close</button></p>
    </div>
    <div class="fader" v-show="showDialog"></div>

    <div class="userInformation">
      <label>{{ userData.displayName }}さん、ようこそ！！</label>
      <label>残高：{{ userData.wallet }}</label>
    </div>

    <div class="content">
      <h1>ユーザ一覧</h1>
      <table>
        <tr>
          <td colspan="3">
            <label class="title">ユーザ名</label>
          </td>
        </tr>
        <tr v-for="(users, key) in usersData" :key="key">
          <td class="displayName">{{ users.displayName }}</td>
          <td>
            <button @click="displayWallet(users.displayName, users.wallet)">
              walletを見る
            </button>
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
  data() {
    return {
      showDialog: false,
      watchName: '',
      watchWallet: '',
    };
  },
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
    displayWallet(name, wallet) {
      this.watchName = name;
      this.watchWallet = wallet;
      this.showDialog = true;
    },
    hiddenWallet() {
      this.showDialog = false;
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
