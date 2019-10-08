import VueRouter, {RouteConfig} from "vue-router";
import Pages from "./components/Pages.vue";
import MapPage from "./components/map/MapPage.vue"
import LoginPage from "./components/auth/LoginPage.vue";
import RegistrationPage from "./components/auth/RegistrationPage.vue";
import NotFoundPage from "./components/common/NotFoundPage.vue";
import ProfilePage from "./components/profile/ProfilePage.vue";
import SearchPage from "./components/search/SearchPage.vue"

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
    children: [
      {
        path: '',
        redirect: '/pages/map',
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: 'search',
        name: 'search',
        component: SearchPage,
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: 'map',
        name: 'map',
        component: MapPage,
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
          isAuthenticated: true
        }
      }
    ]
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

export const router = new VueRouter({routes});
