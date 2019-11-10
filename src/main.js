import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n/I18n';
import {router} from './Router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueRouter from 'vue-router';
import {fab} from '@fortawesome/free-brands-svg-icons';
import './style.scss';
import VueTouch from 'vue-touch';
import {store} from './store/Store';
import {register} from './ServiceWorkerInitializer';
import Toasted from 'vue-toasted';
import Simplert from 'vue2-simplert-plugin';
require('vue2-simplert-plugin/dist/vue2-simplert-plugin.css');


library.add(fas);
library.add(fab);

register();

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueTouch);
Vue.use(VueRouter);
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 2000,
  closeOnSwipe: true,
  singleton: true
});
Vue.use(Simplert);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
