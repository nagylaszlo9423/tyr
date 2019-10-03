<template>
  <auth-page>
    <div class="registration-page-content">

    </div>
  </auth-page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AuthPage from './AuthPage.vue';

  @Component({
    components: {
      AuthPage
    }
  })
  export default class RegistrationPage extends Vue {
  }
</script>

<style lang="scss" scoped>
  .registration-page-content {
    max-width: 400px;
    min-width: 250px;
    width: 90%;
    background-color: white;
    border-radius: 10px;
  }
</style>
