<template>
  <b-modal ref="bConfirmationModal" hide-header hide-footer @close="onClose">
    <h2>asdqwe</h2>
  </b-modal>
</template>

<script lang="ts">
  import {Component, Emit, Vue} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {BModal} from 'bootstrap-vue';

  @Component
  export default class ConfirmationModal extends Vue implements ComponentOptions<ConfirmationModal> {
    private modal: BModal;

    @Emit() onConfirmed() {}
    @Emit() onClose() {}

    mounted(): void {
      this.modal = this.$refs['bConfirmationModal'] as BModal;
    }

    show() {
      this.modal.show();
    }

    hide() {
      this.modal.hide();
    }
  }
</script>

<style lang="scss" scoped>

</style>
