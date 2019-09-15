import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import VueAxios from "vue-axios";
import Axios from "axios";
import router from './router/Router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

library.add(faSearchLocation);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueAxios, Axios);
Vue.use(VueRouter);

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
