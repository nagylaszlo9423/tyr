import {Module} from 'vuex';
import {RootState} from '@/store/root-state';
import LineString from 'ol/geom/LineString';

class State {
  recordedPath: LineString
}

export const routeStoreModule: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  getters: {
    recordedPath: (state: State) => state.recordedPath
  },
  mutations: {
    setRecordedPath(state: State, path: LineString) {
      state.recordedPath = path;
    }
  },
  actions: {
    async saveRecordedPath() {
    }
  }
};
