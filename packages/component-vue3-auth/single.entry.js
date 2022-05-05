import { createApp } from 'vue';
import App from './src/App.vue';
import singleSpaVue from 'single-spa-vue';
import entry from './src/entry';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: (h) => h(App)
  },
  handleInstance: (app) => {
    entry(app);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
