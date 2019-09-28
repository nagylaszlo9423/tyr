import VueRouter, {RouteConfig} from "vue-router";
import Pages from "../components/Pages.vue";
import TyrMap from "../components/map/TyrMap.vue";
import LoginPage from "../components/auth/LoginPage.vue";
import RegistrationPage from "../components/auth/RegistrationPage.vue";
import NotFoundPage from "../components/common/NotFoundPage.vue";
import ProfilePage from "../components/profile/ProfilePage.vue"

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegistrationPage
  },
  {
    path: '/',
    component: Pages,
    redirect: '/map',
    children: [
      {
        path: '/map',
        name: 'map',
        component: TyrMap
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: '*',
    component: NotFoundPage
  }
];

export default new VueRouter({mode: 'history', routes})
