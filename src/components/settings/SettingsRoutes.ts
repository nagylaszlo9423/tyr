import {RouteConfig} from 'vue-router';
import SettingsPage from '@/components/settings/SettingsPage.vue';


export const settingsRoutes: RouteConfig = {
  path: 'settings',
  name: 'settings',
  component: SettingsPage,
  meta: {
    isAuthenticated: true
  }
};
