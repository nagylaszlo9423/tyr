<template>
  <button class="floating-action-button" @click="click">
    <font-awesome-icon class="fa-1x" :icon="icon"></font-awesome-icon>
  </button>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class FloatingActionButton extends Vue {
    @Prop()
    icon: string;

    @Emit()
    click($event: Event): Event {return $event;}
  }
</script>

<style lang="scss" scoped>
  .floating-action-button {
    position: relative;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    z-index: 10000;
    justify-content: center;
    align-items: center;
  }
</style>
