import {ActionContext, Module} from 'vuex';
import {environment} from '@/environment/environment';
import {RootState} from '@/store/root-state';
import {PagedModuleState} from '@/store/paged-module-state';
import {groupService} from '@/services/generated-services';
import {FindAllAvailableGroupsParams} from '@/store/modules/group/find-all-available.params';
import {GroupModel} from '@/models/group.model';
import {PageStoreModule} from '@/store/page-store.module';
import {GroupMapper} from '@/models/mappers/group.mapper';
import {PageModel} from '@/models/page.model';
import {timeout} from 'rxjs/operators';

export class GroupStoreState extends PagedModuleState<GroupModel> {
  model: GroupModel = new GroupModel();
  parameters: FindAllAvailableGroupsParams = {
    filters: new Array<number>(),
    searchExp: '',
    sortBy: ''
  };
}

export const groupStoreModule: Module<GroupStoreState, RootState> = new PageStoreModule({
  namespaced: true,
  state: new GroupStoreState(),
  getters: {
    model: state => new GroupModel(state.model)
  },
  mutations: {
    setModel(state: GroupStoreState, model: GroupModel) {
      state.model = model ? model : new GroupModel();
    },
    setParameters(state: GroupStoreState, parameters: FindAllAvailableGroupsParams) {
      state.parameters = parameters;
    },
    deleteFromPage(state: GroupStoreState, id: string) {
      state.pagination.page.items = state.pagination.page.items.filter(_ => _.id !== id);
    },
    newModel(state: GroupStoreState) {
      state.model = new GroupModel();
    }
  },
  actions: {
    async getAllAvailable(store: ActionContext<GroupStoreState, RootState>, params: FindAllAvailableGroupsParams) {
      const res = await groupService.getGroupsPaged(
        0, environment.pageSize,
        params.searchExp || undefined,
        params.filters && params.filters.length ? params.filters : undefined,
        params.sortBy || undefined
      );
      const pageModel = PageModel.of(res.data, GroupMapper.responseToModel);
      store.commit('setPage', pageModel);
      store.commit('setParameters', params);
    },
    async refreshPage(store: ActionContext<GroupStoreState, RootState>){
      const res = await groupService.getGroupsPaged(
          0, store.state.pagination.page.size,
          store.state.parameters.searchExp || undefined,
          store.state.parameters.filters && store.state.parameters.filters.length ? store.state.parameters.filters : undefined,
          store.state.parameters.sortBy || undefined
      );
      const pageModel = PageModel.of(res.data, GroupMapper.responseToModel);
      store.commit('setPage', pageModel);
    },
    async getNextPage(store: ActionContext<GroupStoreState, RootState>) {
      const res = await groupService.getGroupsPaged(
        store.state.pagination.nextPage,
        environment.pageSize,
        store.state.parameters.searchExp || undefined,
        store.state.parameters.filters && store.state.parameters.filters.length ? store.state.parameters.filters : undefined,
        store.state.parameters.sortBy || undefined
      );
      const pageModel = PageModel.of(res.data, GroupMapper.responseToModel);
      store.commit('setNextPage', pageModel);
    },
    async findById(store: ActionContext<GroupStoreState, RootState>, id: string) {
      const res = await groupService.findById(id);
      store.commit('setModel', GroupMapper.responseToModel(res.data));
    },
    async saveModel(store: ActionContext<GroupStoreState, RootState>, model: GroupModel) {
      const request = GroupMapper.modelToRequest(model);

      if (model.id) {
        await groupService.updateGroup(model.id, request);
      } else {
        const res = await groupService.createGroup(request);
        model.id = res.data;
        store.commit('setModel', model);
      }
    }
  }
});
