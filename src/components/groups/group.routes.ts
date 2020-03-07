import {RouteConfig} from 'vue-router';
import GroupsPage from '@/components/groups/groups.page.vue';
import GroupListPage from '@/components/groups/group-list.page.vue';
import GroupPage from '@/components/groups/group.page.vue';
import {PageType} from '@/utils/utils';


export const groupRoutes: RouteConfig = {
  path: 'groups',
  component: GroupsPage,
  meta: {
    isAuthenticated: true
  },
  children: [
    {
      path: 'list',
      name: 'groups-list',
      component: GroupListPage,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: 'create',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.CREATE
      }
    },
    {
      path: ':id',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.EDIT
      }
    },
    {
      path: ':id/view',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.VIEW
      }
    },
    {
      path: ':id/members',
      component: GroupPage,
      meta: {
        isAuthenticated: true
      }
    }
  ]
};
