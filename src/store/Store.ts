import Vuex from 'vuex';
import auth from './modules/Auth';
import createPersistedState from "vuex-persistedstate";


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
