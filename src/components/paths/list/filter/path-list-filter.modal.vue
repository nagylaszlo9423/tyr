<template>
  <b-modal ref="filtersModal" :title="$t('FILTERS')">
    <b-container>
      <b-row class="mb-2">
        <b-col>
          <select-field id="select" v-model="data_.sortBy" :options="sortOptions" :block="true"
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
            <b-button variant="primary" block @click="apply">{{ $t('APPLY') }}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import SelectField from '@/components/common/controls/select-field.vue';
  import MultiSelectField from '@/components/common/controls/multi-select-field.vue';
  import {MultiSelectItems} from '@/components/common/controls/multi-select-items';
  import {PathListPageState} from '@/components/paths/list/path-list-page.state';
  import {ComponentOptions} from 'vue';
  import {PathFilter} from '@/components/paths/list/filter/path-filters';
  import {eventBus} from '@/services/event-bus';
  import {events} from '@/services/events';
  import {BModal} from 'bootstrap-vue';
  import {BaseVue} from '@/components/common/base/base.vue';
  import {PathFiltersData} from '@/components/paths/list/filter/path-filters-data';

  @Component({
    components: {
      SelectField,
      MultiSelectField
    }
  })
  export default class PathListFilterModal extends BaseVue implements ComponentOptions<PathListFilterModal> {
    private readonly sortOptions = ['last_created', 'oldest_created', 'last_modified', 'oldest_modified', 'name_asc', 'name_desc', 'visibility'];

    data_: PathFiltersData = new PathFiltersData();
    filtersModal: BModal;
    multiSelectItems: MultiSelectItems<number>;

    @Prop({default: new PathFiltersData()})
    value: PathFiltersData;

    set data(data: PathFiltersData) {
      this.data_ = data;
      this.setFilterListToMultiSelectItems(data.filters);
    }

    get data() {
      return this.data_;
    }

    created(): void {
      this.data = this.value;
      this.multiSelectItems = MultiSelectItems.of({
        own: {name: this.$tc('OWN'), selected: true, value: PathFilter.OWN},
        groups: {name: this.$tc('GROUPS'), value: PathFilter.GROUP},
        public: {name: this.$tc('PUBLIC'), value: PathFilter.PUBLIC}
      });
    }

    mounted(): void {
      eventBus.$on(events.common.titleBar.toggleSearch, () => {
        console.log(JSON.stringify(this.multiSelectItems));
        this.openModal();
      });
      this.filtersModal = this.$refs.filtersModal as BModal;
    }

    beforeDestroy(): void {
      eventBus.$off(events.common.titleBar.toggleSearch);
    }

    @Watch('value')
    watchValue(value: PathFiltersData) {
      this.data = value;
    }

    openModal() {
      this.filtersModal.show();
    }

    apply() {
      this.data_.filters = this.multiSelectItemsToFilterList(this.multiSelectItems);
      this.filtersModal.hide();
      this.filterChange();
    }

    filterChange() {
      this.$emit('input', this.data_);
    }

    private multiSelectItemsToFilterList(items: MultiSelectItems<number>): PathFilter[] {
      return Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value);
    }

    private setFilterListToMultiSelectItems(filters: PathFilter[]) {
      const multiSelectItems = Object.assign({}, this.multiSelectItems) as MultiSelectItems<number>;
      Object.keys(this.multiSelectItems)
        .forEach(key => multiSelectItems[key].selected = filters.indexOf(this.multiSelectItems[key].value) > -1);
      this.multiSelectItems = multiSelectItems;
    }
  }
</script>

<style lang="scss" scoped>

</style>
