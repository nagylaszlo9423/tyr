import {Module} from 'vuex';
import {Path} from '@/components/map/features/Path';
import {RootState} from '@/store/RootState';

class State {
  recordedPath: Path
}

export const routeStoreModule: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  getters: {
    recordedPath: (state: State) => state.recordedPath
  },
  mutations: {
    setRecordedPath(state: State, path: Path) {
      state.recordedPath = path;
    }
  },
  actions: {
    async saveRecordedPath() {
    }
  }
};
