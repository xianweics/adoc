<template>
  <div class="login">
    <div class="form">
      <div class="title">系统登录</div>
      <div class="form-item">
        <div class="label">用户名</div>
        <input v-model="userName" type="text" class="value" />
      </div>
      <div class="form-item">
        <div class="label">密码</div>
        <input v-model="password" type="password" class="value" />
      </div>
      <div class="form-btn">
        <div class="confirm" @click="login">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    async getUsers() {
      this.users = await this.$http.get("user");
      this.activeId = 0;
    },
    async login() {
      const { userName, password } = this;
      const res = await this.$http.post("login", {
        userName,
        password,
      });
      console.log(res);
    },
  },
};
</script>

<style lang="less">
@import "../styles/login.less";
</style>
