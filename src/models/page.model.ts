import {ObjectInitializer} from '@/utils/object-initializer';
import {PageResponse} from 'tyr-api/types/axios';

export class PageModel<T> extends ObjectInitializer<PageModel<T>> {
  page: number;
  size: number;
  total: number;
  items: T[];

  static of<R, M>(response: Partial<PageResponse> & {items: R[]}, mapper: (items: R) => M): PageModel<M> {
    return new PageModel({
      page: response.page,
      size: response.size,
      total: response.total,
      items: response.items.map(mapper)
    });
  }
}
