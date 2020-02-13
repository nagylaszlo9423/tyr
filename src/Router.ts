import VueRouter, {RouteConfig} from 'vue-router';
import MapPage from './components/map/MapPage.vue';
import NotFoundPage from './components/common/NotFoundPage.vue';
import ProfilePage from './components/profile/ProfilePage.vue';
import SearchPage from './components/search/SearchPage.vue';
import GroupsPage from './components/groups/GroupsPage.vue';
import RoutesPage from './components/routes/RoutesPage.vue';
import SettingsPage from './components/settings/SettingsPage.vue';

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
  {
    path: '/pages',
    component: () => import('./components/Pages.vue'),
    meta: {
      isAuthenticated: true
    },
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
      },
      {
        path: 'groups',
        name: 'groups',
        component: GroupsPage,
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: 'routes',
        name: 'routes',
        component: RoutesPage,
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsPage,
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
