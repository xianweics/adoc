import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import rootComponent from "./root.component.js";
import * as Sentry from "@sentry/browser";
import { sentry } from "../../config";
import React from "react";

sentry.open &&
  Sentry.init({
    dsn: sentry.dsn,
  });

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
