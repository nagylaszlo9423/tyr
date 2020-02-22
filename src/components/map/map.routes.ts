import {RouteConfig} from 'vue-router';
import MapPage from '@/components/map/map.page.vue';


export const mapRoute: RouteConfig = {
  path: 'map',
  name: 'map',
  component: MapPage,
  meta: {
    isAuthenticated: true
  }
};