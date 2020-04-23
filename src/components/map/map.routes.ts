import {RouteConfig} from 'vue-router';
import MapPage from '@/components/map/map.page.vue';

export enum MapPageType {
  EDIT = 'edit'
}

export const mapRoutes: RouteConfig[] = [
  {
    path: 'map',
    name: 'map',
    component: MapPage,
    meta: {
      isAuthenticated: true,
      showTitleBarSearchButton: true,
      showTitleBarSearchField: false
    }
  },
  {
    path: 'map/:state',
    name: 'edit-map',
    component: MapPage,
    meta: {
      isAuthenticated: true,
      showTitleBarSearchButton: true,
      showTitleBarSearchField: false
    }
  }
];
