<template>
  <auth-page>
    <b-form @submit.prevent>
      <b-container fluid class="p-3">
        <b-row>
          <b-col class="d-flex justify-content-center my-3">
            <h1>LOGO</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div v-if="error" class="alert alert-danger" role="alert">
              <span>{{$t(`errors.${error}`)}}</span>
            </div>
            <div v-if="formErrors.length" class="alert alert-danger" role="alert">
              <small>{{$t('PLEASE_CORRECT_FOLLOWING_ERRORS')}}</small>
              <ul>
                <li :key="`error_${index}`" v-for="(error, index) in formErrors"><small>{{ $t(`errors.${error}`)
                  }}</small></li>
              </ul>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-form-group>
              <b-form-input
                id="email"
                name="email"
                type="email"
                v-model="formModel.email"
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
                v-model="formModel.password"
                :placeholder="$t('ENTER_PASSWORD')"
                required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col>
            <b-button type="submit" variant="primary" size="sm" @click="login">{{$t('LOGIN')}}</b-button>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col>
            <b-button variant="outline-secondary" size="sm" @click="toRegistrationPage">{{$t('REGISTRATION')}}
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col class="d-flex justify-content-center">
            <b-button class="icon-link" variant="link">
              <img class="icon" src="../../assets/facebook-48.png" alt="Facebook"/>
            </b-button>
          </b-col>
          <b-col class="d-flex justify-content-center">
            <b-button class="icon-link" variant="link">
              <img class="icon" src="../../assets/google-48.png" alt="Google"/>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </auth-page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AuthPage from '@/components/auth/auth.page.vue';

  class FormModel {
    email = '';
    password = '';
  }

  @Component({
    components: {
      AuthPage
    }
  })
  export default class LoginPage extends Vue {
    formModel: FormModel;
    error = '';
    formErrors: string[] = [];

    constructor() {
      super();
      this.formModel = new FormModel();
    }

    login() {
      this.error = '';
      if (this.isFormValid()) {
        this.$store.dispatch('auth/login', this.formModel).then(() => {
          this.$router.push('/pages/map').catch(() => this.error = 'LOGIN_FAILED');
        }).catch((error: Error) => {
          this.error = error.message;
        });
      }
    }

    isFormValid(): boolean {
      this.formErrors = [];

      if (!this.formModel.email) {
        this.formErrors.push('INVALID_EMAIL_ADDRESS');
      }
      if (!this.formModel.password) {
        this.formErrors.push('INVALID_PASSWORD');
      }

      return this.formErrors.length === 0;
    }

    toRegistrationPage() {
      this.$router.push({name: 'registration'});
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/media";
  @import "../../style/theme";

  .btn {
    width: 100%;
  }

</style>
