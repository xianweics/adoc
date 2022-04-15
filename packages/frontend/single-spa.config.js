import { registerApplication, start } from 'single-spa';
import './style.scss';

const pathPrefix =
  (...paths) =>
  (location) =>
    paths.includes(location.pathname);

registerApplication(
  'vue-spa',
  () => import('@project/component-vue2'),
  pathPrefix('/vue-spa')
);

registerApplication(
  'react-spa',
  () => import('@project/component-react17'),
  pathPrefix('/react-spa')
);

// registerApplication(
//   'auth-spa',
//   () => import('./authSpa/src/main.js'),
//   pathPrefix('/auth-spa', '/')
// );

start();
