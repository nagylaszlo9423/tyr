<template>
  <div id="auth-page">
    <div class="auth-page-overlay d-flex justify-content-center align-items-center">
      <div class="auth-page-content">
        <slot></slot>
      </div>
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
  @import "../../style/media";
  @import "../../style/theme";

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

      .auth-page-content {
        background-color: transparentize($background, .2);
        border-radius: 10px;
        max-width: 450px;
        width: 40%;
      }

      @include media-lg {
        .auth-page-content {
          width: 55%;
        }
      }

      @include media-md {
        .auth-page-content {
          width: 80%;
        }
      }

      @include media-sm {
        .auth-page-content {
          width: 95%;
        }
      }
    }
  }
</style>
