import {GroupFilter} from '@/components/groups/group-filter';
import {UrlBaseState} from '@/components/common/base/url-base-state';

export class GroupListPageState implements UrlBaseState {
  filters = [GroupFilter.MEMBER];
  sortBy = '';
  searchExp = '';
}
