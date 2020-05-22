import singleSpaAngular from 'single-spa-angularjs';
import angular from 'angular';
import './root.component.js';

const angularLifecycles = singleSpaAngular({
  angular,
  function () {
    return document.getElementById('angular-spa');
  },
  mainAngularModule: 'angular-spa',
  template:'<root/>'
});

export const bootstrap = angularLifecycles.bootstrap;
export const mount = angularLifecycles.mount;
export const unmount = angularLifecycles.unmount;
