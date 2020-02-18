import {RouteConfig} from 'vue-router';
import GroupsPage from '@/components/groups/GroupsPage.vue';
import EditGroupPage from '@/components/groups/EditGroupPage.vue';
import GroupDetailsPage from '@/components/groups/GroupDetailsPage.vue';
import GroupListPage from '@/components/groups/GroupListPage.vue';


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
      path: 'edit',
      component: EditGroupPage,
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
