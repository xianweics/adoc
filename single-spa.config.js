import { registerApplication, start } from 'single-spa';
import './client/style.scss';

const pathPrefix = (...paths) => (location) => paths.includes(location.pathname);

registerApplication(
  'vue-spa',
  () => import('./client/vue-spa/index.js'),
  pathPrefix('/vue-spa')
);

registerApplication(
  'react-spa',
  () => import('./client/react-spa/index.js'),
  pathPrefix('/react-spa', '/')
);

start();
