import {RouteConfig} from 'vue-router';
import {groupRoutes} from '@/components/groups/group.routes';
import {searchRoutes} from '@/components/search/search.routes';
import {mapRoute} from '@/components/map/map.routes';
import {settingsRoutes} from '@/components/settings/settings.routes';
import {routeRoutes} from '@/components/routes/route.routes';
import {profileRoutes} from '@/components/profile/profile.routes';


export const pagesRoutes: RouteConfig = {
  path: '/pages',
  component: () => import('./pages.vue'),
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
