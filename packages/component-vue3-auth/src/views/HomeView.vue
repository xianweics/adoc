<template>
  <div class="login">
    <div class="form">
      <div class="title">系统登录</div>
      <a-form
        :colon="false"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="用户名" name="userName">
          <a-input v-model:value="form.userName" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="form.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" style="width: 100%" @click="login">
            立即登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue';
import { Form } from 'ant-design-vue';

const form = reactive({
  userName: '',
  password: ''
});
const labelCol = reactive({ span: 5 });
const wrapperCol = reactive({ span: 18 });
const rules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
const { proxy } = getCurrentInstance();

const useForm = Form.useForm;
const { validate } = useForm(form, rules);

const login = async () => {
  try {
    const { userName, password } = await validate();
    const res = await proxy.$http.post('login', {
      userName,
      password
    });
    if (res) {
      const { accessToken, refreshToken } = res;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userName', userName);
    }
  } catch (e) {}
};
</script>

<style lang="less" scoped src="./../styles/login.less" />
