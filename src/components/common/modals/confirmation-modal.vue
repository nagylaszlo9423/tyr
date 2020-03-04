<template>
  <b-modal ref="modal" v-model="value_" :id="id">
    <template v-if="title" v-slot:modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <span>{{message}}</span>
    <template v-slot:modal-footer>
      <b-container>
        <b-row>
          <b-col>
            <b-button variant="secondary" @click="$refs.modal.hide">{{ $t('CANCEL') }}</b-button>
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
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
  import {BModal} from 'bootstrap-vue';
  import {ComponentOptions} from 'vue';

  @Component
  export default class ConfirmationDialog extends Vue implements ComponentOptions<ConfirmationDialog> {
    @Prop() id: string;
    @Prop() title: string;
    @Prop() message: string;

    @Emit() confirmed(): any {
      return this.carriedData_;
    }
    @Emit() canceled() {}

    modal_: BModal;
    value_: boolean = false;
    carriedData_: any;

    mounted(): void {
      this.modal_ = this.$refs.modal as BModal;
    }

    show(carriedData: any) {
      this.carriedData_ = carriedData;
      this.modal_.show();
    }

    hide() {
      this.modal_.hide();
    }
  }
</script>

<style lang="scss" scoped>

</style>
