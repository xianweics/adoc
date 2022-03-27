import { registerApplication, start } from 'single-spa'
import './style.scss'

const pathPrefix =
  (...paths) =>
    (location) =>
      paths.includes(location.pathname)

registerApplication(
  'vue-spa',
  () => import('./vueSpa/index.js'),
  pathPrefix('/vue-spa')
)

registerApplication(
  'react-spa',
  () => import('./reactSpa/index.js'),
  pathPrefix('/react-spa', '/')
)

start()
