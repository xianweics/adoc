import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';
import { Button, message, Input, Form,Row, Col,Space ,Table} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import store from './store';
import createRequest from './utils/request';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecycle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    app.use(router);
    app.use(store);
    app.use(Button).use(Input).use(Form).use(Row).use(Col).use(Space).use(Table)
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$http = createRequest();
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
