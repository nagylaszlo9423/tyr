import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {Coordinate} from 'ol/coordinate';

class State {
  recordedPath: Coordinate[] = []
}

export const routeStoreModule: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  getters: {
    recordedPath: (state: State) => state.recordedPath
  },
  mutations: {
    setRecordedPath(state: State, path: Coordinate[]) {
      state.recordedPath = path;
    }
  },
  actions: {
    deleteRecordedPath(store: ActionContext<State, RootState>) {
      store.commit('setRecordedPath', []);
    }
  }
};
