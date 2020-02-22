import {RouteConfig} from 'vue-router';
import SettingsPage from '@/components/settings/settings.page.vue';


export const settingsRoutes: RouteConfig = {
  path: 'settings',
  name: 'settings',
  component: SettingsPage,
  meta: {
    isAuthenticated: true
  }
};
