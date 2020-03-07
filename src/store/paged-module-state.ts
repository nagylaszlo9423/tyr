import {PageModel} from '@/models/page.model';
import {ObjectInitializer} from '@/utils/object-initializer';

export class PagedModuleState<T> extends ObjectInitializer<PagedModuleState<T>> {
  pagination: {
    page: PageModel<T>,
    nextPage: number
  } = {
    page: {page: 0, size: 0, total: 0, items: []} as any,
    nextPage: 1
  }
}
