import {ActionContext, Module} from 'vuex';
import {RootState} from '@/store/root-state';
import {PageStoreModule} from '@/store/page-store.module';
import {PagedModuleState} from '@/store/paged-module-state';
import {GroupMemberModel} from '@/models/group-member.model';
import {userService} from '@/services/generated-services';
import {environment} from '@/environment/environment';
import {PageModel} from '@/models/page.model';
import {UserMapper} from '@/models/mappers/user.mapper';

export class GroupMembersStoreState extends PagedModuleState<GroupMemberModel> {
  groupId: string;
}

export const groupMembersStoreModule: Module<GroupMembersStoreState, RootState> = new PageStoreModule({
  mutations: {
    setGroupId: (state, id) =>  state.groupId = id
  },
  actions: {
    async getGroupMembers(store: ActionContext<GroupMembersStoreState, RootState>, id: string) {
      const res = await userService.getGroupMembers(id, 0, environment.pageSize);
      const pageModel = PageModel.of(res.data, UserMapper.groupMemberListResponseToModel);
      store.commit('setPage', pageModel);
    },
    async getNextPage(store: ActionContext<GroupMembersStoreState, RootState>) {
      if (store.state.groupId) {
        const res = await userService.getGroupMembers(store.state.groupId, 0, environment.pageSize);
        const pageModel = PageModel.of(res.data, UserMapper.groupMemberListResponseToModel);
        store.commit('setNextPage', pageModel);
      }
    }
  }
});
