import { registerApplication, start } from 'single-spa';
import 'systemjs';
const pathPrefix = (path) => (loc) => {
  return loc.pathname.startsWith(path);
};

const insertStyle = (src) => {
  const link = document.createElement('link');
  link.href = window.System.resolve(src);
  link.rel = 'stylesheet';
  link.id = src;
  document.querySelector('head').appendChild(link);
};

registerApplication(
  'vue2',
  () => {
    insertStyle('@demo/vue2/css');
    return window.System.import('@demo/vue2');
  },
  pathPrefix('/vue2')
);

registerApplication(
  'vue3-auth',
  () => {
    console.info(11);
    insertStyle('@demo/vue3/css');
    return window.System.import('@demo/vue3');
  },
  pathPrefix('/vue3')
);

registerApplication(
  'react17',
  () => {
    insertStyle('@demo/react17/css');
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

start({
  urlRerouteOnly: true
});
