import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import rootComponent from './src/App.js';
import React from 'react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
