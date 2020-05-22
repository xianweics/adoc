import { registerApplication, start } from 'single-spa';

const pathPrefix = (...paths) => (location) => paths.includes(location.pathname);

registerApplication(
  'vue-spa',
  () => import('./src/vue-spa/index.js'),
  pathPrefix('/vue-spa')
);

registerApplication(
  'react-spa',
  () => import('./src/react-spa/index.js'),
  pathPrefix('/react-spa', '/')
);

registerApplication(
  'angular-spa',
  () => import ('./src/angular-spa/index.js'),
  pathPrefix('/angular-spa')
);

start();
