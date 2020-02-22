<template>
  <div class="groups-page">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class GroupsPage extends Vue {
  }
</script>

<style lang="scss" scoped>

</style>
