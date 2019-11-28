<template>
  <div class="route-card" @click="">
    <img :src="route.images[0]" />
    <h3>{{ route.title }}</h3>
    <span>{{ route.description }}</span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {RouteResponse} from 'tyr-api';

  @Component
  export default class RouteCard extends Vue {
    @Prop()
    route: RouteResponse;
  }
</script>

<style lang="scss" scoped>
  .route-card {
    display: flex;
    flex-direction: column;
  }
</style>
