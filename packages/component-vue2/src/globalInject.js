import Vue from 'vue';
import './global.scss';
import createRequest from './request';
Vue.prototype.$http = createRequest();
Vue.config.productionTip = false;
