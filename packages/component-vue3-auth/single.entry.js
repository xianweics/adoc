import { createApp } from 'vue';
import App from './src/App.vue';
import router from './src/router';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: (h) => h(App)
  },
  handleInstance: (app) => {
    app.use(router);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
