import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {Coordinate} from 'ol/coordinate';
import {pathService} from '@/services/generated-services';
import {PathModel} from '@/models/path-model';
import {PathMapper} from '@/components/paths/path-mapper';
import {PathPageResponse} from 'tyr-api/types/axios';
import {environment} from '@/environment/environment';

export class PathStoreState {
  model: PathModel = new PathModel();
  pages: PathPageResponse = {page: 0, size: 0, total: 0, items: []};
  parameters = {
    nextPage: 0,
    filters: new Array<string>(),
    searchExp: ''
  }
}

export const pathStoreModule: Module<PathStoreState, RootState> = {
  namespaced: true,
  state: new PathStoreState(),
  getters: {
    modelId: state => state.model.id,
    model: state => state.model,
    recordedCoordinates: state => state.model.coordinates,
    pages: state => state.pages
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
    setFilters(state: PathStoreState, filters: string[]) {
      state.parameters.filters = filters;
    },
    setSearchExp(state: PathStoreState, searchExp: string) {
      state.parameters.searchExp = searchExp;
    },
    setPage(state: PathStoreState, page: PathPageResponse) {
      state.parameters.nextPage = 1;
      state.pages = page;
    },
    setNextPage(state: PathStoreState, page: PathPageResponse) {
      state.pages.items.push(...page.items);
      state.pages.size += page.items.length;
      state.pages.total = page.total;
      state.parameters.nextPage++;
    }
  },
  actions: {
    async findAllAvailable(store: ActionContext<PathStoreState, RootState>, params: {filters: string[], searchExp: string}) {
      const res = await pathService.findAllAvailableByFilters(
        0, environment.pageSize,
        params.searchExp || undefined,
        params.filters
      );
      store.commit('setPage', res.data);
      store.commit('setFilters', params.filters);
      store.commit('setSearchExp', params.searchExp);
    },
    async findNextPage(store: ActionContext<PathStoreState, RootState>) {
      const res = await pathService.findAllAvailableByFilters(
        store.state.parameters.nextPage,
        environment.pageSize,
        store.state.parameters.searchExp,
        store.state.parameters.filters
      );
      store.commit('setNextPage', res.data);
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
    }
  }
};
