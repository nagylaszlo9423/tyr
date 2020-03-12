import {RouteConfig} from 'vue-router';
import GroupsPage from '@/components/groups/groups.page.vue';
import GroupListPage from '@/components/groups/group-list.page.vue';
import GroupPage from '@/components/groups/group.page.vue';
import {PageType} from '@/utils/utils';
import GroupMembersPage from '@/components/groups/group-members.page.vue';


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
        isAuthenticated: true,
        showTitleBarSearchButton: true,
        showTitleBarSearchField: false
      }
    },
    {
      path: 'create',
      name: 'create-group',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.CREATE
      }
    },
    {
      path: ':id',
      name: 'edit-group',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.EDIT
      }
    },
    {
      path: ':id/view',
      name: 'view-group',
      component: GroupPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.VIEW
      }
    },
    {
      path: ':id/members',
      name: 'view-group-members',
      component: GroupMembersPage,
      meta: {
        isAuthenticated: true
      }
    }
  ]
};
