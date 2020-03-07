import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {Coordinate} from 'ol/coordinate';
import {pathService} from '@/services/generated-services';
import {environment} from '@/environment/environment';
import {eventBus} from '@/services/event-bus';
import {events} from '@/services/events';
import {PagedModuleState} from '@/store/paged-module-state';
import {PathModel} from '@/models/path.model';
import {PageStoreModule} from '@/store/page-store.module';
import {FindAllAvailablePathsParams} from '@/store/modules/path/find-all-available.params';
import {PathMapper} from '@/models/mappers/path.mapper';
import {PageModel} from '@/models/page.model';


export class PathStoreState extends PagedModuleState<PathModel> {
  model: PathModel = new PathModel();
  parameters: FindAllAvailablePathsParams = {
    filters: new Array<number>(),
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
    recordedCoordinates: state => state.model.coordinates
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
    setParameters(state: PathStoreState, parameters: FindAllAvailablePathsParams) {
      state.parameters = parameters;
    },
    deleteFromPage(state: PathStoreState, id: string) {
      state.pagination.page.items = state.pagination.page.items.filter(_ => _.id !== id);
    }
  },
  actions: {
    async getAllAvailable(store: ActionContext<PathStoreState, RootState>, params: FindAllAvailablePathsParams) {

      const res = await pathService.findAllAvailableByFilters(
        0, environment.pageSize,
        params.searchExp || undefined,
        params.filters && store.state.parameters.filters.length ? params.filters : undefined,
        params.sortBy || undefined
      );
      const page = PageModel.of(res.data, PathMapper.responseListToModels);
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
      const page = PageModel.of(res.data, PathMapper.responseListToModels);
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
      eventBus.$emit(events.loader.start);
      if (store.state.model.id === id) {
        store.commit('setModel', new PathModel());
      }
      await pathService.deletePathById(id);
      store.commit('deleteFromPage', id);
      eventBus.$emit(events.loader.stop);
    }
  }
});
