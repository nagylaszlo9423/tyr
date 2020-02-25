import {RouteConfig} from 'vue-router';
import RoutesPage from '@/components/routes/routes.page.vue';
import RouteListPage from '@/components/routes/route-list.page.vue';
import RouteEditPage from '@/components/routes/route-edit.page.vue';


export const routeRoutes: RouteConfig = {
  path: 'routes',
  name: 'routes',
  component: RoutesPage,
  meta: {
    isAuthenticated: true
  },
  children: [
    {
      path: '',
      component: RouteListPage,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: 'edit/:id',
      component: RouteEditPage,
      meta: {
        isAuthenticated: true
      }
    }
  ]
};
