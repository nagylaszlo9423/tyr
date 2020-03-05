import {ActionTree, Getter, GetterTree, Module, Mutation, MutationTree} from 'vuex';
import {RootState} from '@/store/root-state';
import {PagedModuleState} from '@/store/paged-module-state';
import {ObjectInitializer} from '@/utils/object-initializer';
import {PageResponse} from 'tyr-api/types/axios';


export class PageStoreModule<T, S extends PagedModuleState<T>> extends ObjectInitializer<Module<S, RootState>> implements Module<S, RootState> {
  namespaced = true;

  getters: GetterTree<S, RootState> & {page: Getter<S, RootState>} = {} as any;
  actions: ActionTree<S, RootState> = {};
  mutations: MutationTree<S> & {
    setPage: Mutation<S>,
    setNextPage: Mutation<S>
  } = {} as any;

  constructor(module: Module<S, RootState>) {
    super(module);
    this.getters = {
      ...module.getters,
      page: state => state.pagination.page
    };
    this.actions = module.actions || {};
    this.mutations = {
      ...module.mutations,
      setPage: (state: S, page: T & PageResponse) => {
        state.pagination.nextPage = 1;
        state.pagination.page = page;
      },
      setNextPage: (state: S, page: T & PageResponse) => {
        state.pagination.page.items.push(...page.items);
        state.pagination.page.size += page.items.length;
        state.pagination.page.total = page.total;
        state.pagination.nextPage++;
      }
    };
  }
}
