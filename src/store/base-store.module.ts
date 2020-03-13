import {ObjectInitializer} from '@/utils/object-initializer';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootState} from '@/store/root-state';
import {eventBus} from '@/services/event-bus';
import {events} from '@/services/events';

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

    const actionTree: ActionTree<S, RootState> = {};
    Object.keys(this.actions).forEach(actionName => {
      const action = this.actions[actionName];
      if (typeof action === 'function') {
        const executableAction = action as Function;
        actionTree[actionName] = (async (...params: any) => {
          try {
            eventBus.$emit(events.loader.start);
            await executableAction(...params);
          } finally {
            eventBus.$emit(events.loader.stop);
          }
        });
      }
    });
    this.actions = actionTree;
  }
}
