<template>
  <div class="wrap">
    <h1>Vue 3</h1>

    <a-space direction="vertical" style="width: 100%;">
      <div style="text-align: right">
        <a-button type="primary" @click="goReact">to React17</a-button>
      </div>
      <a-form
        :model="formState"
        name="horizontal_login"
        layout="inline"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-row style="width: 100%;">
          <a-col span="9">
            <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名' }]">
              <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="9">
            <a-form-item label="年龄" name="age" :rules="[{ required: true, message: '请输入年龄' }]">
              <a-input v-model:value="formState.age"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item>
              <a-space>
                <a-button :disabled="disabled" type="primary" html-type="submit">添加</a-button>
                <a-button type="primary" @click="getUsers">刷新</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table :dataSource="dataSource" :columns="columns" rowKey="id" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="danger" @click="delUser(record.id)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-space>
  </div>
</template>
<script>
import { defineComponent, reactive, computed, getCurrentInstance, ref, onMounted } from 'vue';
export default defineComponent({

  setup() {
    const { proxy } = getCurrentInstance()
    const { $http } = proxy
    const formState = reactive({
      name: '',
      age: '',
    });

    const onFinish = async values => {
      await $http.post("users", values);
      await getUsers();
      formState.name = ''
      formState.age = ''
    };

    const disabled = computed(() => {
      return !(formState.name && formState.age);
    });

    let dataSource = ref([])
    let loading = ref(true)

    const getUsers = async () => {
      loading.value = true
      dataSource.value = await $http.get("users");
      loading.value = false
    }

    const delUser = async (id) => {
      await $http.delete(`users/${id}`);
      await getUsers();
    }

    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        key: 'action',
      },

    ]

    const goReact = () => {
      window.location.href = '/react'
    }

    onMounted(() => {
      getUsers()
    })
    return {
      formState,
      dataSource,
      columns,
      onFinish,
      disabled,
      getUsers,
      delUser,
      loading,
      goReact
    };
  },

});
</script>

<style lang="less" scoped>
@import "../styles/home.less";
</style>