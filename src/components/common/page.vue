<template>
  <div class="t-page">
    <div class="t-page-title">
      <font-awesome-icon v-if="icon" class="fa-1x" fixed-width :icon="icon"></font-awesome-icon>
      <span v-if="title">{{title}}</span>
    </div>
    <b-container fluid>
      <slot></slot>
    </b-container>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'page'
  })
  export default class Page extends Vue {
    @Prop() title: string;
    @Prop() icon: string
  }
</script>

<style lang="scss">

</style>
