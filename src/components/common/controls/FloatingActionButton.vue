<template>
  <button class="floating-action-button" @click="click">
    <font-awesome-icon class="fa-1x" :icon="icon" :title="title"></font-awesome-icon>
  </button>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class FloatingActionButton extends Vue {
    @Prop({default: ''})
    icon: string;
    @Prop({default: ''})
    title: string;

    @Emit()
    click($event: Event): Event {return $event;}
  }
</script>

<style lang="scss" scoped>
  .floating-action-button {
    position: relative;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    z-index: 10000;
    justify-content: center;
    align-items: center;
  }
</style>
