<template>
    <div class="content">
        <h1>Hello Vue 2 spa</h1>
        <div><img :src="imgSrc" width="100px"></div>
        <a href="/react-spa">from vue to react</a>
        <div class="input-group">
            Name: <input type="text" v-model="name">
            Age: <input type="text" v-model="age">
        </div>
        <div class="btn-group">
            <button @click="getUsers">Get users list</button>
            <button @click="delUser" :disabled="activeId === 0">Delete user</button>
            <button @click="addUser">Add user</button>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="users.length > 0">
                <tr v-for="item in users" @click="activeId = item.id" :key="item.id" :class="{'active':item.id === activeId}">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.age}}</td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td colspan="3">Not data</td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
  import src from '../office365.png';

  export default {
    data () {
      return {
        imgSrc: src,
        users: [],
        activeId: 0,
        name: '',
        age: 0
      };
    },
    methods: {
      async getUsers () {
        this.users = await this.$http.get('users');
        this.activeId = 0;
      },
      async delUser () {
        await this.$http.delete(`users/${this.activeId}`);
        this.getUsers();
      },
      async addUser () {
        await this.$http.post('users', {
          name: this.name,
          age: this.age,
        });
        this.getUsers();
      }
    }
  };
</script>
