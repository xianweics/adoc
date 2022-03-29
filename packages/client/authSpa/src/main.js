import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import singleSpaVue from "single-spa-vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { sentry } from "../../../config";
import request from "./request";

sentry.open &&
  Sentry.init({
    dsn: sentry.dsn,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  });

Vue.config.productionTip = false;
Vue.prototype.$http = request;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (r) => r(App),
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
