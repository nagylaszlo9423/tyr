import {PageResponse} from 'tyr-api/types/axios';

export class PagedModuleState<T> {
  pagination: {
    page: T & PageResponse,
    nextPage: number
  } = {
    page: {page: 0, size: 0, total: 0, items: []} as any,
    nextPage: 1
  }

}
