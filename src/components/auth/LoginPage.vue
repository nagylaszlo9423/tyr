<template>
  <div id="login-page">
    <div class="login-page-overlay d-flex justify-content-center align-items-center">
      <div class="login-page-content">
        <b-form>
          <b-container fluid class="p-4">
            <b-row class="mt-2">
              <b-col>
                <b-form-group
                  :label="$t('EMAIL')"
                  label-for="email">
                  <b-form-input
                    id="email"
                    name="email"
                    type="email"
                    :placeholder="$t('ENTER_EMAIL')"
                    required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b-form-group
                  :label="$t('PASSWORD')"
                  label-for="password">
                  <b-form-input
                    id="password"
                    name="password"
                    type="password"
                    :placeholder="$t('ENTER_PASSWORD')"
                    required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="my-2">
              <b-col>
                <b-button variant="primary" size="sm">{{$t('LOGIN')}}</b-button>
              </b-col>
            </b-row>
            <b-row class="my-2">
              <b-col>
                <b-button variant="outline-secondary" size="sm">{{$t('REGISTRATION')}}</b-button>
              </b-col>
            </b-row>
            <b-row class="my-2">
              <b-col>
                <b-button variant="link">
                  <img class="icon" src="../../assets/facebook-48.png" />
                </b-button>
              </b-col>
              <b-col>
                <b-button variant="link">
                  <img class="icon" src="../../assets/google-48.png" />
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class LoginPage extends Vue {
  }
</script>

<style lang="scss" scoped>
  #login-page {
    background-image: url("../../assets/background1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;

    .login-page-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #FFFFFF77;

      .login-page-content {
        max-width: 800px;
        min-width: 250px;
        width: 40%;
        background-color: white;
        border-radius: 15px;

        .btn {
          width: 100%;
        }
      }
    }
  }
</style>
