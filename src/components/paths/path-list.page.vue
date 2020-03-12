<template>
  <page :title="$t('PATHS') + searchExpInTitle" class="mt-2">
    <b-row>
      <b-col>
        <card-board :items="mappedItems"
                    :item-navigation-path="detailsPageRoute"></card-board>
      </b-col>
    </b-row>
    <b-modal ref="filtersModal" :title="$t('FILTERS')">
      <b-container>
        <b-row class="mb-2">
          <b-col>
            <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="load">
              <input-field id="searchPath"
                           :label="$t('SEARCH')"
                           v-model="filtersModalData.searchExp"
                           action-button-icon="search"
                           @on-action="load"></input-field>
            </ValidationObserver>
          </b-col>
        </b-row>
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
              <b-button variant="primary" block @click="setFilters">{{ $t('OK') }}</b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
    <confirmation-modal ref="deletionModal" @confirmed="deletePath"></confirmation-modal>
  </page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/page.vue';
  import CardBoard from '@/components/common/card-board/card-board.vue';
  import ImageView from '@/components/common/image-view.vue';
  import MultiSelectField from '@/components/common/controls/multi-select-field.vue';
  import {PathNs} from '@/store/namespaces';
  import {MappedAction, MappedActionWithParam} from '@/store/mapped-action';
  import {PathPageResponse, PathResponse} from 'tyr-api/types/axios';
  import {CardItem, CardItemControl} from '@/components/common/card-board/card-item';
  import {MultiSelectItems} from '@/components/common/controls/multi-select-items';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import {ValidationObserver} from 'vee-validate';
  import {FindAllAvailablePathsParams} from '@/store/modules/path/find-all-available.params';
  import ConfirmationModal from '@/components/common/modals/confirmation-modal.vue';
  import {AbstractModal} from '@/components/common/modals/abstract-modal';
  import {onPageBottomReached} from '@/utils/utils';
  import {PathFilter} from '@/components/paths/path-filters';
  import FiltersModal from '@/components/common/modals/filters-modal.vue';
  import {BModal} from 'bootstrap-vue';
  import {GroupFilter} from '@/components/groups/group-filter';
  import {VueUrlState} from '@/types';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';

  class PathListPageState {
    filters = [GroupFilter.MEMBER];
    sortBy = '';
    searchExp = '';
  }

  @Component({
    components: {
      FiltersModal,
      ConfirmationModal,
      SelectField,
      InputField,
      MultiSelectField,
      ImageView,
      CardBoard,
      Page,
      ValidationObserver
    }
  })
  export default class PathListPage extends VueUrlState<PathListPageState> implements ComponentOptions<PathListPage> {
    @PathNs.Action('getAllAvailable') getAllAvailable: MappedActionWithParam<FindAllAvailablePathsParams>;
    @PathNs.Action('getNextPage') getNextPage: MappedAction;
    @PathNs.Action('deletePath') deletePath: MappedActionWithParam<string>;
    @PathNs.Getter('page') page: PathPageResponse;

    readonly detailsPageRoute = '/pages/paths/details';
    multiSelectItems_: MultiSelectItems<number> = {};
    searchExp = '';
    searchExpInTitle = '';
    filters_ = [PathFilter.OWN];
    sortBy_ = '';
    sortOptions: string[] = [];
    deletionModal: AbstractModal;
    filtersModal: BModal;
    filtersModalData: PathListPageState;

    set multiSelectItems(items: MultiSelectItems<number>) {
      this.filtersModalData.filters = Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value);
      this.multiSelectItems_ = items;
    }

    get multiSelectItems() {
      return this.multiSelectItems_;
    }

    get mappedItems() {
      return this.page.items.map(this.pathToCardItem);
    }

    constructor() {
      super(PathListPageState);
    }

    async created(): Promise<void> {
      super.created();
      eventBus.$offOn(events.common.titleBar.toggleSearch, () => this.filtersModal.show());
      this.filtersModalData = new PathListPageState();
      this.multiSelectItems_ = {
        own: {name: this.$tc('OWN'), selected: true, value: PathFilter.OWN},
        groups: {name: this.$tc('GROUPS'), value: PathFilter.GROUP},
        public: {name: this.$tc('PUBLIC'), value: PathFilter.PUBLIC}
      };
      this.sortOptions = ['last_created', 'oldest_created', 'last_modified', 'oldest_modified', 'name_asc', 'name_desc', 'visibility'];
      this.load();
      onPageBottomReached().then(() => this.getNextPage());
    }

    mounted(): void {
      this.deletionModal = this.$refs.deletionModal as AbstractModal;
      this.filtersModal = this.$refs.filtersModal as BModal;
    }

    setFilters() {
      this.setPageState(this.filtersModalData);
      this.load();
      this.filtersModal.hide();
    }

    load() {
      this.setSearchExpInTitle();
      this.getAllAvailable({filters: this.filters_, searchExp: this.searchExp, sortBy: this.sortBy_});
    }

    private pathToCardItem(path: PathResponse): CardItem {
      const controls: CardItemControl[] = [];
      if (path.isEditable) {
        controls.push({action: this.editItem.bind(this), icon: 'pen'});
        controls.push({action: this.askForDeletionApproval.bind(this), icon: 'trash', variant: 'danger'});
      }
      return {
        id: path.id,
        title: path.name,
        imgSrc: 'https://via.placeholder.com/150',
        controls: controls
      };
    }

    private askForDeletionApproval(id: string) {
      this.deletionModal.show().then(isConfirmed => {
        if (isConfirmed) {
          this.deletePath(id);
        }
      });
    }

    private editItem(id: string) {
      this.$router.push(`/pages/paths/edit/${id}`);
    }

    private setSearchExpInTitle() {
      this.searchExpInTitle = this.searchExp ? ` - ${this.$tc('SEARCH')}: ${this.searchExp}` : '';
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/theme";
  @import "../../style/media";

  .filter-title {
    color: $primary;
    padding: 0 1rem .2rem 1rem;
    border-bottom: solid $primary 1px;
  }
</style>
