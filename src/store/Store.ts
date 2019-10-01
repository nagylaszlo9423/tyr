import Vuex from 'vuex';
import auth from './modules/Auth';
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
    createPersistedState({
      key: 'TyrStore',
      paths: [
        'auth'
      ]
    })
  ]
});
