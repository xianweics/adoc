import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import createRequest from '../../utils/request';

import {
  Layout,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Icon,
  Dropdown,
  Spin,
  Menu,
  Drawer,
  message,
  ConfigProvider,
  FormModel,
  Space
} from 'ant-design-vue';

Vue.use(Layout);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(Spin);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(ConfigProvider);
Vue.use(FormModel);
Vue.use(Space);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;

Vue.config.productionTip = false;
Vue.prototype.$http = createRequest(localStorage, 'auth');

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (r) => r(App),
    router
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
