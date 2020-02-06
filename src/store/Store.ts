import Vuex from 'vuex';
import auth from './modules/Auth';
import routeStore from './modules/RouteStore';
import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    routeStore
  },
  plugins: [
    createPersistedState({
      key: 'TyrStore',
      paths: [
        'auth',
        'route'
      ]
    })
  ]
});
