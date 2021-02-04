<template>
  <div class="dashBoard">
    <header>
      <button @click="logout">ログアウト</button>
    </header>
    <p class="status">{{ status }}</p>
    <div class="modal-content" v-show="showWalletDialog">
      <p>{{ this.name }}さんの残高</p>
      <p>{{ this.wallet }}</p>
      <p class="dialog-button">
        <button @click="hiddenWallet">close</button>
      </p>
    </div>

    <div class="modal-content" v-show="showSendDialog">
      <p>あなたの残高：{{ userData.wallet }}</p>
      <p>送る金額</p>
      <input type="number" onkeydown="return event.keyCode !== 69" v-model="inputMoney" />
      <p class="dialog-button">
        <button @click="sendWallet">送信</button>
      </p>
    </div>

    <div class="fader" v-show="showFader"></div>

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
            <button @click="displayWalletDialog(users.displayName, users.wallet)">
              walletを見る
            </button>
          </td>
          <td>
            <button @click="displaySendDialog(users.uid, users.wallet)">送る</button>
          </td>
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
      showWalletDialog: false,
      showSendDialog: false,
      showFader: false,
      uid: '',
      name: '',
      wallet: 0,
      myWallet: 0,
      inputMoney: '',
      status: '',
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
    displayWalletDialog(name, wallet) {
      this.name = name;
      this.wallet = wallet;
      this.showWalletDialog = true;
      this.showFader = true;
    },
    displaySendDialog(uid, wallet) {
      this.uid = uid;
      this.wallet = wallet;
      this.showSendDialog = true;
      this.showFader = true;
    },
    async sendWallet() {
      const user = this.$store.getters.getUser;
      this.status = await this.$store.dispatch('sendWallet', {
        uid: this.uid,
        wallet: this.wallet,
        inputMoney: this.inputMoney,
        myUid: user.uid,
        myWallet: user.wallet,
      });
      await this.$store.dispatch('onAuth');
      this.showSendDialog = false;
      this.showFader = false;
    },
    hiddenWallet() {
      this.showWalletDialog = false;
      this.showFader = false;
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
