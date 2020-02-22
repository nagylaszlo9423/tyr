import Vuex, {Store, StoreOptions} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import {RootState} from '@/store/root-state';
import {authStoreModule} from '@/store/modules/auth-store.module';
import {routeStoreModule} from '@/store/modules/route-store.module';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    auth: authStoreModule,
    route: routeStoreModule
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
};

export const store: Store<RootState> = new Vuex.Store(storeOptions);
