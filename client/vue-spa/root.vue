<template>
    <div class="content">
        <h1 @click="test">Hello from Vue 2 spa</h1>
        <a href="/react-spa">from vue to react</a>
    </div>
</template>

<script>
  export default {
    methods:{
      async test(){
        let result = await this.$http.get('users');
        console.info(result)
      }
    }
  }
</script>