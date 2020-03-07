import {ObjectInitializer} from '@/utils/object-initializer';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootState} from '@/store/root-state';

export class BaseStoreModule<T, S> extends ObjectInitializer<Module<S, RootState>> implements Module<S, RootState> {
  namespaced = true;

  getters: GetterTree<S, RootState> = {};
  actions: ActionTree<S, RootState> = {};
  mutations: MutationTree<S> = {};

  constructor(init: Partial<Module<S, RootState>>) {
    super(init);

    this.actions = init.actions || {};
    this.getters = init.getters || {};
    this.mutations = init.mutations || {};
  }
}
