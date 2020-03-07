import {PageModel} from '@/models/page.model';

export class PagedModuleState<T> {
  pagination: {
    page: PageModel<T>,
    nextPage: number
  } = {
    page: {page: 0, size: 0, total: 0, items: []} as any,
    nextPage: 1
  }

}
