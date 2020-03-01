import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {Coordinate} from 'ol/coordinate';
import {pathService} from '@/services/generated-services';
import {PathModel} from '@/models/path-model';
import {PathMapper} from '@/components/paths/path-mapper';

export class PathStoreState {
  model: PathModel = new PathModel();
}

export const pathStoreModule: Module<PathStoreState, RootState> = {
  namespaced: true,
  state: new PathStoreState(),
  getters: {
    model: (state: PathStoreState) => state.model,
    recordedCoordinates: (state: PathStoreState) => state.model.coordinates
  },
  mutations: {
    setModel(state: PathStoreState, model: PathModel) {
      state.model = model;
    },
    setRecordedPath(state: PathStoreState, path: Coordinate[]) {
      if (!state.model) {
        state.model = new PathModel();
      }
      state.model.coordinates = path;
    }
  },
  actions: {
    async getPathById(store: ActionContext<PathStoreState, RootState>, id: string) {
      const res = await pathService.getPathById(id);
      store.commit('setModel', PathMapper.responseToModel(res.data));
    },
    deleteRecordedPath(store: ActionContext<PathStoreState, RootState>) {
      store.commit('setRecordedPath', []);
    },
    clearModel(store: ActionContext<PathStoreState, RootState>) {
      store.commit('setModel', new PathModel());
    }
  }
};
