import {RouteConfig} from 'vue-router';
import ProfilePage from '@/components/profile/ProfilePage.vue';


export const profileRoutes: RouteConfig = {
  path: 'profile',
  name: 'profile',
  component: ProfilePage,
  meta: {
    isAuthenticated: true
  }
};
