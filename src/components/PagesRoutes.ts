import {RouteConfig} from 'vue-router';
import {searchRoutes} from '@/components/search/SearchRoutes';
import {mapRoute} from '@/components/map/MapRoutes';
import {profileRoutes} from '@/components/profile/ProfileRoutes';
import {groupRoutes} from '@/components/groups/GroupRoutes';
import {routeRoutes} from '@/components/routes/RouteRoutes';
import {settingsRoutes} from '@/components/settings/SettingsRoutes';


export const pagesRoutes: RouteConfig = {
  path: '/pages',
  component: () => import('./Pages.vue'),
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
    searchRoutes,
    mapRoute,
    profileRoutes,
    groupRoutes,
    routeRoutes,
    settingsRoutes
  ]
};
