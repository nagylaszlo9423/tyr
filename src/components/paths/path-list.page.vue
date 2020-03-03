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
        <select-field id="select" :options="sortOptions" :block="true" first-selected></select-field>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
      <b-col cols="12" sm="10" md="8" lg="6" xl="4">
        <ValidationObserver tag="form" class="layout-container layout-vertical" novalidate @submit.prevent="onSearch">
          <input-field id="searchPath"
                       :label="$t('SEARCH')"
                       v-model="searchExp"
                       action-button-icon="search"
                       @on-action="onSearch"></input-field>
        </ValidationObserver>
      </b-col>
      <b-col sm="1" md="2" lg="3" xl="4"></b-col>
    </b-row>
    <page :title="$t('PATHS') + searchExpInTitle">
      <b-row>
        <b-col>
          <card-board :items="mappedItems"
                      :item-navigation-path="detailsPageRoute"></card-board>
        </b-col>
      </b-row>
    </page>
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
  import {MappedAction} from '@/store/mapped-action';
  import {PathPageResponse, PathResponse} from 'tyr-api/types/axios';
  import {CardItem} from '@/components/common/card-board/card-item';
  import {MultiSelectItems} from '@/components/common/controls/multi-select-items';
  import InputField from '@/components/common/controls/input-field.vue';
  import SelectField from '@/components/common/controls/select-field.vue';
  import {ValidationObserver} from 'vee-validate';
  import {FindAllAvailablePathsParams} from '@/store/modules/path-store.module';

  @Component({
    components: {SelectField, InputField, MultiSelectField, ImageView, CardBoard, Page, ValidationObserver}
  })
  export default class PathListPage extends Vue implements ComponentOptions<PathListPage> {
    @PathNs.Action('findAllAvailable') findAllAvailable: MappedAction<FindAllAvailablePathsParams>;
    @PathNs.Action('findNextPage') findNextPage: MappedAction;
    @PathNs.Getter('pages') pages: PathPageResponse;

    readonly detailsPageRoute = '/pages/paths/details';
    multiSelectItems_: MultiSelectItems = {};
    searchExp = '';
    searchExpInTitle = '';
    filters_ = ['own'];
    sortBy = 'newest';
    sortOptions: string[] = [];

    set multiSelectItems(items: MultiSelectItems) {
      this.setSearchExpInTitle();
      console.log(items);
      this.filters_ = Object.keys(items).filter(_ => items[_].selected);
      this.multiSelectItems_ = items;
      this.onSearch();
    }

    get multiSelectItems() {
      return this.multiSelectItems_;
    }

    get mappedItems() {
      return this.pages.items.map(this.pathToCardItem);
    }

    async created(): Promise<void> {
      this.findAllAvailable({filters: this.filters_, searchExp: this.searchExp, sortBy: this.sortBy});
      this.multiSelectItems_ = {
        own: {name: this.$tc('OWN'), selected: true},
        groups: {name: this.$tc('GROUPS'), selected: false},
        public: {name: this.$tc('PUBLIC'), selected: false}
      };
      this.sortOptions = ['newest', 'last_modified', 'name_asc', 'name_desc', 'visibility'];
      this.loadNextOnScroll();
    }

    onSearch() {
      this.setSearchExpInTitle();
      this.findAllAvailable({filters: this.filters_, searchExp: this.searchExp, sortBy: this.sortBy});
    }

    private loadNextOnScroll() {
      window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.pages.total === this.pages.items.length) {
          this.findNextPage();
        }
      };
    }

    private pathToCardItem(path: PathResponse): CardItem {
      const controls = [];
      if (path.isEditable) {
        controls.push({route: '/pages/paths/edit', icon: 'pen'});
      }
      return {
        id: path.id,
        title: path.title,
        imgSrc: 'https://via.placeholder.com/150',
        controls: controls
      };
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
