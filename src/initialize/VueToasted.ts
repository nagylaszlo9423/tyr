import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 2000,
  closeOnSwipe: true,
  singleton: true
});
