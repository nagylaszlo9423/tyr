import {RouteConfig} from 'vue-router';
import {groupRoutes} from '@/components/groups/group.routes';
import {searchRoutes} from '@/components/search/search.routes';
import {mapRoutes} from '@/components/map/map.routes';
import {settingsRoutes} from '@/components/settings/settings.routes';
import {pathRoutes} from '@/components/paths/path.routes';
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
    ...mapRoutes,
    searchRoutes,
    profileRoutes,
    groupRoutes,
    pathRoutes,
    settingsRoutes
  ]
};
