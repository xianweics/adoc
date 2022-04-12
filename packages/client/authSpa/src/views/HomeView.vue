<template>
  <div class="login">
    <div class="form">
      <div class="title">系统登录</div>
      <a-form-model
        ref="ruleForm"
        :colon="false"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名" prop="userName">
          <a-input v-model="form.userName" />
        </a-form-model-item>

        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.password" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" style="width: 100%" @click="login">
            立即登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    async getUsers() {
      this.users = await this.$http.get('user');
      this.activeId = 0;
    },
    async login() {
      let isPass = false;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          isPass = true;
        } else {
          return false;
        }
      });
      if (!isPass) return;
      const { userName, password } = this.form;
      const res = await this.$http.post('login', {
        userName,
        password
      });
      if (res) {
        const { accessToken, refreshToken } = res;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userName', userName);
      }
    }
  }
};
</script>

<style lang="less">
@import '../styles/login.less';
</style>
