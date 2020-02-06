<template>
  <auth-page>
    <b-form>
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
        <b-row>
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
        <b-row class="mb-2">
          <b-col>
            <b-form-group>
              <b-form-input
                id="confirm-password"
                name="confirm-password"
                type="password"
                v-model="formModel.confirmPassword"
                :placeholder="$t('ENTER_PASSWORD_AGAIN')"
                required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col>
            <b-button variant="primary" size="sm" @click="register">{{$t('REGISTER')}}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </auth-page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AuthPage from './AuthPage.vue';
  import environment from '../../environment/environment';
  import {authService} from '../../services/AuthService';

  class FormModel {
    email: string;
    password: string;
    confirmPassword: string;

    constructor() {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    }
  }

  @Component({
    components: {
      AuthPage
    }
  })
  export default class RegistrationPage extends Vue {
    formModel: FormModel;
    error = '';
    formErrors: string[] = [];

    constructor() {
      super();
      this.formModel = new FormModel();
    }

    register() {
      this.error = '';
      if (this.isFormValid()) {
        authService.register(this.formModel.email, this.formModel.password)
          .then(() => this.$router.push('/login'))
          .catch((error: Error) => this.error = error.message);
      }
    }

    isFormValid(): boolean {
      this.formErrors = [];

      if (!this.formModel.email) {
        this.formErrors.push('INVALID_EMAIL_ADDRESS');
      }
      if (!this.formModel.password || !this.formModel.password.match(environment.password_regex)) {
        this.formErrors.push('INVALID_PASSWORD');
      }
      if (this.formModel.password !== this.formModel.confirmPassword) {
        this.formErrors.push('NOT_MATCHING_PASSWORDS');
      }

      return this.formErrors.length === 0;
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    width: 100%;
  }
  .registration-page-content {
    max-width: 400px;
    min-width: 250px;
    width: 90%;
    background-color: white;
    border-radius: 10px;
  }
</style>
