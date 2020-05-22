import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import Root from './root.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: r => r(Root)
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
