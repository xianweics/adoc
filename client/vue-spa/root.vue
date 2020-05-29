<template>
    <div class="content">
        <h1 @click="test">Hello from Vue 2 spa</h1>
        <div><img :src="imgSrc" width="200px"></div>
        <a href="/react-spa">from vue to react</a>
    </div>
</template>

<script>
  import src from './office365.png';
  export default {
    data () {
      return {
        imgSrc: src
      }
    },
    methods: {
      async test () {
        let result = await this.$http.get('users');
        console.info(result)
      }
    }
  }
</script>
