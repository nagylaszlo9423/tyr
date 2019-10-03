<template>
  <div id="auth-page">
    <div class="auth-page-overlay d-flex justify-content-center align-items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class AuthPage extends Vue {
  }
</script>

<style lang="scss" scoped>
  #auth-page {
    background-image: url("../../assets/background1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;

    .auth-page-overlay {
      position: relative;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #FFFFFF77;
    }
  }
</style>
