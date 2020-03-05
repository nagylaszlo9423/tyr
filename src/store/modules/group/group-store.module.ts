import {ActionContext, Module} from 'vuex';
import {environment} from '@/environment/environment';
import {GroupPageResponse} from 'tyr-api/types/axios';
import {RootState} from '@/store/root-state';
import {PagedModuleState} from '@/store/paged-module-state';
import {groupService} from '@/services/generated-services';
import {FindAllAvailableGroupsParams} from '@/store/modules/group/find-all-available.params';
import {GroupModel} from '@/models/group.model';
import {PageStoreModule} from '@/store/page-store.module';
import {eventBus} from '@/services/event-bus';
import {events} from '@/services/events';

export class GroupStoreState extends PagedModuleState<GroupPageResponse> {
  model: GroupModel = new GroupModel();
  parameters: FindAllAvailableGroupsParams = {
    filters: new Array<string>(),
    searchExp: '',
    sortBy: ''
  };
}

export const groupStoreModule: Module<GroupStoreState, RootState> = new PageStoreModule({
  namespaced: true,
  state: new GroupStoreState(),
  getters: {},
  mutations: {
    deleteFromPage(state: GroupStoreState, id: string) {
      state.pagination.page.items = state.pagination.page.items.filter(_ => _.id !== id);
    }
  },
  actions: {
    async getAllAvailable(store: ActionContext<GroupStoreState, RootState>, params: FindAllAvailableGroupsParams) {
      eventBus.$emit(events.loader.start);
      const res = await groupService.getGroupsPaged(
        0, environment.pageSize,
        params.searchExp || undefined,
        params.filters || undefined,
        params.sortBy || undefined
      );
      store.commit('setPage', res.data);
      store.commit('setParameters', params);
      eventBus.$emit(events.loader.stop);
    },
    async getNextPage(store: ActionContext<GroupStoreState, RootState>) {
      eventBus.$emit(events.loader.start);
      const res = await groupService.getGroupsPaged(
        store.state.pagination.nextPage,
        environment.pageSize,
        store.state.parameters.searchExp || undefined,
        store.state.parameters.filters || undefined,
        store.state.parameters.sortBy || undefined
      );
      store.commit('setNextPage', res.data);
      eventBus.$emit(events.loader.stop);
    },
  }
});
