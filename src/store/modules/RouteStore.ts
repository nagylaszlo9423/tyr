import {Module} from 'vuex';
import {Path} from '../../components/map/features/Path';

class State {
  recordedPath: Path
}

export default {
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
} as Module<State, any>;
