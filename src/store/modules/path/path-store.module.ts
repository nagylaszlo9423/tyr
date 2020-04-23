import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {Coordinate} from 'ol/coordinate';
import {pathService} from '@/services/generated-services';
import {environment} from '@/environment/environment';
import {PagedModuleState} from '@/store/paged-module-state';
import {PathModel} from '@/models/path.model';
import {PageStoreModule} from '@/store/page-store.module';
import {FindAllAvailablePathsParams} from '@/store/modules/path/find-all-available.params';
import {PathMapper} from '@/models/mappers/path.mapper';
import {PageModel} from '@/models/page.model';
import {FindPathsInAreaRequest} from 'tyr-api/types/axios';
import {Path} from '@/components/map/features/path';


export class PathStoreState extends PagedModuleState<PathModel> {
  model: PathModel = new PathModel();
  pathModels: PathModel[] = [];
  parameters: FindAllAvailablePathsParams = {
    filters: [],
    searchExp: '',
    sortBy: ''
  };
}

export const pathStoreModule: Module<PathStoreState, RootState> = new PageStoreModule({
  namespaced: true,
  state: new PathStoreState(),
  getters: {
    modelId: state => state.model.id,
    model: state => state.model,
    recordedCoordinates: state => state.model.coordinates,
    paths: state => state.pathModels.map(model => new Path(model.coordinates, model.id))
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
    },
    setPaths(state: PathStoreState, features: PathModel[]) {
      state.pathModels = features;
    },
    setParameters(state: PathStoreState, parameters: FindAllAvailablePathsParams) {
      state.parameters = parameters;
    },
    deleteFromPage(state: PathStoreState, id: string) {
      state.pagination.page.items = state.pagination.page.items.filter(_ => _.id !== id);
    }
  },
  actions: {
    async getAllAvailableByArea(store: ActionContext<PathStoreState, RootState>, area: FindPathsInAreaRequest) {
      const res = await pathService.findAllAvailableByArea(area);
      store.commit('setPaths', res.data.map(PathMapper.responseToModel));
    },
    async getAllAvailable(store: ActionContext<PathStoreState, RootState>, params: FindAllAvailablePathsParams) {
      const res = await pathService.findAllAvailableByFilters(
        0, environment.pageSize,
        params.searchExp || undefined,
        params.filters && params.filters.length ? params.filters : undefined,
        params.sortBy || undefined
      );
      const page = PageModel.of(res.data, PathMapper.responseToModel);
      store.commit('setPage', page);
      store.commit('setParameters', params);
    },
    async getNextPage(store: ActionContext<PathStoreState, RootState>) {
      const res = await pathService.findAllAvailableByFilters(
        store.state.pagination.nextPage,
        environment.pageSize,
        store.state.parameters.searchExp || undefined,
        store.state.parameters.filters && store.state.parameters.filters.length ? store.state.parameters.filters : undefined,
        store.state.parameters.sortBy || undefined
      );
      const page = PageModel.of(res.data, PathMapper.responseToModel);
      store.commit('setPage', page);
    },
    async getPathById(store: ActionContext<PathStoreState, RootState>, id: string) {
      const res = await pathService.getPathById(id);
      store.commit('setModel', PathMapper.responseToModel(res.data));
    },
    deleteRecordedPath(store: ActionContext<PathStoreState, RootState>) {
      store.commit('setRecordedPath', []);
    },
    clearModelWithoutPath(store: ActionContext<PathStoreState, RootState>) {
      const coordinates = store.state.model.coordinates;
      store.commit('setModel', new PathModel({coordinates: coordinates}));
    },
    async deletePath(store: ActionContext<PathStoreState, RootState>, id: string) {
      if (store.state.model.id === id) {
        store.commit('setModel', new PathModel());
      }
      await pathService.deletePathById(id);
      store.commit('deleteFromPage', id);
    }
  }
});
