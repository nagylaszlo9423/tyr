<template>
  <page :title="$t('GROUPS') + searchExpInTitle" class="mt-2">
    <template v-slot:title-bar-right>
      <b-button variant="primary" size="sm" @click="toCreateGroupPage">{{$t('groups.CREATE_GROUP')}}</b-button>
    </template>
    <b-row class="mb-2">
      <b-col sm="12" md="10" lg="8" xl="6" class="m-auto">
        <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="load">
          <input-field id="searchPath"
                       :label="$t('SEARCH')"
                       v-model="filtersModalData.searchExp"
                       action-button-icon="search"
                       @on-action="onSearch"></input-field>
        </ValidationObserver>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <card-board :items="mappedItems" @on-item-click="onItemClick"></card-board>
      </b-col>
    </b-row>
    <confirmation-modal ref="confirmGroupLeave" :title="$t('ARE_YOU_SURE')"
                        :message="$t('CONFIRM_GROUP_LEAVING')"></confirmation-modal>
    <b-modal ref="filtersModal" :title="$t('FILTERS')">
      <b-container>
        <b-row class="mb-2">
          <b-col>
            <select-field id="select" v-model="filtersModalData.sortBy" :options="sortOptions" :block="true"
                          first-selected
                          translation-namespace="paths.sortOptions"></select-field>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <multi-select-field v-model="multiSelectItems" block></multi-select-field>
          </b-col>
        </b-row>
      </b-container>
      <template v-slot:modal-footer>
        <b-container>
          <b-row>
            <b-col>
              <b-button variant="secondary" block @click="filtersModal.hide()">{{ $t('CANCEL') }}</b-button>
            </b-col>
            <b-col>
              <b-button variant="primary" block @click="onModalConfirmed">{{ $t('APPLY') }}</b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
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
  import FiltersModal from '@/components/common/modals/filters-modal.vue';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';
  import {BModal} from 'bootstrap-vue';

  class GroupListPageState {
    filters = [GroupFilter.MEMBER];
    sortBy = '';
    searchExp = '';
  }

  @Component({
    components: {
      ConfirmationModal,
      FiltersModal,
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
    filtersModal: BModal;
    filtersModalData: GroupListPageState;

    set multiSelectItems(items: MultiSelectItems<number>) {
      this.filtersModalData.filters = Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value);
      this.multiSelectItems_ = items;
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
      eventBus.$offOn(events.common.titleBar.toggleSearch, () => this.filtersModal.show());
      this.filtersModalData = this.pageState;
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

    mounted(): void {
      this.filtersModal = this.$refs.filtersModal as BModal;
    }

    onSearch() {
      this.setPageState(this.filtersModalData);
      this.load();
    }

    onModalConfirmed() {
      this.setPageState(this.filtersModalData);
      this.load();
      this.filtersModal.hide();
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
        sortBy: this.pageState.sortBy
      });
    }

    private setSearchExpInTitle() {
      this.searchExpInTitle = this.pageState.searchExp ? ` - ${this.$tc('SEARCH')}: ${this.pageState.searchExp}` : '';
    }

    private groupToCardItem(group: GroupModel): CardItem {
      const controls: CardItemControl[] = [];

      if (group.isMember) {
        controls.push({title: this.$tc('LEAVE'), icon: 'minus', action: this.leaveGroup.bind(this)});
      } else {
        controls.push({title: this.$tc('JOIN'), icon: 'plus', action: this.joinGroup.bind(this)});
      }
      if (group.isEditable) {
        controls.push({title: this.$tc('EDIT'), icon: 'pen', action: this.goToEditPage.bind(this)});
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
