<template>
  <div class="dashBoard">
    <header>
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
  },
};
</script>
