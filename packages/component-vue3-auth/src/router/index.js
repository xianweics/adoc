import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];
const router = createRouter({
  history: createWebHistory('/vue3'),
  routes
});

export default router;
