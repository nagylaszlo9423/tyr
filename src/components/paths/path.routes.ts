import {RouteConfig} from 'vue-router';
import PathsPage from '@/components/paths/paths.page.vue';
import PathListPage from '@/components/paths/path-list.page.vue';
import PathEditPage from '@/components/paths/path-edit.page.vue';
import {PageType} from '@/utils/utils';


export const pathRoutes: RouteConfig = {
  path: 'paths',
  component: PathsPage,
  meta: {
    isAuthenticated: true
  },
  children: [
    {
      path: '',
      name: 'paths',
      component: PathListPage,
      meta: {
        isAuthenticated: true,
        showTitleBarSearchButton: true,
        showTitleBarSearchField: false
      }
    },
    {
      path: 'new',
      component: PathEditPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.CREATE
      }
    },
    {
      path: 'edit/:id',
      component: PathEditPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.EDIT
      }
    },
    {
      path: 'details/:id',
      component: PathEditPage,
      meta: {
        isAuthenticated: true,
        pageType: PageType.VIEW
      }
    }
  ]
};
