import Vue from 'vue';
import App from './app.vue';
import i18n from './i18n';
import {router} from './router';
import {store} from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import './utils/validation/vee-validate';
import './initialize';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app');
