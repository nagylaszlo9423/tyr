<template>
  <page class="paths-list-page">
    <b-row>
      <b-col cols="12" md="7" lg="8" xl="9" order="2" order-md="0">
        <multi-select-field v-model="multiSelectItems" block></multi-select-field>
      </b-col>
      <b-col cols="6" md="2" lg="2" xl="1" align="end" order="0" order-md="1" class="p-1">
        <span>Sort by</span>
      </b-col>
      <b-col cols="6" md="3" lg="2" xl="2" order="1" order-md="2">
        <select-field id="select" v-model="sortBy" :options="sortOptions" :block="true" first-selected
                      translation-namespace="paths.sortOptions"></select-field>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
      <b-col cols="12" sm="10" md="8" lg="6" xl="4">
        <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="load">
          <input-field id="searchPath"
                       :label="$t('SEARCH')"
                       v-model="searchExp"
                       action-button-icon="search"
                       @on-action="load"></input-field>
        </ValidationObserver>
      </b-col>
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
    </b-row>
    <page :title="$t('PATHS') + searchExpInTitle" class="mt-2">
      <b-row>
        <b-col>
          <card-board :items="mappedItems"
                      :item-navigation-path="detailsPageRoute"></card-board>
        </b-col>
      </b-row>
    </page>
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
  import {AbstractConfirmationModal} from '@/components/common/modals/abstract-confirmation-modal';
  import {onPageBottomReached} from '@/utils/utils';
  import {PathFilter} from '@/components/paths/path-filters';

  @Component({
    components: {
      ConfirmationModal,
      SelectField, InputField, MultiSelectField, ImageView, CardBoard, Page, ValidationObserver}
  })
  export default class PathListPage extends Vue implements ComponentOptions<PathListPage> {
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
    deletionModal: AbstractConfirmationModal;

    set sortBy(sortBy: string) {
      this.sortBy_ = sortBy;
      this.load();
    }

    get sortBy() {
      return this.sortBy_;
    }

    set multiSelectItems(items: MultiSelectItems<number>) {
      this.setSearchExpInTitle();
      this.filters_ = Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value);
      this.multiSelectItems_ = items;
      this.load();
    }

    get multiSelectItems() {
      return this.multiSelectItems_;
    }

    get mappedItems() {
      return this.page.items.map(this.pathToCardItem);
    }

    async created(): Promise<void> {
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
      this.deletionModal = this.$refs.deletionModal as AbstractConfirmationModal;
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
