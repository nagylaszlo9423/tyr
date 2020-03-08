<template>
  <page>
    <b-row>
      <b-col cols="12" md="12" lg="8" xl="8" order="2" order-md="0">
        <multi-select-field v-model="multiSelectItems" block></multi-select-field>
      </b-col>
      <b-col cols="12" md="6" lg="2" xl="2" order="1" order-md="2">
        <select-field id="select" v-model="sortBy" :options="sortOptions" block first-selected
                      translation-namespace="paths.sortOptions"></select-field>
      </b-col>
      <b-col cols="12" md="6" lg="2" xl="2" order="2" order-md="0">
        <b-button block variant="primary" @click="toCreateGroupPage">{{ $t('groups.CREATE_GROUP') }}</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
      <b-col cols="12" sm="10" md="8" lg="6" xl="4">
        <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="load">
          <input-field id="searchPath"
                       :label="$t('SEARCH')"
                       v-model="pageState_.searchExp"
                       action-button-icon="search"
                       @on-action="load"></input-field>
        </ValidationObserver>
      </b-col>
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
    </b-row>
    <page :title="$t('GROUPS') + searchExpInTitle" class="mt-2">
      <card-board :items="mappedItems" @on-item-click="onItemClick"></card-board>
    </page>
    <confirmation-modal ref="confirmGroupLeave" :title="$t('ARE_YOU_SURE')" :message="$t('CONFIRM_GROUP_LEAVING')"></confirmation-modal>
  </page>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import CardBoard from '@/components/common/card-board/card-board.vue';
  import Page from '@/components/common/page.vue';
  import ImageView from '@/components/common/image-view.vue';
  import {CardItem, CardItemControl} from '@/components/common/card-board/card-item';
  import {MultiSelectItems} from '@/components/common/controls/multi-select-items';
  import {onPageBottomReached} from '@/utils/utils';
  import {GroupNs} from '@/store/namespaces';
  import {MappedAction, MappedActionWithParam} from '@/store/mapped-action';
  import MultiSelectField from '@/components/common/controls/multi-select-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import InputField from '@/components/common/controls/input-field.vue';
  import {ValidationObserver} from 'vee-validate';
  import {FindAllAvailableGroupsParams} from '@/store/modules/group/find-all-available.params';
  import {GroupFilter} from '@/components/groups/group-filter';
  import {GroupModel} from '@/models/group.model';
  import {PageModel} from '@/models/page.model';
  import {VueUrlState} from '@/types';
  import {groupService} from '@/services/generated-services';
  import ConfirmationModal from '@/components/common/modals/confirmation-modal.vue';

  class GroupListPageState {
    filters = [GroupFilter.MEMBER];
    sortBy = '';
    searchExp = '';
  }

  @Component({
    components: {
      ConfirmationModal,
      InputField,
      SelectField,
      MultiSelectField,
      ImageView,
      Page,
      CardBoard,
      ValidationObserver
    }
  })
  export default class GroupListPage extends VueUrlState<GroupListPageState> implements ComponentOptions<GroupListPage> {
    @GroupNs.Action('getAllAvailable') getAllAvailable: MappedActionWithParam<FindAllAvailableGroupsParams>;
    @GroupNs.Action('getNextPage') getNextPage: MappedAction;
    @GroupNs.Action('deletePath') deletePath: MappedActionWithParam<string>;
    @GroupNs.Action('refreshPage') refreshPage: MappedAction;
    @GroupNs.Getter('page') page: PageModel<GroupModel>;
    @GroupNs.Mutation('setModel') setModel: MappedActionWithParam<GroupModel | undefined>;
    @GroupNs.Mutation('newModel') newModel: MappedAction;

    multiSelectItems_: MultiSelectItems<number> = {};
    searchExpInTitle = '';
    sortOptions: string[] = [];

    set sortBy(sortBy: string) {
      this.setPageState({sortBy: sortBy});
      this.load();
    }

    get sortBy() {
      return this.pageState.sortBy;
    }

    set multiSelectItems(items: MultiSelectItems<number>) {
      this.setSearchExpInTitle();
      this.setPageState({
        filters: Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value)
      });
      this.multiSelectItems_ = items;
      this.load();
    }

    get multiSelectItems() {
      return this.multiSelectItems_;
    }

    get mappedItems() {
      return this.page.items.map(this.groupToCardItem.bind(this));
    }

    constructor() {
      super(GroupListPageState);
    }

    created(): void {
      super.created();
      this.multiSelectItems_ = MultiSelectItems.of({
        member: {name: this.$tc('groups.joinPolicies.MEMBER'), selected: true, value: GroupFilter.MEMBER},
        invite_only: {name: this.$tc('groups.joinPolicies.INVITE_ONLY'), value: GroupFilter.INVITE_ONLY},
        request: {name: this.$tc('groups.joinPolicies.REQUEST'), value: GroupFilter.REQUEST},
        open: {name: this.$tc('groups.joinPolicies.OPEN'), value: GroupFilter.OPEN}
      }, this.pageState.filters);
      this.sortOptions = ['last_created', 'oldest_created', 'last_modified', 'oldest_modified', 'name_asc', 'name_desc', 'visibility'];
      this.load();
      onPageBottomReached().then(() => this.getNextPage());
    }

    toCreateGroupPage() {
      this.newModel();
      this.$router.push({name: 'create-group'});
    }

    onItemClick(id: string) {
      this.setModel(this.page.items.find(_ => _.id === id));
      this.$router.push({name: 'view-group', params: {id: id}});
    }

    private async load() {
      this.setPageState();
      this.getAllAvailable({
        filters: this.pageState.filters,
        searchExp: this.pageState.searchExp,
        sortBy: this.pageState.sortBy});
    }

    private setSearchExpInTitle() {
      this.searchExpInTitle = this.pageState.searchExp ? ` - ${this.$tc('SEARCH')}: ${this.pageState.searchExp}` : '';
    }

    private groupToCardItem(group: GroupModel): CardItem {
      const controls: CardItemControl[] = [];
      if (group.isMember && group.owner !== ) {
        controls.push({icon: 'minus', variant: 'primary', action: this.leaveGroup.bind(this)});
      } else {
        controls.push({icon: 'plus', variant: 'primary', action: this.joinGroup.bind(this)});
      }
      if (group.isEditable) {
        controls.push({icon: 'pen', variant: 'primary', action: this.goToEditPage.bind(this)});
      }
      return {
        id: group.id,
        title: group.name,
        imgSrc: 'https://via.placeholder.com/150',
        controls: controls
      };
    }

    private goToEditPage(id: string) {
      this.$router.push({name: 'edit-group', params: {id: id}});
    }

    private async joinGroup(id: string) {
      await groupService.joinGroup(id);
      this.refreshPage();
    }

    private async leaveGroup(id: string) {
      await groupService.leaveGroup(id);
      this.refreshPage();
    }
  }
</script>

<style lang="scss" scoped>
  .card-image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .card-content {
    position: relative;
    height: 13rem;
    width: 10rem;

    .card-title {
      position: absolute;
      bottom: 0;
    }
  }
</style>
