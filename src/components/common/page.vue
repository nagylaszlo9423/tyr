<template>
  <div class="t-page">
    <div class="t-page-title d-flex align-content-center px-2">
      <font-awesome-icon v-if="icon" class="fa-1x" fixed-width :icon="icon"></font-awesome-icon>
      <span v-if="title">{{title}}</span>
      <b-button variant="outline-primary" v-if="backButtonTitle" @click="goBack" class="ml-auto" :title="backButtonTitle">
        <font-awesome-icon v-if="backButtonIcon" class="fa-1x mr-2" fixed-width :icon="backButtonIcon"></font-awesome-icon>
        <span>{{backButtonTitle}}</span>
      </b-button>
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
    @Prop() icon: string;
    @Prop() backButtonRoute: string;
    @Prop() backButtonTitle: string;
    @Prop() backButtonIcon: string;

    goBack() {
      if (this.backButtonRoute) {
        this.$router.push(this.backButtonRoute);
      } else {
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss">

</style>
