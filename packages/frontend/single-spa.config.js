import 'systemjs';
import { registerApplication, start } from 'single-spa';
import './style.scss';

const pathPrefix = (path) => (loc) => loc.pathname.startsWith(path);

registerApplication(
  'vue2',
  () => import('@adoc/component-vue2'),
  pathPrefix('/vue2')
);

registerApplication(
  'react17',
  () => import('@adoc/component-react17'),
  pathPrefix('/react17')
);

registerApplication(
  'auth3',
  () => import('./authSpa/src/main.js'),
  pathPrefix('/vue3-auth')
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
