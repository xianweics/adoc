import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import createRequest from './request';

const entry = (app) => {
  app.use(router).use(Antd);
  app.config.globalProperties.$http = createRequest();
};
export default entry;
