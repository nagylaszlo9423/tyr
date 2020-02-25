import {RouteConfig} from 'vue-router';
import GroupsPage from '@/components/groups/groups.page.vue';
import GroupListPage from '@/components/groups/group-list.page.vue';
import GroupEditPage from '@/components/groups/group-edit.page.vue';
import GroupDetailsPage from '@/components/groups/group-details.page.vue';


export const groupRoutes: RouteConfig = {
  path: 'groups',
  name: 'groups',
  component: GroupsPage,
  meta: {
    isAuthenticated: true
  },
  children: [
    {
      path: '',
      component: GroupListPage,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: 'edit/:id',
      component: GroupEditPage,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: ':id',
      component: GroupDetailsPage,
      meta: {
        isAuthenticated: true
      }
    }
  ]
};
