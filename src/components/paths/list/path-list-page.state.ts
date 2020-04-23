import {UrlBaseState} from '@/components/common/base/url-base-state';
import {PathFilter} from '@/components/paths/list/filter/path-filters';

export class PathListPageState implements UrlBaseState {
  filters = [PathFilter.OWN];
  sortBy = '';
  searchExp = '';
}
