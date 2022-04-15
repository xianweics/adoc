import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './src/App';
import './src/globalInject';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (r) => r(App)
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
