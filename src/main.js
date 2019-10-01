import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
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
import registerServiceWorker from './RegisterServiceWorker';
import {store} from './store/Store';

library.add(fas);
library.add(fab);

registerServiceWorker();

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueTouch);
Vue.use(VueRouter);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
