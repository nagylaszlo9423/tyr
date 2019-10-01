<template>
  <div id="login-page">
    <div class="login-page-overlay d-flex justify-content-center align-items-center">
      <div class="login-page-content">
        <b-form>
          <b-container fluid class="p-3">
            <b-row>
              <b-col class="d-flex justify-content-center my-3">
                <h1>LOGO</h1>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <b-form-group>
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
                <b-form-group>
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
              <b-col class="d-flex justify-content-center">
                <b-button class="icon-link" variant="link">
                  <img class="icon" src="../../assets/facebook-48.png" alt="Facebook" />
                  <span>Facebook</span>
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-center">
                <b-button class="icon-link" variant="link">
                  <img class="icon" src="../../assets/google-48.png" alt="Google" />
                  <span>Google</span>
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
  import {authService} from '../../services/AuthService'

  @Component
  export default class LoginPage extends Vue {
    login() {
      authService.login('', '').then(() => {
        this.$router.push('/');
      })
    }
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
        max-width: 400px;
        min-width: 250px;
        width: 90%;
        background-color: white;
        border-radius: 15px;

        .btn {
          width: 100%;
        }
      }
    }
  }
</style>
