import Vue from 'vue'
import App from './App.vue'
import I18n from './i18n'
import Router from './router'
import VueAxios from "vue-axios";
import Axios from "axios";


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(VueAxios, Axios);

new Vue({
  I18n,
  Router,
  render: h => h(App)
}).$mount('#app');
