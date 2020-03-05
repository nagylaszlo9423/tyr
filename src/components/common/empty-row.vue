<template>
  <div class="tyr-empty-row"><span>{{ $t('NO_AVAILABLE_DATA') }}</span></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class EmptyRow extends Vue {
    @Prop() name: string;
  }
</script>

<style lang="scss" scoped>
  @import "../../style/theme";

  .tyr-empty-row {
    width: 100%;
    padding: 1rem;
    margin: 1rem 3rem 1rem 3rem;
    text-align: center;
    border-radius: 5px;
    color: darken($primary, 10%);
    box-shadow: 0 0 5px darken($primary, 10%);
    background-color: lighten($primary, 35%);
  }
</style>
