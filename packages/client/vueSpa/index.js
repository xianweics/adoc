import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import Root from "./rootComponent.vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { sentry } from "../../config";
import createRequest from "../utils/request";

sentry.open &&
  Sentry.init({
    dsn: sentry.dsn,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  });

Vue.prototype.$http = createRequest(localStorage, "vue");

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (r) => r(Root),
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
