import VueRouter, {RouteConfig} from 'vue-router';
import NotFoundPage from './components/common/NotFoundPage.vue';
import {pagesRoutes} from '@/components/PagesRoutes';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/pages'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/auth/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'registration',
    component: () => import('./components/auth/RegistrationPage.vue')
  },
  pagesRoutes,
  {
    path: '**',
    component: NotFoundPage
  }
];

export const router = new VueRouter({routes});
