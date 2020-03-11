<template>
  <b-modal ref="modal" v-model="value_" :id="id" @close="this.resolve(false)">
    <template v-if="title" v-slot:modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <slot></slot>
    <template v-slot:modal-footer>
      <b-container>
        <b-row>
          <b-col>
            <b-button variant="secondary" @click="canceled">{{ $t('CANCEL') }}</b-button>
          </b-col>
          <b-col>
            <b-button variant="primary" @click="confirmed">{{ $t('OK') }}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {AbstractModal} from '@/components/common/modals/abstract-modal';

  @Component
  export default class FiltersModal extends AbstractModal implements ComponentOptions<FiltersModal> {
    @Prop() id: string;
    @Prop() title: string;
    @Prop() message: string;
    @Prop() data: any;

    mounted(): void {
      super.mounted();
    }

    confirmed() {
      this.resolve(this.data);
      this.hide();
    }

    canceled() {
      this.resolve(this.data);
      this.hide();
    }
  }
</script>

<style lang="scss" scoped>

</style>
