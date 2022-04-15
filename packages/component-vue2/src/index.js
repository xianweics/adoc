import Vue from 'vue';
import './globalInject';
import App from './App';
const vm = new Vue({
  render: (h) => h(App)
});
vm.$mount('#app');
