import VueRouter, {RouteConfig} from "vue-router";
import Pages from "./components/Pages.vue";
import TyrMap from "./components/map/TyrMap.vue";
import LoginPage from "./components/auth/LoginPage.vue";
import RegistrationPage from "./components/auth/RegistrationPage.vue";
import NotFoundPage from "./components/common/NotFoundPage.vue";
import ProfilePage from "./components/profile/ProfilePage.vue";
import SearchPage from "./components/search/SearchPage.vue"
import {authGuard} from "./guards/AuthGuard";

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/pages'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/pages',
    component: Pages,
    beforeEnter: authGuard,
    children: [
      {
        path: '',
        redirect: '/pages/map'
      },
      {
        path: 'search',
        name: 'search',
        component: SearchPage
      },
      {
        path: 'map',
        name: 'map',
        component: TyrMap
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

export const router =  new VueRouter({routes})
