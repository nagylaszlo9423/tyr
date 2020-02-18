import {RouteConfig} from 'vue-router';
import RoutesPage from '@/components/routes/RoutesPage.vue';


export const routeRoutes: RouteConfig = {
  path: 'routes',
  name: 'routes',
  component: RoutesPage,
  meta: {
    isAuthenticated: true
  }
};
