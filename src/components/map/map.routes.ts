import {RouteConfig} from 'vue-router';
import MapPage from '@/components/map/map.page.vue';

export enum MapPageState {
  EDIT = 'edit'
}

export const mapRoutes: RouteConfig[] = [
  {
    path: 'map',
    name: 'map',
    component: MapPage,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: 'map/:state',
    name: 'edit-map',
    component: MapPage,
    meta: {
      isAuthenticated: true
    }
  }
];
