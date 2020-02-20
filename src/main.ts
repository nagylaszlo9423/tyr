import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n/I18n';
import {router} from './Router';
import {store} from './store/Store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import './utils/validation/VeeValidate';
import './initialize';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
