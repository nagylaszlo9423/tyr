<template>
  <page :title="$t('PATHS') + searchExpInTitle" class="mt-2">
    <b-row class="mb-2">
      <b-col sm="12" md="10" lg="8" xl="6" class="m-auto">
        <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="load">
          <input-field id="searchPath"
                       :label="$t('SEARCH')"
                       v-model="searchExp"
                       action-button-icon="search"
                       @on-action="load"></input-field>
        </ValidationObserver>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <card-board :items="mappedItems"
                    :item-navigation-path="detailsPageRoute"></card-board>
      </b-col>
    </b-row>
    <path-list-filter-modal v-model="pathFilters"></path-list-filter-modal>
    <confirmation-modal ref="deletionModal" @confirmed="deletePath"></confirmation-modal>
  </page>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import Page from '@/components/common/page.vue';
  import CardBoard from '@/components/common/card-board/card-board.vue';
  import ImageView from '@/components/common/image-view.vue';
  import MultiSelectField from '@/components/common/controls/multi-select-field.vue';
  import {PathNs} from '@/store/namespaces';
  import {MappedAction, MappedActionWithParam} from '@/store/mapped-action';
  import {PathPageResponse, PathResponse} from 'tyr-api/types/axios';
  import {CardItem, CardItemControl} from '@/components/common/card-board/card-item';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import {ValidationObserver} from 'vee-validate';
  import {FindAllAvailablePathsParams} from '@/store/modules/path/find-all-available.params';
  import ConfirmationModal from '@/components/common/modals/confirmation-modal.vue';
  import {AbstractModal} from '@/components/common/modals/abstract-modal';
  import {onPageBottomReached} from '@/utils/utils';
  import {PathListPageState} from '@/components/paths/list/path-list-page.state';
  import {UrlStateManagingVue} from '@/components/common/base/url-state-managing-vue';
  import PathListFilterModal from '@/components/paths/list/filter/path-list-filter.modal.vue';

  @Component({
    components: {
      PathListFilterModal,
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
  export default class PathListPage extends UrlStateManagingVue<PathListPageState> implements ComponentOptions<PathListPage> {
    @PathNs.Action('getAllAvailable') getAllAvailable: MappedActionWithParam<FindAllAvailablePathsParams>;
    @PathNs.Action('getNextPage') getNextPage: MappedAction;
    @PathNs.Action('deletePath') deletePath: MappedActionWithParam<string>;
    @PathNs.Getter('page') page: PathPageResponse;

    readonly detailsPageRoute = '/pages/paths/details';
    searchExpInTitle = '';
    deletionModal: AbstractModal;

    get mappedItems() {
      return this.page.items.map(this.pathToCardItem);
    }

    constructor() {
      super(PathListPageState);
    }

    created() {
      super.created();
    }

    mounted(): void {
      onPageBottomReached().then(() => this.getNextPage());
      this.load();
      this.deletionModal = this.$refs.deletionModal as AbstractModal;
    }

    set searchExp(searchExp: string) {
      this.pageState.searchExp = searchExp;
      this.updateQueryState();
    }

    get searchExp(): string {
      return this.pageState.searchExp;
    }

    set pathFilters(filters: PathListPageState) {
      this.pageState = filters;
      this.load();
    }

    get pathFilters(): PathListPageState {
      return this.pageState;
    }

    load() {
      this.setSearchExpInTitle();
      this.getAllAvailable(this.pageState);
    }

    private pathToCardItem(path: PathResponse): CardItem {
      const controls: CardItemControl[] = [];
      if (path.isEditable) {
        controls.push({title: this.$tc('EDIT'), action: this.editItem.bind(this), icon: 'pen'});
        controls.push({title: this.$tc('DELETE'), action: this.askForDeletionApproval.bind(this), icon: 'trash'});
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
      this.searchExpInTitle = this.pageState.searchExp ? ` - ${this.$tc('SEARCH')}: ${this.pageState.searchExp}` : '';
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/theme";
  @import "src/style/media";

  .filter-title {
    color: $primary;
    padding: 0 1rem .2rem 1rem;
    border-bottom: solid $primary 1px;
  }
</style>
