import {Action, ActionTree, Getter, GetterTree, Module, Mutation, MutationTree} from 'vuex';
import {RootState} from '@/store/root-state';
import {PagedModuleState} from '@/store/paged-module-state';
import {ObjectInitializer} from '@/utils/object-initializer';
import {PageResponse} from 'tyr-api/types/axios';
import {PageModel} from '@/models/page.model';
import {BaseStoreModule} from '@/store/base-store.module';
import {eventBus} from '@/services/event-bus';
import {events} from '@/services/events';


export class PageStoreModule<T, S extends PagedModuleState<T>> extends BaseStoreModule<T, S> {
  namespaced = true;

  getters: GetterTree<S, RootState> & {page: Getter<S, RootState>};
  mutations: MutationTree<S> & {
    setPage: Mutation<S>,
    setNextPage: Mutation<S>
  };

  constructor(module: Module<S, RootState>) {
    super(module);
    this.getters = {
      ...module.getters,
      page: state => state.pagination.page
    };
    this.mutations = {
      ...module.mutations,
      setPage: (state: S, page: PageModel<T>) => {
        state.pagination.nextPage = 1;
        state.pagination.page = page;
      },
      setNextPage: (state: S, page: PageModel<T>) => {
        state.pagination.page.items.push(...page.items);
        state.pagination.page.size += page.items.length;
        state.pagination.page.total = page.total;
        state.pagination.nextPage++;
      }
    };

    const actionTree: ActionTree<S, RootState> = {};
    Object.keys(this.actions).forEach(actionName => {
      const action = this.actions[actionName];
      if (typeof action === 'function') {
        const executableAction = action as Function;
        actionTree[actionName] = ((...params: any) => {
          try {
            eventBus.$emit(events.loader.start);
            executableAction(...params);
          } finally {
            eventBus.$emit(events.loader.stop);
          }
        });
      }
    });
    this.actions = actionTree;
  }
}
