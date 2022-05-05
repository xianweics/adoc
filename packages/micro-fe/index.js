import { registerApplication, start } from 'single-spa';
import 'systemjs';
const pathPrefix = (path) => (loc) => loc.pathname.startsWith(path);

const insertStyle = (href) => {
  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';
  link.id = '@demo/vue2/css';
  document.querySelector('head').appendChild(link);
};
registerApplication(
  'vue2',
  async () => {
    insertStyle(window.System.resolve('@demo/vue2/css'));
    return window.System.import('@demo/vue2');
  },
  pathPrefix('/vue2')
);

registerApplication(
  'vue3-auth',
  async () => {
    insertStyle(window.System.resolve('@demo/vue3/css'));
    return window.System.import('@demo/vue3');
  },
  pathPrefix('/vue3-auth')
);

registerApplication(
  'react17',
  async () => {
    insertStyle(window.System.resolve('@demo/react17/css'));
    return window.System.import('@demo/react17');
  },
  pathPrefix('/react17')
);

const home = {
  bootstrap: () =>
    Promise.resolve().then(() => {
      console.info('home bootstrap');
    }),
  mount: () =>
    Promise.resolve().then(() => {
      console.info('home mount');
    }),
  unmount: () =>
    Promise.resolve().then(() => {
      console.info('home unmount');
    })
};

registerApplication('home', home, pathPrefix('/'));

start();
