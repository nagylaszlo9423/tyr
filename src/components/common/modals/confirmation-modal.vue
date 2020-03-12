<template>
  <b-modal ref="modal" :id="id" @close="this.resolve(false)">
    <template v-if="title" v-slot:modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <span>{{message}}</span>
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
  export default class ConfirmationModal extends AbstractModal implements ComponentOptions<ConfirmationModal> {
    @Prop() id: string;
    @Prop() title: string;
    @Prop() message: string;

    confirmed() {
      this.resolve(true);
      this.hide();
    }

    canceled() {
      this.resolve(false);
      this.hide();
    }
  }
</script>

<style lang="scss" scoped>

</style>
