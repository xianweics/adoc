import { registerApplication, start } from 'single-spa';

function pathPrefix (...paths) {
  return function (location) {
    return paths.includes(location.pathname);
  };
}

registerApplication(
  'vue',
  () => import('./src/vue/app.js'),
  pathPrefix('/vue')
);

registerApplication(
  'react',
  () => import('./src/react/app.js'),
  pathPrefix('/react', '/')
);

registerApplication(
  'angular',
  () => import ('./src/angular/app.js'),
  pathPrefix('/angular')
);

start();