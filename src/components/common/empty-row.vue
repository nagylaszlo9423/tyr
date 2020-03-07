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
    position: relative;
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin: 1rem 3rem 1rem 3rem;
    border-radius: 5px;
    color: darken($primary, 10%);
    box-shadow: 0 0 5px darken($primary, 10%);
    background-color: lighten($primary, 35%);
  }
</style>
