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
            <b-button variant="primary" block @click="filterChange">{{ $t('APPLY') }}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Watch} from 'vue-property-decorator';
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

  @Component({components: {
      SelectField,
      MultiSelectField
    }})
  export default class PathListFilterModal extends BaseVue implements ComponentOptions<PathListFilterModal> {
    private readonly sortOptions = ['last_created', 'oldest_created', 'last_modified', 'oldest_modified', 'name_asc', 'name_desc', 'visibility'];

    data_: PathListPageState;
    filtersModal: BModal;
    multiSelectItems_: MultiSelectItems<number> = MultiSelectItems.of({
      own: {name: this.$tc('OWN'), selected: true, value: PathFilter.OWN},
      groups: {name: this.$tc('GROUPS'), value: PathFilter.GROUP},
      public: {name: this.$tc('PUBLIC'), value: PathFilter.PUBLIC}
    });

    @Prop({default: new PathListPageState()}) value: PathListPageState;

    set multiSelectItems(items: MultiSelectItems<number>) {
      this.data_.filters = Object.keys(items).filter(_ => items[_].selected).map(_ => items[_].value);
      this.multiSelectItems_ = items;
    }

    get multiSelectItems() {
      return this.multiSelectItems_;
    }

    created(): void {
      eventBus.$offOn(events.common.titleBar.toggleSearch, () => this.filtersModal.show());
      this.data_ = this.value;
    }

    mounted(): void {
      this.filtersModal = this.$refs.filtersModal as BModal;
    }

    @Watch("value")
    watchValue(value: PathListPageState) {
      this.data_ = value;
    }

    @Emit("filter-change")
    filterChange(): PathListPageState {
      return this.value;
    }
  }
</script>

<style lang="scss" scoped>

</style>
