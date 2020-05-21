import VueRouter, {RouteConfig} from 'vue-router';
import NotFoundPage from './components/common/not-found.page.vue';
import {pagesRoutes} from '@/components/pages.routes';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/pages'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/auth/login.page.vue')
  },
  {
    path: '/login/google',
    name: 'googleLogin',
    component: () => import('./components/auth/login.page.vue'),
    meta: {
      social: 'google'
    }
  },
  {
    path: '/login/facebook',
    name: 'facebookLogin',
    component: () => import('./components/auth/login.page.vue'),
    meta: {
      social: 'facebook'
    }
  },
  {
    path: '/register',
    name: 'registration',
    component: () => import('./components/auth/registration.page.vue')
  },
  pagesRoutes,
  {
    path: '**',
    component: NotFoundPage
  }
];

export const router = new VueRouter({routes, mode: 'history'});
