import Vuex, {Store, StoreOptions} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import {RootState} from '@/store/root-state';
import {authStoreModule} from '@/store/modules/auth/auth-store.module';
import {pathStoreModule} from '@/store/modules/path/path-store.module';
import {groupStoreModule} from '@/store/modules/group/group-store.module';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    auth: authStoreModule,
    path: pathStoreModule,
    group: groupStoreModule
  },
  plugins: [
    createPersistedState({
      key: 'TyrStore',
      paths: [
        'auth',
        'path',
        'group'
      ]
    })
  ]
};

export const store: Store<RootState> = new Vuex.Store(storeOptions);
