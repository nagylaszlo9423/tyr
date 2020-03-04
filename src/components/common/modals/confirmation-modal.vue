<template>
  <b-modal ref="modal" v-model="value_" :id="id" @close="this.resolve(false)">
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
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {BModal} from 'bootstrap-vue';
  import {ComponentOptions} from 'vue';
  import {AbstractConfirmationModal} from '@/components/common/modals/abstract-confirmation-modal';

  @Component
  export default class ConfirmationDialog extends AbstractConfirmationModal implements ComponentOptions<ConfirmationDialog> {
    @Prop() id: string;
    @Prop() title: string;
    @Prop() message: string;

    modal_: BModal;
    value_: boolean = false;
    resolve: (result: boolean) => void;

    mounted(): void {
      this.modal_ = this.$refs.modal as BModal;
    }

    show(): Promise<boolean> {
      return new Promise<boolean>(resolve => {
        this.resolve = resolve;
        this.modal_.show();
      });
    }

    hide() {
      this.modal_.hide();
    }

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
