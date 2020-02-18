import {RouteConfig} from 'vue-router';
import SearchPage from '@/components/search/SearchPage.vue';

export const searchRoutes: RouteConfig = {
  path: 'search',
  name: 'search',
  component: SearchPage,
  meta: {
    isAuthenticated: true
  }
};
